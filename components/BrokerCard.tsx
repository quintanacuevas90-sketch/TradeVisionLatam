
import React from 'react';
import { PartnerTool } from '../types';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

interface BrokerCardProps {
    broker: PartnerTool;
}

const BrokerCard: React.FC<BrokerCardProps> = ({ broker }) => {
    const isExnova = broker.name === "EXNOVA";

    const ctaBaseClasses = "mt-auto w-full text-center font-bold rounded-lg transition duration-300 flex items-center justify-center gap-2";
    const exnovaCtaClasses = `${ctaBaseClasses} py-4 px-8 text-lg bg-whatsapp-green text-white transform hover:scale-105 group-hover:animate-shake`;
    const defaultCtaClasses = `${ctaBaseClasses} py-3 px-6 bg-brand-accent text-brand-primary hover:bg-opacity-80`;

    return (
        <div className="bg-white dark:bg-brand-primary/80 rounded-lg overflow-hidden group border border-gray-200 dark:border-white/20 hover:border-brand-accent transition-all duration-300 shadow-lg hover:shadow-brand-accent/20 flex flex-col">
            <div className="relative h-40 md:h-48 overflow-hidden">
                <img src={broker.image} alt={broker.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-xl md:text-2xl font-extrabold text-white" translate="no">{broker.name}</h3>
            </div>
            <div className="p-4 md:p-6 flex flex-col flex-grow">
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm flex-grow">{broker.description}</p>
                
                <ul className="space-y-2 mb-6">
                    {broker.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start text-xs md:text-sm">
                            <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{advantage}</span>
                        </li>
                    ))}
                </ul>

                <a 
                    href={broker.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={isExnova ? exnovaCtaClasses : defaultCtaClasses}
                >
                    {broker.cta} <FaArrowRight />
                </a>
            </div>
        </div>
    );
};

export default BrokerCard;
