import { Pagination } from './pagination'

export interface ResponseWithPagination<T> {
  data: T
  pagination: Pagination
}
