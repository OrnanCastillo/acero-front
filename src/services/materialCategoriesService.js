const API_BASE_URL = 'http://localhost:3000';

const materialCategoriesService = {
    getAllMaterialCategories: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/materialCategories`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener categorias');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el servicio al obtener categorias:', error);
            throw error;
        }
    },
};

export default materialCategoriesService;
