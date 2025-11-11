
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { FEATURED_BROKERS } from '../constants';
import BrokerCard from '../components/BrokerCard';
import { PartnerTool } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiArrowRight } from 'react-icons/fi';

const BrokersSection: React.FC = () => {
    const { navigate } = useRouter();

    const title = <>Brokers <span className="text-brand-accent">Recomendados</span></>;
    const subtitle = "Plataformas para practicar (Demo) y herramientas para operar profesionalmente (Regulados).";
    const brokers: PartnerTool[] = FEATURED_BROKERS;

    return (
        <AnimatedSection className="py-20 bg-gray-100 dark:bg-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto">{subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {brokers.map((broker) => (
                        <BrokerCard key={broker.name} broker={broker} />
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/brokers')}
                        className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-primary transition-colors duration-300"
                    >
                        Ver Todas las Herramientas
                        <FiArrowRight />
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default BrokersSection;
