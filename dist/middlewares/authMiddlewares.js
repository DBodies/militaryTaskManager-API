import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { getEnvVar } from "../utils/getEnvVar.js";
import jwt from 'jsonwebtoken';
export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        next(createHttpError(401, 'Authorization header is missing'));
        return;
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Authorization header must be Bearer token'));
        return;
    }
    try {
        const payload = jwt.verify(token, getEnvVar('JWT_SECRET'));
        const user = await User.findById(payload.userId);
        if (!user) {
            next(createHttpError(401, 'User not found'));
            return;
        }
        req.user = user;
        next();
    }
    catch {
        next(createHttpError(401, 'Invalid or expired token'));
    }
};
