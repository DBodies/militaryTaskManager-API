import createHttpError from "http-errors";
import { Task } from "../models/task.js";
import { calculationParsedPagination } from "../utils/parsePagination.js";
import { filters } from "../utils/filtersObjects.js";
import { sortValue } from "../constants/index.js";

export const getAllTask = async ({
    page = 1,
    perPage = 10,
    filter = {},
    sortOrder = sortValue.ASC,
    sortBy = 'createdAt'
}) => {
    const limit = perPage
    const skip = (page - 1) * perPage
    const taskQuery = Task.find()
    filters(taskQuery, filter)
    const count = await taskQuery.clone().countDocuments()
    const tasks = await taskQuery.clone().limit(limit).skip(skip).sort({[sortBy]:sortOrder}).exec()
    const paginationData = calculationParsedPagination(count, page,perPage)
    return {
        tasks,
        paginationData
    }
    
}
export const createTask = async (payload) => {
    const newTask = await new Task(payload)
    await newTask.save()
    return newTask
}
export const getTaskById = async (taskId) => {
    const taskById = await Task.findById(taskId)
    return taskById
}
export const upsertById = async(taskId, payload, options ={}) => {
    const rawResult = await Task.findByIdAndUpdate({ _id: taskId },
        payload, {
            new: true,
            runValidators: true,
            ...options,
            includeResultMetadata: true
        }
    )
    if (!rawResult || !rawResult.value) return null
    return {
        task: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted)
    }
}
export const updateById = async (taskId, payload, options = {}) => {
    const task = await Task.findByIdAndUpdate( taskId ,
        payload,
        {
            new: true,
            runValidators: true,
            ...options
        }
    )
    if (!task) return null
    return task
}
export const deleteById = async (taskId) => {
    const task = await Task.findByIdAndDelete(taskId)
    return task
}
export const archivedTask = async (taskId) => {
    const task = await Task.findByIdAndUpdate(taskId,
        { isArchived: true },
        {new: true})
    if (!task) {
        throw createHttpError(404, 'task not found')
    }
    return task
}