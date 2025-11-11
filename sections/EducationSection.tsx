
import React from 'react';
import { ModalType } from '../types';
import AnimatedSection from '../components/AnimatedSection';

interface EducationSectionProps {
    onOpenModal: (modal: ModalType) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ onOpenModal }) => {
    return (
        <AnimatedSection className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Un Ecosistema Educativo Completo</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                        Desde conceptos básicos hasta estrategias avanzadas de Forex, nuestro contenido está diseñado para darte una visión clara y profesional del mercado.
                    </p>
                    <button
                        onClick={() => onOpenModal('education')}
                        className="bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300"
                    >
                        Descubre Nuestra Metodología
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default EducationSection;