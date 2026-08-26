const escapeRegex = (value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
export const filters = (taskQuery, filter, search, owner) => {
    if (filter.status) {
        taskQuery.where('status').equals(filter.status);
    }
    if (filter.priority) {
        taskQuery.where('priority').equals(filter.priority);
    }
    if (filter.category) {
        taskQuery.where('category').equals(filter.category);
    }
    if (filter.title) {
        const title = escapeRegex(filter.title);
        taskQuery
            .where('title')
            .regex(new RegExp(title, 'i'));
    }
    if (filter.description) {
        const description = escapeRegex(filter.description);
        taskQuery
            .where('description')
            .regex(new RegExp(description, 'i'));
    }
    if (filter.isArchived !== undefined) {
        taskQuery.where('isArchived').equals(filter.isArchived);
    }
    if (search) {
        const escapedSearch = escapeRegex(search);
        const searchRegex = new RegExp(escapedSearch, 'i');
        taskQuery.or([
            { title: searchRegex },
            { description: searchRegex }
        ]);
    }
    if (owner) {
        taskQuery.where('owner').equals(owner);
    }
};
