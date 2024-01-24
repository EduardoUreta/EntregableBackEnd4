import path from 'path';
import { fileURLToPath } from 'url';

import bcrypt from 'bcrypt';

import multer from "multer";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crear el Hash con bcrypt
// Recibe una palabra y se le aplica el cifrado
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

// Comparar datos entre hash y password del user
export const inValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password);
};

// Validar campos obligatorios crear usuario
const checkValidFields = (user) => {
    const {first_name, email, password} = user;
    (!first_name || !email || !password) ? false : true;
};

// Filtro para subir imagenes de users, en caso de que falte un dato del body
const profileMulterFilter = (req, file, callback) => {
    if(!checkValidFields(req.body)){
        callback(null, false);
    } else {
        callback(null, true);
    };
};

// Validar campos obligatorios crear Producto
const checkValidFields2 = (product) => {
    const {title, price, code} = user;
    (!title || !price || !code) ? false : true;
};

// Filtro para subir imagenes de productos, en caso de que falte un dato del body
const profileMulterFilter2 = (req, file, callback) => {
    if(!checkValidFields2(req.body)){
        callback(null, false);
    } else {
        callback(null, true);
    };
};

// Multer

// Configurar para guardar imagenes de usuarios
const profileStorage = multer.diskStorage({
    // Donde guardar img
    destination: function(req, file, callback){
        callback(null, path.join(__dirname,"/multer/users/img"));
    },
    // Nombre de las imagenes
    filename: function(req, file, callback){
        callback(null, `${req.body.email}-perfil-${file.originalname}`)
    }
});

// Crear Uploader de las img de perfil
export const uploadProfile = multer({
    storage: profileStorage, 
    fileFilter: profileMulterFilter
});

// Configurar para guardar documentos de usuarios
const documentsStorage = multer.diskStorage({
    // Donde guardar documents
    destination: function(req, file, callback){
        callback(null, path.join(__dirname,"/multer/users/documents"));
    },
    // Nombre de los documents
    filename: function(req, file, callback){
        callback(null, `${req.user.email}-document-${file.originalname}`)
    }
});

// Crear Uploader de las img de perfil
export const uploadDocuments = multer({storage: documentsStorage});

// Configurar para guardar img de products
const imgProductsStorage = multer.diskStorage({
    // Donde guardar products
    destination: function(req, file, callback){
        callback(null, path.join(__dirname,"/multer/products/img"));
    },
    // Nombre de los img products
    filename: function(req, file, callback){
        callback(null, `${req.body.code}-product-${file.originalname}`)
    }
});

// Crear Uploader de las img de productos
export const uploadImgProducts = multer({
    storage: imgProductsStorage,
    fileFilter: profileMulterFilter2
});