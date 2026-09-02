export const sortValue = {
    ASC: 'asc',
    DESC: 'desc'
} as const
export type SortOrder = typeof sortValue[keyof typeof sortValue]
