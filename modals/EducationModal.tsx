
import React from 'react';
import Modal from './Modal';

const EducationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Nuestra Metodología Educativa">
            <div className="space-y-4 text-gray-700">
                <p>Nuestra filosofía se basa en 3 pilares fundamentales:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong className="text-brand-primary">Psicología del Trading:</strong> Antes de cualquier estrategia, enseñamos a dominar la mente. El 80% del éxito en el trading es psicológico.</li>
                    <li><strong className="text-brand-primary">Gestión de Riesgo Profesional:</strong> La clave no es cuánto ganas, sino cuánto estás dispuesto a perder. Te enseñamos a proteger tu capital como un profesional.</li>
                    <li><strong className="text-brand-primary">Análisis Técnico Simplificado:</strong> Descomponemos conceptos complejos en estrategias claras y aplicables. Menos indicadores, más acción del precio.</li>
                </ul>
                <p>Creemos en la práctica constante, la revisión de operaciones y el aprendizaje continuo dentro de una comunidad que te apoya.</p>
            </div>
        </Modal>
    );
};

export default EducationModal;
