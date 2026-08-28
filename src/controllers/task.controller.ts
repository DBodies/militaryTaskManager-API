import { createTask, deleteById, getTaskById, updateById,getAllTask, archivedTask } from "../service/CRUD.js"
import createHttpError from "http-errors"
import { parsePaginationParams } from "../utils/parsePagination.js"
import { FilerFields, parseFiltersFields } from "../utils/filterParsers.js"
import { parsedSort } from "../utils/parseSort.js"
import type { Request, Response } from "express"
import { AuthenticateUser } from "../middlewares/authMiddlewares.js"
import { Task, UpdatedTaskDTO } from "../types/task.js"

export const createTaskController = async (req: Request<{}, {}, UpdatedTaskDTO>, res: Response) => {
    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    const owner = req.user._id
    const updateData = req.body
    const task = await createTask({
        ...updateData,
        owner
    }
    )
    res.status(201).json({
        message: "Success",
        data: task
    })
}

export const getAllTasksController = async (req: Request<{}, {}, Task, FilerFields>, res: Response) => {
        if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    const { page, perPage } = parsePaginationParams(req.query)
    const filter = parseFiltersFields(req.query)
    const { sortOrder, sortBy, search } = parsedSort(req.query)
    if (!search) {
        return undefined
    }
    const owner = req.user._id
    const response = await getAllTask({
        page,
        perPage,
        filter,
        sortOrder,
        sortBy,
        search,
        owner
    })
    res.status(200).json({
        message: "Success",
        data: response.tasks,
        pagination: response.paginationData
    })
}

export type TaskParams = {
    taskId: string
}
declare global {
    namespace Express {
        interface Request {
            user?: AuthenticateUser
        }
    }
}
export {}
export const getTaskByIdController = async (req: Request<TaskParams, {}, {}>, res: Response) => {
    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    const { taskId } = req.params
    const owner = req.user._id
    const response = await getTaskById({
        taskId,
        owner
    })
    if (!response) {
        throw createHttpError(404, `Task with id ${taskId} not found`)
    }
    res.status(200).json({
        message: 'Successfully get a task',
        data: response,
    })
}

export const updateByIdController = async (req: Request<TaskParams, {}, UpdatedTaskDTO>, res: Response) => {
      if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
    const { taskId } = req.params
        const updateData = req.body
    const owner = req.user._id
    const response = await updateById({ taskId, owner, updateData })
    if (!response) {
        throw createHttpError(404,'Task with current ID not found')
    }
    res.status(200).json({
        message: 'Success',
        data: response
    })
} 
export const deleteByIdController = async (req: Request<TaskParams, {}, Task>, res: Response) => {
    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    const { taskId } = req.params
    const owner = req.user._id
    const response = await deleteById({taskId, owner})
        if (!response) {
        throw createHttpError(404, `Task with id ${taskId} not found`)
    }
    res.status(204).send()
}
export const archivedTaskController = async (req: Request<TaskParams, {}, Task>, res: Response) => {
    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    const { taskId } = req.params
    const owner = req.user._id
    const response = await archivedTask({taskId, owner})
    res.status(200).json({
        message: 'Successfully archived task',
        data: response
    })
}