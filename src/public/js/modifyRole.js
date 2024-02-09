const modifyRoleByAdmin = async (userId) => {
    try {
        // Cambiar el rol
        const response = await fetch(`http://localhost:8080/api/users/premium/${userId}`, {
            method: 'PUT',
        });

        if (!response.ok) {
            throw new Error(`Error al modificar el rol del usuario: ${response.statusText}`);
        }

        console.log("Rol de usuario modificado correctamente");
    } catch (error) {
        console.error("Error al modificar el rol del usuario:", error.message);
    }
};

const deleteUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/delete`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el usuario: ${response.statusText}`);
        }

        console.log("Usuario eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar el usuario:", error.message);
    }
}



