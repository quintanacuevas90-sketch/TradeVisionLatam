
import React from 'react';
import { ModalType } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import { useRouter } from '../hooks/useRouter';
import { FiStar, FiShield, FiTrendingUp } from 'react-icons/fi';

interface HeroSectionProps {
  onOpenModal: (modal: ModalType) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();
    return (
        <AnimatedSection className="relative overflow-hidden bg-[#020617] py-24 md:py-40">
            {/* Immersive Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A1931]/40 via-[#020617] to-[#020617]"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                
                {/* Floating Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-violet/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]"></div>

                {/* Cyber Graph Vectors */}
                <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none" viewBox="0 0 1440 320" fill="none">
                    <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,229.3C960,256,1056,256,1152,229.3C1248,203,1344,149,1392,122.7L1440,96" stroke="rgba(64,224,208,0.2)" strokeWidth="2" />
                    <path d="M0,100L60,120C120,140,240,180,360,170C480,160,600,100,720,100C840,100,960,160,1080,190C1200,220,1320,220,1380,220L1440,220" stroke="rgba(188,19,254,0.1)" strokeWidth="1" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/5 border border-brand-accent/20 text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] mb-10 animate-fade-in-up">
                        <FiShield /> Academia de Disciplina Institucional
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
                        {/* Mascot Frame */}
                        <div className="relative shrink-0 animate-fade-in-up">
                            <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full animate-pulse"></div>
                            <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full border-2 border-white/5 p-1 bg-[#0f172a]/80 backdrop-blur-xl overflow-hidden group">
                                <img 
                                    src="https://i.pinimg.com/736x/6b/6f/a2/6b6fa26efc0259fecd2a789d209b559a.jpg" 
                                    alt="TradeVision Mascot" 
                                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 to-transparent"></div>
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-brand-primary px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-tighter shadow-xl">
                                MASTER INSTRUCTOR
                            </div>
                        </div>

                        {/* Heading */}
                        <div className="text-center md:text-left animate-fade-in-up [animation-delay:0.2s]">
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tight text-white mb-6">
                                La Disciplina es<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-cyber-violet">la Única Estrategia.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-medium">
                                Deja de ser la liquidez del mercado. Aprende a operar con la <span className="text-white">Lógica del Smart Money</span> y la tecnología de élite.
                            </p>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-2xl animate-fade-in-up [animation-delay:0.4s]">
                        <button
                            onClick={() => navigate('/premium-courses')}
                            className="flex-1 w-full flex items-center justify-center gap-3 bg-brand-accent text-[#020617] font-black py-5 px-10 rounded-2xl text-lg hover:bg-white transition-all transform hover:scale-[1.02] shadow-[0_20px_50px_rgba(64,224,208,0.2)] group"
                        >
                            <FiTrendingUp className="text-2xl group-hover:rotate-12 transition-transform" />
                            CURSOS PREMIUM
                        </button>
                        <button
                            onClick={() => navigate('/colaboradores')}
                            className="flex-1 w-full flex items-center justify-center gap-3 bg-[#1e293b] border border-white/10 text-white font-black py-5 px-10 rounded-2xl text-lg hover:bg-white hover:text-black transition-all transform hover:scale-[1.02] group"
                        >
                            <FiStar className="text-2xl text-yellow-500 group-hover:rotate-45 transition-transform" />
                            ACCESO GOLD
                        </button>
                    </div>

                    <div className="mt-16 flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 animate-fade-in-up [animation-delay:0.6s]">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Operando con:</p>
                        <div className="flex items-center gap-6 text-xl font-black text-white italic tracking-tighter">
                            <span>FUSION MARKETS</span>
                            <span>BINANCE</span>
                            <span>cTRADER</span>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default HeroSection;
