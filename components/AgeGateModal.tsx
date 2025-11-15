import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface AgeGateModalProps {
    onAccept: () => void;
    onViewPolicy: () => void;
}

const AgeGateModal: React.FC<AgeGateModalProps> = ({ onAccept, onViewPolicy }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white dark:bg-brand-primary border-2 border-yellow-500 rounded-lg shadow-2xl max-w-2xl w-full p-8 text-center animate-fade-in-up">
                <FiAlertTriangle className="text-yellow-500 text-6xl mx-auto mb-4" />
                <h1 className="text-2xl md:text-3xl font-extrabold text-brand-primary dark:text-white mb-4">
                    ADVERTENCIA DE EDAD Y RIESGO | <span translate="no">TRADEVISION Latam</span>
                </h1>
                
                <div className="text-gray-600 dark:text-gray-300 space-y-4 text-left">
                    <p>
                        La plataforma educativa de <strong className="text-brand-primary dark:text-white" translate="no">TRADEVISION Latam</strong> está destinada exclusivamente a <strong className="text-brand-primary dark:text-white">usuarios mayores de dieciocho (18) años</strong>.
                    </p>
                    <p className="p-4 bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 rounded-r-lg">
                        <strong className="block mb-2">Aviso de Responsabilidad para Menores de Edad:</strong>
                        No incitamos a menores de edad a participar activamente, ni con capital real ni simulado, en estas plataformas sin la <strong className="text-yellow-900 dark:text-yellow-200">supervisión directa, consentimiento y responsabilidad total de un padre, tutor legal o representante</strong>. El <em>trading</em> y la educación financiera conllevan riesgos significativos.
                    </p>
                    <p className="font-bold text-brand-primary dark:text-white">
                        Acción Requerida: Para acceder al sitio y a todas las herramientas interactivas, debe confirmar su mayoría de edad y aceptar nuestra política legal.
                    </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={onAccept}
                        className="w-full sm:w-auto bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg text-lg hover:bg-opacity-80 transition transform hover:scale-105"
                    >
                        ACEPTO: Soy Mayor de Edad y Comprendo los Riesgos
                    </button>
                    <button 
                        onClick={onViewPolicy}
                        className="w-full sm:w-auto bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-700 transition"
                    >
                        Ver Política Legal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgeGateModal;
