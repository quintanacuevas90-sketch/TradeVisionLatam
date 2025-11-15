import React from 'react';
import Modal from './Modal';
import { useRouter } from '../hooks/useRouter';

const LegalModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { navigate } = useRouter();

    const handleNavigate = (path: string) => {
        navigate(path);
        onClose();
    };
    
    // This modal is not currently used but the file needs valid component structure
    // to prevent build errors.
    return (
        <Modal onClose={onClose} title="Información Legal">
            <div className="p-4 text-gray-700 dark:text-gray-300">
                <p>El contenido detallado de esta sección está disponible en nuestras páginas de información legal.</p>
                <p className="mt-4">
                    Para más detalles, por favor visite:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                    <li><button onClick={() => handleNavigate('/aviso-legal-riesgo')} className="text-brand-accent hover:underline">Aviso Legal y Riesgo</button></li>
                    <li><button onClick={() => handleNavigate('/terminos-academia')} className="text-brand-accent hover:underline">Términos de la Academia</button></li>
                    <li><button onClick={() => handleNavigate('/politica-privacidad')} className="text-brand-accent hover:underline">Política de Privacidad</button></li>
                </ul>
            </div>
        </Modal>
    );
};

export default LegalModal;
