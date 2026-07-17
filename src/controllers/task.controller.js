import { isValidObjectId } from "mongoose"
import { Task } from "../models/task.js"
import { createTask, deleteById, getTaskById, updateById, upsertById,getAllTask, archivedTask } from "../service/CRUD.js"
import createHttpError from "http-errors"
import { calculationParsedPagination, parsePaginationParams } from "../utils/parsePagination.js"
import { parseFiltersFields } from "../utils/filterParsers.js"
import { parsedSort } from "../utils/parseSort.js"

export const createTaskController = async (req,res) => {
const task = await createTask(req.body)
    res.status(201).json({
        message: "Success",
        data: task
    })
}
export const getAllTasksController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query)
    const filter = parseFiltersFields(req.query)
    const {sortOrder, sortBy,search} = parsedSort(req.query)
    console.log(filter)
    const response = await getAllTask({
        page,
        perPage,
        filter,
        sortOrder,
        sortBy,
        search
    })
    res.status(200).json({
        message: "Success",
        data: response.tasks,
        pagination: response.paginationData
    })
}
export const getTaskByIdController = async (req, res) => {
    const { taskId } = req.params
    const response = await getTaskById(taskId)
    if (!response) {
        throw createHttpError(404, `Task with id ${taskId} not found`)
    }
    res.status(200).json({
        message: 'Successfully get a task',
        data: response,
    })
}
export const upsertByIdController = async (req, res, next) => {
    const { taskId } = req.params
    if(!taskId) {
    throw createHttpError(400, `Invalid task ID - ${taskId}`)
    }
    const response = await upsertById(taskId, req.body, { upsert: true })
    const status = response.isNew ? 201 : 200
    res.status(status).json({
        message: "Successfully",
        data:response
    })
}
export const updateByIdController = async (req, res, next) => {
    const { taskId } = req.params
    if (!taskId) {
        next(createHttpError(400, `Task with ID ${taskId} wasn't found`))
    }
    const response = await updateById(taskId, req.body)
    if (!response) {
        throw createHttpError(404,'Task with current ID not found')
    }
    res.status(200).json({
        message: 'Success',
        data: response
    })
} 
export const deleteByIdController = async (req, res) => {
    const { taskId } = req.params
    const response = await deleteById(taskId)
        if (!response) {
        throw createHttpError(404, `Task with id ${taskId} not found`)
    }
    res.status(204).json({
        message: 'Successfully deleted'
    })
}
export const archivedTaskController = async (req, res) => {
    const {taskId} = req.params
    const response = await archivedTask(taskId)
    res.status(200).json({
        message: 'Successfully archived task',
        data: response
    })
}