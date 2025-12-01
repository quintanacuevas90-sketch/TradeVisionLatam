import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import PageBackButton from '../components/PageBackButton';
import MindsetQuiz from '../components/MindsetQuiz';
import ExecutionPatterns from '../components/ExecutionPatterns';
import AdvancedMindset from '../components/AdvancedMindset';
import HighRiskCalculator from '../components/HighRiskCalculator';
import BinaryExecutionControl from '../components/BinaryExecutionControl';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiArrowRight, FiUsers, FiMail, FiAward } from 'react-icons/fi';
import { FaBrain, FaShieldAlt, FaCalculator, FaHeadset, FaCrosshairs, FaGamepad, FaTrophy, FaBolt, FaBug, FaScroll } from 'react-icons/fa';
import { handleEmailClick, EMAIL_TOOLTIP } from '../utils/emailHandler';

const ModuleWrapper: React.FC<{ 
    level: number; 
    title: string; 
    icon: React.ReactNode; 
    children: React.ReactNode; 
    imageUrl: string 
}> = ({ level, title, icon, children, imageUrl }) => (
    <div className="card-arena rounded-xl overflow-hidden group border border-cyber-violet/30 hover:border-electric-blue transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(188,19,254,0.2)] flex flex-col">
        {/* Cinematic Header Banner - Optimized height for mobile */}
        <div className="relative h-48 sm:h-[36rem] overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-black">
                <img 
                    src={imageUrl} 
                    alt={`Fondo Nivel ${level}`} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                {/* Gradient Overlays - Reduced opacity for better image visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-transparent opacity-50"></div>
            </div>
            
            <div className="relative z-10 h-full p-4 sm:p-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                     <span className="text-[#050505] font-mono font-black text-[10px] sm:text-xs bg-acid-green px-2 py-1 rounded shadow-[0_0_10px_rgba(57,255,20,0.6)] tracking-widest uppercase">
                        Nivel {level}
                    </span>
                    <div className="h-px w-8 sm:w-16 bg-acid-green/50"></div>
                </div>
               
                <div className="flex items-end gap-4 sm:gap-6 text-white">
                    <div className="p-3 sm:p-5 bg-black/70 rounded-full backdrop-blur-md border border-cyber-violet/30 text-cyber-violet shadow-lg group-hover:scale-110 group-hover:border-cyber-violet transition-all duration-300">
                        {React.cloneElement(icon as React.ReactElement, { size: 24, className: "sm:w-8 sm:h-8" })}
                    </div>
                    <div className="pb-1 sm:pb-2">
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-lg leading-none uppercase mb-2 group-hover:text-glow-violet transition-all duration-300 text-shadow-md">
                            {title}
                        </h2>
                        <div className="h-1 w-12 sm:w-16 group-hover:w-full bg-cyber-violet rounded-full transition-all duration-700 ease-out"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-8 bg-[#050505]/40 backdrop-blur-md relative border-t border-cyber-violet/20 flex-grow">
            {children}
        </div>
    </div>
);

const MissionBriefing: React.FC<{ icon: React.ReactNode; title: string; buttonText: string; buttonAction: () => void; children: React.ReactNode; titleTooltip?: string }> = ({ icon, title, buttonText, buttonAction, children, titleTooltip }) => (
     <div className="card-arena rounded-xl p-6 md:p-8 text-center bg-gradient-to-b from-gray-900/80 to-[#050505]/80 border border-white/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="relative z-10">
            <div className="text-3xl md:text-4xl text-acid-green mx-auto mb-4 animate-pulse">{icon}</div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">{children}</p>
            <button
                onClick={buttonAction}
                title={titleTooltip}
                className="btn-gamer-start mt-6 md:mt-8 inline-flex items-center justify-center gap-2 font-bold py-2.5 px-6 rounded-lg text-sm md:text-base"
            >
                {buttonText} <FiArrowRight />
            </button>
        </div>
    </div>
);

const ExecutionZonePage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "TRADING ARENA | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Entrena, juega y domina el mercado en la Trading Arena. Sube de nivel tus habilidades con nuestros simuladores y herramientas de entrenamiento sin riesgo.");
        }
    }, []);

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20 gamer-zone-bg min-h-screen">
                {/* Hero */}
                <AnimatedSection className="relative bg-[#050505] text-white py-20 sm:py-32 overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20 mix-blend-soft-light pointer-events-none bg-grid-pattern"></div>
                     <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#050505]/80 to-[#050505]"></div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                            {/* Text Content */}
                            <div className="text-center lg:text-left pt-10 sm:pt-0 flex-1">
                                <div className="absolute top-6 left-6 sm:top-8 sm:left-8 lg:static lg:mb-8">
                                    <PageBackButton variant="on-dark" />
                                </div>
                                <div className="inline-block mb-4 px-4 py-1 rounded-full border border-cyber-violet/30 bg-cyber-violet/10 text-cyber-violet text-xs sm:text-sm font-mono tracking-widest animate-pulse">
                                    SYSTEM STATUS: ONLINE
                                </div>
                                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(188,19,254,0.3)] uppercase">
                                    TRADING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-violet to-electric-blue">ARENA 🎮</span>
                                </h1>
                                 <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-gray-300 tracking-wider">Entrena, Juega y Domina el Mercado. <span className="text-acid-green">Sube de Nivel.</span></h2>
                                <p className="mt-6 max-w-2xl text-base sm:text-lg text-gray-400 border-l-2 border-cyber-violet pl-6 text-left italic">
                                   "Zona de entrenamiento libre de riesgo. Usa estas herramientas para afilar tus habilidades antes de enfrentarte al Boss Final: el Mercado Real."
                                </p>
                            </div>
                            
                            {/* Mascot Image - Setup Owl */}
                            <div className="flex-shrink-0 lg:mr-12">
                                <img 
                                    src="https://i.pinimg.com/originals/2d/38/8a/2d388a302dfe24bfd798842a10db81b2.jpg" 
                                    alt="Mascota TradeVision en Setup" 
                                    className="w-64 md:w-80 rounded-2xl border-2 border-cyber-violet shadow-[0_0_40px_rgba(188,19,254,0.3)] hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Modules Section */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24 max-w-5xl relative z-10">
                    
                    {/* NIVEL 1: CALIBRACIÓN MENTAL */}
                    <AnimatedSection id="module-1">
                        <ModuleWrapper 
                            level={1} 
                            title="CALIBRACIÓN MENTAL" 
                            icon={<FaBrain />}
                            imageUrl="https://i.pinimg.com/1200x/28/27/03/2827035b814c84f6596a533b8f142b76.jpg"
                        >
                            <MindsetQuiz />
                        </ModuleWrapper>
                    </AnimatedSection>
                    
                    <AnimatedSection>
                         <MissionBriefing 
                            icon={<FiAward />}
                            title="MISIÓN PRINCIPAL: EQUIPAMIENTO PRO"
                            buttonText="VER ARSENAL PRO"
                            buttonAction={() => navigate('/premium-courses')}
                        >
                            Has evaluado tu mentalidad. Ahora, equípate con nuestro arsenal de sistemas de ejecución profesional para dominar el campo de batalla.
                        </MissionBriefing>
                    </AnimatedSection>
                    
                    {/* NIVEL 2: RECONOCIMIENTO TÁCTICO */}
                    <AnimatedSection id="module-2">
                        <ModuleWrapper 
                            level={2} 
                            title="RECONOCIMIENTO TÁCTICO" 
                            icon={<FaScroll />}
                            imageUrl="https://i.pinimg.com/1200x/20/de/61/20de61b6a5276bcf5988b46805b8ffad.jpg"
                        >
                            <ExecutionPatterns />
                        </ModuleWrapper>
                    </AnimatedSection>

                    <AnimatedSection>
                        <MissionBriefing
                            icon={<FiUsers />}
                            title="MISIÓN SECUNDARIA: UNIRSE AL CLAN"
                            buttonText="RECLUTAMIENTO"
                            buttonAction={() => navigate('/comunidad')}
                        >
                            Refuerza tu disciplina en nuestro campo de entrenamiento. Únete a miles de traders que comparten tu compromiso con el profesionalismo.
                        </MissionBriefing>
                    </AnimatedSection>

                    {/* NIVEL 3: MODO ENTRENAMIENTO */}
                    <AnimatedSection id="module-3">
                        <ModuleWrapper 
                            level={3} 
                            title="MODO ENTRENAMIENTO" 
                            icon={<FaCrosshairs />}
                            imageUrl="https://i.pinimg.com/1200x/68/5a/14/685a1402457de41d3dd410e733bad8a3.jpg"
                        >
                            <BinaryExecutionControl />
                        </ModuleWrapper>
                    </AnimatedSection>
                    
                    {/* NIVEL 4: MEJORA DE HABILIDADES */}
                    <AnimatedSection id="module-4">
                        <ModuleWrapper 
                            level={4} 
                            title="MEJORA DE HABILIDADES" 
                            icon={<FaTrophy />}
                            imageUrl="https://i.pinimg.com/1200x/98/59/d3/9859d3374c8de660a04f52cf276132c6.jpg"
                        >
                            <AdvancedMindset />
                        </ModuleWrapper>
                    </AnimatedSection>

                    {/* NIVEL 5: POTENCIADOR DE XP */}
                    <AnimatedSection id="module-5">
                         <ModuleWrapper 
                            level={5} 
                            title="POTENCIADOR DE XP" 
                            icon={<FaGamepad />}
                            imageUrl="https://i.pinimg.com/1200x/4e/d1/40/4ed140f9e51ef33678afa4ec9b6577f8.jpg"
                        >
                            <HighRiskCalculator />
                        </ModuleWrapper>
                    </AnimatedSection>

                    <AnimatedSection id="feedback">
                         <MissionBriefing
                            icon={<FaBug />}
                            title="MISIÓN DE LA COMUNIDAD: REPORTAR UN BUG"
                            buttonText="ENVIAR INFORME"
                            titleTooltip={EMAIL_TOOLTIP}
                            buttonAction={handleEmailClick}
                        >
                             Si encuentras un error o tienes una sugerencia para mejorar la Arena, tu feedback es crucial. Ayúdanos a mejorar la experiencia para todos los jugadores.
                        </MissionBriefing>
                    </AnimatedSection>

                    {/* NIVEL 6: TRADEVISION BATTLEGROUNDS */}
                    <AnimatedSection id="module-6" className="py-12">
                        <div className="bg-radial-dark rounded-xl p-8 sm:p-12 text-center border-2 border-hot-pink/50 shadow-[0_0_30px_rgba(255,0,85,0.4)]">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <div className="text-5xl sm:text-7xl animate-pulse" aria-label="Guardian Owl emoji">🦉</div>
                                <div className="relative">
                                    <div className="speech-bubble bg-gray-800 text-white p-4 rounded-lg border border-electric-blue max-w-sm">
                                        <p className="font-bold text-base sm:text-lg">¿Crees tener Nivel Institucional? Demuéstralo.</p>
                                        <p className="text-acid-green text-sm sm:text-base">Nivel 6 Desbloqueado.</p>
                                    </div>
                                    {/* Arrow pointing to the left (towards owl) on larger screens */}
                                    <div className="hidden sm:block absolute top-1/2 -left-3 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-800"></div>
                                    {/* Arrow pointing up (towards owl) on smaller screens */}
                                    <div className="sm:hidden absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-800"></div>
                                </div>
                            </div>
                            <a 
                                href="battlegrounds.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-battlegrounds inline-flex items-center justify-center gap-3 font-extrabold py-4 px-8 rounded-lg text-lg sm:text-2xl mt-8"
                            >
                                ENTRAR AL BATTLEGROUNDS ⚔️
                            </a>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Final CTA */}
                <AnimatedSection className="py-24 bg-[#050505] text-center border-t border-cyber-violet/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyber-violet/5 mix-blend-overlay"></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col items-center justify-center gap-8">
                            <img 
                                src="https://i.pinimg.com/736x/e5/4e/29/e54e29a7c97a808275412d6e1044786f.jpg" 
                                alt="Mascota TradeVision Bailando" 
                                className="w-40 md:w-56 rounded-full border-4 border-cyber-violet shadow-[0_0_30px_rgba(188,19,254,0.6)] animate-pulse-glow"
                            />
                            <div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white text-glow-violet">¿LISTO PARA LA PARTIDA CLASIFICATORIA?</h2>
                                <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">Has completado el entrenamiento. El siguiente paso es el sistema completo.</p>
                                <button
                                    onClick={() => navigate('/cursos/binarias-pro-c90')}
                                    className="inline-flex items-center justify-center gap-2 bg-acid-green text-[#050505] font-bold py-3 px-8 rounded-lg text-base md:text-lg hover:bg-opacity-90 transition duration-300 transform hover:scale-105 animate-pulse-glow shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                                >
                                    INICIAR MODO CARRERA (C90) <FiArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default ExecutionZonePage;