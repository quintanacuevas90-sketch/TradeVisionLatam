import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';

const pdfUrl = 'https://raw.githubusercontent.com/quintanacuevas90-sketch/TradeVisionLatam/main/public/manual-bienvenida.pdf';


const WelcomeBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const checkAccess = () => {
        const access = localStorage.getItem('member_access');
        setIsVisible(access === 'true');
    };

    useEffect(() => {
        // Verificar al cargar
        checkAccess();

        // Escuchar cambios en el almacenamiento (por si se valida en la misma sesión)
        window.addEventListener('storage', checkAccess);
        
        // Custom interval para detectar el cambio inmediato del LoginWall sin refresh
        const interval = setInterval(checkAccess, 1000);

        return () => {
            window.removeEventListener('storage', checkAccess);
            clearInterval(interval);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="w-full bg-slate-900/90 backdrop-blur-md border-b border-yellow-500/30 py-4 px-4 flex flex-col md:flex-row justify-between items-center gap-4 z-50 relative animate-fade-in-up">
            <div className="flex items-center gap-3">
                <span className="text-xl">👋</span>
                <p className="text-white font-medium text-sm md:text-base">
                    Acceso Validado. Bienvenido al Ecosistema <span translate="no" className="font-bold text-yellow-500">TradeVision</span>.
                </p>
            </div>

            <a 
                href={pdfUrl} 
                target="_blank" 
                download="Manual_TradeVision_Latam.pdf"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-black py-2.5 px-6 rounded-lg shadow-[0_0_15px_rgba(202,138,4,0.3)] transition-all transform hover:scale-105 active:scale-95 text-xs md:text-sm uppercase tracking-wider"
            >
                <FiDownload className="text-lg" />
                DESCARGAR PROTOCOLO (PDF)
            </a>
        </div>
    );
};

export default WelcomeBanner;
