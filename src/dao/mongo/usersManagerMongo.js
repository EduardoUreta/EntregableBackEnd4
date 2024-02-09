import { usersModel } from "../models/users.models.js";
import logger from "winston";

export class UsersManagerMongo{
    constructor(){
        this.model = usersModel;
    };

    async createUser(userInfo){
        try {
            const result = await this.model.create(userInfo);
            return result;
        } catch (error) {
            logger.error("createUser: ", error.message);
            throw new Error("Se produjo un error al crear el usuario");
        }
    };

    async getUserById(userId){
        try {
            const result = await this.model.findById(userId).lean();
            // El lean() cambia de BSON a JSON
            return result;
        } catch (error) {
            logger.error("getUserById: ", error.message);
            throw new Error("Se produjo un error obteniendo el usuario");
        }
    };

    async getUserByEmail(userEmail){
        try {
            const result = await this.model.findOne({email: userEmail}).lean();
            return result;
        } catch (error) {
            logger.error("getUserByEmail: ", error.message);
            throw new Error("Se produjo un error al obtener el usuario");
        }
    };

    async updateUser(id, user){
        try {
            const result = await this.model.findByIdAndUpdate(id, user, {new:true});
            return result;
        } catch (error) {
            logger.error("updateUser:", error.message);
            throw new Error("Se produjo un error al actualizar el usuario");
        }
    };

    async getUsers(){
        try {
            const results = await this.model.find().lean();
            const resultsMap = results.map(user => ({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }));
            return resultsMap;
        } catch (error) {
            logger.error("getUsers: ", error.message);
            throw new Error("Se produjo un error al obtener los usuarios");
        }
    };

    async deleteUser(userId){
        try {
            const result = await this.model.findByIdAndDelete(userId).lean();
            return result;
        } catch (error) {
            logger.error("deleteUser: ", error.message);
            throw new Error("Se produjo un error al eliminar el usuario");
        }
    };

    async deleteUsers(){
        try {
            const twoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
            const result = await this.model.deleteMany({ "last_conection": { $lt: twoDaysAgo } });
            logger.info("deleteUsers: ejecutado");
            return result;
        } catch (error) {
            logger.error("deleteUsers: ", error.message);
            throw new Error("Se produjo un error al eliminar a los usuarios");
        }
    };

    async getUsersByAdmin(){
        try {
            const results = await this.model.find().lean();
            return results;
        } catch (error) {
            logger.error("getUsersByAdmin: ", error.message);
            throw new Error("Se produjo un error al obtener los usuarios");
        }
    };
};