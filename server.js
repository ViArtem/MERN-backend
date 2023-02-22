import express from "express";

import { createRequire } from "node:module";
import path from "path";
const require = createRequire(import.meta.url);

const cors = require("cors");

//let cookieParser = require("cookie-parser");
import { routerGet } from "./Routes/get-routers.js";

import { startHttpServer } from "./startServers/httpServer.js";
import { startSocketServer } from "./startServers/socketServer.js";

//Delete
import { routerDeleteContact } from "./Routes/deleteContact-router.js";

//Adding users
import { routerAddContact } from "./Routes/addNewContactToDatabase-router.js";

//Find users
import { routerFindContact } from "./Routes/findContact-router.js";

//Update
import { routerEditContact } from "./Routes/editContact-rorter.js";

//authorization
import { routerAuth } from "./authorization-routers/auth.js";

//regist
import { routerRegist } from "./authorization-routers/registration-router.js";

import { getHistory } from "./customMiddleware/historyForAdmin.js";

//Admin
import { adminRouter } from "./Routes/administratorHistory-router.js";

import { checkRegist } from "./customMiddleware/tokenVerification.js";

const app = express();

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

app.set("view engine", "html");

let allMiddleware = [
  bodyParser.urlencoded({ extended: true }),
  cors(),
  cookieParser(),

  express.json({
    type: ["application/json", "text/plain"],
  }),

  getHistory,

  routerAuth,
  routerRegist,
  checkRegist,

  routerGet,
  routerDeleteContact,
  routerAddContact,
  routerEditContact,
  routerFindContact,
  adminRouter,
];

allMiddleware.forEach((elm) => app.use(elm));

app.engine("html", require("ejs").renderFile);

//A function that starts a socket server. If it fails to start, the normal http server

(function startServer() {
  try {
    if (!startSocketServer()) {
      console.log(startHttpServer());
    }
  } catch (e) {
    console.log(e);
  }
})();

export { app, cors };
