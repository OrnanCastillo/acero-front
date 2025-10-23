import { useState } from "react";
import useTools from "../hooks/useTools";
import Loading from "../components/shared/Loading";
import useUsers from "../hooks/useUsers";
import Swal from 'sweetalert2';
import useLocations from "../hooks/useLocations";

export default function Tools() {
    const { tools, loading, error, createTool, updateTool, disableTool } = useTools();
    const { loading: loadingUser, error: errorUser } = useUsers();

    const {locations, loading: loadingLocations, error: errorLocations} = useLocations();

    const [selectedLocation, setSelectedLocation] = useState(0);

    const [formData, setFormData] = useState({
        categoria: "",
        descripcion: "",
        modelo: "",
        num_serie: "",
        condicion: "",
        ubicacion: "",
        num_economico: "",
        observaciones: ""
    });

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editandoMaterial, setEditandoMaterial] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleFilterChange = (tipo) => {
        setSelectedFilter((prev) => (prev === tipo ? null : tipo));
    };

    const filteredHerramientas = (tools || []).filter((tool) => {
        const matchesSearch =
            tool.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.num_serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.numero_economico.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = selectedFilter ? tool.condicion === selectedFilter : true;

        const matchesLocation = selectedLocation
            ? tool.status === parseInt(selectedLocation)
            : true;

        return matchesSearch && matchesFilter && matchesLocation;
    });

    const getStatusColor = (estatus) => {
        switch (estatus) {
            case 1:
                return "bg-green-100 text-green-800 border-green-200";
            case 2:
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case 3:
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getEstadoText = (estado) => {
        switch (estado) {
            case 1:
                return "NUEVO";
            case 2:
                return "BUENO";
            case 3:
                return "MALO";
            default:
                return "—";
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditar = (herramienta) => {
        setEditandoMaterial(herramienta);
        setFormData({
            categoria: herramienta.idCategoria,
            descripcion: herramienta.descripcion,
            modelo: herramienta.modelo,
            num_serie: herramienta.num_serie,
            condicion: herramienta.condicion,
            ubicacion: herramienta.status,
            num_economico: herramienta.numero_economico,
            observaciones: herramienta.observaciones
        });
        setMostrarFormulario(true);
    };

    const handleCancelar = () => {
        setMostrarFormulario(false);
        setEditandoMaterial(null);
        setFormData({
            categoria: "",
            descripcion: "",
            modelo: "",
            num_serie: "",
            condicion: "",
            ubicacion: "",
            num_economico: "",
            observaciones: ""
        });
    };

    const deleteTool = async (id) => {
        try {
            await disableTool(id);
        } catch (error) {
            console.log(error);
        }finally{
            location.reload();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editandoMaterial) {
                const newMaterial = {
                    id: editandoMaterial.idHerramienta,
                    idCategoria: parseInt(formData.categoria),
                    description: formData.descripcion,
                    modelo: formData.modelo,
                    num_serie: formData.num_serie,
                    condicion: parseInt(formData.condicion),
                    status: parseInt(formData.ubicacion),
                    numero_economico: formData.num_economico,
                    observaciones: formData.observaciones
                };

                await updateTool(newMaterial);
            } else {
                const newTool = {
                    idCategoria: parseInt(formData.categoria),
                    description: formData.descripcion,
                    modelo: formData.modelo,
                    num_serie: formData.num_serie,
                    condicion: parseInt(formData.condicion),
                    status: parseInt(formData.ubicacion),
                    numero_economico: formData.num_economico,
                    observaciones: formData.observaciones
                };

                await createTool(newTool);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setEditandoMaterial(null);
            setFormData({
                categoria: "",
                descripcion: "",
                modelo: "",
                num_serie: "",
                condicion: "",
                ubicacion: "",
                num_economico: "",
                observaciones: ""
            });
            setMostrarFormulario(false);
            location.reload();
        }
    };

    if (loading || loadingUser || loadingLocations) {
        return <Loading />;
    }

    if (error || errorLocations) {
        return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    const conteoInicial = { 1: 0, 2: 0, 3: 0, 4: 0 };
    const conteo = (tools || []).reduce((acc, tool) => {
        const tipo = tool.condicion;
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
    }, { ...conteoInicial });

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-10/10 mx-auto mt-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventario de Herramientas</h1>
                    <p className="text-gray-600">Gestión y control del inventario de herramientas de trabajo</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div
                        onClick={() => handleFilterChange(null)}
                        className={`cursor-pointer ${selectedFilter === null ? "ring-4 ring-blue-300" : ""} bg-blue-500 shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center text-white transition`}
                    >
                        <h2 className="text-lg font-semibold">Todos</h2>
                        <p className="text-3xl font-bold mt-2">{tools.length}</p>
                    </div>

                    <div
                        onClick={() => handleFilterChange(1)}
                        className={`cursor-pointer ${selectedFilter === 1 ? "ring-4 ring-green-300" : ""} bg-green-500 shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center text-white transition`}
                    >
                        <h2 className="text-lg font-semibold">Nuevos</h2>
                        <p className="text-3xl font-bold mt-2">{conteo[1]}</p>
                    </div>

                    <div
                        onClick={() => handleFilterChange(2)}
                        className={`cursor-pointer ${selectedFilter === 2 ? "ring-4 ring-yellow-300" : ""
                            } bg-yellow-500 shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center text-white transition`}
                    >
                        <h2 className="text-lg font-semibold">Buenos</h2>
                        <p className="text-3xl font-bold mt-2">{conteo[2]}</p>
                    </div>

                    <div
                        onClick={() => handleFilterChange(3)}
                        className={`cursor-pointer ${selectedFilter === 3 ? "ring-4 ring-red-300" : ""
                            } bg-red-500 shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center text-white transition`}
                    >
                        <h2 className="text-lg font-semibold">Malos</h2>
                        <p className="text-3xl font-bold mt-2">{conteo[3]}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <div
                        className={`flex flex-col md:flex-row md:items-center gap-3 ${
                            !errorUser ? "md:justify-between" : "md:justify-center"
                        }`}
                    >

                        <div
                            className={`relative w-full ${
                            errorUser ? "md:w-1/2" : "md:w-1/3"
                            } transition-all duration-200`}
                        >
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar herramientas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>

                        <div
                            className={`w-full ${
                            errorUser ? "md:w-1/2" : "md:w-1/3"
                            } transition-all duration-200`}
                        >
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                            >
                            <option value="">Selecciona la ubicación</option>
                                {locations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.lugar}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {!errorUser && (
                            <div className="flex md:justify-end w-full md:w-auto">
                                <button
                                    onClick={() => setMostrarFormulario(true)}
                                    className="w-full md:w-auto bg-red-800 hover:bg-red-900 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors"
                                >
                                    Agregar herramienta
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {mostrarFormulario && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {editandoMaterial ? "Editar Herramienta" : "Agregar Nueva Herramienta"}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                    <select
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        <option value={1}>ELECTRÓNICO</option>
                                        <option value={2}>HERRAMIENTA MENOR</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <input
                                        type="text"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleInputChange}
                                        placeholder="Descripción de herramienta"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                                    <input
                                        type="text"
                                        name="modelo"
                                        value={formData.modelo}
                                        onChange={handleInputChange}
                                        placeholder="Modelo"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">No. de serie</label>
                                    <input
                                        type="text"
                                        name="num_serie"
                                        value={formData.num_serie}
                                        onChange={handleInputChange}
                                        placeholder="No. de serie"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>

                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">No. económico</label>
                                    <input
                                        type="text"
                                        name="num_economico"
                                        value={formData.num_economico}
                                        onChange={handleInputChange}
                                        placeholder="No. económico"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Condición</label>
                                    <select
                                        name="condicion"
                                        value={formData.condicion}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Selecciona la condición</option>
                                        <option value={1}>NUEVO</option>
                                        <option value={2}>BUENO</option>
                                        <option value={3}>MALO</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                                    <select
                                        name="ubicacion"
                                        value={formData.ubicacion}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Selecciona la ubicación</option>
                                        {locations.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.lugar}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Observaciones
                                    </label>
                                    <textarea
                                        name="observaciones"
                                        value={formData.observaciones}
                                        onChange={handleInputChange}
                                        placeholder="Observaciones"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    ></textarea>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-red-800 hover:bg-red-900 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
                                    >
                                        {editandoMaterial ? "Actualizar" : "Agregar"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelar}
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors duration-200"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        Descripción
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        Modelo
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        No. Serie
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        No. Económico
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        Ubicación
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        Condición
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredHerramientas.map((herramienta) => (
                                    <tr key={herramienta.idHerramienta} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-center font-medium text-gray-900">{herramienta.descripcion}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-center text-gray-900">{herramienta.modelo}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-center text-gray-700">{herramienta.num_serie}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-center text-gray-700">{herramienta.numero_economico}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-center text-gray-700">{herramienta.lugar}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                                                    herramienta.condicion
                                                )}`}
                                            >
                                                {getEstadoText(herramienta.condicion)}
                                            </span>
                                        </td>
                                        {errorUser && (
                                            <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center gap-4">
                                                <button
                                                    onClick={() => {
                                                        if (herramienta.observaciones) {
                                                            Swal.fire({
                                                                title: "Observación",
                                                                text: herramienta.observaciones,
                                                                icon: "info",
                                                                confirmButtonColor: "#1e8449",
                                                            });
                                                        }
                                                    }}
                                                    className={`${herramienta.observaciones ? "bg-blue-500": "bg-gray-400"} ${herramienta.observaciones ? "hover:bg-blue-600": "hover:bg-gray-400"}  text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1`}
                                                    disabled={!herramienta.observaciones}
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
                                                            d="M8 10h8m-8 4h5m-9 4v-9a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H9l-4 3v-3z"
                                                        />
                                                    </svg>
                                                </button>
                                            </td>
                                        )}
                                        {!errorUser && (
                                            <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center gap-4">
                                                <button
                                                    onClick={() => handleEditar(herramienta)}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1"
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
                                                        if (herramienta.observaciones) {
                                                            Swal.fire({
                                                                title: "Observación",
                                                                text: herramienta.observaciones,
                                                                icon: "info",
                                                                confirmButtonColor: "#1e8449",
                                                            });
                                                        }
                                                    }}
                                                    className={`${herramienta.observaciones ? "bg-blue-500": "bg-gray-400"} ${herramienta.observaciones ? "hover:bg-blue-600": "hover:bg-gray-400"}  text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1`}
                                                    disabled={!herramienta.observaciones}
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
                                                            d="M8 10h8m-8 4h5m-9 4v-9a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H9l-4 3v-3z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: "¿Desea eliminar la herramienta?",
                                                            showCancelButton: true,
                                                            confirmButtonText: "Aceptar",
                                                            cancelButtonText: "Cancelar",
                                                            confirmButtonColor: "#1e8449",
                                                            cancelButtonColor: "#f39c12"
                                                            
                                                            }).then((result) => {
                                                
                                                            if (result.isConfirmed) {
                                                                (async () => {
                                                                    await deleteTool(herramienta.idHerramienta);
                                                                })();
                                                            }
                                                        }); 
                                                    }}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1"
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
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:hidden space-y-4">
                    {filteredHerramientas.map((herramienta) => (
                        <div key={herramienta.idHerramienta} className="bg-white rounded-lg shadow-sm border p-4">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-medium text-gray-900 leading-tight">{herramienta.descripcion}</h3>
                                <span
                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                                        herramienta.condicion
                                    )} ml-2 flex-shrink-0`}
                                >
                                    {getEstadoText(herramienta.condicion)}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500 block">Modelo:</span>
                                    <span className=" text-gray-900">{herramienta.modelo}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">Ubicación:</span>
                                    <span className="text-gray-900">{herramienta.lugar}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500 text-sm block">No. Serie:</span>
                                    <span className="text-gray-700 text-sm">{herramienta.num_serie}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-sm block">No. Económico:</span>
                                    <span className="text-gray-700 text-sm">{herramienta.numero_economico}</span>
                                </div>
                            </div>
                            {errorUser && (
                                <button
                                    onClick={() => {
                                        if (herramienta.observaciones) {
                                            Swal.fire({
                                                title: "Observación",
                                                text: herramienta.observaciones,
                                                icon: "info",
                                                confirmButtonColor: "#1e8449",
                                            });
                                        }
                                    }}
                                    className={`${herramienta.observaciones ? "bg-blue-500": "bg-gray-400"} ${herramienta.observaciones ? "hover:bg-blue-600": "hover:bg-gray-400"} text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1 justify-center mt-5`}
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
                                            d="M8 10h8m-8 4h5m-9 4v-9a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H9l-4 3v-3z"
                                        />
                                    </svg>
                                    Observaciones
                                </button>
                               
                            )}
                            {!errorUser && (
                                <div className="grid grid-cols-3 gap-4 text-sm mt-3"> 
                                    <button
                                        onClick={() => handleEditar(herramienta)}
                                        className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1 justify-center "
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (herramienta.observaciones) {
                                                Swal.fire({
                                                    title: "Observación",
                                                    text: herramienta.observaciones,
                                                    icon: "info",
                                                    confirmButtonColor: "#1e8449",
                                                });
                                            }
                                        }}
                                        className={`${herramienta.observaciones ? "bg-blue-500": "bg-gray-400"} ${herramienta.observaciones ? "hover:bg-blue-600": "hover:bg-gray-400"} text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1 justify-center`}
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
                                                d="M8 10h8m-8 4h5m-9 4v-9a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H9l-4 3v-3z"
                                            />
                                        </svg>
                                        
                                    </button>
                                    <button
                                        onClick={() => {
                                            Swal.fire({
                                                title: "¿Desea eliminar la herramienta?",
                                                showCancelButton: true,
                                                confirmButtonText: "Aceptar",
                                                cancelButtonText: "Cancelar",
                                                confirmButtonColor: "#1e8449",
                                                cancelButtonColor: "#f39c12"
                                                
                                                }).then((result) => {
                                    
                                                if (result.isConfirmed) {
                                                    (async () => {
                                                        await deleteTool(herramienta.idHerramienta);
                                                    })();
                                                }
                                            }); 
                                        }}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1 justify-center"
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
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
