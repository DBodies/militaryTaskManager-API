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
    if (typeof search !== 'string')
        return undefined;
    return search.trim() || undefined;
};
export const parsedSort = (query) => {
    const { sortOrder, sortBy, search } = query;
    const parsedSortOrder = parseSortOrder(sortOrder);
    const parsedSortBy = parseSortBy(sortBy);
    const parsedSearchValue = parseSearch(search);
    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy,
        search: parsedSearchValue
    };
};
