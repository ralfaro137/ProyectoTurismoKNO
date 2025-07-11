'use client'
import MenuComponent from "@/componentes/MenuComponent";
import VentanaMensajesComponent from "@/componentes/VentanaMensajesComponent";
import { useAuth } from "@/context/AuthContext";
import { ComentarioOut, ReporteComentariosOut } from "@/models/ReporteComentariosOut";
import axios from "axios"
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react"
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReporteComentarios: React.FC = () => {

    const [filtro, setFiltro] = useState<string>("");
    const [comentarios, setComentarios] = useState<ComentarioOut[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [mensajeModal, setMensajeModal] = useState<string>("");
    const [mostrarModal, setMostrarModal] = useState<boolean>(false)
    const { estaAutenticado, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!estaAutenticado) {
            setMensajeModal("Usted no esta loguado en la aplicacion");
            setMostrarModal(true);
            return;
        }
    }, [estaAutenticado])
    useEffect(() => {
        if (user?.rol !== "1" && user?.rol !== "2") {
            setMensajeModal("Usted no tiene los permisos para ver este apartado");
            setMostrarModal(true);
            return;
        }
    }, [user])

    useEffect(() => {
        const obtenerComentarios = async () => {
            const respuesta = await axios.get<ReporteComentariosOut>("https://raquelturismo-vlakno-be-204e937b3637.herokuapp.com/api/route/Obtener_Comentarios");

            if (respuesta.data.codigoRespuesta === 0) {
                setComentarios(respuesta.data.detalle)
                setLoading(false);
            }
        }

        if (estaAutenticado)
            obtenerComentarios();
    }, []);

    const cerrarModal = () => {
        setMostrarModal(false);
        router.push("/login");
    }

    const comentariosFiltrados = useMemo(() => {
        return comentarios.filter(comentario => comentario.nombre.toUpperCase().includes(filtro.toUpperCase())
            || comentario.provincia.toUpperCase().includes(filtro.toUpperCase())
            || comentario.atraccion.toUpperCase().includes(filtro.toUpperCase())
            || comentario.modalidad.toUpperCase().includes(filtro.toUpperCase())
            || comentario.comentario.toUpperCase().includes(filtro.toUpperCase()))
    }, [filtro, comentarios])

    const exportarCSV = () => {
        const encabezados = ["Nombre", "Provincia", "Atracción", "Modalidad", "Comentario"];

        const filas = comentariosFiltrados.map(com => [
            `${com.nombre} ${com.apellido}`,
            com.provincia,
            com.atraccion,
            com.modalidad,
            com.comentario
        ]);

        const contenido = [
            encabezados.join(","),
            ...filas.map(fila => fila.map(dato => `"${dato}"`).join(","))
        ].join("\n");

        const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reporte_comentarios.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 py-10 px-4">
            <MenuComponent></MenuComponent>
            <VentanaMensajesComponent
                mostrar={mostrarModal}
                mensaje={mensajeModal}
                onClose={cerrarModal}></VentanaMensajesComponent>
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Reporte de comentarios</h1>
                <input
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    placeholder="Buscar por nombre, provincia, atraccion o comentario"
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"></input>
                <div>{
                    loading ? (<p className="text-center text-gray-600 flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 w-5 h-5" />
                        Cargando comentarios...
                    </p>) : (
                        <div className="overflow-x-auto rounded-lg shadow-md">
                            <button
                                onClick={exportarCSV}
                                className="mb-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
                            >
                                Exportar CSV
                            </button>
                            <table className="min-w-full divide-y divide-gray-200 bg-white">
                                <thead className="bg-green-700 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Nombre</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Provincia</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Atraccion</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Modalidad</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Comentario</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    {
                                        comentariosFiltrados.map((usu, index) => (
                                            <tr key={index} className="hover:bg-gray-100 transition-colors">
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
                }</div>
            </div>
        </div>
    )
}

export default ReporteComentarios;