export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export function paginate(page: number = 1, limit: number = 20): { offset: number; limit: number } {
  return { offset: (page - 1) * limit, limit };
}
export { query as dbQuery, pool } from './client';
