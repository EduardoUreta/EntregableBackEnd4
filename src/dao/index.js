import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js";
import { UsersManagerMongo } from "./mongo/usersManagerMongo.js";

// Capa de persistencia

export const cartsDao = new CartsManagerMongo();
export const productsDao = new ProductsManagerMongo();
export const usersDao = new UsersManagerMongo();

