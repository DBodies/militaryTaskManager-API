import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 250,
    message: "Too Many Requests",
    statusCode: 429,
    standardHeaders: 'draft-7',
    legacyHeaders: false
})