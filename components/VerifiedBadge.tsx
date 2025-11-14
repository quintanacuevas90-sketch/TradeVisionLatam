
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

const VerifiedBadge: React.FC = () => {
    return (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-900/50 border border-blue-700/50">
            <FaShieldAlt className="text-brand-accent text-2xl" />
            <div className="text-left">
                <p className="text-xs font-bold text-white leading-tight">Acreditación de Formación</p>
                <p className="text-[10px] text-gray-400 leading-tight">Canadá, Brasil y UE</p>
            </div>
        </div>
    );
};

export default VerifiedBadge;
