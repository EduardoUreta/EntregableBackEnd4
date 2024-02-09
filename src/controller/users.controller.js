import { UsersService } from "../service/users.service.js"

export class UsersController{
    static modifyRole = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);

            // Validar de que haya subido todos los archivos
            if(user.status !== "Completo"){
                return res.status(400).json({status:"error", message: "El usuario no ha subido todos los documentos"});
            };
            if(user.role === "premium"){
                user.role = "user";
            } else if (user.role === "user"){
                user.role = "premium";
            } else {
                res.status(400).json({status:"error", message: "No se puede cambiar el rol del usuario"});
            }
            await UsersService.updateUser(user._id, user);
            res.json({status:"error", message:"Rol de usuario modificado"});
        } catch (error) {
            res.status(500).json({status:"error", message: error.message});
        }
    };

    static uploadUserDocuments = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);

            const identificacion = req.files?.['Identificacion']?.[0] || null;
            const domicilio = req.files?.['Domicilio']?.[0] || null;
            const eecc = req.files?.['EECC']?.[0] || null;

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
    };

    // Obtener users
    static getUsers = async (req, res) => {
        try {
            const users = await UsersService.getUsers();
            res.json({data: users});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Eliminar usuario desde la vista
    static deleteUser = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await UsersService.deleteUser(userId);
            res.json({ message: "Usuario eliminado correctamente", result });
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Eliminar usuario con last_conection con más de 2 días
    static deleteUsers = async (req, res) => {
        try {
            const result = await UsersService.deleteUsers();
            res.json({ message: "Usuarios eliminados correctamente", result });
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Obtener todos los usuarios desde el Admin
    static getUsersByAdmin = async (req, res) => {
        try {
            const users = await UsersService.getUsersByAdmin();
            res.render('adminUserManage', {users});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    // Obtener usuario por ID
    static getUserById = async(req,res)=>{
        try {
            const userId = req.params.pid;
            const user = await UsersService.getUserById(userId);
            res.json({message:"getUser", data: user});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    };

};