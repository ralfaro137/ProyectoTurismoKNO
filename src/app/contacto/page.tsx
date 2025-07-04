'use client'
import { Provincia, RespuestaAtracciones } from "@/models/AtraccionesOut";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
//VER GRABACION DEL 17/6 PARA VER COMO DEBERIA DE QUEDAR CON TAILWIND

const ContactoPage: React.FC = () => {
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<number>(0);

    const [listaAtraccionesPorProvincia, setListaAtraccionesPorProvincia] = useState<Provincia[]>([]);

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

        return provinciaActual? provinciaActual.atracciones: [];
    }, [provinciaSeleccionada])



    return (
        <div>
            <h1>Seleccione una provincia y una atracción</h1>

            <label>Provincia:</label>
            <select value={provinciaSeleccionada} onChange={(e) =>setProvinciaSeleccionada(Number(e.target.value))}>
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
                        <label>Atracción:</label>
                        <select>
                            {
                                atraccionesDisponibles.map((atraccion) => (
                                    <option key={atraccion.id} value={atraccion.nombre}>
                                        {atraccion.nombre}
                                    </option>
                                ))
                            }

                        </select>
                    </div>
                )
            }

        </div>
    )
}

export default ContactoPage;