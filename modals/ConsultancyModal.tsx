
import React from 'react';
import Modal from './Modal';

const ConsultancyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Consultoría Personalizada">
            <div className="space-y-4 text-gray-700">
                <p>Para traders que buscan un acompañamiento más cercano, ofrecemos sesiones de consultoría 1 a 1 con José Quintana.</p>
                <h3 className="font-bold">¿Qué incluye?</h3>
                 <ul className="list-disc list-inside space-y-2">
                    <li>Revisión de tu plan de trading.</li>
                    <li>Análisis de tu bitácora de operaciones.</li>
                    <li>Resolución de dudas específicas sobre estrategias.</li>
                    <li>Asesoramiento psicológico para superar bloqueos.</li>
                </ul>
                <p>Las sesiones tienen una duración de 60 minutos y se realizan por videoconferencia. Para más información sobre disponibilidad y precios, contacta a nuestro equipo.</p>
                 <a href="#" className="inline-block bg-brand-accent text-brand-primary font-bold py-2 px-4 rounded-lg mt-2">Solicitar Información</a>
            </div>
        </Modal>
    );
};

export default ConsultancyModal;
