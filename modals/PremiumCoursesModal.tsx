
import React from 'react';
import Modal from './Modal';
import CountdownTimer from '../components/CountdownTimer';
import { FaWhatsapp, FaTelegram, FaCheckCircle } from 'react-icons/fa';

const courses = [
    {
        title: "Intermedio",
        price: "79",
        oldPrice: "150",
        features: ["Psicología del Trading", "Gestión de Riesgo", "Análisis Técnico Básico", "Estrategias de Opciones Binarias"]
    },
    {
        title: "Avanzado",
        price: "149",
        oldPrice: "300",
        features: ["Todo lo del Intermedio", "Análisis Técnico Avanzado", "Ondas de Elliott", "Acceso a Comunidad VIP"]
    },
    {
        title: "Forex Pro",
        price: "349",
        oldPrice: "700",
        features: ["Todo lo del Avanzado", "Estrategias de Forex", "Análisis Fundamental", "Sesiones 1 a 1 (2)"]
    },
];

const PremiumCoursesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Formación Élite TradeVision">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-red-600">¡OFERTA POR TIEMPO LIMITADO!</h3>
                <p className="text-gray-600">La oferta termina en:</p>
                <CountdownTimer />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {courses.map(course => (
                    <div key={course.title} className="border-2 border-brand-accent rounded-lg p-6 flex flex-col text-center shadow-lg">
                        <h4 className="text-2xl font-extrabold text-brand-primary mb-2">{course.title}</h4>
                        <p className="mb-4">
                            <span className="text-4xl font-bold">${course.price}</span>
                            <span className="text-gray-500 line-through ml-2">${course.oldPrice}</span>
                        </p>
                        <ul className="text-left space-y-2 mb-6 flex-grow">
                           {course.features.map(feature => (
                               <li key={feature} className="flex items-start">
                                   <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                   <span>{feature}</span>
                               </li>
                           ))}
                        </ul>
                         <a href="#" className="mt-auto w-full bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition duration-300">
                           Comprar Ahora
                        </a>
                    </div>
                ))}
            </div>

            <div>
                 <h4 className="text-xl font-bold text-center mb-4 text-brand-primary">Métodos de Pago</h4>
                 <div className="flex flex-wrap justify-center gap-4 text-gray-700">
                    <div className="bg-gray-100 p-3 rounded">Banesco Panamá</div>
                    <div className="bg-gray-100 p-3 rounded">Soles BCP (Perú)</div>
                    <div className="bg-gray-100 p-3 rounded">Bolívares (Venezuela)</div>
                 </div>
            </div>
             <div className="text-center mt-8 border-t pt-6">
                 <p className="text-gray-600 mb-2">¿Prefieres empezar con lo básico?</p>
                <a href="#" className="inline-flex items-center gap-2 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition">
                    <FaTelegram />
                    Cursos Gratuitos en Telegram
                </a>
            </div>
        </Modal>
    );
};

export default PremiumCoursesModal;
