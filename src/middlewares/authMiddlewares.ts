import createHttpError from "http-errors"
import { User } from "../models/user.js"
import { getEnvVar } from "../utils/getEnvVar.js"
import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from "express"
import type { Types } from "mongoose";
import { UserRole } from "../types/user.js"
import { string } from "joi"
import { create } from "node:domain"

export type AuthenticateUser = {
    _id: Types.ObjectId,
    name: string,
    email: string,
    role: UserRole
}


export const authMiddleware = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        next(createHttpError(401, 'Authorization header is missing'))
        return
    }
    const [bearer, token] = authHeader.split(' ')
    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Please provide the correct bearer token'))
        return
    }
    let payload: string | jwt.JwtPayload
    try {
        payload = jwt.verify(token, getEnvVar('JWT_SECRET'))
        
    } catch (err) {
        next(createHttpError(401, 'Token is missing or expired'))
        return
    }
    if (typeof payload !== 'object' || typeof payload.userId !== 'string') {
        next(createHttpError(401, 'Provide the correct payload'))
        return
    }
    try {
        const user = await User.findById(payload.userId)
        if (!user) {
            next(createHttpError(401, 'User is absent'))
            return
        }
        req.user = {
            _id: payload._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    } catch (err) {
        next(err)
        return
    }
    next()
}