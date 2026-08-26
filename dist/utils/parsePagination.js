export const parseString = (numbers, defaultValue) => {
    const isString = typeof numbers === 'string';
    if (!isString)
        return defaultValue;
    const parsedNumbers = parseInt(numbers, 10);
    if (Number.isNaN(parsedNumbers)) {
        return defaultValue;
    }
    return parsedNumbers;
};
export const parsePaginationParams = (query) => {
    const { page, perPage } = query;
    const parsedPage = parseString(page, 1);
    const parsedPerPage = parseString(perPage, 10);
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
