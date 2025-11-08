
import React from 'react';
import Modal from './Modal';
import { FaTelegram, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaDiscord } from 'react-icons/fa';

const socialLinks = [
    { name: "Canal Principal", icon: <FaTelegram />, href: "#", color: "bg-blue-500" },
    { name: "Grupo VIP", icon: <FaTelegram />, href: "#", color: "bg-blue-600" },
    { name: "Instagram", icon: <FaInstagram />, href: "#", color: "bg-pink-500" },
    { name: "YouTube", icon: <FaYoutube />, href: "#", color: "bg-red-600" },
    { name: "TikTok", icon: <FaTiktok />, href: "#", color: "bg-black" },
    { name: "Anuncios WhatsApp", icon: <FaWhatsapp />, href: "#", color: "bg-green-500" },
    { name: "Discord", icon: <FaDiscord />, href: "#", color: "bg-indigo-600" },
];

const CommunityModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Únete a Nuestra Comunidad">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {socialLinks.map(link => (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" 
                       className={`flex items-center p-4 rounded-lg text-white font-bold hover:opacity-90 transition ${link.color}`}>
                        <span className="text-3xl mr-4">{link.icon}</span>
                        <span>{link.name}</span>
                    </a>
                ))}
            </div>
        </Modal>
    );
};

export default CommunityModal;
