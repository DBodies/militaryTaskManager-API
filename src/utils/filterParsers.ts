import createHttpError from "http-errors"
import { TaskStatus, TaskPriority, TaskCategory } from "../types/task.js"


export const parseString = (value: unknown): string | undefined => {
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

const allowedPriorityStatus = [
    'low', 
    'medium' 
    ,'high' , 
    'critical'
] as const satisfies readonly TaskPriority[]
const isTaskPriority = (value: string): value is TaskPriority => {
    return (allowedPriorityStatus as readonly string[]).includes(value)
}
export const parsePriority = (priority:unknown):TaskPriority | undefined => {
    if(priority === undefined || priority === null) {
        return undefined
    }
    if(typeof priority !== 'string') {
        throw createHttpError(404,' Please set the correct status')
    }
    const normalized = priority.trim().toLowerCase()
    if(!isTaskPriority(normalized)) {
        throw createHttpError(404, ' Please select the correct prioity type')
    }
    return normalized
}

const allowedTaskCategory = [
    'general',
    'training',
    'logistics', 
    'maintenance',
    "operation"
] as const satisfies readonly TaskCategory[]
const isTaskkCategory = (value: string): value is TaskCategory => {
    return (allowedTaskCategory as readonly string[]).includes(value)
}
export const parseCategory = (category:unknown):TaskCategory | undefined => {
    if(category === undefined || category === null) {
    return undefined} 
    if(typeof category !== 'string' ) {
        throw createHttpError(404, 'Please set the correct category')
    }
    const normalized = category.trim().toLowerCase()
    if(!isTaskkCategory(normalized)) {
        throw createHttpError(404, 'Please select the correct category`s type')
    }
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
export const parseBoolean = (value:unknown): boolean | undefined => {
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