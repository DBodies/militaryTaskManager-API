import createHttpError from "http-errors";
export const checkRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            next(createHttpError(401, 'Unauthorized'));
            return;
        }
        if (!roles.includes(req.user.role)) {
            return next(createHttpError(403, 'Forbidden'));
        }
        next();
    };
};
