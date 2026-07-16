import createHttpError from "http-errors"
import mongoose, { isValidObjectId } from "mongoose"

export const isValidId =  (req,res,next) => {
    const { taskId } = req.params
    if (!isValidObjectId(taskId)) {
        return  next(createHttpError(400, 'Invalid task id'))
    }
    next()
}