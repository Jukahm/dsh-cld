import type { ApiResponse } from "../types/api.js";
import { ApiError, normalizeError, parseErrorResponse } from "./errors.js";

export interface ApiClientConfig {
  baseUrl: string;
  getAuthToken?: () => string | null;
  onUnauthorized?: () => void;
  timeout?: number;
  maxRetries?: number;
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  skipAuth?: boolean;
  skipRetry?: boolean;
}

const DEFAULT_TIMEOUT = 30_000;
const DEFAULT_MAX_RETRIES = 3;
const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildUrl(base: string, path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(path, base);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

export class ApiClient {
  private readonly config: Required<ApiClientConfig>;

  constructor(config: ApiClientConfig) {
    this.config = {
      getAuthToken: () => null,
      onUnauthorized: () => {},
      timeout: DEFAULT_TIMEOUT,
      maxRetries: DEFAULT_MAX_RETRIES,
      ...config,
    };
  }

  private buildHeaders(options: RequestOptions): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (!options.skipAuth) {
      const token = this.config.getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return { ...headers, ...(options.headers as Record<string, string>) };
  }

  private async executeRequest(url: string, options: RequestOptions): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: this.buildHeaders(options),
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async requestWithRetry(
    url: string,
    options: RequestOptions,
    attempt = 0,
  ): Promise<Response> {
    try {
      const response = await this.executeRequest(url, options);

      if (!response.ok) {
        if (response.status === 401) {
          this.config.onUnauthorized();
          throw await parseErrorResponse(response);
        }

        if (
          !options.skipRetry &&
          RETRYABLE_STATUS.has(response.status) &&
          attempt < this.config.maxRetries
        ) {
          await sleep(Math.pow(2, attempt) * 200);
          return this.requestWithRetry(url, options, attempt + 1);
        }

        throw await parseErrorResponse(response);
      }

      return response;
    } catch (err) {
      if (err instanceof ApiError) throw err;

      if (
        !options.skipRetry &&
        attempt < this.config.maxRetries &&
        !(err instanceof ApiError)
      ) {
        await sleep(Math.pow(2, attempt) * 200);
        return this.requestWithRetry(url, options, attempt + 1);
      }

      throw normalizeError(err);
    }
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { params, ...fetchOptions } = options;
    const url = buildUrl(this.config.baseUrl, path, params);
    const response = await this.requestWithRetry(url, fetchOptions);
    return response.json() as Promise<ApiResponse<T>>;
  }

  async get<T>(path: string, options?: Omit<RequestOptions, "method" | "body">): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });
  }

  async put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });
  }

  async patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}

// Configured singleton — apps override baseUrl via env var injection
// Apps can replace this via: import { ApiClient } from "@dash/shared"; new ApiClient({ baseUrl: ... })
function getBaseUrl(): string {
  try {
    // Vite injects import.meta.env at build time; access safely for non-Vite envs
    const env = (globalThis as Record<string, unknown>)["__VITE_ENV__"] as
      | Record<string, string>
      | undefined;
    return env?.["VITE_API_BASE_URL"] ?? "/api";
  } catch {
    return "/api";
  }
}

export const apiClient = new ApiClient({ baseUrl: getBaseUrl() });
