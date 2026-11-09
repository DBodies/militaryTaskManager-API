import createHttpError from "http-errors";
export const parseString = (value, defaultValue) => {
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
export const parsePaginationParams = (query) => {
    const { page, perPage } = query;
    const parsedPage = parseString(page, 1);
    const parsedPerPage = Math.min(parseString(perPage, 10), 100);
    return {
        page: parsedPage,
        perPage: parsedPerPage
    };
};
export const calculationParsedPagination = (count, page, perPage) => {
    const totalPages = Math.ceil(count / perPage);
    return {
        page,
        perPage,
        totalItems: count,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        totalPages
    };
};
