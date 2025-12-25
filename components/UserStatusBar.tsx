import React, { useState, useEffect, useRef } from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';

const UserStatusBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    
    const userName = localStorage.getItem('tv_user_name') || 'Usuario';
    const firstName = userName.split(' ')[0];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Si estamos en el tope (primeros 50px), siempre visible
            if (currentScrollY < 50) {
                setIsVisible(true);
            } 
            // Si el usuario sube, mostramos el banner
            else if (currentScrollY < lastScrollY.current) {
                setIsVisible(true);
            } 
            // Si el usuario baja, ocultamos el banner
            else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            }
            
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        if (confirm('¿Estás seguro de que deseas cerrar tu sesión en TradeVision?')) {
            localStorage.removeItem('member_access');
            localStorage.removeItem('session_start');
            localStorage.removeItem('has_downloaded_welcome_pdf');
            window.location.reload();
        }
    };

    return (
        <div 
            className={`fixed top-24 right-4 sm:right-6 z-[45] transition-all duration-500 ease-in-out transform ${
                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'
            }`}
        >
            <div className="bg-[#0A1931]/90 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 sm:gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-brand-accent/50 transition-all group">
                <div className="flex items-center gap-2 border-r border-white/10 pr-3 sm:pr-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent shadow-inner">
                        <FiUser size={14} className="sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-white text-[10px] sm:text-xs font-bold tracking-wide uppercase truncate max-w-[80px] sm:max-w-none">
                        Hola, <span className="text-brand-accent">{firstName}</span>
                    </span>
                </div>
                
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-[9px] sm:text-[10px] font-black uppercase tracking-widest"
                    title="Cerrar Sesión"
                >
                    <FiLogOut size={14} />
                    <span className="hidden xs:inline">Salir</span>
                </button>
            </div>
        </div>
    );
};

export default UserStatusBar;