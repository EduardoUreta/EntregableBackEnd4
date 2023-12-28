import { __dirname } from "../utils.js";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

const swaggerOptionsProducts = {
    definition:{
        openapi:"3.0.1",
        info:{
            title: "Documentacion api de e-commerce",
            version:"1.0.0",
            description:"Definición de endpoints para la API de e-commerce"
        },
    },
    //archivos que contienen la documentación de las rutas
    apis:[`${path.join(__dirname,"/docs/products/products.yaml")}`],
};  

const swaggerOptionsCarts = {
    definition:{
        openapi:"3.0.1",
        info:{
            title: "Documentacion api de e-commerce",
            version:"1.0.0",
            description:"Definición de endpoints para la API de e-commerce"
        },
    },
    //archivos que contienen la documentación de las rutas
    apis:[`${path.join(__dirname,"/docs/carts/carts.yaml")}`],
}; 

//crear una variable que interpreta las opciones para trabajar con swagger
export const swaggerSpecsProducts = swaggerJsDoc(swaggerOptionsProducts);
export const swaggerSpecsCarts = swaggerJsDoc(swaggerOptionsCarts);