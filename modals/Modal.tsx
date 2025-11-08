
import React from 'react';
import { FiX } from 'react-icons/fi';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div
                className="bg-white text-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-2xl font-bold text-brand-primary">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
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
