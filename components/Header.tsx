
import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiSun, FiMoon, FiSearch } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import { ModalType } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import Logo from './Logo';
import Search from './Search';
import { useRouter } from '../hooks/useRouter';
import TrendingCurrenciesWidget from './TrendingCurrenciesWidget';
import Accordion from './Accordion';

interface HeaderProps {
    onOpenModal: (modal: ModalType) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const { theme, toggleTheme } = useTheme();
    const { navigate } = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if header should be sticky (have a background)
            if (currentScrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            // Determine if header should be visible (hide on scroll down)
            // We only hide if we're scrolled down past the header height (80px)
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true); // Scrolling up
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dedicated array for main desktop navigation for clarity
    const mainNavLinks = [
        { label: 'Brokers', action: () => navigate('/brokers') },
        { label: 'Cursos', action: () => navigate('/premium-courses') },
        { label: 'Comunidad', action: () => navigate('/comunidad') },
        { label: 'Blog', action: () => navigate('/blog') },
        { label: 'Soporte', action: () => onOpenModal('support') },
    ];

    // Restructured navigation links for the side menu with clear grouping
    const navLinkGroups = [
        {
            title: 'Navegación Principal',
            links: [
                { label: 'Cursos Premium', action: () => navigate('/premium-courses') },
                { label: 'Comunidad', action: () => navigate('/comunidad') },
                { label: 'Brokers', action: () => navigate('/brokers') },
                { label: 'Blog', action: () => navigate('/blog') },
                { label: 'Preguntas Frecuentes', action: () => navigate('/faq') },
                { label: 'Soporte 24/7', action: () => onOpenModal('support') },
            ]
        },
        {
            title: 'Contenido y Recursos',
            links: [
                { label: 'Protocolo de Confianza', action: () => navigate('/protocolo-confianza') },
                { label: 'Zona de Ejecución', action: () => navigate('/zona-de-ejecucion') },
                { label: 'Nuestra Metodología', action: () => navigate('/methodology') },
                { label: 'Conoce a los Mentores', action: () => onOpenModal('mentors') },
                { label: 'Sobre Nosotros', action: () => navigate('/acerca-de') },
                { label: 'Nuestra Responsabilidad', action: () => navigate('/responsabilidad') },
                { label: 'Impacto Social', action: () => navigate('/impacto-social') },
                { label: 'Forma Parte de TradeVision', action: () => navigate('/colabora') },
                { label: 'Programa de Afiliados', action: () => onOpenModal('affiliate') },
                { label: 'Consultoría para Mentores', action: () => navigate('/consultancy') },
                { label: 'Información Legal', action: () => navigate('/aviso-legal-riesgo') },
            ]
        }
    ];

    const handleSideMenuClick = (action: () => void) => {
        setIsSideMenuOpen(false);
        // Small delay to allow the menu closing animation to start before navigation logic kicks in
        setTimeout(() => {
            action();
        }, 250);
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
    };

    return (
        <>
            <header className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-brand-primary/80 backdrop-blur-sm shadow-lg fixed top-0' : 'bg-transparent absolute'} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        
                        {/* Left side: Hamburger Menu + Logo */}
                        <div className="flex items-center gap-4 lg:flex-1 justify-start">
                            <button onClick={() => setIsSideMenuOpen(true)} className="text-gray-800 dark:text-white p-2 -ml-2" aria-label="Open menu">
                                <FiMenu size={24} />
                            </button>
                            <button onClick={() => navigate('/')} className="flex items-center gap-3 text-2xl font-extrabold text-gray-900 dark:text-white">
                                <Logo />
                                <span translate="no">Trade<span className="text-brand-accent">Vision</span></span>
                            </button>
                        </div>

                        {/* Center: Main Navigation (Desktop) */}
                        <nav className="hidden lg:flex items-center gap-6">
                            {mainNavLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={link.action}
                                    className="font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-300"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>
                        
                        {/* Right side: Search + Theme Toggle */}
                        <div className="flex items-center lg:flex-1 justify-end gap-2">
                            <TrendingCurrenciesWidget />
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition duration-300"
                                aria-label="Search"
                            >
                                <FiSearch size={20} />
                            </button>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition duration-300"
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Overlay */}
            {isSideMenuOpen && (
                <div 
                    onClick={() => setIsSideMenuOpen(false)}
                    className="fixed inset-0 bg-black/60 z-50"
                    aria-hidden="true"
                ></div>
            )}
            
            {/* Side Menu Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white dark:bg-brand-primary shadow-2xl z-[51] transform transition-transform duration-300 ease-in-out ${
                    isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                aria-modal="true"
                role="dialog"
            >
                <div className="p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                            <Logo className="w-8 h-8" />
                            <h2 className="text-xl font-bold">Menú</h2>
                        </div>
                        <button onClick={() => setIsSideMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10" aria-label="Close menu">
                            <FiX size={24} />
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto -mr-4 pr-4">
                        <nav className="flex flex-col">
                            {navLinkGroups.map((group) => (
                                <div key={group.title} className="border-b border-gray-200 dark:border-white/10 last:border-b-0">
                                    <Accordion variant="menu" title={group.title}>
                                        <div className="flex flex-col space-y-1">
                                            {group.links.map(link => (
                                                <button
                                                    key={link.label}
                                                    onClick={() => handleSideMenuClick(link.action)}
                                                    className="text-left text-base text-gray-800 dark:text-white hover:text-brand-accent transition duration-300 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
                                                >
                                                    {link.label}
                                                </button>
                                            ))}
                                        </div>
                                    </Accordion>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-white/10">
                        <button
                            onClick={() => {
                                setIsSideMenuOpen(false);
                                // Use a short delay to allow the menu to start closing before opening the chat
                                setTimeout(() => {
                                    window.dispatchEvent(new CustomEvent('open-chatbot'));
                                }, 150);
                            }}
                            className="w-full flex items-center justify-center gap-3 bg-brand-accent text-brand-primary font-bold py-3 px-4 rounded-lg transition-transform duration-200 transform hover:scale-105"
                        >
                            <FaRobot className="animate-pulse" size={20} />
                            Asistente IA
                        </button>
                    </div>

                </div>
            </div>

            {/* Search Component */}
            <Search isOpen={isSearchOpen} onClose={handleSearchClose} />
        </>
    );
};

export default Header;
