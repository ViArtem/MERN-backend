import { Router } from "express";
import adminController from "../Controllers/adminController.js";

const adminRouter = new Router();

adminRouter.get("/admin/history", adminController.getAllHistory);

export { adminRouter };
