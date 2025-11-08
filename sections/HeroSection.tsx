
import React from 'react';
import { ModalType } from '../types';
import AnimatedSection from '../components/AnimatedSection';

interface HeroSectionProps {
  onOpenModal: (modal: ModalType) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
    return (
        <div className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-brand-primary">
             <div className="absolute inset-0 bg-grid-white/[0.05] z-0"></div>
             <div className="absolute -bottom-20 -left-20 w-40 h-40 md:w-72 md:h-72 bg-brand-accent/10 rounded-full filter blur-3xl"></div>
             <div className="absolute -top-20 -right-20 w-40 h-40 md:w-72 md:h-72 bg-brand-accent/20 rounded-full filter blur-3xl"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <AnimatedSection>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
                        Construye tu Futuro Financiero con <span className="text-brand-accent">TradeVision</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        La comunidad latina de trading responsable, enfocada en la disciplina, estrategia y gestión de riesgo.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => onOpenModal('about')}
                            className="bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 w-full sm:w-auto"
                        >
                            Conócenos
                        </button>
                        <button
                            onClick={() => onOpenModal('brokers')}
                            className="bg-transparent border-2 border-brand-accent text-brand-accent font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300 w-full sm:w-auto"
                        >
                            Ver Brokers
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default HeroSection;
