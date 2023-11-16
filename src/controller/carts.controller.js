// Importar Capa de Servicio
import { CartsService } from "../service/carts.service.js";

export class CartsController{
    // Obtener Carritos
    static getCarts = async (req, res) => {
        try {
            const carts = CartsService.getCarts();
            res.json({data:carts});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Obtener Carrito por ID
    static getCartById = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.getCartById(cartId);
            res.json({status:"success", data: cart});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Crear Carrito
    static createCart = async (req, res) => {
        try {
            const cartCreated = await CartsService.createCart();
            res.json({status:"success",data: cartCreated});
        } catch (error) {
            res.json({status:"error",error:error.message});
        }
    };

    // Agregar producto en carrito
    static addProductInCart = async (req, res) => {
        try {
            const {cid:cartId, pid:productId} = req.params;
            const cart = await CartsService.getCartById(cartId);   
            const result = await CartsService.addProductInCart(cartId, productId);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Eliminar Producto de un carrito
    static deteleProduct = async (req, res) => {
        try {
            const {cid: cartId, pid: productId} = req.params;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.deleteProduct(cartId, productId);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Eliminar un Carrito
    static deleteCart = async (req, res) => {
        try {
            const {cid: cartId} = req.params;
            const result = await CartsService.deleteCart(cartId);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Actualizar Cantidad de Productos en el Carrito
    static updateProductInCart = async (req, res) => {
        try {
            const {cid: cartId, pid: productId} = req.params;
            const {newQuantity} = req.body;
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.updateProductCart(cartId, productId, newQuantity);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    };


};