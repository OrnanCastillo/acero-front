const API_BASE_URL = 'https://acero-back-production.up.railway.app';

const materialsService = {
    getAllMaterials: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/materials`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener materiales');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el servicio al obtener materiales:', error);
            throw error;
        }
    },
    createMaterial: async (materialData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/materials`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(materialData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear un nuevo material');
            }
            
            const newMaterial = await response.json();
            return newMaterial;
        } catch (error) {
            console.error('Error en el servicio al crear material:', error);
            throw error;
        }
    },
    updateMaterial: async (materialData) => {
        
        try {
            const response = await fetch(`${API_BASE_URL}/materials/${materialData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(materialData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear un nuevo material');
            }
            
            const newMaterial = await response.json();
            return newMaterial;
        } catch (error) {
            console.error('Error en el servicio al crear material:', error);
            throw error;
        }
    },
    getMovementsType: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/materials/types`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener tipo de movimientos');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el servicio al obtener tipo de movimientos:', error);
            throw error;
        }
    },
    getMovementsHistorial: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/materials/historial`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener movimientos');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el servicio al obtener movimientos:', error);
            throw error;
        }
    },
};

export default materialsService;
