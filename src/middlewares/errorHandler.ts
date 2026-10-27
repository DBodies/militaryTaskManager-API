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
     typeof typeof value.message === 'string'
)
}

const errorHandler = (err:unknown,req:Request,res:Response,next:NextFunction):void => {
    if(res.headersSent) {
        next(err)
        return
    }
    if(!createHttpError.isHttpError(err)) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
    const status = err.status
    const details = err.message
}