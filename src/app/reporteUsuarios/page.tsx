'use client'
import MenuComponent from "@/componentes/MenuComponent"
import { ReporteUsuariosOut, UsuarioOut } from "@/models/ReporteUsuariosOut"
import axios from "axios"
import React, { useEffect, useMemo, useState } from "react"

const ReporteUsuarios: React.FC = () => {

    const [filtro, setFiltro] = useState<string>("");
    const [usuarios, setUsuarios] = useState<UsuarioOut[]>([]);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            const respuesta = await axios.get<ReporteUsuariosOut>("https://raquelturismo-vlakno-be-204e937b3637.herokuapp.com/api/route/Obtener_Usuarios");

            if (respuesta.data.codigoRespuesta === 0) {
                const usuariosApi = respuesta.data.detalle;

                const usuariosExtras: UsuarioOut[] = [
                    { nombre: "Raquel Alfaro", correo: "raquel@gmail.com", rol: 1, telefono: "8888-7777" },
                    { nombre: "Jose Alvarado", correo: "jose@gmail.com", rol: 2, telefono: "8888-6666" },
                    { nombre: "Daniela Diaz", correo: "daniela@gmail.com", rol: 3, telefono: "8888-8888" },
                    { nombre: "Jimena Roldan", correo: "jimena@gmail.com", rol: 2, telefono: "6666-7777" }
                ];

                const usuariosCombinados = [...usuariosApi, ...usuariosExtras];
                setUsuarios(usuariosCombinados)
            }
        };

        obtenerUsuarios();
    }, [])

    useEffect(() => {
        console.log(usuarios)
    }, [usuarios])

    const usuariosFiltrados = useMemo(() => {
        return usuarios.filter(usuario => usuario.nombre.toUpperCase().includes(filtro.toUpperCase())
            || usuario.correo.toUpperCase().includes(filtro.toUpperCase())
            || usuario.telefono.toUpperCase().includes(filtro.toUpperCase())
            || ObtenerNombreRol(usuario.rol).toUpperCase().includes(filtro.toUpperCase()))
    }, [filtro, usuarios])

    function ObtenerNombreRol(rol: number) {
        switch (Number(rol)) {
            case 1:
                return "Administrador"
            case 2:
                return "Digitador";
            case 3:
                return "Usuario";
            default:
                return "Desconocido";
        }
    }

    //Funcion para la funcion de exportar en csv
    const exportarCSV = () => {
        const encabezados = ["Nombre", "Correo", "Rol", "Telefono"];
        const filas = usuariosFiltrados.map(usuario => [
            usuario.nombre,
            usuario.correo,
            ObtenerNombreRol(usuario.rol),
            usuario.telefono
        ]);

        const contenido = [
            encabezados.join(","),
            ...filas.map(fila => fila.join(","))
        ].join("\n");

        const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reporte_usuarios.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <MenuComponent></MenuComponent>
            <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 py-10 px-4 flex justify-center">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-6xl w-full p-8 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Reporte de Usuarios</h1>
                    <input
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        placeholder="Buscar por nombre, correo, rol o teléfono"
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"></input>
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <button
                            onClick={exportarCSV}
                            className="mb-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300">
                            Exportar CSV
                        </button>
                        <table className="min-w-full divide-y divide-gray-200 bg-white">
                            <thead className="bg-green-700 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Nombre</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Correo</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Rol</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Telefono</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-gray-700">
                                {
                                    usuariosFiltrados.map((usu, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{usu.nombre}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{usu.correo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ObtenerNombreRol(usu.rol)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{usu.telefono}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default ReporteUsuarios;