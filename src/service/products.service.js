import { productsDao } from "../dao/index.js";

export class ProductsService{

    // Obtener Productos
    static getProducts(){
        return productsDao.getProducts();
    };

    // Crear Productos
    static createProducts(){
        return productsDao.createProduct();
    };

    // Obtener Producto Por ID
    static getProductById(){
        return productsDao.getProductById();
    };

    // Obtener Productos con Paginate
    static getProductsPaginate(){
        return productsDao.getProductsPaginate();
    };
}