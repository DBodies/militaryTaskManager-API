import { NextFunction, Response, Request } from "express"
import createHttpError from "http-errors"

type ErrorDetail = {
    message: string
}

const isErrorDetail = (value: unknown): value is ErrorDetail => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'message' in value &&
        typeof value.message === 'string'
    )
}