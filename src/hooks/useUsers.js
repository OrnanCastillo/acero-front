import { useState, useEffect } from 'react';
import userService from '../services/userService.js';
import { getPermisoUser } from '../services/authService.js';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const id = getPermisoUser();
                const data = await userService.getPermiso(parseInt(id));
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default useUsers;