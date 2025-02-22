export interface Pagination {
  currentPage: number
  nextPage: number | null
  previousPage: number | null
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
