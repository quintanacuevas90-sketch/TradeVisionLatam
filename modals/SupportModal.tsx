

import React from 'react';
import Modal from './Modal';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const SupportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Soporte y Acceso">
             <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <h3 className="font-bold text-gray-800 dark:text-white">¿Ya eres miembro?</h3>
                <p>Accede a la plataforma de cursos y a la comunidad a través de los enlaces que recibiste en tu correo de bienvenida.</p>
                <h3 className="font-bold mt-4 text-gray-800 dark:text-white">¿Necesitas ayuda?</h3>
                <p>Para preguntas sobre los cursos, pagos o soporte técnico, por favor contacta a nuestro equipo a través de WhatsApp o Correo electrónico.</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                     <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-bold py-2 px-4 rounded-lg">
                        <FaWhatsapp /> Soporte por WhatsApp
                     </a>
                     <a href="mailto:tradevision2026@gmail.com" className="inline-flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">
                        <FiMail /> Soporte por Correo
                     </a>
                </div>
            </div>
        </Modal>
    );
};

export default SupportModal;