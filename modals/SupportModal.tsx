
import React from 'react';
import Modal from './Modal';

const SupportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Soporte y Acceso">
             <div className="space-y-4 text-gray-700">
                <h3 className="font-bold">¿Ya eres miembro?</h3>
                <p>Accede a la plataforma de cursos y a la comunidad a través de los enlaces que recibiste en tu correo de bienvenida.</p>
                <h3 className="font-bold mt-4">¿Necesitas ayuda?</h3>
                <p>Para preguntas sobre los cursos, pagos o soporte técnico, por favor contacta a nuestro equipo a través de WhatsApp o Telegram.</p>
                <div className="flex gap-4 mt-2">
                     <a href="#" className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg">Soporte por WhatsApp</a>
                     <a href="#" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">Soporte por Telegram</a>
                </div>
            </div>
        </Modal>
    );
};

export default SupportModal;
