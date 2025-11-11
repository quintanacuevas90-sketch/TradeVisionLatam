
import React from 'react';
import { FaFistRaised, FaUsers, FaLaptopCode } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';

const features = [
    {
        icon: <FaFistRaised className="text-brand-accent" size={40} />,
        title: "Disciplina Profesional",
        description: "Enseñamos un enfoque metódico y sin emociones para operar, basado en reglas y gestión de riesgo estricta."
    },
    {
        icon: <FaUsers className="text-brand-accent" size={40} />,
        title: "Comunidad de Apoyo",
        description: "Únete a una red de traders latinos que comparten análisis, estrategias y se motivan mutuamente."
    },
    {
        icon: <FaLaptopCode className="text-brand-accent" size={40} />,
        title: "Tecnología y Análisis",
        description: "Aprovecha herramientas de análisis avanzadas y aprende a interpretar el mercado con precisión."
    }
];

const WhyChooseUsSection: React.FC = () => {
    return (
        <AnimatedSection className="py-20 bg-gray-50 dark:bg-brand-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por Qué <span className="text-brand-accent">TradeVision</span>?</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">No vendemos sueños, forjamos traders.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-white/5 p-8 rounded-lg border border-gray-200 dark:border-white/10 hover:border-brand-accent transition duration-300 transform hover:-translate-y-2 shadow-sm hover:shadow-lg">
                            <div className="flex justify-center mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default WhyChooseUsSection;