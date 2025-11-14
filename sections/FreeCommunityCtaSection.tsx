import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { useRouter } from '../hooks/useRouter';

const FreeCommunityCtaSection: React.FC = () => {
    const { navigate } = useRouter();

    return (
        <AnimatedSection className="bg-brand-primary text-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold">¿Iniciando en el Trading? Empieza Aquí.</h2>
                <p className="mt-4 max-w-3xl mx-auto text-gray-300">
                    Accede a nuestro Ecosistema Gratuito: +1000 Libros, +20 Cursos y la comunidad de traders más disciplinada de LATAM.
                </p>
                <button
                    onClick={() => navigate('/comunidad')}
                    className="mt-8 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 transform hover:scale-105 animate-pulse-glow"
                >
                    Unirse al Ecosistema Gratuito
                </button>
            </div>
        </AnimatedSection>
    );
};

export default FreeCommunityCtaSection;