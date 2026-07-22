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
    sortBy = 'createdAt',
    search = '',
    owner
}) => {
    const limit = perPage
    const skip = (page - 1) * perPage
    const taskQuery = Task.find()
    filters(taskQuery, filter, search, owner)
    const count = await taskQuery.clone().countDocuments()
    const tasks = await taskQuery.clone().limit(limit).skip(skip).sort({[sortBy]:sortOrder}).exec()
    const paginationData = calculationParsedPagination(count, page,perPage)
    return {
        tasks,
        paginationData
    }
}
export const createTask = async (updateData) => {
    const newTask = await new Task(updateData)
    await newTask.save()
    return newTask
}
export const getTaskById = async ({taskId, owner}) => {
    const taskById = await Task.findOne({
        _id: taskId,
        owner
    })
    return taskById
}
export const updateById = async ({taskId, owner, updateData, options = {}}) => {
    const task = await Task.findOneAndUpdate({
        _id: taskId,
        owner
    },
        updateData,
        {
            new: true,
            runValidators: true,
            ...options
        }
    )
    if (!task) return null
    return task
}
export const deleteById = async ({taskId, owner}) => {
    const task = await Task.findOneAndDelete({
        _id: taskId,
        owner
    })
    return task
}
export const archivedTask = async ({taskId, owner}) => {
    const task = await Task.findOneAndUpdate({
        _id: taskId,
        owner},
        { isArchived: true },
        {new: true})
    if (!task) {
        throw createHttpError(404, 'task not found')
    }
    return task
}