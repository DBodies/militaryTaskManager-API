import { Request, Response } from "express"

export const notFoundHandler = async ( req:Request, res:Response):Promise<void> => {
    res.status(404).json({
    message: 'Route not found'
})
}