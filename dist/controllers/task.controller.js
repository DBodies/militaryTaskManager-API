import { createTask, deleteById, getTaskById, updateById, getAllTask, archivedTask } from "../service/CRUD.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePagination.js";
import { parseFiltersFields } from "../utils/filterParsers.js";
import { parsedSort } from "../utils/parseSort.js";
export const createTaskController = async (req, res) => {
    const owner = req.user._id;
    const updateData = req.body;
    const task = await createTask({
        ...updateData,
        owner
    });
    res.status(201).json({
        message: "Success",
        data: task
    });
};
export const getAllTasksController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const filter = parseFiltersFields(req.query);
    const { sortOrder, sortBy, search } = parsedSort(req.query);
    const owner = req.user._id;
    const response = await getAllTask({
        page,
        perPage,
        filter,
        sortOrder,
        sortBy,
        search,
        owner
    });
    res.status(200).json({
        message: "Success",
        data: response.tasks,
        pagination: response.paginationData
    });
};
export const getTaskByIdController = async (req, res) => {
    const { taskId } = req.params;
    const owner = req.user._id;
    const response = await getTaskById({
        taskId,
        owner
    });
    if (!response) {
        throw createHttpError(404, `Task with id ${taskId} not found`);
    }
    res.status(200).json({
        message: 'Successfully get a task',
        data: response,
    });
};
export const updateByIdController = async (req, res) => {
    const { taskId } = req.params;
    const owner = req.user._id;
    const updateData = req.body;
    const response = await updateById({ taskId, owner, updateData });
    if (!response) {
        throw createHttpError(404, 'Task with current ID not found');
    }
    res.status(200).json({
        message: 'Success',
        data: response
    });
};
export const deleteByIdController = async (req, res) => {
    const { taskId } = req.params;
    const owner = req.user._id;
    const response = await deleteById({ taskId, owner });
    if (!response) {
        throw createHttpError(404, `Task with id ${taskId} not found`);
    }
    res.status(204).send();
};
export const archivedTaskController = async (req, res) => {
    const { taskId } = req.params;
    const owner = req.user._id;
    const response = await archivedTask({ taskId, owner });
    res.status(200).json({
        message: 'Successfully archived task',
        data: response
    });
};
