import createHttpError from "http-errors"
import { TaskStatus } from "../types/task.js"


export const parseString = (value: unknown) => {
    const isString = typeof value === 'string'
    if (!isString) return undefined
    const normalized = value.trim().toLowerCase()
    return normalized
}

const allowedStatuses = [
    'pending',
    'in_progress',
    'completed',
    'cancelled'
] as const satisfies readonly TaskStatus[]

const isTaskStatus = (value: string): value is TaskStatus => {
    return (allowedStatuses as readonly string[]).includes(value)
}
export const parseStatus = (
    status: unknown
): TaskStatus | undefined => {
    if (status === undefined || status === null) {
        return undefined
    }
    if (typeof status !== 'string') {
        throw createHttpError(
            400,
            'Please select the correct status'
        )
    }
    const normalized = status.trim().toLowerCase()
    if (!isTaskStatus(normalized)) {
        throw createHttpError(
            400,
            'Please select the correct status'
        )
    }
    return normalized
}






export const parsePriority = (priority:unknown) => {
    const allowed = ['low', 'medium', 'high', 'critical']
    const normalized = parseString(priority)
    if (normalized === undefined) {
        return undefined;
    }
    if (!allowed.includes(normalized)){
        throw createHttpError(400, 'Please select the correct priority')}
    return normalized
}
export const parseCategory = (category:unknown) => {
    const allowed = ['general', 'training', 'logistics', 'maintenance', 'operation']
    const normalized = parseString(category)
    if (normalized === undefined) {
        return undefined;
    }
    if (!allowed.includes(normalized)) {
        throw createHttpError(400, 'Please select the correct priority')}
    return normalized
}

export interface FilerFields {
    title?: unknown,
    description?: unknown,
    status?: unknown,
    priority?: unknown,
    category?: unknown,
    isArchived?: unknown,
    sortOrder?: unknown,
    sortBy?: unknown,
    search?: unknown,
    page?: unknown,
    perPage?: unknown
}
export const parseBoolean = (value:unknown) => {
if(typeof value === 'boolean') return value
    if (value === 'true') return true
    if (value === 'false') return false
    return undefined
}

export const parseFiltersFields = (query:FilerFields) => {
    const { title, description, status, priority, category, isArchived } = query
    const parsedTitle = parseString(title)
    const parsedDescription = parseString(description)
    const parsedStatus = parseStatus(status)
    const parsedPriority = parsePriority(priority)
    const parsedCategory = parseCategory(category)
    const parsedIsArchived = parseBoolean(isArchived)

    return {
        title: parsedTitle,
        description: parsedDescription,
        status: parsedStatus,
        priority: parsedPriority,
        category: parsedCategory,
        isArchived: parsedIsArchived
    }
}