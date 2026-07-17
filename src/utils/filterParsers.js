import createHttpError from "http-errors"


export const parseString = (value, defaultValue) => {
    const isString = typeof value === 'string'
    if (!isString) return defaultValue
    const normalized = value.trim().toLowerCase()
    return normalized
}

export const parseStatus = (status, defaultValue) => {
    const allowed = ['pending', 'in_progress', 'completed', 'cancelled']
    const normalized = parseString(status)
    if (normalized === undefined) {
        return undefined;
    }
    if (!allowed.includes(normalized)) {
        throw createHttpError(400, 'Please select the correct status')}
    return normalized
}
export const parsePriority = (priority, defaultValue) => {
    const allowed = ['low', 'medium', 'high', 'critical']
    const normalized = parseString(priority)
    if (normalized === undefined) {
        return undefined;
    }
    if (!allowed.includes(normalized)){
        throw createHttpError(400, 'Please select the correct priority')}
    return normalized
}
export const parseCategory = (category, defaultValue) => {
    const allowed = ['general', 'training', 'logistics', 'maintenance', 'operation']
    const normalized = parseString(category)
    if (normalized === undefined) {
        return undefined;
    }
    if (!allowed.includes(normalized)) {
        throw createHttpError(400, 'Please select the correct priority')}
    return normalized
}

export const parseBoolean = (value) => {
if(typeof value === 'boolean') return value
    if (typeof value !== 'string') return undefined
    const normalized = value.trim().toLowerCase()
    if (normalized === 'true') return true
    if (normalized === 'false') return false
    return undefined
}

export const parseFiltersFields = (query) => {
    const { title, description, status, priority, category, isArchived } = query
    const parsedTitle = parseString(title)
    const parsedDescription = parseString(description)
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