import express from "express";
import { createRequire } from "node:module";
import cors from "cors";

const require = createRequire(import.meta.url);
const app = express();

//custom modules
import { startSocketServer } from "./startServers/socketServer.js";
import { startHttpServer } from "./startServers/httpServer.js";
import { contactRouter } from "./routes/contactRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { checkToken } from "./middleware/tokenVerification.js";
import { adminRouter } from "./routes/adminRouter.js";
import { setHistory } from "./middleware/setHistory.js";
import errorMiddleware from "./middleware/errors.js";
//
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const allMiddleware = [
  bodyParser.urlencoded({ extended: true }),
  cors(),
  cookieParser(),
  express.json({
    type: ["application/json", "text/plain"],
  }),

  userRouter,
  checkToken,
  adminRouter,
  setHistory,
  contactRouter,
  errorMiddleware,
];

allMiddleware.forEach((elm) => app.use(elm));

// The function that starts the server
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
