import mongoose from "mongoose"
import { getEnvVar } from "../utils/getEnvVar.js"
import dotenv from 'dotenv'
dotenv.config()

export const initMongoDB = async () => {
    try {
        const name = getEnvVar("NAME_DB")
        const password = getEnvVar("PASSWORD_DB")
        const url = getEnvVar("URL_DB")
        const folder = getEnvVar("FOLDER_DB")
        await mongoose.connect(`mongodb+srv://${name}:${password}@${url}/${folder}?retryWrites=true&w=majority&appName=ForEducation`)
        console.log('Mongo connection successfully established!')
    } catch (err) {
        console.log(err)
    throw err
    }
}
