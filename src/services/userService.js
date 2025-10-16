const API_BASE_URL = 'https://acero-back-production.up.railway.app';

const userService = {
    getAllUsers: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener usuarios');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el servicio al obtener usuarios:', error);
            throw error;
        }
    },
    getPermiso: async (idUsuario) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${idUsuario}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener permiso');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el servicio al obtener permiso usuarios:', error);
            throw error;
        }
    },
};

export default userService;
