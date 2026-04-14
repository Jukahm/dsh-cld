export interface ResponseMeta {
  requestId: string;
  timestamp: string;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
  code: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: ResponseMeta;
  errors?: ApiErrorDetail[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

export type SortDirection = "asc" | "desc";

export interface SortParams {
  field: string;
  direction: SortDirection;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sort?: SortParams;
}
