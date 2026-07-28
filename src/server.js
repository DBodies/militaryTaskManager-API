import dotenv from 'dotenv'
import { getEnvVar } from './utils/getEnvVar.js'
import express from 'express'
import cors from 'cors'
import taskRouter from './routes/taskRoutWrapper.js'
import authRouter from './routes/auth.routes.js'
import { notFoundHandler } from './middlewares/notFoundHandler.js'
import { errorHandler } from './middlewares/errorHandler.js'
import userRoute from './routes/user.routes.js'
import { authLimiter } from './utils/rateLimiter.js'
import helmet from 'helmet'
import { corsOptions } from './utils/corsOptions.js'

dotenv.config()

export const startServer = () => {
    const app = express()

    app.use(cors(corsOptions))
    app.use(express.json())
    const PORT = Number(getEnvVar("PORT", "5000")) 
    app.use(helmet())

    app.use('/api/auth', authLimiter,authRouter)
    app.use('/api/tasks', taskRouter)
    app.use('/api/users', userRoute)

    app.use(notFoundHandler)
    app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
}
