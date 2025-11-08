
import React from 'react';
import { ModalType } from '../types';
import AnimatedSection from '../components/AnimatedSection';

interface AboutSectionProps {
    onOpenModal: (modal: ModalType) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onOpenModal }) => {
    return (
        <AnimatedSection className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Misión</h2>
                <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                    Nuestra misión es desmitificar el trading y proporcionar una educación honesta y directa. Creemos que con la disciplina correcta, la gestión de riesgo adecuada y una estrategia sólida, cualquier persona puede aprender a navegar los mercados financieros de manera responsable.
                </p>
                <button
                    onClick={() => onOpenModal('affiliate')}
                    className="bg-brand-primary border-2 border-brand-accent text-brand-accent font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300"
                >
                    Programa de Afiliados
                </button>
            </div>
        </AnimatedSection>
    );
};

export default AboutSection;
