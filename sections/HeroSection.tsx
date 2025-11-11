
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
        <div className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-brand-primary">
            {/* Professional Trading Chart Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 z-0" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop')" }}
            ></div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/90 to-brand-primary z-0"></div>

             {/* Updated Background Glows for better responsiveness */}
             <div className="absolute -bottom-24 -left-24 w-60 h-60 md:w-96 md:h-96 bg-brand-accent/5 md:bg-brand-accent/10 rounded-full filter blur-3xl"></div>
             <div className="absolute -top-24 -right-24 w-60 h-60 md:w-96 md:h-96 bg-brand-accent/10 md:bg-brand-accent/15 rounded-full filter blur-3xl"></div>

            {/* Added vertical padding for better spacing on different aspect ratios */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
                <AnimatedSection>
                    {/* Updated font sizes for smoother scaling */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
                        Bienvenido a la Nueva Era del <span className="text-brand-accent">Trading Profesional</span>
                    </h1>
                    {/* Updated font sizes for smoother scaling */}
                    <div className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        <p>
                            Donde la Disciplina, la Lógica Institucional y la Tecnología se Unen.
                        </p>
                        <div className="mt-6">
                            <p className="mb-4">
                                Comunidad liderada por asesores expertos
                            </p>
                            <div className="flex justify-center gap-4 items-start pt-2">
                                <div className="relative group flex flex-col items-center">
                                    <img 
                                        className="w-14 h-14 rounded-full border-2 border-white/30 object-cover object-top shadow-lg transition-transform hover:scale-110" 
                                        src="https://i.pinimg.com/1200x/d5/34/f9/d534f97a587e3d136e88c397ae9842e7.jpg" 
                                        alt="Javier Solís, CEO y Fundador"
                                    />
                                    <span className="absolute top-full mt-2 w-max bg-gray-900/80 text-white text-xs font-semibold rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 pointer-events-none">
                                        Javier Solís (CEO y Fundador)
                                    </span>
                                </div>
                                <div className="relative group flex flex-col items-center">
                                    <img 
                                        className="w-14 h-14 rounded-full border-2 border-white/30 object-cover object-top shadow-lg transition-transform hover:scale-110" 
                                        src="https://i.pinimg.com/736x/ce/8a/1f/ce8a1f55c4a8419a3a0ecf7de10c821b.jpg" 
                                        alt="José Quintana, Asesor Principal"
                                    />
                                     <span className="absolute top-full mt-2 w-max bg-gray-900/80 text-white text-xs font-semibold rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 pointer-events-none">
                                        José Quintana (Asesor Principal)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Button container is now updated with new hierarchy */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/premium-courses')}
                            className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 w-full sm:w-auto transform hover:scale-105 shadow-lg shadow-brand-gold/30"
                        >
                            Ver Cursos Premium
                        </button>
                        <a
                            href="https://wa.me/message/T6UFHN3SSTIEJ1?text=Hola,%20quisiera%20recibir%20la%20guía%20gratuita%20de%20Patrones%20de%20Velas."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-brand-accent text-brand-accent font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300 w-full sm:w-auto"
                        >
                            Accede a la Guía Gratuita
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default HeroSection;