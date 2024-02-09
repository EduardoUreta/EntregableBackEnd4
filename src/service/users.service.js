import { usersDao } from "../dao/index.js";

export class UsersService{
    static getUserByEmail = (email) => {
        return usersDao.getUserByEmail(email);
    };

    static updateUser = (id, user) => {
        return usersDao.updateUser(id, user);
    };

    static getUserById = (id)=>{
        return usersDao.getUserById(id);
    };

    static getUsers = () => {
        return usersDao.getUsers();
    };

    static deleteUser = (id) => {
        return usersDao.deleteUser(id);
    };

    static deleteUsers = () => {
        return usersDao.deleteUsers();
    };

    static getUsersByAdmin = () => {
        return usersDao.getUsersByAdmin();
    };
};