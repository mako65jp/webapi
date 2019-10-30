import { Request, Response } from "express";
import { Route } from "../utils";

import searchRoutes from "./search/routes";
import { Routes } from "./database/routes";

const databaseRoutes: Route[] = Routes.map((route: { route: any; method: any; controller: any; action: string; }) => {
    return {
        path: route.route,
        method: route.method,
        handler: async (req: Request, res: Response) => {
            const result = (new (route.controller))[route.action](req, res);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        }
    };
});

export default [...searchRoutes, ...databaseRoutes];
