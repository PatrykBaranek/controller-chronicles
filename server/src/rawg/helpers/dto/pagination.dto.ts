export class PaginationDto<T> {
  totalItems: number;
  totalPages?: number;
  currentPage: number;
  results: T[];
}
