import express from "express";
import session from "express-session"; //Gestionar sesiones de usuarios
import MongoStore from "connect-mongo"; // Guardar las sesiones, actualizarlas y eliminarlas de la BD
import cookieParser from "cookie-parser";

import passport from "passport";
import { config } from "./config/config.js";
import { initializePassport } from "./config/passport.config.js";

import { __dirname } from "./utils.js"
import path from "path";

import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { connectDB } from "./config/dbConnection.js";

import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { usersRouter } from "./routes/users.routes.js";

// Manejo de Errores + en las rutas
import { errorHandler } from "./middleware/errorHandler.js"

// Manejo de logs
import { logger } from "./helpers/logger.js";

// Importar Swagger
import { swaggerSpecsProducts } from "./config/swagger.config.js"
import { swaggerSpecsCarts } from "./config/swagger.config.js"
import swaggerUI from "swagger-ui-express";

const port = process.env.PORT || 8080;
const app = express();

// MiddleWre
app.use(express.static(path.join(__dirname,"/public")));
    // Para JSON
app.use(express.json());
    // Para Forms
app.use(express.urlencoded({extended:true}));
    // Bootstrap
app.use(express.static('node_modules/bootstrap/dist'));
app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));
    // Uso de Cookies
app.use(cookieParser("claveSecreta"));

const httpServer = app.listen(port, () => {
    logger.informativo(`Servidor ejecutandose en el puerto ${port}`);
});

// Servidor de WebSocket
const io = new Server(httpServer);

// Conexión a la DB
connectDB();

// Configuración de HandleBars
app.engine('.hbs', engine({
        extname: '.hbs',
        // Para que HandleBars tome información del 3eros
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true
        }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// Configuración de session
app.use(session({
    store: MongoStore.create({
        ttl:3000,
        mongoUrl: config.mongo.url
    }),
    secret: config.server.secretSession,
    resave:true,
    saveUninitialized:true
}));

// Configurar Passport para utilizar la estrategia
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use(viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users/", usersRouter);
app.use(errorHandler)

// Definir ruta para que los usuarios accedan a la Documentación
            //Habilitar la interfaz   // Interpretar las especificaciones
app.use("/api/docs/products", swaggerUI.serve, swaggerUI.setup(swaggerSpecsProducts));
app.use("/api/docs/carts", swaggerUI.serve, swaggerUI.setup(swaggerSpecsCarts));