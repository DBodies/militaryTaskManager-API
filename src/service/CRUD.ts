import createHttpError from "http-errors";
import { TaskModel } from "../models/task.js";
import { calculationParsedPagination, Pagination } from "../utils/parsePagination.js";
import { filters } from "../utils/filtersObjects.js";
import { sortValue } from "../constants/index.js";
import { CreatedTaskDTO, Task } from "../types/task.js";
import { Types, QueryFilter, HydratedDocument } from "mongoose";



type CreateTaskServiceParams = 
    CreatedTaskDTO
    owner: Types.ObjectId


export const getAllTask = async ({
    page = 1,
    perPage = 10,
    filter = {},
    sortOrder = sortValue.ASC,
    sortBy = 'createdAt',
    search = '',
    owner
}: CreateTaskServiceParams):Promise<{
    tasks: Task[];
    paginationData: Pagination;
}> => {
    const limit = perPage
    const skip = (page - 1) * perPage
    const taskQuery:QueryFilter<Task> = {
        ...filter,
        owner
    }
    filters(taskQuery, filter, search, owner)
    const [count, tasks] = await Promise.all([
        TaskModel.countDocuments(taskQuery),
        TaskModel.find(taskQuery)
        .sort({[sortBy]:sortOrder})
        .skip(skip)
        .limit(limit)
        .lean()
    ])
    const paginationData = calculationParsedPagination(count, page,perPage)
    return {
        tasks,
        paginationData
    }
}
export const createTask = (updateData:CreateTaskServiceParams):Promise<HydratedDocument<Task>> => {
    return  TaskModel.create(updateData)
}
type GetTaskByIdService = {
    taskId: string,
    owner: Types.ObjectId
}
export const getTaskById = async ({taskId, owner}:GetTaskByIdService):Promise<Task | undefined> => {
    if(!taskId) {
        throw createHttpError(404, 'Task id not found')
    }
    const taskById = await TaskModel.findOne({
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
export const getAllTaskAdmin = async () => {
    
}