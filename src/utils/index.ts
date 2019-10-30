import { Router, Request, Response, NextFunction } from "express";

export type Wrapper = ((router: Router) => void);

export const applyErrorHandlers = (
    errorHandlerWrappers: Wrapper[],
    router: Router
) => {
    for (const wrapper of errorHandlerWrappers) {
        wrapper(router);
    }
};

export type Handler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

export type Route = {
    path: string;
    method: string;
    handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
    for (const route of routes) {
        const { method, path, handler } = route;
        (router as any)[method](path, handler);
    }
};
