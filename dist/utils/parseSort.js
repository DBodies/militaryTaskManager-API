import { sortValue } from "../constants/index.js";
export const parseSortOrder = (sortOrder) => {
    if (sortOrder === sortValue.ASC ||
        sortOrder === sortValue.DESC) {
        return sortOrder;
    }
    return sortValue.DESC;
};
export const keysOfSortBy = [
    'createdAt',
    'updatedAt',
    'dueDate',
    'status',
    'priority',
];
export const parseSortBy = (sortBy) => {
    if (typeof sortBy === 'string' &&
        keysOfSortBy.includes(sortBy)) {
        return sortBy;
    }
    return 'createdAt';
};
export const parseSearch = (search) => {
    const isString = typeof search === 'string';
    if (!isString)
        return null;
    const normalized = search.trim();
    return normalized;
};
export const parsedSort = (query) => {
    const { sortOrder, sortBy, search } = query;
    const parsedSearchValue = parseSearch(search);
    const parsedSortOrder = parseSortOrder(sortOrder);
    const parsedSortBy = parseSortBy(sortBy);
    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy,
        search: parsedSearchValue
    };
};
