import { Router } from "express";
import { productsService } from "../mongo/index.js";

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    
    const result = await productsService.getProducts()
    res.json({message: "Lista de productos", data: result});
});

productsRouter.post("/", async (req, res)=>{
    try {
        const productInfo = req.body;
        const result = await productsService.createProduct(productInfo);
        res.json({status:"success", result});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

productsRouter.get("/:pid", async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductById(productId);
        res.json({message:"endpoint para obtener un producto", data:product});
    } catch (error) {
        res.json({status:"error",message:error.message});
    }
});
