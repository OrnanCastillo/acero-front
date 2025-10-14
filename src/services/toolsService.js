const API_BASE_URL = 'http://localhost:3000';

const toolsService = {
    getAllTools: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/tools`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener herramientas');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el servicio al obtener herramientas:', error);
            throw error;
        }
    },
    createTool: async (toolData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/tools`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toolData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear herramienta');
            }
            
            const newTool = await response.json();
            return newTool;
        } catch (error) {
            console.error('Error en el servicio al crear herramienta:', error);
            throw error;
        }
    },
    updateTool: async (toolData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/tools/${toolData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toolData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar una herramienta');
            }
            
            const newTool = await response.json();
            return newTool;
        } catch (error) {
            console.error('Error en el servicio al actualizar herramienta:', error);
            throw error;
        }
    },
};

export default toolsService;
