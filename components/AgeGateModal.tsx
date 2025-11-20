
import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface AgeGateModalProps {
    onAccept: () => void;
    onViewPolicy: () => void;
}

const AgeGateModal: React.FC<AgeGateModalProps> = ({ onAccept, onViewPolicy }) => {
    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white dark:bg-brand-primary border-2 border-yellow-500 rounded-xl shadow-2xl max-w-md w-full p-5 md:p-8 text-center animate-fade-in-up max-h-[90vh] overflow-y-auto">
                
                <FiAlertTriangle className="text-yellow-500 text-5xl mx-auto mb-3" />
                
                <h1 className="text-xl md:text-2xl font-extrabold text-brand-primary dark:text-white mb-3 leading-tight">
                    RESTRICCIÓN DE EDAD
                </h1>
                
                <div className="text-gray-600 dark:text-gray-300 text-sm space-y-3 text-left">
                    <p className="text-center font-medium">
                        Acceso exclusivo para mayores de <strong className="text-brand-primary dark:text-white">18 años</strong>.
                    </p>
                    
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 rounded-r-lg text-xs">
                        <strong className="block mb-1">Aviso Legal:</strong>
                        El trading conlleva riesgos. Prohibido el acceso a menores sin supervisión legal estricta.
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <button 
                        onClick={onAccept}
                        className="w-full bg-brand-accent text-brand-primary font-bold py-3 px-4 rounded-lg text-base shadow-lg hover:bg-opacity-90 transition active:scale-95"
                    >
                        SOY MAYOR DE 18 AÑOS
                    </button>
                    <button 
                        onClick={onViewPolicy}
                        className="w-full bg-transparent border border-gray-400 text-gray-500 dark:text-gray-400 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition"
                    >
                        Leer Política Legal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgeGateModal;
