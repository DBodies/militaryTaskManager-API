import { NextFunction, Request, RequestHandler, Response } from "express"

type controller = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>

export const ctrlWrapper = (controller:controller):RequestHandler => {
    return async (req:Request,res:Response,next:NextFunction):Promise<void> => {
        try {
            await controller(req,res,next)
        } catch (err:unknown) {
            next(err)
        }
    }
}