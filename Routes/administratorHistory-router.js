import { Router } from "express";
//import { router } from "./find.js";
const adminRouter = Router();
import { getAllAdministratorHistory } from "../historyDatabaseFunction/getAllHistory.js";

adminRouter.post("/gethistory", async (req, res) => {
  try {
    if (req.body.role == "admin") {
      res.send(await getAllAdministratorHistory());
    } else res.status(404).json({ access: "You are not an administrator" });
  } catch (error) {
    res.status(error.status).send(JSON.stringify(`Error ${error.message}`));
  }
});

export { adminRouter };
