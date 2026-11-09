import { sortValue, SortOrder } from "../constants/index.js"

export const parseSortOrder = (sortOrder: unknown): SortOrder => {
  if (
    sortOrder === sortValue.ASC ||
    sortOrder === sortValue.DESC
  ) {
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

export type SortParams = {
    sortOrder?: unknown,
    sortBy?: unknown,
    search?: unknown
}

export const parseSearch = (search:unknown):string | undefined => {
    if(typeof search !== 'string') return undefined
    return search.trim() || undefined
}

export const parsedSort = (query:SortParams) => {
    const { sortOrder, sortBy, search } = query
    const parsedSortOrder = parseSortOrder(sortOrder)
    const parsedSortBy = parseSortBy(sortBy)
    const parsedSearchValue = parseSearch(search)
    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy,
        search: parsedSearchValue
    }
}
