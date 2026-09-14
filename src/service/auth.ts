import createHttpError from "http-errors"
import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getEnvVar } from "../utils/getEnvVar.js"
import { LoginDTO, RegisterDTO } from "../types/task.js"
import { UserInterface, UserLoginResult, SafeUser } from "../types/user.js"

export const register = async (payload: RegisterDTO): Promise<UserInterface> => {
const { name, email, password } = payload
    
    const user = await User.findOne({email})
    if (user) {
        throw createHttpError(409, 'Email is used ')
    }
    const  encryptedPassword = await bcrypt.hash(password, 10)
    return await User.create({
        name,
        email,
        password: encryptedPassword
    })
}
export const login = async (payload: LoginDTO): Promise<UserLoginResult> => {
    const { email, password } = payload
    const user = await User.findOne({ email })
    if (!user) {
        throw createHttpError(401, 'Email or password is wrong')
    }
    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
        throw createHttpError(401, 'Email or password is wrong')
    }
    const accessToken = jwt.sign({
        userId: user._id,
        role: user.role
    },
        getEnvVar('JWT_SECRET'), {
        expiresIn: getEnvVar('JWT_EXPIRES_IN')
    })

    const safeUser: SafeUser = {
        name: user.name,
        email: user.email
    }
    return {
        user: safeUser,
        accessToken
    }
}