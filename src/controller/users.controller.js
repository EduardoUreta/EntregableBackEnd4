import { UsersService } from "../service/users.service.js"

export class UsersController{
    static modifyRole = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
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
};