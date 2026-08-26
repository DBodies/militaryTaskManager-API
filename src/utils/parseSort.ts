import { sortValue } from "../constants/index.js"

// Доказать что сортОрдер и СортБай это стринги + ограничить на аск\деск.

export const parseSortOrder = (sortOrder:unknown) => {
    const isSortOrder = [sortValue.ASC, sortValue.DESC].includes(sortOrder)
    if (isSortOrder) return sortOrder
    return sortValue.DESC
}

export const parseSortBy = (sortBy:string) => {
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

export const parseSearch = (search:unknown) => {
    const isString = typeof search === 'string'
    if (!isString) return null
    const normalized = search.trim()
    return normalized
}

export type SortParams = {
    sortOrder?: unknown,
    sortBy?: unknown,
    search?: unknown
}

export const parsedSort = (query:SortParams) => {
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
