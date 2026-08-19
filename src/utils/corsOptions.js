import { getEnvVar } from "./getEnvVar.js";

export const corsOptions = {
    origin: function (origin, cb) {
        const allowedOrigin = getEnvVar('ALLOWED_ORIGIN')
        if (!origin || origin === allowedOrigin) {
            return cb(null, true)
        }
        return cb(new Error('Not allowed by CORS'))
    }
}

