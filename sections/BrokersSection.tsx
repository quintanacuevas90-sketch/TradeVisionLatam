
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const brokerLogos = [
    "https://i.imgur.com/u5zDEl0.png", // Quotex
    "https://i.imgur.com/Qh2aX4j.png", // IC Markets
    "https://i.imgur.com/vHqgQzX.png", // Exness
    "https://i.imgur.com/WBNs205.png", // Binance
    "https://i.imgur.com/UfllN5A.png", // Ledger
    "https://i.imgur.com/lO3u245.png"  // RoboForex
];

const BrokersSection: React.FC = () => {
    return (
        <AnimatedSection className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-3xl font-bold mb-4">Brokers y Herramientas Recomendadas</h2>
                <p className="text-center text-gray-400 mb-12">Operamos con plataformas confiables y seguras.</p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                    {brokerLogos.map((logo, index) => (
                        <div key={index} className="flex-shrink-0">
                           <img src={logo} alt={`Broker logo ${index + 1}`} className="h-10 md:h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default BrokersSection;
