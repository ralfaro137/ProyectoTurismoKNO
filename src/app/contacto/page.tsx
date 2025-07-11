'use client'
import MenuComponent from "@/componentes/MenuComponent";
import { Provincia, RespuestaAtracciones } from "@/models/AtraccionesOut";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
//VER GRABACION DEL 17/6 PARA VER COMO DEBERIA DE QUEDAR CON TAILWIND

const ContactoPage: React.FC = () => {
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<number>(0);

    const [listaAtraccionesPorProvincia, setListaAtraccionesPorProvincia] = useState<Provincia[]>([]);

    const [atraccionSeleccionada, setAtraccionSeleccionada] = useState<string>("");

    const imagenesAtracciones: { [key: string]: string } = {
        "riu_palace": "riu_palace.jpg",
        "planet_hollywood": "planet_hollywood.jpg",
        "condovac": "condovac.jpg",
        "hotel_fiesta_resort": "hotel_fiesta_resort.jpg",
        "hotel_crocs": "hotel_crocs.jpg",
        "best_western_jaco_beach": "best_western.jpg",
    };

    useEffect(() => {
        const obtenerAtracciones = async () => {
            const respuesta = await axios.get<RespuestaAtracciones>("https://raquelturismo-vlakno-be-204e937b3637.herokuapp.com/api/route/Obtener_Las_Atracciones")
            if (respuesta.data.codigoRespuesta === 0)
                setListaAtraccionesPorProvincia(respuesta.data.detalle);
        }

        obtenerAtracciones();
    }, [])

    const atraccionesDisponibles = useMemo(() => {
        const provinciaActual = listaAtraccionesPorProvincia.find(
            (provincia) => Number(provincia.idProvincia) === provinciaSeleccionada
        );

        return provinciaActual ? provinciaActual.atracciones : [];
    }, [provinciaSeleccionada])



    return (
        <div>
            <MenuComponent></MenuComponent>
            <div className="mb-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100 p-4">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-xl w-full p-8 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Seleccione una provincia y una atracción</h1>

                    <label className="block text-sm font-medium text-gray-600 mb-2">Provincia:</label>
                    <select className="text-gray-800 placeholder-gray-400" value={provinciaSeleccionada} onChange={(e) => setProvinciaSeleccionada(Number(e.target.value))}>
                        <option value={0}>Seleccione una provincia</option>
                        {
                            listaAtraccionesPorProvincia.map((provincia) => (
                                <option key={provincia.idProvincia} value={provincia.idProvincia}>
                                    {provincia.nombreProvincia}
                                </option>
                            ))
                        }
                    </select>
                    {
                        provinciaSeleccionada !== 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Atracción:</label>
                                <select
                                    value={atraccionSeleccionada}
                                    onChange={(e) => setAtraccionSeleccionada(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400">
                                    {atraccionesDisponibles.map((atraccion) => (
                                        <option key={atraccion.id} value={atraccion.nombre.toLowerCase().replace(/\s+/g, "_")}>
                                            {atraccion.nombre}
                                        </option>
                                    ))}
                                </select>
                                {atraccionSeleccionada && imagenesAtracciones[atraccionSeleccionada] && (
                                    <div className="mt-4 flex justify-center">
                                        <img
                                            src={`/images/${imagenesAtracciones[atraccionSeleccionada]}`}
                                            alt={atraccionSeleccionada}
                                            className="rounded-lg shadow-md max-w-xs"
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    }
                    <div className="mb-4 mt-6">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Fecha del viaje</label>
                        <input
                            type="date"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Comentarios o preguntas</label>
                        <textarea
                            rows={4}
                            placeholder="Escriba aquí sus comentarios o dudas..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ContactoPage;