import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";

export const productsRouter = Router();

// Obtener Productos
productsRouter.get("/", ProductsController.getProducts);

// Crear Productos
productsRouter.post("/", ProductsController.createProduct);

// Obtener Producto por ID
productsRouter.get("/:pid", ProductsController.getProductById);
