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
]), UsersController.uploadUserDocuments);

// Mostrar todos los usuarios
usersRouter.get("/", UsersController.getUsers);

// Obtener usuario por ID
usersRouter.get("/:uid", UsersController.getUserById);

// Eliminar usuario desde Vista
usersRouter.delete("/:uid/delete", UsersController.deleteUser);

// Eliminar usuarios sin conexión
usersRouter.delete("/delete", UsersController.deleteUsers);

// Ver, modificar Role y eliminar en las vistas
usersRouter.get("/adminUserManage", isAuth, checkRole(["admin"]), UsersController.getUsersByAdmin);