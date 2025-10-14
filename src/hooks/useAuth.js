import { useState } from 'react';
import { login as loginService, logout as logoutService } from '../services/authService';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginService(credentials);

            localStorage.setItem('token', data.token);

            setUser(data.user);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logoutService();
        setUser(null);
    };

    return { user, loading, error, handleLogin, handleLogout };
};

export default useAuth;
