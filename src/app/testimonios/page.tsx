"use client"
import React, { useState } from "react";
import TestimonioComponent from "../../componentes/TestimonioComponent";
import MenuComponent from "@/componentes/MenuComponent";

const TestimoniosPage: React.FC = () => {

    const [mostrarModal, setMostrarModal] = useState<boolean>(false);
    const [nombreNuevo, setNombreNuevo] = useState<string>("");
    const [comentarioNuevo, setComentarioNuevo] = useState<string>("");
    const [destinoNuevo, setDestinoNuevo] = useState<string>("");

    const vectorTestimonios = [
        {
            nombre: "Adolfo",
            comentario: "Los descuentos que ofrece Green Tourism CR son los mejores para la calidad de experiencia que se vive.",
            imagen: "/Testimonio1.jpg",
            estrellas: 4
        },
        {
            nombre: "Irina",
            comentario: "Han sido mis vacaciones favoritas con mi familia gracias a los servicios ofrecidos por Green Tourism CR.",
            imagen: "/Testimonio2.jpg",
            estrellas: 5
        },
        {
            nombre: "Paz",
            comentario: "Excelentes opciones para vacacionar.",
            imagen: "/Testimonio3.jpg",
            estrellas: 4
        },
        {
            nombre: "Jorge",
            comentario: "El servicio al cliente es excelente.",
            imagen: "/Testimonio4.jpg",
            estrellas: 5
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 py-10 px-4">
            <MenuComponent></MenuComponent>
            <h1 className="text-3xl font-semibold text-gray-800 mb-10 text-center">Testimonios de nuestros clientes</h1>
            <div className="flex justify-center mb-8">
                <button
                    onClick={() => setMostrarModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300">
                    Dejar testimonio
                </button>
                {mostrarModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">

                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Nuevo Testimonio</h2>

                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombreNuevo}
                                onChange={(e) => setNombreNuevo(e.target.value)}
                                className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800"
                            />

                            <textarea
                                placeholder="Comentario"
                                value={comentarioNuevo}
                                onChange={(e) => setComentarioNuevo(e.target.value)}
                                rows={3}
                                className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800"
                            />

                            <input
                                type="text"
                                placeholder="Destino escogido"
                                value={destinoNuevo}
                                onChange={(e) => setDestinoNuevo(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800"
                            />

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setMostrarModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        setMostrarModal(false);
                                        alert("Testimonio agregado.");
                                    }}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                >
                                    Guardar
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {
                    vectorTestimonios.map((persona, index) => (
                        <TestimonioComponent key={index}
                            nombre={persona.nombre}
                            comentario={persona.comentario}
                            imagen={persona.imagen}
                            estrellas={persona.estrellas}></TestimonioComponent>
                    ))
                }
            </div>
        </div>)
}

export default TestimoniosPage;