
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { useRouter } from '../hooks/useRouter';

const VerifiedBadge: React.FC = () => {
    const { navigate } = useRouter();

    const tooltipContent = (
        <>
            <p className="font-bold mb-1" translate="no">TRADEVISION LATAM</p>
            <p>Certificación de Formación Educativa. Haz clic para ver nuestra estructura legal y alcance global.</p>
        </>
    );

    return (
        <div className="relative group">
            <button
                onClick={() => navigate('/verificacion-legal')}
                className="flex items-center gap-2 p-2 rounded-lg bg-blue-900/50 border border-blue-700/50 hover:border-brand-accent transition-colors duration-300"
                aria-label="Verificar acreditación de formación"
            >
                <FaShieldAlt className="text-brand-accent text-2xl" />
                <div className="text-left">
                    <p className="text-xs font-bold text-white leading-tight" translate="no">TRADEVISION</p>
                    <p className="text-[10px] text-gray-400 leading-tight">Formación Acreditada</p>
                </div>
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 text-left">
                {tooltipContent}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900"></div>
            </div>
        </div>
    );
};

export default VerifiedBadge;