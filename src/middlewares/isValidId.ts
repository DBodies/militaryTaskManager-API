 import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
import mongoose, { isValidObjectId } from "mongoose"

export const isValidId =  (req:Request,res:Response,next:NextFunction) => {
    const { taskId } = req.params
    if (!isValidObjectId(taskId)) {
        return  next(createHttpError(400, 'Invalid task id'))
    }
    next()
}