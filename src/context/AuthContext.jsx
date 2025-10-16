import { createContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService, getToken } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setUser({ usuario: "Sesión activa" });
        }
        setLoading(false);
    }, []);

    const handleLogin = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginService(credentials);
            localStorage.setItem("token", data.token);
            localStorage.setItem("permiso", data.user.id);
            setUser(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logoutService();
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, handleLogin, handleLogout }}>
            {loading ? <div>Cargando sesión...</div> : children}
        </AuthContext.Provider>
    );
};
