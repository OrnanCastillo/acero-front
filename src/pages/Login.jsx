import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import useAuthContext from "../hooks/useAuthContext";

import logo from '../../src/assets/logo.png';

export default function Login() {

    const navigate = useNavigate();

    const { handleLogin, loading, error, user } = useAuthContext();

    const [formData, setFormData] = useState({
        usuario: "",
        contraseña: "",
    })
    
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.usuario.trim()) {
            newErrors.usuario = "El usuario es obligatorio"
        }

        if (!formData.contraseña.trim()) {
            newErrors.contraseña = "La contraseña es obligatoria"
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formErrors = validateForm()

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            return
        }

        await handleLogin(formData);
    }

    useEffect( () => {
        if (user) {
            navigate("/Herramientas")
        }
    },[user])


    useEffect(()=> {
        if(error){
            Swal.fire({
                icon: 'error',
                title: 'Error en el inicio de sesión',
                text: error,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#e67e22'
            });
        }
    },[error])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="flex justify-center">
                            <img src={logo} className="w-50 self-center" alt="" />
                        </div>
                        <h3 className="text-center text-3xl font-bold text-gray-900 mb-5">Inicio de Sesión</h3>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-2">
                                Usuario
                            </label>
                            <input
                                id="usuario"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                                errors.usuario ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="Usuario"
                            />
                            {errors.usuario && <p className="mt-1 text-sm text-red-600">{errors.usuario}</p>}
                        </div>

                        <div>
                            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <input
                                id="contraseña"
                                name="contraseña"
                                type="password"
                                autoComplete="current-password"
                                value={formData.contraseña}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                                errors.contraseña ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="••••••••"
                            />
                            {errors.contraseña && <p className="mt-1 text-sm text-red-600">{errors.contraseña}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                                {loading ? "Cargando..." : "Entrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
