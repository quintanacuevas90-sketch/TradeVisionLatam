
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/20 rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left font-bold text-lg focus:outline-none"
            >
                <span>{title}</span>
                <span>{isOpen ? <FaChevronUp className="text-brand-accent" /> : <FaChevronDown />}</span>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="p-4 pt-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
