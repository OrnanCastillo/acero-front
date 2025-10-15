import useHistorial from "../hooks/useHistorial";
import Loading from "../components/shared/Loading";

const MovementsHistorial = () => {

    const { historial, loading, error } = useHistorial();

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    const getMovementColor = (movimiento) => {
        switch (movimiento) {
            case "ENTRADA DE STOCK":
                return "bg-green-100 text-green-800 border-green-200"
            case "SALIDA DE STOCK":
                return "bg-red-100 text-red-800 border-red-200"
            case "CORRECCIÓN DE INFORMACIÓN":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto  py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 mt-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Historial de movimientos</h1>
            </div>
            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
                <table className="w-full">
                    <thead className="bg-gray-400 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                                Material
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                                Movimiento
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                                Detalle
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {historial.map((item) => (
                            <tr key={item.idMovimiento} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.material}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getMovementColor(item.movimiento)}`}
                                    >
                                        {item.movimiento}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                                    <div className="truncate" title={item.detalle}>
                                        {item.detalle}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden space-y-4">
                {historial.map((item) => (
                    <div key={item.idMovimiento} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                        <div className="flex justify-between items-start mb-3">
                            <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getMovementColor(item.movimiento)}`}
                            >
                                {item.movimiento}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div>
                                <span className="text-sm font-medium text-gray-500">Material:</span>
                                <p className="text-sm font-semibold text-gray-900 mt-1">{item.material}</p>
                            </div>

                            <div>
                                <span className="text-sm font-medium text-gray-500">Detalle:</span>
                                <p className="text-sm text-gray-700 mt-1">{item.detalle}</p>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <span className="text-xs text-gray-500">{item.fecha}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovementsHistorial;
