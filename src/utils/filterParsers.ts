import createHttpError from "http-errors"
import { TaskCategory, TaskStatus, TaskPriority } from "../types/task.js"


export const parseString = (value: unknown, defaultValue:string) => {
    const isString = typeof value === 'string'
    if (!isString) return defaultValue
    const normalized = value.trim().toLowerCase()
    return normalized
}

export const parseStatus = (status:unknown, defaultValue:string) => {
    const allowed = ['pending', 'in_progress', 'completed', 'cancelled']
    const normalized = parseString(status, "pending")
    if (normalized === undefined) {
        return undefined;
    }
    if (!allowed.includes(normalized)) {
        throw createHttpError(400, 'Please select the correct status')}
    return normalized
}
export const parsePriority = (priority:unknown, defaultValue:string) => {
    const allowed = ['low', 'medium', 'high', 'critical']
    const normalized = parseString(priority, "medium")
    if (normalized === undefined) {
        return undefined;
    }
    if (!allowed.includes(normalized)){
        throw createHttpError(400, 'Please select the correct priority')}
    return normalized
}
export const parseCategory = (category:unknown, defaultValue:string) => {
    const allowed = ['general', 'training', 'logistics', 'maintenance', 'operation']
    const normalized = parseString(category,"general")
    if (normalized === undefined) {
        return undefined;
    }
    if (!allowed.includes(normalized)) {
        throw createHttpError(400, 'Please select the correct priority')}
    return normalized
}

export const parseBoolean = (value:boolean) => {
if(typeof value === 'boolean') return value
    if (typeof value !== 'string') return undefined
    if (value === 'true') return true
    if (value === 'false') return false
    return undefined
}

export interface FilerFields {
    title?: string,
    description?: string,
    status: TaskStatus,
    priority: TaskPriority,
    category: TaskCategory,
    isArchived: boolean
}

export const parseFiltersFields = (query:FilerFields) => {
    const { title, description, status, priority, category, isArchived } = query
    const parsedTitle = parseString(title, "")
    const parsedDescription = parseString(description, "")
    const parsedStatus = parseStatus(status, 'pending')
    const parsedPriority = parsePriority(priority, 'medium')
    const parsedCategory = parseCategory(category, 'general')
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