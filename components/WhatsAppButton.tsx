import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton: React.FC = () => {
  const whatsappLink = 'https://wa.me/message/T6UFHN3SSTIEJ1';

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[160px] right-6 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={20} />
      <span className="absolute right-full mr-3 w-max bg-gray-800 text-white text-sm rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Soporte Directo
      </span>
    </a>
  );
};

export default WhatsAppButton;