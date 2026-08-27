import { sortValue } from "../constants/index.js"

// Доказать что сортОрдер и СортБай это стринги + ограничить на аск\деск.


export const parseSortOrder = (sortOrder: unknown) => {
    const isString = typeof sortOrder === 'string'
    if (!isString) return undefined
    const isSortOrder = [sortValue.ASC, sortValue.DESC].includes(sortOrder)
    if (isSortOrder) return sortOrder
    return sortValue.DESC
}

export const keysOfSortBy = [
    'createdAt',
    'updatedAt',
    'dueDate',
    'status',
    'priority',
] as const;
export type SortBy = (typeof keysOfSortBy)[number]
export const parseSortBy = (sortBy: unknown): SortBy => {
    if (typeof sortBy === 'string' &&
        keysOfSortBy.includes(sortBy as SortBy)
    ) {
        return sortBy as SortBy
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
