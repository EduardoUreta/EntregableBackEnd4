import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";
import { SessionsController } from "../controller/sessions.controller.js";
import { usersDao } from "../dao/index.js";
import { uploadProfile } from "../utils.js";

export const sessionsRouter = Router();

// Rutas Registros
sessionsRouter.post("/signup", uploadProfile.single("avatar"), 
    passport.authenticate("signupLocalStrategy",{
    failureRedirect:"/api/sessions/fail-signup"
}) , SessionsController.redirectLogin);

// Ruta Registro Fail
sessionsRouter.get("/fail-signup", SessionsController.failSignup);

// Ruta Solicitud Registro GitHub
sessionsRouter.get("/signup-github", passport.authenticate("signupGithubStrategy"));

// Ruta Callback Github
sessionsRouter.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy", {
    failureRedirect: "/api/sessions/fail-signup"
}), SessionsController.redirectProfile);

// Rutas Login
sessionsRouter.post("/login", passport.authenticate("loginLocalStrategy",{
    failureRedirect:"/api/sessions/fail-login"
}) , SessionsController.redirectProfile);

// Ruta Login Fail
sessionsRouter.get("/fail-login", SessionsController.failLogin);

// Ruta Logout
sessionsRouter.get("/logout", async(req,res)=>{
    try {
        const user = {...req.user};
        req.session.destroy((err)=>{
            if(err) return res.render("profileView",{error:"No se pudo cerrar la sesion"});

            // Modificar Last Conection
            user.last_conection = new Date();
            usersDao.updateUser(user._id, user);

            res.redirect("/");
        });
    } catch (error) {
        res.render("signupView",{error:"No se pudo cerrar sesión"});
    }
});

// Ruta Reestablecer Contraseña
sessionsRouter.post("/forgot-password", SessionsController.forgotPassword);

sessionsRouter.post("/reset-password", SessionsController.resetPassword);