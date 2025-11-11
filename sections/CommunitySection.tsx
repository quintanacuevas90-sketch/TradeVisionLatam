
import React from 'react';
import { ModalType } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import { FaUsers } from 'react-icons/fa';

interface CommunitySectionProps {
    onOpenModal: (modal: ModalType) => void;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ onOpenModal }) => {
    return (
        <AnimatedSection id="comunidad" className="py-20 bg-gray-50 dark:bg-gray-800 text-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center mb-6">
                    <FaUsers className="text-6xl text-brand-accent" />
                </div>
                <h2 className="text-4xl font-extrabold text-brand-primary dark:text-white">
                    Únete a Nuestra Comunidad
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto my-8">
                    Conéctate, aprende y crece con traders de toda Latinoamérica. Accede a recursos exclusivos, resuelve dudas y forma parte de una red de apoyo comprometida con tu éxito.
                </p>
                <button
                    onClick={() => onOpenModal('community')}
                    className="bg-brand-accent text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-brand-primary transition duration-300 transform hover:scale-105"
                >
                    Descubre la Comunidad
                </button>
            </div>
        </AnimatedSection>
    );
};

export default CommunitySection;