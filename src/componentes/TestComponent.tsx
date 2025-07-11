import React, { useEffect, useState } from "react";

const TestComponent : React.FC = () =>{

    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [respuesta, setRespuesta] = useState<string>("");
    const [esHumano, setEsHumano] = useState<boolean>(false);

    useEffect(()=>{
        generarPregunta();
    }, [])

    const generarPregunta = () =>{

        const a = Math.floor(Math.random()*10) +1;
        const b = Math.floor(Math.random()*10) +1;

        setNum1(a);
        setNum2(b);
        setRespuesta("");
        setEsHumano(false);

    }

    const verificarRespuesta = () => {
        const respuestaNumero = parseInt(respuesta,10);//el 10 es la base decimal

        if(!isNaN(respuestaNumero) && respuestaNumero === num1 + num2){
            setEsHumano(true)
        }else{
            generarPregunta();
        }
    }

    return (
        <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 w-full max-w-md text-center mx-auto">
                <h1 className="text-xl font-semibold text-gray-800 mb-4">Verificiación de humanidad</h1>
                {
                    !esHumano ? (
                        <div>
                            <p className="mb-4 text-gray-700 text-sm">
                                ¿Cuánto es <strong>{num1} + {num2}</strong>?
                            </p>
                            <input
                                value={respuesta}
                                onChange={(e) => setRespuesta(e.target.value)}
                                placeholder="Tu respuesta"
                                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 placeholder-gray-400">
                            </input>
                            <button
                                onClick={verificarRespuesta}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
                                >Verificar</button>

                        </div>
                    ) :
                    (
                        <div className="text-green-600 font-semibold">Eres humano, adelante</div>
                    )
                }

            </div>

        </div>
    )


}

export default TestComponent;