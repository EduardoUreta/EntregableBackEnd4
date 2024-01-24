import { Router } from "express";
import { checkRole, isAuth } from "../middleware/auth.js";
import { UsersController } from "../controller/users.controller.js";
import { uploadDocuments } from "../utils.js";

export const usersRouter = Router();

usersRouter.put("/premium/:uid", isAuth, checkRole(["admin"]), UsersController.modifyRole);

usersRouter.post("/:uid/documents", uploadDocuments.fields([
    {name: "Identificacion", maxCount: 1},
    {name: "Domicilio", maxCount: 1},
    {name: "EECC", maxCount: 1}
]), UsersController.uploadUserDocuments)