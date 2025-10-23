const API_BASE_URL = 'https://acero-back-production.up.railway.app';

const projectService = {
    getAllProjects: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/projects`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener obras');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en el servicio al obtener obras:', error);
            throw error;
        }
    },
    createProject: async (projectData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear obra');
            }
            
            const newProject = await response.json();
            return newProject;
        } catch (error) {
            console.error('Error en el servicio al crear obra:', error);
            throw error;
        }
    },
    updateProject: async (projectData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/${projectData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar una obra');
            }
            
            const newProject = await response.json();
            return newProject;
        } catch (error) {
            console.error('Error en el servicio al actualizar obra:', error);
            throw error;
        }
    },
    disableProject: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/disable/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al desactivar la obra');
            }
            
            const newProject = await response.json();
            return newProject;
        } catch (error) {
            console.error('Error en el servicio al desactivar obra:', error);
            throw error;
        }
    }
};

export default projectService;
