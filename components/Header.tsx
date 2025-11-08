
import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { ModalType } from '../types';

interface HeaderProps {
    onOpenModal: (modal: ModalType) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Educación', modal: 'education' as ModalType },
        { label: 'Cursos', modal: 'premium-courses' as ModalType },
        { label: 'Brokers', modal: 'brokers' as ModalType },
        { label: 'Comunidad', modal: 'community' as ModalType },
    ];
    
    const NavLinkButtons = () => (
        <>
            {navLinks.map((link) => (
                <button
                    key={link.modal}
                    onClick={() => { onOpenModal(link.modal); setIsOpen(false); }}
                    className="text-white hover:text-brand-accent transition duration-300 py-2 md:py-0"
                >
                    {link.label}
                </button>
            ))}
            <button
                onClick={() => { onOpenModal('support'); setIsOpen(false); }}
                className="w-full md:w-auto text-center bg-brand-accent text-brand-primary font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition duration-300"
            >
                Acceso
            </button>
        </>
    );

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-primary/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-extrabold text-white">Trade<span className="text-brand-accent">Vision</span></span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                       <NavLinkButtons />
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-brand-primary/95 absolute top-20 left-0 w-full">
                    <div className="flex flex-col items-center space-y-4 px-4 pb-4 pt-2">
                       <NavLinkButtons />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
