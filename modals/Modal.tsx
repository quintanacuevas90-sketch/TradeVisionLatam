
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
    const [isVisible, setIsVisible] = useState(false);

    // This effect runs once on mount to trigger the enter animation.
    useEffect(() => {
        setIsVisible(true);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = () => {
        setIsVisible(false); // Trigger the exit animation
        setTimeout(() => {
            onClose(); // Call the parent's close handler after the animation
        }, 300); // Duration should match the transition duration
    };

    return (
        <div 
            className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="absolute inset-0 bg-black/80"></div>
            <div
                className={`bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transition-all duration-300 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`
                }
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/20">
                    <h2 id="modal-title" className="text-2xl font-bold text-brand-primary dark:text-white">{title}</h2>
                    <button onClick={handleClose} className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition" aria-label="Close modal">
                        <FiX size={28} />
                    </button>
                </header>
                <main className="overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Modal;
