
import React from 'react';
import { ModalType } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import { useRouter } from '../hooks/useRouter';

interface HeroSectionProps {
  onOpenModal: (modal: ModalType) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();
    return (
        <AnimatedSection className="relative text-center overflow-hidden bg-brand-primary py-24 md:py-32">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/90 to-brand-primary z-0"></div>

             {/* Subtle trading graph background */}
            <div className="absolute inset-0 z-0 opacity-10 mix-blend-soft-light pointer-events-none">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1440 600"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,320L48,314.7C96,309,192,299,288,272C384,245,480,203,576,197.3C672,192,768,224,864,240C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-brand-accent"
                    />
                    <path
                        d="M0,400L48,380C96,360,192,320,288,325.3C384,331,480,384,576,394.7C672,405,768,373,864,362.7C960,352,1056,363,1152,341.3C1248,320,1344,267,1392,240L1440,213"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-white"
                    />
                </svg>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8">
                    {/* Image Column - Circular Mascot - TAMAÑO REDUCIDO Y PADDING AJUSTADO */}
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-full border-4 border-brand-accent/20 overflow-hidden drop-shadow-[0_0_20px_rgba(64,224,208,0.3)] hover:scale-105 transition-transform duration-500 bg-white flex items-center justify-center p-1">
                            <img 
                                id="buho-bienvenida"
                                src="https://i.pinimg.com/736x/6b/6f/a2/6b6fa26efc0259fecd2a789d209b559a.jpg" 
                                alt="Mascota TradeVision Presentando" 
                                loading="lazy"
                                className="w-full h-full object-contain object-center"
                                style={{ 
                                    opacity: 0, 
                                    animation: 'fade-in-up 1.5s ease-out 0.5s forwards' 
                                }}
                            />
                        </div>
                        <p className="text-xs text-gray-400 italic mt-3 font-semibold tracking-wide">Mascota TradeVision</p>
                    </div>

                    {/* Title Column - OPTIMIZADO PARA MÓVIL */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-relaxed md:leading-tight tracking-wide text-center md:text-left">
                        <span className="text-white block lg:inline mb-2 lg:mb-0">
                            Bienvenido a <span translate="no" className="whitespace-nowrap">TradeVision Latam</span>:
                        </span>
                        {' '}
                        <span className="text-brand-accent block lg:inline">
                            La Disciplina es la Estrategia
                        </span>
                    </h1>
                </div>

                <div className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                    <p>
                        Una academia de <span translate="no">trading</span> para <span translate="no">traders</span>, con la misión de forjar la disciplina y la rentabilidad en Latinoamérica.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigate('/premium-courses')}
                        className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 w-full sm:w-auto transform hover:scale-105 shadow-lg"
                    >
                        Cursos Premium
                    </button>
                    <a
                        href="https://wa.me/message/T6UFHN3SSTIEJ1?text=Hola,%20quisiera%20recibir%20la%20guía%20gratuita%20de%20Patrones%20de%20Velas."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-brand-accent text-brand-accent font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300 w-full sm:w-auto"
                    >
                        Descargar Guía Exclusiva
                    </a>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default HeroSection;
