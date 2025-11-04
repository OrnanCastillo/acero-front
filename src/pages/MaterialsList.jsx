import { useNavigate } from "react-router-dom";

import vigas from '../assets/viga.png';
import canales from '../assets/canal.png';
import angulos from '../assets/angulo.png';
import soleras from '../assets/solera.png';
import redondos from '../assets/redondos.png';
import tubo from '../assets/tubo.png';
import polin from '../assets/polin.png';
import ptr from '../assets/ptr.png';
import tablero from '../assets/tablero.png';
import hss from '../assets/hss.png';
import placas from '../assets/placa.png';
import lamina from '../assets/lamina.png';

export default function MaterialsList() {

    const navigate = useNavigate()

    const cards = [
        { id: 1, title: "Vigas", image: vigas, href: "Vigas"},
        { id: 2, title: "Canales", image: canales, href: "#"},
        { id: 3, title: "Ángulos", image: angulos, href: "#"},
        { id: 4, title: "Soleras", image: soleras, href: "#"},
        { id: 5, title: "Redondos y Cuadrados", image: redondos, href: "#"},
        { id: 6, title: "Tubo", image: tubo, href: "#"},
        { id: 7, title: "Polin", image: polin, href: "#"},
        { id: 8, title: "PTR", image: ptr, href: "#"},
        { id: 9, title: "Tablero y Duela", image: tablero, href: "#"},
        { id: 10, title: "HSS", image: hss, href: "#"},
        { id: 11, title: "Placas", image: placas, href: "#"},
        { id: 12, title: "Lámina", image: lamina, href: "#"}
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
