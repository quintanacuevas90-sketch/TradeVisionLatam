
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
import { FiArrowRight, FiBookOpen, FiUsers, FiMail, FiEye, FiCpu } from 'react-icons/fi';
import { FaBrain, FaShieldAlt, FaCalculator } from 'react-icons/fa';
import { handleEmailClick, EMAIL_TOOLTIP } from '../utils/emailHandler';

const ModuleWrapper: React.FC<{ 
    level: number; 
    title: string; 
    icon: React.ReactNode; 
    children: React.ReactNode; 
    imageUrl: string 
}> = ({ level, title, icon, children, imageUrl }) => (
    <div className="cyber-module rounded-xl overflow-hidden group border border-brand-accent/30 hover:border-brand-accent transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(64,224,208,0.2)] flex flex-col">
        {/* Cinematic Header Banner - Optimized height for mobile */}
        <div className="relative h-48 sm:h-[36rem] overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-black">
                <img 
                    src={imageUrl} 
                    alt={`Fondo Nivel ${level}`} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                {/* Gradient Overlays - Reduced opacity for better image visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-primary via-brand-primary/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/70 via-transparent to-transparent opacity-50"></div>
            </div>
            
            <div className="relative z-10 h-full p-4 sm:p-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                     <span className="text-brand-primary font-mono font-black text-[10px] sm:text-xs bg-brand-accent px-2 py-1 rounded shadow-[0_0_10px_rgba(64,224,208,0.6)] tracking-widest uppercase">
                        Acceso Nivel {level}
                    </span>
                    <div className="h-px w-8 sm:w-16 bg-brand-accent/50"></div>
                </div>
               
                <div className="flex items-end gap-4 sm:gap-6 text-white">
                    <div className="p-3 sm:p-5 bg-black/70 rounded-full backdrop-blur-md border border-brand-accent/30 text-brand-accent shadow-lg group-hover:scale-110 group-hover:border-brand-accent transition-all duration-300">
                        {React.cloneElement(icon as React.ReactElement, { size: 24, className: "sm:w-8 sm:h-8" })}
                    </div>
                    <div className="pb-1 sm:pb-2">
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-lg leading-none uppercase mb-2 group-hover:text-glow-turq transition-all duration-300 text-shadow-md">
                            {title}
                        </h2>
                        <div className="h-1 w-12 sm:w-16 group-hover:w-full bg-brand-accent rounded-full transition-all duration-700 ease-out"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-8 bg-brand-primary/40 backdrop-blur-md relative border-t border-brand-accent/20 flex-grow">
            {children}
        </div>
    </div>
);

const MissionBriefing: React.FC<{ icon: React.ReactNode; title: string; buttonText: string; buttonAction: () => void; children: React.ReactNode; titleTooltip?: string }> = ({ icon, title, buttonText, buttonAction, children, titleTooltip }) => (
     <div className="cyber-module rounded-xl p-6 md:p-8 text-center bg-gradient-to-b from-gray-900/80 to-brand-primary/80 border border-white/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="relative z-10">
            <div className="text-3xl md:text-4xl text-brand-accent mx-auto mb-4 animate-pulse">{icon}</div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">{children}</p>
            <button
                onClick={buttonAction}
                title={titleTooltip}
                className="mt-6 md:mt-8 inline-flex items-center justify-center gap-2 bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-primary font-bold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(64,224,208,0.1)] hover:shadow-[0_0_20px_rgba(64,224,208,0.4)] text-sm md:text-base"
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
        document.title = "Zona de Ejecución: Ciberdisciplina | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Evalúa tu psicología, entrena tu ejecución y calcula tu riesgo en nuestra zona de ejecución interactiva. Forja la disciplina de un trader profesional.");
        }
    }, []);

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20 bg-brand-primary min-h-screen">
                {/* Hero */}
                <AnimatedSection className="relative bg-brand-primary text-white py-20 sm:py-32 overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20 mix-blend-soft-light pointer-events-none bg-grid-pattern"></div>
                     <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/50 via-brand-primary/80 to-brand-primary"></div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                            {/* Text Content */}
                            <div className="text-center lg:text-left pt-10 sm:pt-0 flex-1">
                                <div className="absolute top-6 left-6 sm:top-8 sm:left-8 lg:static lg:mb-8">
                                    <PageBackButton variant="on-dark" />
                                </div>
                                <div className="inline-block mb-4 px-4 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-xs sm:text-sm font-mono tracking-widest animate-pulse">
                                    SYSTEM STATUS: ONLINE
                                </div>
                                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(64,224,208,0.3)]">
                                    ZONA DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-500">EJECUCIÓN</span>
                                </h1>
                                <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-gray-400 border-l-2 border-brand-accent pl-6 text-left italic">
                                    "La teoría se acabó. Aquí es donde forjas la disciplina, la mentalidad y la precisión de un trader profesional. Completa los 5 niveles para evaluar tu preparación."
                                </p>
                            </div>
                            
                            {/* Mascot Image - Setup Owl */}
                            <div className="flex-shrink-0 lg:mr-12">
                                <img 
                                    src="https://i.pinimg.com/736x/2d/38/8a/2d388a302dfe24bfd798842a10db81b2.jpg" 
                                    alt="Mascota TradeVision en Setup" 
                                    className="w-64 md:w-80 rounded-2xl border-2 border-brand-accent shadow-[0_0_40px_rgba(64,224,208,0.3)] hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Modules Section */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24 max-w-5xl relative z-10">
                    
                    {/* NIVEL 1: EVALUACIÓN PSICOLÓGICA */}
                    <AnimatedSection id="module-1">
                        <ModuleWrapper 
                            level={1} 
                            title="Evaluación Psicológica" 
                            icon={<FaBrain />}
                            imageUrl="https://i.pinimg.com/1200x/28/27/03/2827035b814c84f6596a533b8f142b76.jpg"
                        >
                            <MindsetQuiz />
                        </ModuleWrapper>
                    </AnimatedSection>
                    
                    <AnimatedSection>
                         <MissionBriefing 
                            icon={<FiBookOpen />}
                            title="Misión: Profesionalización"
                            buttonText="Ver Cursos Premium"
                            buttonAction={() => navigate('/premium-courses')}
                        >
                            Has evaluado tu mentalidad. Ahora, aplica tu disciplina con nuestro sistema de ejecución profesional.
                        </MissionBriefing>
                    </AnimatedSection>
                    
                    {/* NIVEL 2: ENTRENAMIENTO DE PATRONES */}
                    <AnimatedSection id="module-2">
                        <ModuleWrapper 
                            level={2} 
                            title="Entrenamiento de Patrones" 
                            icon={<FiEye />}
                            imageUrl="https://i.pinimg.com/1200x/20/de/61/20de61b6a5276bcf5988b46805b8ffad.jpg"
                        >
                            <ExecutionPatterns />
                        </ModuleWrapper>
                    </AnimatedSection>

                    <AnimatedSection>
                        <MissionBriefing
                            icon={<FiUsers />}
                            title="Misión: Refuerzo Comunitario"
                            buttonText="Unirse a la Comunidad Gratuita"
                            buttonAction={() => navigate('/comunidad')}
                        >
                            Refuerza tu disciplina en nuestro campo de entrenamiento. Únete a miles de traders que comparten tu compromiso con el profesionalismo.
                        </MissionBriefing>
                    </AnimatedSection>

                    {/* NIVEL 3: SIMULADOR DE DISCIPLINA */}
                    <AnimatedSection id="module-3">
                        <ModuleWrapper 
                            level={3} 
                            title="Simulador de Disciplina" 
                            icon={<FaShieldAlt />}
                            imageUrl="https://i.pinimg.com/1200x/68/5a/14/685a1402457de41d3dd410e733bad8a3.jpg"
                        >
                            <BinaryExecutionControl />
                        </ModuleWrapper>
                    </AnimatedSection>
                    
                    {/* NIVEL 4: REPROGRAMACIÓN MENTAL */}
                    <AnimatedSection id="module-4">
                        <ModuleWrapper 
                            level={4} 
                            title="Reprogramación Mental" 
                            icon={<FiCpu />}
                            imageUrl="https://i.pinimg.com/1200x/98/59/d3/9859d3374c8de660a04f52cf276132c6.jpg"
                        >
                            <AdvancedMindset />
                        </ModuleWrapper>
                    </AnimatedSection>

                    {/* NIVEL 5: CÁLCULO DE ALTO RIESGO */}
                    <AnimatedSection id="module-5">
                         <ModuleWrapper 
                            level={5} 
                            title="Cálculo de Alto Riesgo" 
                            icon={<FaCalculator />}
                            imageUrl="https://i.pinimg.com/1200x/4e/d1/40/4ed140f9e51ef33678afa4ec9b6577f8.jpg"
                        >
                            <HighRiskCalculator />
                        </ModuleWrapper>
                    </AnimatedSection>

                    <AnimatedSection id="feedback">
                         <MissionBriefing
                            icon={<FiMail />}
                            title="Participa en la Evolución"
                            buttonText="Sugerir Cambios"
                            titleTooltip={EMAIL_TOOLTIP}
                            buttonAction={handleEmailClick}
                        >
                             Si deseas sugerir mejoras para la "Zona de Ejecución", te invitamos a ser parte de nuestra mejora continua. Envíanos tu propuesta para que sea evaluada.
                        </MissionBriefing>
                    </AnimatedSection>
                </div>

                {/* Final CTA */}
                <AnimatedSection className="py-24 bg-brand-primary text-center border-t border-brand-accent/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-accent/5 mix-blend-overlay"></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col items-center justify-center gap-8">
                            <img 
                                src="https://i.pinimg.com/736x/e5/4e/29/e54e29a7c97a808275412d6e1044786f.jpg" 
                                alt="Mascota TradeVision Bailando" 
                                className="w-40 md:w-56 rounded-full border-4 border-brand-accent shadow-[0_0_30px_rgba(64,224,208,0.6)] animate-pulse-glow"
                            />
                            <div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white text-glow-turq">¿LISTO PARA LA EJECUCIÓN REAL?</h2>
                                <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">Has completado el entrenamiento. El siguiente paso es el sistema completo.</p>
                                <button
                                    onClick={() => navigate('/cursos/binarias-pro-c90')}
                                    className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-base md:text-lg hover:bg-opacity-90 transition duration-300 transform hover:scale-105 animate-pulse-glow shadow-[0_0_20px_rgba(64,224,208,0.4)]"
                                >
                                    Acceder a la Capacitación C90trade <FiArrowRight />
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
