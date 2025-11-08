
import React from 'react';
import { ModalType } from '../types';
import { FaTelegram, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { LEGAL_TEXT } from '../constants';

interface FooterProps {
    onOpenModal: (modal: ModalType) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
    const navLinks = [
        { label: 'Cursos', modal: 'premium-courses' as ModalType },
        { label: 'Brokers', modal: 'brokers' as ModalType },
        { label: 'Comunidad', modal: 'community' as ModalType },
        { label: 'Legal', modal: 'legal' as ModalType },
    ];

    const socialLinks = [
        { icon: <FaTelegram />, href: '#' },
        { icon: <FaInstagram />, href: '#' },
        { icon: <FaYoutube />, href: '#' },
        { icon: <FaTiktok />, href: '#' },
    ];

    return (
        <footer className="bg-black/30 text-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-extrabold mb-4">Trade<span className="text-brand-accent">Vision</span></h3>
                        <p className="text-gray-400">Forjando traders disciplinados en Latinoamérica.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Navegación</h4>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.modal}>
                                    <button onClick={() => onOpenModal(link.modal)} className="text-gray-400 hover:text-brand-accent transition">
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Síguenos</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <a key={index} href={link.href} className="text-gray-400 hover:text-brand-accent transition text-2xl" target="_blank" rel="noopener noreferrer">
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8">
                    <h5 className="font-bold mb-2">Advertencia de Riesgo</h5>
                    <p className="text-xs text-gray-400 mb-4">{LEGAL_TEXT}</p>
                    <p className="text-center text-sm text-gray-500">© {new Date().getFullYear()} TradeVision Latam. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
