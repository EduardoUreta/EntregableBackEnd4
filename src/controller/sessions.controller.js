import { usersDao } from "../dao/index.js";
import {generateEmailToken, sendChangePassEmail, verifyEmailToken} from "../helpers/email.js";
import { createHash, inValidPassword } from "../utils.js";

export class SessionsController{
    static redirectLogin = async(req,res) => {
        // res.render("loginView",{message:"Usuario registrado correctamente"});
        res.redirect("/login");
    };

    static failSignup = (req,res) => {
        res.render("signupView", {error:"No se pudo registrar el usuario"});
    };

    static redirectProfile = async(req,res)=>{
        res.redirect("/profile");
    };

    static failLogin = (req,res) => {
        res.render("loginView",{error:"No se pudo iniciar sesion para este usuario"});
    };

    static forgotPassword = async (req, res) => {
        const {email} = req.body;
        // Verificar que el usuario exista
        try {
            const userExists = await usersDao.getUserByEmail(email);
            // Generar Token de enlace
            const emailToken = generateEmailToken(email, 5 * 60);7
            await sendChangePassEmail(req, email, emailToken);
            res.send(`Se envio enlance al correo. <a href="/">Volver al Login</a>`)
        } catch (error) {
            res.json({status:"Error", message: error.message})
        }
    };

    static resetPassword = async (req, res) => {
        try {
            const token = req.query.token;
            const {newPassword} = req.body;
            const validEmail = verifyEmailToken(token);
            if(!validEmail){
                return res.send(`El enlace ya no es válido, genera un nuevo
                enlace <a href="/forgot-password">aquí</a>`)
            }
            const user = await usersDao.getUserByEmail(validEmail);
            if(!user){
                return res.send(`Operación no Valida`)
            }
            if(inValidPassword(newPassword, user)){
                return res.render("resetPassView", {error:"Contraseña Inválida", token})
            }
            const userData = {
                ...user,
                password: createHash(newPassword)
            };

            await usersDao.updateUser(user._id, userData);
            res.render("loginView", {message:"Contraseña Actualizada"});
        } catch (error) {
            res.json({status:"Error", message: error.message})
        }
    }

};

