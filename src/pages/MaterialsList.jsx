import { useNavigate } from "react-router-dom"

export default function MaterialsList() {

    const navigate = useNavigate()

    const cards = [
        { id: 1, title: "Vigas", image: "../src/assets/viga.png", href: "Vigas"},
        { id: 2, title: "Canales", image: "../src/assets/canal.png", href: "#"},
        { id: 3, title: "Ángulos", image: "../src/assets/angulo.png", href: "#"},
        { id: 4, title: "Soleras", image: "../src/assets/solera.png", href: "#"},
        { id: 5, title: "Redondos y Cuadrados", image: "../src/assets/redondos.png", href: "#"},
        { id: 6, title: "Tubo", image: "../src/assets/tubo.png", href: "#"},
        { id: 7, title: "Polin", image: "../src/assets/polin.png", href: "#"},
        { id: 8, title: "PTR", image: "../src/assets/ptr.png", href: "#"},
        { id: 9, title: "Tablero y Duela", image: "../src/assets/tablero.png", href: "#"},
        { id: 10, title: "HSS", image: "../src/assets/hss.png", href: "#"},
        { id: 11, title: "Placas", image: "../src/assets/placa.png", href: "#"},
        { id: 12, title: "Lámina", image: "../src/assets/lamina.png", href: "#"}
    ]

    const handleNavigation = (href) => {
        if (href !== "#") {
            navigate(href)
        }
    }

    return (
        <main className="min-h-screen bg-white p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center mt-10">Materiales</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`relative  bg-white  border-2 border-gray-300 rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group backdrop-blur-sm hover:border-red-300`}
                            onClick={() => handleNavigation(card.href)}
                        >
                       
                            <div className="absolute inset-0 bg-white opacity-5"></div>

                            <div className="flex justify-center items-center pt-8 pb-4 relative z-10">
                                <img
                                    src={card.image || "/placeholder.svg"}
                                    alt={card.title}
                                    className="w-24 h-24 object-contain group-hover:scale-125 transition-transform duration-300 filter drop-shadow-lg"
                                />
                            </div>

                            <div className="px-6 pb-6 text-center relative z-10">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {card.title}
                                </h3>
                            </div>

                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
