import React from "react";
import TestimonioComponent from "../../componentes/TestimonioComponent";
import MenuComponent from "@/componentes/MenuComponent";

const TestimoniosPage: React.FC = () => {

    const vectorTestimonios = [
        {
            nombre: "Adolfo",
            comentario: "Muy bueno el registro, regresaré",
            imagen: "/Testimonio1.jpg"
        },
        {
            nombre: "Maxwell",
            comentario: "No me lograron contactar",
            imagen: "/Testimonio2.jpg"
        }
    ]

    return (
    <div>
        <MenuComponent></MenuComponent>
        {
            vectorTestimonios.map((persona, index) => (
                <TestimonioComponent key={index}
                    nombre={persona.nombre}
                    comentario={persona.comentario}
                    imagen={persona.imagen}></TestimonioComponent>
            ))
        }
    </div>)
}

export default TestimoniosPage;