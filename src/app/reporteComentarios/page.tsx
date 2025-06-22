'use client'
import MenuComponent from "@/componentes/MenuComponent";
import { ComentarioOut, ReporteComentariosOut } from "@/models/ReporteComentariosOut";
import axios from "axios"
import React, { useEffect, useMemo, useState } from "react"

const ReporteComentarios: React.FC = () => {

    const [filtro, setFiltro] = useState<string>("");
    const [comentarios, setComentarios] = useState<ComentarioOut[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const obtenerComentarios = async () => {
            const respuesta = await axios.get<ReporteComentariosOut>("http://localhost:4321/api/route/Obtener_Comentarios");

            if (respuesta.data.codigoRespuesta === 0) {
                setComentarios(respuesta.data.detalle)
                setLoading(false);
            }
        }

        obtenerComentarios();
    }, [])

    const comentariosFiltrados = useMemo(()=>{
            return comentarios.filter(comentario => comentario.nombre.toUpperCase().includes(filtro.toUpperCase())
                                    || comentario.provincia.toUpperCase().includes(filtro.toUpperCase())
                                    || comentario.atraccion.toUpperCase().includes(filtro.toUpperCase())
                                    || comentario.modalidad.toUpperCase().includes(filtro.toUpperCase())
                                    || comentario.comentario.toUpperCase().includes(filtro.toUpperCase()))
        }, [filtro, comentarios])

    return (
        <div>
            <MenuComponent></MenuComponent>
            <div className="max-w-6xl mx-auto px-4 py-6">
                <input 
                    value={filtro}
                    onChange={(e)=> setFiltro(e.target.value)}
                    placeholder="Digite el filtro"></input>
                <h1>{
                    loading ? (<p>Cargando usuarios...</p>) : (
                        <div className="overflow-x-auto rounded-lg shadow-md">
                            <table className="min-w-full divide-y divide-gray-200 bg-white">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Provincia</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Atraccion</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Modalidad</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Comentario</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    {
                                        comentariosFiltrados.map((usu, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">{usu.nombre} {usu.apellido}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{usu.provincia}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{usu.atraccion}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{usu.modalidad}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{usu.comentario}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    )
                }</h1>
            </div>
        </div>
    )
}

export default ReporteComentarios;