export const parseString =  (numbers: unknown, defaultValue: number): number => {
    const isString = typeof numbers === 'string'
    if (!isString) return defaultValue
    const parsedNumbers = parseInt(numbers, 10)
    if (Number.isNaN(parsedNumbers)) {
        return defaultValue
    }
    return parsedNumbers
}

type SearchQueryParams = {
    page?: unknown,
    perPage?: unknown
}

export const parsePaginationParams =  (query:SearchQueryParams) => {
    const { page, perPage } = query
    const parsedPage = parseString(page, 1)
    const parsedPerPage = parseString(perPage, 10)
    return {
        page: parsedPage,
        perPage: parsedPerPage
    }
}

type Pagination = {
    page: number,
    perPage: number,
    totalItems: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    totalPages: number
}

export const calculationParsedPagination =  (count: number, page:number, perPage:number):Pagination => {
    const totalPages = Math.ceil(count / perPage)
    return {
        page,
        perPage,
        totalItems: count,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        totalPages
    }
}