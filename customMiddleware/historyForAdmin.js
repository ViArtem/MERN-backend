// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
// let jwt = require("jsonwebtoken");
import { addNewEventToDatabase } from "../historyDatabaseFunction/addActionsHistoryToDatabase.js";

//time generation
Date.prototype.timeNow = function () {
  return (
    (this.getHours() < 10 ? "0" : "") +
    this.getHours() +
    ":" +
    (this.getMinutes() < 10 ? "0" : "") +
    this.getMinutes() +
    ":" +
    (this.getSeconds() < 10 ? "0" : "") +
    this.getSeconds()
  );
};

Date.prototype.today = function () {
  return (
    (this.getDate() < 10 ? "0" : "") +
    this.getDate() +
    "/" +
    (this.getMonth() + 1 < 10 ? "0" : "") +
    (this.getMonth() + 1) +
    "/" +
    this.getFullYear()
  );
};

//The function intercepts http requests and adds them to the database
function getHistory(req, res, next) {
  try {
    if (req.body.action) {
      addNewEventToDatabase(
        `Http: ${req.body.action} ${
          req.body.fullName
        } : ${new Date().timeNow()}`
      );
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
}

export { getHistory };
