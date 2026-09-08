import createHttpError from "http-errors";
import { TaskModel } from "../models/task.js";
import { calculationParsedPagination, Pagination } from "../utils/parsePagination.js";
import { filters } from "../utils/filtersObjects.js";
import { sortValue } from "../constants/index.js";
import { GetAllTaskParams, Task, TaskOwnerParams, GetUpdateById, CreateTaskServiceParams, GetAllTaskAdminParams, GetAllTaskBaseParams, } from "../types/task.js";
import { QueryFilter, HydratedDocument } from "mongoose";

const getAllTaskBase = async ({
    page = 1,
    perPage = 10,
    filter = {},
    sortOrder = sortValue.ASC,
    sortBy = 'createdAt',
    search = '',
    owner }: GetAllTaskBaseParams): Promise<{
        tasks: Task[],
        paginationData: Pagination
    }> => {
    const limit = perPage
    const skip = (page - 1) * perPage
    const taskQuery: QueryFilter<Task> = {}
    if (owner) {
        taskQuery.owner = owner
    }
    filters(taskQuery, filter, search)
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

export const getAllTask = async (params: GetAllTaskParams) => {
    return getAllTaskBase(params)
}
    
export const getAllTaskAdmin = (params: GetAllTaskAdminParams) => {
    return getAllTaskBase(params)
}

export const createTask = (updateData:CreateTaskServiceParams):Promise<HydratedDocument<Task>> => {
    return  TaskModel.create(updateData)
}

export const getTaskById = async ({taskId, owner}:TaskOwnerParams):Promise<HydratedDocument<Task>> => {
    const taskById = await TaskModel.findOne({
        _id: taskId,
        owner
    })
        if(!taskById) {
        throw createHttpError(404, 'Task id not found')
    }
    return taskById
}

export const updateById = async ({taskId, owner, updateData, options = {}}: GetUpdateById):Promise<HydratedDocument<Task>> => {
    const task = await TaskModel.findOneAndUpdate({
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
    if (!task) {
        throw createHttpError(404, 'Can`t update the task')
    }
    return task
}
export const deleteById = async ({taskId, owner}:TaskOwnerParams): Promise<void> => {
    const task = await TaskModel.findOneAndDelete({
        _id: taskId,
        owner
    })
    if (!task) {
        throw createHttpError(404, 'task not found')
    }
}
export const archivedTask = async ({taskId, owner}:TaskOwnerParams): Promise<HydratedDocument<Task>> => {
    const task = await TaskModel.findOneAndUpdate({
        _id: taskId,
        owner},
        { isArchived: true },
        {new: true})
    if (!task) {
        throw createHttpError(404, 'task not found')
    }
    return task
}
