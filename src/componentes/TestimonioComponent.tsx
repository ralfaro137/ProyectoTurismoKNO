import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

interface TestimonioProp {
    nombre: string,
    comentario: string,
    imagen: string,
    estrellas: number,
}

const TestimonioComponent: React.FC<TestimonioProp> = ({ nombre, comentario, imagen, estrellas }) => {

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full border border-gray-200 text-center hover:shadow-xl transition-transform duration-300">
            <img src={imagen} alt={nombre} className="w-32 h-32 rounded-full mx-auto object-cover mb-4" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{nombre}</h2>
            <p className="text-gray-600 text-sm">{comentario}</p>
            <div className= "flex justify-center mb-3">
                {[...Array(estrellas || 5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400 w-5 h-5"/>
                ))}
            </div>
        </div>
    )
}

export default TestimonioComponent;