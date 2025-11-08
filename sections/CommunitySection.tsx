
import React from 'react';
import { ModalType } from '../types';
import AnimatedSection from '../components/AnimatedSection';

interface CommunitySectionProps {
    onOpenModal: (modal: ModalType) => void;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ onOpenModal }) => {
    return (
        <AnimatedSection className="py-20 text-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Únete a la Comunidad <span className="text-brand-accent">más Grande</span> de Traders Latinos</h2>
                <p className="text-gray-300 max-w-2xl mx-auto mb-8">Conecta, aprende y crece con miles de traders que comparten tu misma pasión y disciplina.</p>
                <button
                    onClick={() => onOpenModal('community')}
                    className="bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300"
                >
                    Ver Canales
                </button>
            </div>
        </AnimatedSection>
    );
};

export default CommunitySection;
