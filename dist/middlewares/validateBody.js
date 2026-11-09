import createHttpError from "http-errors";
import Joi from "joi";
export const validateBody = (schema) => async (req, _res, next) => {
    try {
        const value = await schema.validateAsync(req.body, {
            abortEarly: false
        });
        req.body = value;
        next();
    }
    catch (err) {
        if (Joi.isError(err)) {
            next(createHttpError(400, 'Bad Request', {
                errors: err.details
            }));
            return;
        }
        next(err);
    }
};
