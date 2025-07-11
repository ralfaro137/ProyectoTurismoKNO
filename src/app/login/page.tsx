"use client"//cuando se usan hooks
import TestComponent from "@/componentes/TestComponent";
import VentanaMensajesComponent from "@/componentes/VentanaMensajesComponent";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage: React.FC = () => {

    const [correo, setCorreo] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [mostrarModal, setMostrarModal] = useState<boolean>(false);

    const { login } = useAuth();
    const router = useRouter();

    async function ValidarCredenciales() {

        try {
            const respuestaLogin = await login(correo, password);

            if (respuestaLogin) {
                router.push("reporteComentarios");
            }
            else {
                setMostrarModal(true);
            }
        }
        catch (error) {
            console.log("Hay un error en el consumo del API", error);
        }
    }

    const cerrarModal = () => {
        setMostrarModal(false);
    }

    {/*Login la pantalla */ }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 p-4">
            <TestComponent></TestComponent>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-md w-full p-8 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="flex justify-center mb-2">
                            <span className="text-4xl">🌿</span>
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Ingresa a Green Tourism CR</h1>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Correo
                            </label>
                            <input
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                type="email"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4 text-gray-800 placeholder-gray-400"
                                placeholder="correo@gmail.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Digite su password:
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-6 text-gray-800 placeholder-gray-400"
                                placeholder="********" />
                        </div>
                        <button
                            onClick={ValidarCredenciales}
                            className="w-full bg-green-700 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300">Confirmar credenciales</button>
                    </div>
                </div>
            </div>

            {
                mostrarModal && (
                    <VentanaMensajesComponent
                        mostrar={mostrarModal}
                        mensaje="Credenciales incorrectos"
                        onClose={cerrarModal}></VentanaMensajesComponent>
                )
            }

        </div>)
}

export default LoginPage;

/*Cada pantalla es un folder dentro de "app", Luego, se hace una carpeta de componentes en el "src", 
con los componentes para c/ pantalla*/