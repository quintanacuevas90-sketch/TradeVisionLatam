
import React from 'react';
import { FiBarChart2, FiCpu, FiArrowRight } from 'react-icons/fi';
import { FaBrain, FaRocket } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import { useRouter } from '../hooks/useRouter';

// Simplified pillar for preview
const PillarPreview: React.FC<{ icon: React.ReactNode; title: string; }> = ({ icon, title }) => (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
        <div className="flex-shrink-0 text-brand-accent text-2xl">{icon}</div>
        <h4 className="font-bold text-md text-brand-primary dark:text-white">{title}</h4>
    </div>
);

const MethodologySection: React.FC = () => {
    const { navigate } = useRouter();

    return (
        <AnimatedSection className="py-20 bg-gray-100 dark:bg-brand-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary dark:text-white">
                        Nuestra <span className="text-brand-accent">Metodología</span>
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        No enseñamos una sola herramienta; te sumergimos en un ecosistema que integra Lógica del Precio, Tecnología y Disciplina Mental.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    <PillarPreview icon={<FiBarChart2 />} title="I. Lógica del Precio (SMC)" />
                    <PillarPreview icon={<FiCpu />} title="II. Ventaja Tecnológica (Bots)" />
                    <PillarPreview icon={<FaBrain />} title="III. Blindaje Mental (Psicotrading)" />
                    <PillarPreview icon={<FaRocket />} title="IV. Síntesis (Patrón AMD)" />
                </div>

                 <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/methodology')}
                        className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300"
                    >
                        Descubre la Metodología Completa
                        <FiArrowRight />
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default MethodologySection;
