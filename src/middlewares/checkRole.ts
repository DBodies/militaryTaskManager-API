import createHttpError from "http-errors"
import { UserRole } from "../types/user.js"
import {Request, Response, NextFunction} from 'express'


export const checkRoles = (...roles:UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            next(createHttpError(401, 'Unauthorized'))
            return
        }
        if (!roles.includes(req.user.role)) {
           return next(createHttpError(403, 'Forbidden'))
        }
        next()
    }
}