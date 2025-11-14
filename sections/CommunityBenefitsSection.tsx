import React from 'react';
import { FaBook, FaUserTie, FaShieldAlt } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { ModalType } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import BenefitCard from '../components/BenefitCard';

interface CommunityBenefitsSectionProps {
    onOpenModal: (modal: ModalType) => void;
}

const benefits = [
    {
        icon: <FaBook size={32} className="text-brand-accent" />,
        title: "Biblioteca Gratuita",
        description: "Acceda a nuestra biblioteca con más de 1000 libros, guías y nuestro Ebook de Patrones de Velas. El conocimiento básico debe ser libre."
    },
    {
        icon: <FaUserTie size={32} className="text-brand-accent" />,
        title: "Soporte de Mentores",
        description: "Nuestra comunidad es liderada por la voz de José Quintana. Reciba análisis de mercado y respuestas a dudas comunes."
    },
    {
        icon: <FiUsers size={32} className="text-brand-accent" />,
        title: "Red de Traders Serios",
        description: "Conéctese con traders de LATAM que están en el mismo camino. Compartimos análisis y estrategias, no 'señales milagrosas'."
    },
    {
        icon: <FaShieldAlt size={32} className="text-brand-accent" />,
        title: "Entorno de Disciplina",
        description: "Reforzamos la gestión de riesgo y la psicología (Psicotrading). Recordamos que esto no es un esquema para 'hacerse rico rápido'."
    }
];

const CommunityBenefitsSection: React.FC<CommunityBenefitsSectionProps> = ({ onOpenModal }) => {
    return (
        <AnimatedSection id="beneficios-comunidad" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-extrabold text-brand-primary dark:text-white">
                    Esto no es un Grupo de Chat. Es un Ecosistema de Rendimiento.
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                    Unirse a TradeVision Latam, incluso a nuestro nivel gratuito, le da acceso a un entorno diseñado para la disciplina y el profesionalismo.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map(benefit => (
                        <BenefitCard key={benefit.title} {...benefit} variant="community" />
                    ))}
                </div>

                <div className="mt-16">
                    <button
                        onClick={() => onOpenModal('community')}
                        className="bg-brand-accent text-white font-bold py-4 px-10 rounded-lg text-xl hover:bg-opacity-90 transition duration-300 transform hover:scale-105"
                    >
                        Únete a la Comunidad Gratuita Ahora
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default CommunityBenefitsSection;