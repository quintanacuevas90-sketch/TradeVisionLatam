
import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiSun, FiMoon, FiSearch, FiLock, FiUnlock, FiKey, FiStar, FiArrowRight, FiBriefcase } from 'react-icons/fi';
import { FaRobot, FaTrophy } from 'react-icons/fa';
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
            setIsScrolled(currentScrollY > 10);
            setIsVisible(currentScrollY <= lastScrollY.current || currentScrollY <= 80);
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const mainNavLinks = [
        { label: 'Brokers', action: () => navigate('/brokers') },
        { label: 'Cursos', action: () => navigate('/premium-courses') },
        { label: 'Comunidad', action: () => navigate('/comunidad') },
        { label: 'Partners', action: () => navigate('/partners') },
        { label: 'Blog', action: () => navigate('/blog') },
        { label: 'Soporte', action: () => onOpenModal('support') },
    ];

    const navLinkGroups = [
        {
            title: 'Navegación Principal',
            links: [
                { label: 'Cursos Premium', action: () => navigate('/premium-courses') },
                { label: 'Comunidad', action: () => navigate('/comunidad') },
                { label: 'SOCIOS / PARTNERS', action: () => navigate('/partners'), rel: 'nofollow' },
                { label: 'Brokers', action: () => navigate('/brokers') },
                { label: 'Blog', action: () => navigate('/blog') },
                { label: '🏆 Salón de la Fama', action: () => navigate('/hall-of-fame') },
                { label: 'Soporte 24/7', action: () => onOpenModal('support') },
            ]
        },
        {
            title: 'Recursos',
            links: [
                { label: 'TRADING ARENA 🎮', action: () => navigate('/zona-de-ejecucion') },
                { label: 'Nuestra Metodología', action: () => navigate('/methodology') },
                { label: 'Sobre Nosotros', action: () => navigate('/acerca-de') },
                { label: 'Información Legal', action: () => navigate('/aviso-legal-riesgo') },
            ]
        }
    ];

    return (
        <>
            <header className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-brand-primary/80 backdrop-blur-sm shadow-lg fixed top-0' : 'bg-transparent absolute'} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-4 lg:flex-1 justify-start">
                            <button onClick={() => setIsSideMenuOpen(true)} className="text-gray-800 dark:text-white p-2" aria-label="Open menu">
                                <FiMenu size={24} />
                            </button>
                            <button onClick={() => navigate('/')} className="flex items-center gap-3 text-2xl font-extrabold text-gray-900 dark:text-white">
                                <Logo />
                                <span translate="no">TradeVision<span className="text-brand-accent"> Latam</span></span>
                            </button>
                        </div>
                        <nav className="hidden lg:flex items-center gap-6">
                            {mainNavLinks.map((link) => (
                                <button key={link.label} onClick={link.action} className="font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-accent transition-colors">
                                    {link.label}
                                </button>
                            ))}
                        </nav>
                        <div className="flex items-center lg:flex-1 justify-end gap-2">
                            <TrendingCurrenciesWidget />
                            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition"><FiSearch size={20} /></button>
                            <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition">{theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}</button>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white dark:bg-brand-primary shadow-2xl z-[51] transform transition-transform duration-300 ${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3"><Logo className="w-8 h-8" /><h2 className="text-xl font-bold">Menú</h2></div>
                        <button onClick={() => setIsSideMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"><FiX size={24} /></button>
                    </div>
                    <nav className="flex-grow overflow-y-auto">
                        {navLinkGroups.map((group) => (
                            <Accordion key={group.title} variant="menu" title={group.title}>
                                <div className="flex flex-col space-y-1">
                                    {group.links.map(link => (
                                        <button key={link.label} onClick={() => { setIsSideMenuOpen(false); link.action(); }} className="text-left py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 w-full text-gray-800 dark:text-white">{link.label}</button>
                                    ))}
                                </div>
                            </Accordion>
                        ))}
                    </nav>
                </div>
            </div>
            <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Header;
