import createHttpError from "http-errors"

export const parseString = (
    value: unknown,
    defaultValue: number
): number => {
    if (value === undefined) {
        return defaultValue;
    }

    if (typeof value !== 'string' || !/^\d+$/.test(value)) {
        throw createHttpError(400, 'Expected a positive integer');
    }

    const parsedNumber = Number(value);

    if (!Number.isSafeInteger(parsedNumber) || parsedNumber < 1) {
        throw createHttpError(400, 'Expected a positive integer');
    }

    return parsedNumber;
};

type SearchQueryParams = {
    page?: unknown,
    perPage?: unknown
}

export const parsePaginationParams =  (query:SearchQueryParams) => {
    const { page, perPage } = query
    const parsedPage = parseString(page, 1)
    const parsedPerPage =  Math.min(parseString(perPage,10),100)
    return {
        page: parsedPage,
        perPage: parsedPerPage
    }
}

export type Pagination = {
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