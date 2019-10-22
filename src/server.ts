// /*---------------------------------------------------------------------------------------------
//  *  Copyright (c) Microsoft Corporation. All rights reserved.
//  *  Licensed under the MIT License. See License.txt in the project root for license information.
//  *--------------------------------------------------------------------------------------------*/

// 'use strict';

// const express = require('express');

// // Constants
// const PORT = 3000;
// const HOST = '0.0.0.0';

// // App
// const app = express();
// app.get('/', (req, res) => {
// 	res.send('Hello remote world!\n');
// });

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);

import http from "http";
import express from 'express';
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const HOST = '0.0.0.0';
const server = http.createServer(router);

server.listen(PORT, () =>
    console.log(`Server is running http://${HOST}:${PORT}...`)
);
