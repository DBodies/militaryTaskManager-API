export const filters = (taskQuery,filter) => {
    if (filter.status) {
        taskQuery.where('status').equals(filter.status)
    }
    if (filter.priority) {
        taskQuery.where('priority').equals(filter.priority)
    }
    if (filter.category) {
        taskQuery.where('category').equals(filter.category)
    }
    if (filter.title) {
        taskQuery.where('title').equals(filter.title)
    }
    if (filter.description) {
        taskQuery.where('description').equals(filter.description)
    }
}