import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 bg-brand-accent text-brand-primary p-3 rounded-full shadow-lg hover:bg-opacity-80 focus:outline-none transition-all duration-300 z-50 group flex items-center justify-center ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll to top"
        >
            <FaArrowUp size={20} />
            <span className="absolute right-full mr-3 w-max bg-gray-800 text-white text-sm rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Back to Top
            </span>
        </button>
    );
};

export default ScrollToTopButton;