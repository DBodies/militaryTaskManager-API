import dotenv from 'dotenv'
import { getEnvVar } from './utils/getEnvVar.js'
import express from 'express'
import cors from 'cors'
import healthRouter from './routes/health.routes.js'
import taskRouter from './routes/taskRoutWrapper.js'
import { notFoundHandler } from './middlewares/notFoundHandler.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()

export const startServer = () => {
    const app = express()
    app.use(cors())
    app.use(express.json())
const PORT = Number(getEnvVar("PORT", "5000")) 

    app.use('/api/health', healthRouter)
    app.use('/api/tasks', taskRouter)

    app.use(errorHandler)
    app.use(notFoundHandler)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
}
