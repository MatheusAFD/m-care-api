interface CalculatePagination {
  page: number
  limit: number
  totalItems: number
}

export const calculatePagination = ({
  page,
  limit,
  totalItems
}: CalculatePagination) => {
  const currentPage = page
  const totalPages = Math.ceil(totalItems / limit)

  const nextPage = page < totalPages ? page + 1 : null
  const previousPage = page > 1 ? page - 1 : null

  const hasNextPage = Boolean(nextPage)
  const hasPreviousPage = Boolean(previousPage)

  return {
    currentPage,
    nextPage,
    previousPage,
    totalPages,
    hasNextPage,
    hasPreviousPage
  }
}
