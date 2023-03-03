import { Router } from "express";
import adminController from "../Controllers/adminController.js";

const adminRouter = new Router();

adminRouter.post("/admin/history", adminController.getAllHistory);

export { adminRouter };
