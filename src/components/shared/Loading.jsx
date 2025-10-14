export default function Loading() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="text-center space-y-8">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <p className="text-gray-600 font-extrabold">Cargando información...</p>
                </div>
            </div>
        </div>
    )
}
