import { UsersService } from "../service/users.service.js"

export class UsersController{
    static modifyRole = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);

            // Validar de que haya subido todos los archivos
            if(user.status !== "Completo"){
                return res.json({status:"error", message: "El usuario no ha subido todos los documentos"});
            };
            if(user.role === "premium"){
                user.role = "user";
            } else if (user.role === "user"){
                user.role = "premium";
            } else {
                res.json({status:"error", message: "No se puede cambiar el rol del usuario"});
            }
            await UsersService.updateUser(user._id, user);
            res.json({status:"error", message:"Rol de usuario modificado"});
        } catch (error) {
            res.json({status:"error", message: error.message});
        }
    }

    static uploadUserDocuments = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);

            const identificacion = req.file?.['Identificacion']?.[0] || null;
            const domicilio = req.file?.['Domicilio']?.[0] || null;
            const eecc = req.file?.['EECC']?.[0] || null;

            const docs = [];
            if (identificacion) {
                docs.push({ name: "Identificacion", reference: identificacion.file });
            }
            if (domicilio) {
                docs.push({ name: "Domicilio", reference: domicilio.file });
            }
            if (eecc) {
                docs.push({ name: "EECC", reference: eecc.file });
            }

            user.documents = docs;
            user.status = (docs.length < 3) ? "Incompleto" : "Completo";

            await UsersService.updateUser(user._id, user);
            res.json({ status: "success", message: "Documentos Cargados" });
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    }



};