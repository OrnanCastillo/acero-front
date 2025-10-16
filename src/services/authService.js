const API_BASE_URL = 'http://localhost:3000';

export const login = async (credentials) => {
  
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en el login');
    }

    return data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getPermiso = () => {
    return localStorage.getItem('permiso');
};
