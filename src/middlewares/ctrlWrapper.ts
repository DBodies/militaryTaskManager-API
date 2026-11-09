import type { Request, Response, RequestHandler } from 'express';

export const ctrlWrapper = <Params, ResBody, ReqBody, ReqQuery>(
    controller: (
        req: Request<Params, ResBody, ReqBody, ReqQuery>,
        res: Response<ResBody>
    ) => Promise<void>
): RequestHandler<Params, ResBody, ReqBody, ReqQuery> => {
    return async (req, res, next) => {
        try {
            await controller(req, res);
        } catch (error: unknown) {
            next(error);
        }
    };
};