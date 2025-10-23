import { useState } from "react";
import Swal from 'sweetalert2';

import Loading from "../components/shared/Loading";
import useProjects from "../hooks/useProjects";
import useUsers from "../hooks/useUsers";

export default function Projects() {

    const {projects, loading, error, createProject, updateProject, disableProject} = useProjects();
    const { loading: loadingUser, error: errorUser } = useUsers();

    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [obraEditando, setObraEditando] = useState(null)
    const [formulario, setFormulario] = useState({
        descripcion: "",
    })

    const handleAgregarNuevo = () => {
        setFormulario({ descripcion: "" })
        setObraEditando(null)
        setMostrarFormulario(true)
    }

    const handleEditar = (obra) => {
        setFormulario({
            descripcion: obra.lugar,
        })
        setObraEditando(obra)
        setMostrarFormulario(true)
    }

    const handleDelete = async (id) => {
        try {
            await disableProject(id);
        } catch (error) {
            console.log(error);
        }finally{
            location.reload();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (obraEditando) {
                const newProject = {
                    id: obraEditando.id,
                    descripcion: formulario.descripcion
                };
    
                await updateProject(newProject);
            } else {
                const newProject = {
                    descripcion: formulario.descripcion
                };
                await createProject(newProject);
            }
        } catch (error) {
            console.log(error);
        }finally{
            location.reload();
        }

    }

    const handleCancelar = () => {
        setMostrarFormulario(false)
        setFormulario({ descripcion: "" })
        setObraEditando(null)
    }

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        })
    }

   if (loading || loadingUser) {
        return <Loading />;
    }

    if (error ) {
        return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-3 sm:px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Obras</h1>
                    {!errorUser && (
                        <button
                            onClick={handleAgregarNuevo}
                            className="bg-red-800 hover:bg-red-900 text-white font-semibold py-2.5 px-5 sm:px-6 rounded-lg transition-colors duration-200 w-full sm:w-auto"
                        >
                            Agregar Obra
                        </button>
                    )}
                </div>

                {mostrarFormulario && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                                    {obraEditando ? "Editar Obra" : "Nueva Obra"}
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                        <textarea
                                            name="descripcion"
                                            value={formulario.descripcion}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none resize-none"
                                            placeholder="Ingresa la descripción de la obra"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 w-full sm:flex-1"
                                        >
                                            {obraEditando ? "Guardar Cambios" : "Agregar Obra"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancelar}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 w-full sm:flex-1"
                                        >
                                        Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-400 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        DESCRIPCIÓN
                                    </th>
                                    {!errorUser && (
                                        <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                            ACCIONES
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm font-medium text-gray-900 text-center">{project.lugar}</td>
                                        {!errorUser && (
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEditar(project)}
                                                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-3 lg:px-4 rounded-lg transition-colors duration-200 text-xs lg:text-sm"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: "¿Desea eliminar la obra?",
                                                                showCancelButton: true,
                                                                confirmButtonText: "Aceptar",
                                                                cancelButtonText: "Cancelar",
                                                                confirmButtonColor: "#1e8449",
                                                                cancelButtonColor: "#f39c12"
                                                                
                                                                }).then((result) => {
                                                    
                                                                if (result.isConfirmed) {
                                                                    (async () => {
                                                                        await handleDelete(project.id);
                                                                    })();
                                                                }
                                                            }); 
                                                        }}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 lg:px-4 rounded-lg transition-colors duration-200 text-xs lg:text-sm"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden divide-y divide-gray-200">
                        {projects.map((project) => (
                            <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                                <div className="space-y-2 mb-4">
                                    <div className="flex">
                                        <span className="text-sm font-medium text-gray-700 w-24">{project.lugar}</span>
                                    </div>
                                </div>
                                {!errorUser && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditar(project)}
                                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => {
                                                Swal.fire({
                                                    title: "¿Desea eliminar la obra?",
                                                    showCancelButton: true,
                                                    confirmButtonText: "Aceptar",
                                                    cancelButtonText: "Cancelar",
                                                    confirmButtonColor: "#1e8449",
                                                    cancelButtonColor: "#f39c12"
                                                    
                                                    }).then((result) => {
                                        
                                                    if (result.isConfirmed) {
                                                        (async () => {
                                                            await handleDelete(project.id);
                                                        })();
                                                    }
                                                }); 
                                            }}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {projects.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-base sm:text-lg">No hay obras registradas</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
