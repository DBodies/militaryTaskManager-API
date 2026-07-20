import dotenv from 'dotenv'
import { getEnvVar } from './utils/getEnvVar.js'
import express from 'express'
import cors from 'cors'
import taskRouter from './routes/taskRoutWrapper.js'
import authRouter from './routes/auth.routes.js'
import { notFoundHandler } from './middlewares/notFoundHandler.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()

export const startServer = () => {
    const app = express()
    app.use(cors())
    app.use(express.json())
const PORT = Number(getEnvVar("PORT", "5000")) 

    app.use('/api/auth', authRouter)
    app.use('/api/tasks', taskRouter)

    app.use(errorHandler)
    app.use(notFoundHandler)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
}
