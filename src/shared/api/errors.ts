export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(message: string, status: number, code: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }
}

export function normalizeError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;
  if (err instanceof Error) {
    return new ApiError(err.message, 0, "UNKNOWN_ERROR", err);
  }
  return new ApiError("An unexpected error occurred", 0, "UNKNOWN_ERROR", err);
}

export async function parseErrorResponse(response: Response): Promise<ApiError> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  const message =
    isObject(body) && typeof body["message"] === "string"
      ? body["message"]
      : response.statusText || "Request failed";

  const code =
    isObject(body) && typeof body["code"] === "string" ? body["code"] : "HTTP_ERROR";

  return new ApiError(message, response.status, code, body);
}

function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}
