import createHttpError from "http-errors";
export const parseString = (value) => {
    const isString = typeof value === 'string';
    if (!isString)
        return undefined;
    const normalized = value.trim().toLowerCase();
    return normalized;
};
const allowedStatuses = [
    'pending',
    'in_progress',
    'completed',
    'cancelled'
];
const isTaskStatus = (value) => {
    return allowedStatuses.includes(value);
};
export const parseStatus = (status) => {
    if (status === undefined || status === null) {
        return undefined;
    }
    if (typeof status !== 'string') {
        throw createHttpError(400, 'Please select the correct status');
    }
    const normalized = status.trim().toLowerCase();
    if (!isTaskStatus(normalized)) {
        throw createHttpError(400, 'Please select the correct status');
    }
    return normalized;
};
const allowedPriorityStatus = [
    'low',
    'medium',
    'high',
    'critical'
];
const isTaskPriority = (value) => {
    return allowedPriorityStatus.includes(value);
};
export const parsePriority = (priority) => {
    if (priority === undefined || priority === null) {
        return undefined;
    }
    if (typeof priority !== 'string') {
        throw createHttpError(404, ' Please set the correct status');
    }
    const normalized = priority.trim().toLowerCase();
    if (!isTaskPriority(normalized)) {
        throw createHttpError(404, ' Please select the correct prioity type');
    }
    return normalized;
};
const allowedTaskCategory = [
    'general',
    'training',
    'logistics',
    'maintenance',
    "operation"
];
const isTaskkCategory = (value) => {
    return allowedTaskCategory.includes(value);
};
export const parseCategory = (category) => {
    if (category === undefined || category === null) {
        return undefined;
    }
    if (typeof category !== 'string') {
        throw createHttpError(404, 'Please set the correct category');
    }
    const normalized = category.trim().toLowerCase();
    if (!isTaskkCategory(normalized)) {
        throw createHttpError(404, 'Please select the correct category`s type');
    }
    return normalized;
};
export const parseBoolean = (value) => {
    if (typeof value === 'boolean')
        return value;
    if (value === 'true')
        return true;
    if (value === 'false')
        return false;
    return undefined;
};
export const parseFiltersFields = (query) => {
    const { title, description, status, priority, category, isArchived } = query;
    const parsedTitle = parseString(title);
    const parsedDescription = parseString(description);
    const parsedStatus = parseStatus(status);
    const parsedPriority = parsePriority(priority);
    const parsedCategory = parseCategory(category);
    const parsedIsArchived = parseBoolean(isArchived);
    return {
        title: parsedTitle,
        description: parsedDescription,
        status: parsedStatus,
        priority: parsedPriority,
        category: parsedCategory,
        isArchived: parsedIsArchived
    };
};
