import createHttpError from "http-errors"
import { User } from "../models/user.js"
import bcrypt from 'bcrypt'

export const register = async (payload) => {
    const {name, email,password} = payload
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
export const login = async (payload) => {
    const { email, password } = payload
    const userByEmail = await User.findOne({email})
    if (!userByEmail) {
        throw createHttpError(401, 'Email or password is wrong')
    }
    const comparePassword = await bcrypt.compare(password, userByEmail.password)
    if (!comparePassword) {
    throw createHttpError(401, 'Email or password is wrong')
    }
    return UserByEmail
}