import createHttpError from "http-errors";
const isErrorDetails = (value) => {
    return (typeof value === 'object' &&
        value !== null &&
        "message" in value &&
        typeof value.message === 'string');
};
export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        next(err);
        return;
    }
    if (!createHttpError.isHttpError(err)) {
        res.status(500).json({
            message: 'Internal server error'
        });
        return;
    }
    const status = err.status;
    const details = err.errors;
    const errors = Array.isArray(details) ? details.filter(isErrorDetails).map((detail) => detail.message) : undefined;
    res.status(status).json({
        status,
        message: status >= 500 ? 'Internal server error' : err.message,
        ...(status < 500 && errors?.length ? { errors } : {})
    });
};
