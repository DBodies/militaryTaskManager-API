import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getEnvVar } from "../utils/getEnvVar.js";
export const register = async (payload) => {
    const { name, email, password } = payload;
    const user = await User.findOne({ email });
    if (user) {
        throw createHttpError(409, 'Email is used ');
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    return await User.create({
        name,
        email,
        password: encryptedPassword
    });
};
export const login = async (payload) => {
    const { email, password } = payload;
    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(401, 'Email or password is wrong');
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        throw createHttpError(401, 'Email or password is wrong');
    }
    const expiresIn = Number(getEnvVar('JWT_EXPIRES_IN'));
    if (!Number.isSafeInteger(expiresIn) || expiresIn <= 0) {
        throw new Error('JWT_EXPIRES_IN must be a positive integer in seconds');
    }
    const accessToken = jwt.sign({
        userId: user._id,
        role: user.role
    }, getEnvVar('JWT_SECRET'), { expiresIn });
    const safeUser = {
        name: user.name,
        email: user.email,
        role: user.role
    };
    return {
        user: safeUser,
        accessToken
    };
};
