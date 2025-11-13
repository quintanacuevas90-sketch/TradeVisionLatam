import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    variant?: 'default' | 'menu';
}

const Accordion: React.FC<AccordionProps> = ({ title, children, variant = 'default' }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Default styles
    let containerClasses = 'border border-gray-200 dark:border-white/20 rounded-lg bg-white dark:bg-white/5';
    let buttonClasses = 'w-full flex justify-between items-center p-4 text-left font-bold text-lg focus:outline-none';
    let contentPadding = 'p-4 pt-0';
    let iconClasses = 'text-brand-accent';

    // Menu variant overrides
    if (variant === 'menu') {
        containerClasses = ''; // no container styles
        buttonClasses = 'w-full flex justify-between items-center px-3 py-2 text-left text-xs font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider focus:outline-none';
        contentPadding = 'pl-3 pt-1 pb-2'; // add some vertical padding
        iconClasses = 'text-gray-400 dark:text-gray-500'; // match text color
    }
    
    return (
        <div className={containerClasses}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={buttonClasses}
            >
                <span>{title}</span>
                <span>{isOpen ? <FaChevronUp className={iconClasses} /> : <FaChevronDown className={iconClasses} />}</span>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className={contentPadding}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Accordion;