// Actualizar model de productos con el campo Owner de un admin

import mongoose from "mongoose";
import { config } from "../src/config/config.js";
import { productsModel } from "../src/dao/models/products.models.js";
import { logger } from "../src/helpers/logger.js";

await mongoose.connect(config.mongo.url);

const updateProducts = async () => {
    try {
        const adminId = "65789b18fa282524aada4a99";
        const result = await productsModel.updateMany({}, {$set: {owner: adminId}});
        logger.informativo("result", result);
    } catch (error) {
        logger.error(error.message);
    }
};

updateProducts();