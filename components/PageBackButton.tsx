import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

interface PageBackButtonProps {
    variant?: 'default' | 'on-dark';
}

const PageBackButton: React.FC<PageBackButtonProps> = ({ variant = 'default' }) => {
    const goBack = () => {
        // Go back to the previous page in history
        window.history.back();
    };

    const colorClasses = variant === 'on-dark'
        ? 'text-gray-300 hover:text-white'
        : 'text-gray-600 dark:text-gray-400 hover:text-brand-accent';

    return (
        <button
            onClick={goBack}
            className={`flex items-center gap-2 ${colorClasses} transition-colors font-semibold`}
            aria-label="Volver a la página anterior"
        >
            <FiArrowLeft size={20} />
            Volver
        </button>
    );
};

export default PageBackButton;
