import { NextFunction, Response, Request } from "express"
import createHttpError from "http-errors"

type errorDetails = {
    message: string
}

const isErrorDetails = (value:unknown): value is errorDetails => {
return (
     typeof value === 'object' && 
     value !== null &&
     "message" in value &&
     typeof  value.message === 'string'
)
}

export const errorHandler = (err:unknown,req:Request,res:Response,next:NextFunction):void => {
    if(res.headersSent) {
        next(err)
        return
    }
    if(!createHttpError.isHttpError(err)) {
        res.status(500).json({
            message: 'Internal server error'
        })
        return
    }
    const status = err.status
    const details: unknown = err.errors

    const errors = Array.isArray(details) ? details.filter(isErrorDetails).map((detail) => detail.message) : undefined
    res.status(status).json({
        status,
        message: status >= 500 ? 'Internal server error' : err.message,
        ...(status < 500 && errors?.length ? {errors} : {} )
    })
}