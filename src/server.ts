import "reflect-metadata";
import { createConnection } from "typeorm";
import * as bodyParser from "body-parser";

import http from "http";
import express from 'express';
import { applyErrorHandlers, applyRoutes } from "./utils";
import errorHandlers from "./errorHandlers";
import routes from "./services";

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

createConnection().then(async connection => {

    const router = express();

    router.use(bodyParser.json());
    applyErrorHandlers(errorHandlers, router);

    applyRoutes(routes, router);

    const { PORT = 3000 } = process.env;
    const HOST = '0.0.0.0';
    const server = http.createServer(router);

    server.listen(PORT, () =>
        console.log(`Server is running http://${HOST}:${PORT}...`)
    );

}).catch(error => console.log(error));
