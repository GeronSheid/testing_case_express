import { Router } from "express";
import * as userController from "./user.controller.js";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", userController.createUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;