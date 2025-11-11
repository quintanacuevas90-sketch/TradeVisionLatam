

import React from 'react';
import { ModalType } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import { useRouter } from '../hooks/useRouter';

interface PremiumCoursesCtaSectionProps {
    onOpenModal: (modal: ModalType) => void;
}

const PremiumCoursesCtaSection: React.FC<PremiumCoursesCtaSectionProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();
    return (
        <AnimatedSection>
             <div className="py-20 bg-gray-100 dark:bg-brand-primary">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Lleva tu Trading al Siguiente Nivel.</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">Accede a nuestra formación élite y aprende las estrategias que usan los profesionales.</p>
                    <button
                        onClick={() => navigate('/premium-courses')}
                        className="bg-brand-accent text-brand-primary font-bold py-4 px-10 rounded-lg text-xl hover:bg-opacity-90 transition duration-300 transform hover:scale-105"
                    >
                        Ver Cursos Premium
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default PremiumCoursesCtaSection;