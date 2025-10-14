const API_BASE_URL = 'http://localhost:3000';

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
};

export default userService;
