import { Router } from "express";
import userController from "../controllers/userController.js";

const userRouter = new Router();

userRouter.post("/user/authorization", userController.authorizationUser);
userRouter.post("/user/registration", userController.registrationUser);
userRouter.post("/user/refresh", userController.refresh);

export { userRouter };
