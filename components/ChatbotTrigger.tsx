import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface ChatbotTriggerProps {
    text: string;
    onClose: () => void;
}

const ChatbotTrigger: React.FC<ChatbotTriggerProps> = ({ text, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Fade in animation
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, [text]); // Re-trigger animation if text changes

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out
    };

    return (
        <div className={`absolute bottom-full right-0 mb-4 w-64 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transition-all duration-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <p className="text-sm text-gray-700 dark:text-gray-200">{text}</p>
            <button
                onClick={handleClose}
                className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Cerrar aviso"
            >
                <FiX size={16} />
            </button>
            {/* Arrow pointing down */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white dark:border-t-gray-800"></div>
        </div>
    );
};

export default ChatbotTrigger;
