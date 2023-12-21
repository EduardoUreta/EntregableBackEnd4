import { config } from "../config/config.js"
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodeEmailer.js";
import logger from "winston";

// Generar Token para definir expiración de link
export const generateEmailToken = (email, expireTime) => {
    // Crear Token con: Correo, secretToken, duración
    const token = jwt.sign({email}, config.gmail.secretToken, {expiresIn: expireTime});
    return token;
};

// Enviar token por una ruta
export const sendChangePassEmail = async (req, userEmail, token) => {
    const domain = `${req.protocol}://${req.get('host')}`;
    // Enlace para Prod y Dev con token
    const link = `${domain}/reset-password?token=${token}`;

    // Enviar correo con enlace
    await transporter.sendMail({
        from: "Almacén",
        to: userEmail,
        subject: "Reestablecer Contraseña",
        html:`
            <div>
                <h2>Hola!</h2>
                <p>Solicitaste reestablecer contraseña</p>
                <p>Haz click en el siguiente boton</p>
                <a href="${link}">
                    <button> Reestablecer Contraseña</button>
                </a>
            </div>
        `
    })

};

// Verificar si el Token sigue vigente o es real
export const verifyEmailToken =  (token) => {
    // Verifico con el token y el secretToken
    try {
        const info = jwt.verify(token, config.gmail.secretToken);
        return info.email;
    } catch (error) {
        logger.info(error.message)
        return null;
    };
};