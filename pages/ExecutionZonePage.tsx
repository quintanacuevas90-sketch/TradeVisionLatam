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
import { FiArrowRight, FiUsers, FiAward } from 'react-icons/fi';
import { FaBrain, FaShieldAlt, FaCrosshairs, FaGamepad, FaTrophy, FaBolt, FaBug, FaScroll, FaCrown, FaGem, FaFileContract } from 'react-icons/fa';
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
                        {/* Fix: Cast icon to any to allow size and className props during cloneElement */}
                        {React.cloneElement(icon as React.ReactElement<any>, { size: 24, className: "sm:w-8 sm:h-8" })}
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
                                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(188,19,254,0.3)] uppercase leading-snug md:leading-tight">
                                    TRADING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-violet to-electric-blue">ARENA 🎮</span>
                                </h1>
                                 <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-gray-300 tracking-wider">Entrena, Juega y Domina el Mercado. <span className="text-acid-green">Sube de Nivel.</span></h2>
                                <p className="mt-6 max-w-2xl text-base sm:text-lg text-gray-400 border-l-2 border-cyber-violet pl-6 text-left italic">
                                   "Zona de entrenamiento libre de riesgo. Usa estas herramientas para afilar tus habilidades antes de enfrentarte al Boss Final: el Mercado Real."
                                </p>
                                {/* HALL OF FAME BUTTON */}
                                <div className="mt-8 text-center lg:text-left">
                                    <button 
                                        onClick={() => navigate('/hall-of-fame')}
                                        className="inline-flex items-center gap-3 bg-[#FFD700]/10 border border-[#FFD700] hover:bg-[#FFD700] hover:text-black text-[#FFD700] px-6 py-3 rounded-lg font-bold transition-all duration-300 group"
                                    >
                                        <FaTrophy className="text-xl group-hover:scale-110 transition-transform" />
                                        <span>VER A LOS INMORTALES</span>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Mascot Image - Setup Owl - UPDATED */}
                            <div className="flex-shrink-0 lg:mr-12">
                                <img 
                                    src="https://i.pinimg.com/736x/2d/38/8a/2d388a302dfe24bfd798842a10db81b2.jpg" 
                                    alt="Mascota zona de ejecución" 
                                    width="500" 
                                    height="500" 
                                    className="w-64 md:w-80 rounded-full border-4 border-cyber-violet shadow-[0_0_40px_rgba(188,19,254,0.3)] hover:scale-105 transition-transform duration-500 object-cover aspect-square"
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
                            title="CALIBRACIÓN: LA MENTE" 
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
                            title="TÁCTICA: PATRONES" 
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
                            title="EJECUCIÓN: SIMULADOR" 
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
                            title="DOMINIO: PSICOTRADING" 
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
                            title="ESTRATEGIA: RIESGO" 
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

                    {/* NIVEL 6: TRADEVISION BATTLEGROUNDS - GOLD EDITION PRE-LOBBY */}
                    <AnimatedSection id="module-6" className="py-12">
                        <div className="bg-radial-dark rounded-xl p-2 sm:p-4 text-center border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                            
                            {/* --- EL DESAFÍO "PERFECT RUN": SOLO PARA LEYENDAS --- */}
                            <div className="relative overflow-hidden rounded-xl border-2 border-[#FFD700] bg-gradient-to-br from-[#0a192f] to-black p-6 sm:p-10 shadow-[0_0_40px_rgba(255,215,0,0.1)] text-left max-w-4xl mx-auto">
                                
                                {/* Glow effects */}
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-[#FFD700] opacity-10 blur-3xl rounded-full animate-pulse"></div>
                                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-brand-accent opacity-10 blur-3xl rounded-full"></div>

                                {/* Header */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 border-b border-[#FFD700]/30 pb-4">
                                    <div className="p-3 bg-[#FFD700]/10 rounded-full border border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                                        <FaCrown className="text-[#FFD700] text-3xl sm:text-4xl animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#FFD700] uppercase tracking-widest leading-tight text-shadow-sm">
                                            ⚠️ AVISO DE ALTO NIVEL
                                        </h3>
                                        <p className="text-gray-400 text-xs sm:text-sm font-mono mt-1 tracking-wide">¿BUSCAS LA GLORIA O SOLO APROBAR?</p>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                                    <p>Escucha bien, Trader. El Nivel 6 es la barrera final, pero para algunos, es la consagración. La mayoría intentará sobrevivir... pero en <strong className="text-white" translate="no">TradeVision</strong> buscamos la <strong className="text-[#FFD700]">Excelencia</strong>.</p>
                                    <p>Si logras superar las Fases (El Escudo, La Espada y La Batalla) <strong className="text-white bg-red-900/30 px-1 rounded">sin reiniciar el sistema</strong>, sin caer en "Margin Call" y con una ejecución IMPECABLE, no solo ganarás el nivel.</p>
                                    <p className="italic text-gray-400">Te ganarás un lugar en la historia.</p>
                                </div>

                                {/* Rewards */}
                                <div className="mt-8 bg-black/40 p-5 rounded-xl border border-[#FFD700]/30 backdrop-blur-md">
                                    <h4 className="text-[#FFD700] font-bold text-xs uppercase mb-4 tracking-widest border-b border-[#FFD700]/20 pb-2 inline-block">RECOMPENSAS EXCLUSIVAS "PERFECT RUN":</h4>
                                    <ul className="space-y-3 text-sm text-gray-200">
                                        <li className="flex items-start gap-3">
                                            <FaFileContract className="text-[#FFD700] text-lg mt-0.5 flex-shrink-0" /> 
                                            <span><strong className="text-white">Certificado Oficial "Master Trader Elite":</strong> Acreditación digital firmada.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaGem className="text-[#FFD700] text-lg mt-0.5 flex-shrink-0" /> 
                                            <span><strong className="text-white">Inmortalidad en la Pizarra:</strong> Tu nombre en el Hall de la Fama.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaShieldAlt className="text-[#FFD700] text-lg mt-0.5 flex-shrink-0" /> 
                                            <span><strong className="text-white">Insignia "Owl Black":</strong> Distintivo único para la comunidad.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Disclaimer */}
                                <p className="mt-6 text-xs text-gray-500 italic text-center">
                                    El mercado no perdona errores. Si crees que tienes el temple de acero y la disciplina de un francotirador...
                                </p>

                                {/* CTA Buttons */}
                                <div className="mt-8 flex flex-col items-center gap-4">
                                    <button
                                        onClick={() => navigate('/battlegrounds')}
                                        className="relative w-full sm:w-auto bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#E5C100] text-black font-black py-4 px-8 rounded-lg text-base sm:text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] hover:scale-105 transition-all duration-300 group overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            ACEPTO EL RETO: VOY POR EL PERFECT RUN 🚀
                                        </span>
                                        <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                                    </button>
                                    
                                    <button
                                        onClick={() => navigate('/battlegrounds')}
                                        className="text-xs sm:text-sm text-gray-500 hover:text-gray-300 underline transition-colors"
                                    >
                                        O ingresa normalmente si solo quieres practicar.
                                    </button>
                                </div>
                            </div>
                            {/* --- END CHALLENGE BLOCK --- */}

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