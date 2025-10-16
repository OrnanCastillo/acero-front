import { useState } from "react";

import useMaterials from "../hooks/useMaterials";
import useMaterialCategories from "../hooks/useMaterialCategories";
import useMovementsTypes from "../hooks/useMovementTypes";
import useUsers from "../hooks/useUsers";

import Loading from "../components/shared/Loading";

export default function Materials() {

    const { materials, loading, error, createMaterial, updateMaterial } = useMaterials();

    const { categories, loading: loadingCategories, error: errorCategories } = useMaterialCategories();

    const {movements, loading: loadingMovements, error: errorMovements} = useMovementsTypes();

    const {loading: loadingUser, error: errorUser} = useUsers();

    const [searchTerm, setSearchTerm] = useState("")

    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [editandoMaterial, setEditandoMaterial] = useState(null)
    const [formData, setFormData] = useState({
        categoria: "",
        descripcion: "",
        stock: "",
        motivo: 0,
        detalle: "",
        kilograms: "",
        meters: ""
    })

    const filteredMaterials = materials.filter(
        (material) =>
        material.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.categoria || !formData.descripcion || !formData.stock) {
            alert("Por favor completa todos los campos")
            return
        }

        try {

            if (editandoMaterial) {
                const newMaterial = {
                    id: editandoMaterial.idMaterial,
                    idCategoria: formData.categoria,
                    description: formData.descripcion,
                    stock: Number.parseInt(formData.stock),
                    motivo: parseInt(formData.motivo),
                    detalle: formData.detalle,
                    kilogramos: parseInt(formData.kilograms),
                    metros: parseInt(formData.meters)
                }

                const createdMaterial = await updateMaterial(newMaterial);
            } else {
                const newMaterial = {
                    idCategoria: formData.categoria,
                    description: formData.descripcion,
                    stock: Number.parseInt(formData.stock),
                    detalle: formData.detalle,
                    kilogramos: parseInt(formData.kilograms),
                    metros: parseInt(formData.meters)
                }

                const createdMaterial = await createMaterial(newMaterial);
                
            }
        } catch (error) {
            console.log(error);
        }finally{
            setFormData({ categoria: "", descripcion: "", stock: "", detalle: "", motivo: 0, kilograms:"", meters:"" })
            setMostrarFormulario(false)
            setEditandoMaterial(null)
            location.reload()
        }

    }

    const handleEditar = (material) => {
        setEditandoMaterial(material)
        setFormData({
            categoria: material.idCategoria,
            descripcion: material.descripcion,
            stock: material.stock.toString(),
            motivo: 0,
            detalle: "",
            kilograms: material.m_kilogramos.toString(),
            meters: material.m_metros.toString()
        })
        setMostrarFormulario(true)
    }

    const handleCancelar = () => {
        setMostrarFormulario(false)
        setEditandoMaterial(null)
        setFormData({ categoria: "", descripcion: "", stock: "", motivo: 2, detalle: "", kilograms:"", meters:"" })
    }

    if (loading || loadingCategories || loadingMovements || loadingUser) {
        return <Loading />;
    }

    if (error || errorCategories || errorMovements) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-6xl mx-auto mt-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Materiales de Taller</h1>
                    <p className="text-gray-600">Administra el inventario de materiales del taller</p>
                </div>
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="relative w-full">
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
                                placeholder="Buscar materiales..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                        {!errorUser && ((
                            <div className="flex md:justify-end">
                                <button
                                    onClick={() => setMostrarFormulario(true)}
                                    className="w-full md:w-auto bg-red-800 hover:bg-red-900 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors"
                                >
                                    Agregar material
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                
                {mostrarFormulario && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {editandoMaterial ? "Editar Material" : "Agregar Nuevo Material"}
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
                                        {categories.map((categorie) => (
                                            <option key={categorie.idCategoria} value={categorie.idCategoria}>
                                                {categorie.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <input
                                        type="text"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleInputChange}
                                        placeholder="Descripción del material"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        placeholder="Cantidad en stock"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kilogramos</label>
                                    <input
                                        type="number"
                                        name="kilograms"
                                        value={formData.kilograms}
                                        onChange={handleInputChange}
                                        placeholder="Kilogramos"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Metros</label>
                                    <input
                                        type="number"
                                        name="meters"
                                        value={formData.meters}
                                        onChange={handleInputChange}
                                        placeholder="Metros"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                {editandoMaterial ? 
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
                                        <select
                                            name="motivo"
                                            value={formData.motivo}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            required={editandoMaterial}
                                        >
                                            <option value="">Selecciona un motivo</option>
                                            {movements.map((movement) => (
                                                <option key={movement.idTipo} value={movement.idTipo}>
                                                    {movement.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                :   
                                    null
                                
                                }
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Detalle movimiento
                                    </label>
                                    <textarea
                                        name="detalle"
                                        value={formData.detalle}
                                        onChange={handleInputChange}
                                        placeholder="Detalle movimiento"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
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

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        Descripción
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        Categoría
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        Kilogramos
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                        Metros lineales
                                    </th>
                                    {!errorUser && ((
                                       <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMaterials.map((material) => (
                                    <tr key={material.idMaterial} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 text-center">{material.descripcion}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                {material.categoria}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 text-center">{material.kilogramos}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 text-center">{material.metros}</div>
                                        </td>
                                        {!errorUser && ((
                                            <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center">
                                                <button
                                                    onClick={() => handleEditar(material)}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1 self-center"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                    EDITAR
                                                </button>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden">
                        {filteredMaterials.map((material) => (
                            <div key={material.idMaterial} className="p-4 border-b border-gray-200 last:border-b-0">
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">{material.descripcion}</h3>
                                    </div>
                                    <div>
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            {material.categoria}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">KILOGRAMOS: {material.kilogramos}</h3>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">METROS LINEALES: {material.metros}</h3>
                                    </div>
                                    {!errorUser && ((
                                        <div className="flex items-center justify-between">
                                            <button
                                                onClick={() => handleEditar(material)}
                                                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                Editar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredMaterials.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V9a2 2 0 01-2 2h-2m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay materiales</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
