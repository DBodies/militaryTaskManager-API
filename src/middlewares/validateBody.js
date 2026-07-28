import createHttpError from "http-errors"

export const validateBody = (schema) => async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body, {
            abortEarly: false
        })
        req.body = value
        next()
    } catch (err) {
        const error = createHttpError(400, 'Bad Request', {
            errors: err.details
        })
        next(error)
    }
}