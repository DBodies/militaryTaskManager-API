import { HttpError } from "http-error"

export const errorHandler = async (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.status(err.status || 500).json({
            status: err.status,
            message: err.message,
        })
        return
    }
    res.status(500).json({
        status: err.status || 500,
        message:  err.message || 'Internal Server Error',
    })
}