import { sortValue } from "../constants/index.js"

export const parseSortOrder = (sortOrder) => {
    const isSortOrder = [sortValue.ASC, sortValue.DESC].includes(sortOrder)
    if (isSortOrder) return sortOrder
    return sortValue.DESC
}
export const parseSortBy = (sortBy) => {
    const keysOfSort = [
        'createdAt',
        'updatedAt',
        'dueDate',
        'status',
        'priority',
    ]
    if (keysOfSort.includes(sortBy)) {
        return sortBy
    }
    return 'createdAt'
}

export const parseSearch = (search) => {
    const isString = typeof search === 'string'
    if (!isString) return null
    const normalized = search.trim()
    return normalized
}

export const parsedSort = (query) => {
    const { sortOrder, sortBy, search } = query
    const parsedSearchValue = parseSearch(search)
    const parsedSortOrder = parseSortOrder(sortOrder)
    const parsedSortBy = parseSortBy(sortBy)
    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy,
        search: parsedSearchValue
    }
}
