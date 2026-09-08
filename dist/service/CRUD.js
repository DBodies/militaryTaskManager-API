import createHttpError from "http-errors";
import { TaskModel } from "../models/task.js";
import { calculationParsedPagination } from "../utils/parsePagination.js";
import { filters } from "../utils/filtersObjects.js";
import { sortValue } from "../constants/index.js";
const getAllTaskBase = async ({ page = 1, perPage = 10, filter = {}, sortOrder = sortValue.ASC, sortBy = 'createdAt', search = '', owner }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const taskQuery = {
        owner
    };
    filters(taskQuery, filter, search);
    const [count, tasks] = await Promise.all([
        TaskModel.countDocuments(taskQuery),
        TaskModel.find(taskQuery)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean()
    ]);
    const paginationData = calculationParsedPagination(count, page, perPage);
    return {
        tasks,
        paginationData
    };
};
export const getAllTask = async (params) => {
    return getAllTaskBase(params);
};
export const getAllTaskAdminParams = (params) => {
    return getAllTaskBase(params);
};
export const createTask = (updateData) => {
    return TaskModel.create(updateData);
};
export const getTaskById = async ({ taskId, owner }) => {
    const taskById = await TaskModel.findOne({
        _id: taskId,
        owner
    });
    if (!taskById) {
        throw createHttpError(404, 'Task id not found');
    }
    return taskById;
};
export const updateById = async ({ taskId, owner, updateData, options = {} }) => {
    const task = await TaskModel.findOneAndUpdate({
        _id: taskId,
        owner
    }, updateData, {
        new: true,
        runValidators: true,
        ...options
    });
    if (!task) {
        throw createHttpError(404, 'Can`t update the task');
    }
    return task;
};
export const deleteById = async ({ taskId, owner }) => {
    const task = await TaskModel.findOneAndDelete({
        _id: taskId,
        owner
    });
    if (!task) {
        throw createHttpError(404, 'task not found');
    }
};
export const archivedTask = async ({ taskId, owner }) => {
    const task = await TaskModel.findOneAndUpdate({
        _id: taskId,
        owner
    }, { isArchived: true }, { new: true });
    if (!task) {
        throw createHttpError(404, 'task not found');
    }
    return task;
};
