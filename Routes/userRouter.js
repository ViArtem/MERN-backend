import { Router } from "express";
import userController from "../Controllers/userController.js";

const userRouter = new Router();

userRouter.post("/user/authorization", userController.authorizationUser);
userRouter.post("/user/registration", userController.registrationUser);

export { userRouter };
