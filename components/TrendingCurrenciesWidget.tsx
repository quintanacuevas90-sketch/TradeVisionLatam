import React, { useState, useEffect, useRef } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FiBarChart2 } from 'react-icons/fi';

interface CurrencyPair {
    pair: string;
    price: number;
    change: number;
}

const initialPairs: CurrencyPair[] = [
    { pair: 'EUR/USD', price: 1.0853, change: 0 },
    { pair: 'USD/JPY', price: 157.25, change: 0 },
    { pair: 'GBP/USD', price: 1.2731, change: 0 },
    { pair: 'USD/CHF', price: 0.9018, change: 0 },
    { pair: 'AUD/USD', price: 0.6654, change: 0 },
    { pair: 'USD/CAD', price: 1.3712, change: 0 },
];

const TrendingCurrenciesWidget: React.FC = () => {
    const [pairs, setPairs] = useState(initialPairs);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPairs(prevPairs =>
                prevPairs.map(p => {
                    const randomChange = (Math.random() - 0.5) * 0.0005;
                    const newPrice = p.price + randomChange;
                    return {
                        ...p,
                        price: parseFloat(newPrice.toFixed(4)),
                        change: randomChange,
                    };
                })
            );
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
             <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition duration-300"
                aria-label="Toggle live market"
            >
                <FiBarChart2 size={20} />
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 z-30">
                     <div className="bg-white/80 dark:bg-brand-primary/80 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-lg shadow-lg w-56 p-4">
                        <h3 className="font-bold text-lg mb-3 text-brand-primary dark:text-white text-center border-b border-gray-200 dark:border-white/20 pb-2">
                            Mercado en Vivo
                        </h3>
                        <ul className="space-y-3">
                            {pairs.map(p => (
                                <li key={p.pair} className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">{p.pair}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-mono transition-colors duration-500 ${p.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {p.price.toFixed(4)}
                                        </span>
                                        {p.change >= 0 ? (
                                            <FaArrowUp className="text-green-500" size={12} />
                                        ) : (
                                            <FaArrowDown className="text-red-500" size={12} />
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrendingCurrenciesWidget;