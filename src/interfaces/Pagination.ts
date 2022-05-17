export interface Pagination {
    totalPageCount: number,
    previous: number | undefined,
    next: number | undefined,
    currentPage: number,
    limit: number
}