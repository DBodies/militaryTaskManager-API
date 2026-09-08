import { QueryFilter } from "mongoose"
import { Task } from "../types/task.js"

const escapeRegex = (value:string): string => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const filters = (taskQuery:QueryFilter<Task>, filter:QueryFilter<Task>, search:string):void => {
    if (filter.status) {
        taskQuery.status = filter.status
    }
    if (filter.priority) {
        taskQuery.priority = filter.priority
    }
    if (filter.category) {
        taskQuery.category = filter.category
    }
    if (typeof filter.title === 'string') {
        const safeTitle = escapeRegex(filter.title)
        taskQuery.title = {
            $regex: safeTitle,
            $options: 'i'
                }
    }

    if (typeof filter.description === 'string') {
        const safeDescription = escapeRegex(filter.description)
        taskQuery.description = {
            $regex: safeDescription,
            $options: 'i'
        }
    }

    if (filter.isArchived !== undefined) {
        taskQuery.isArchived = filter.isArchived
    }
    if (search) {
        const escapedSearch = escapeRegex(search)
        const searchRegex = new RegExp(escapedSearch, 'i')
        taskQuery.$or =[
            {title: searchRegex},
            {description: searchRegex}
        ]
    }
}