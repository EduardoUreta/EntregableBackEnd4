import { Router } from "express";
import { checkRole } from "../middleware/auth.js";
import { UsersController } from "../controller/users.controller.js";

export const usersRouter = Router();

usersRouter.put("/premium/:uid", checkRole(["admin"]), UsersController.modifyRole);