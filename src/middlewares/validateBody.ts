import { NextFunction,Request,Response } from "express"
import createHttpError from "http-errors"
import Joi, { ObjectSchema } from "joi"

export const validateBody = (schema:ObjectSchema) => async (req:Request, _res:Response, next:NextFunction):Promise<void> => {
    try {
        const value = await schema.validateAsync(req.body, {
            abortEarly: false
        })
        req.body = value
        next()
    } catch (err: unknown) {
        if (Joi.isError(err)) {
            next(createHttpError(400, 'Bad Request', {
                errors:err.details
            }))
            return
        }
        next(err)
    }
}