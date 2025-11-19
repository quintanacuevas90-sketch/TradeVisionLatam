import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiCopy, FiCheck, FiMail } from 'react-icons/fi';
import { EMAIL_ADDRESS } from '../utils/emailHandler';

interface EmailCopyModalProps {
    onClose: () => void;
}

const EmailCopyModal: React.FC<EmailCopyModalProps> = ({ onClose }) => {
    const [copied, setCopied] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Auto-select text on mount for easy copying
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    }, []);

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(EMAIL_ADDRESS);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
            
            // Re-select after copy for visual feedback
            if (inputRef.current) inputRef.current.select();
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleOpenMailApp = () => {
        window.location.href = `mailto:${EMAIL_ADDRESS}`;
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in-up"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-white dark:bg-brand-primary border-2 border-brand-accent rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="text-lg font-bold text-brand-primary dark:text-white flex items-center gap-2">
                        <FiMail className="text-brand-accent" /> Contacto
                    </h3>
                    <button 
                        onClick={onClose}
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-white/10"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        Copia nuestra dirección de correo electrónico para enviarnos tu consulta o solicitud.
                    </p>

                    {/* Input Field */}
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            readOnly
                            value={EMAIL_ADDRESS}
                            className="w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-mono text-center text-lg py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent select-all"
                            onClick={(e) => e.currentTarget.select()}
                        />
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            onClick={handleCopy}
                            className={`flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-lg transition-all duration-200 ${
                                copied 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-brand-accent text-brand-primary hover:bg-opacity-90'
                            }`}
                        >
                            {copied ? <FiCheck size={20} /> : <FiCopy size={20} />}
                            {copied ? '¡Copiado!' : 'Copiar'}
                        </button>
                        <button
                            onClick={handleOpenMailApp}
                            className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            <FiMail size={20} />
                            Abrir App
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailCopyModal;