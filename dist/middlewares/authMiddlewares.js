import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { getEnvVar } from "../utils/getEnvVar.js";
import jwt from 'jsonwebtoken';
import { isAccessTokenPayload } from "../types/auth.js";
export const authMiddleware = async (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        next(createHttpError(401, 'Authorization header is missing'));
        return;
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Please provide the correct bearer token'));
        return;
    }
    let payload;
    try {
        payload = jwt.verify(token, getEnvVar('JWT_SECRET'));
    }
    catch (err) {
        next(createHttpError(401, "Invalid or expired token"));
        return;
    }
    if (!isAccessTokenPayload(payload)) {
        next(createHttpError(401, 'Provide the correct payload'));
        return;
    }
    try {
        const user = await User.findById(payload.userId);
        if (!user) {
            next(createHttpError(401, 'User is absent'));
            return;
        }
        req.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }
    catch (err) {
        next(err);
        return;
    }
    next();
};
