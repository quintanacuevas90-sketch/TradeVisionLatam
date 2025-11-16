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

const ModuleWrapper: React.FC<{ level: number; title: string; icon: React.ReactNode; children: React.ReactNode; }> = ({ level, title, icon, children }) => (
    <div className="cyber-module rounded-xl overflow-hidden">
        <div className="module-header p-4 flex items-center gap-4">
            <span className="text-brand-accent font-mono font-black text-xl bg-black/50 px-3 py-1">NIVEL {level}</span>
            <div className="flex items-center gap-3 text-white">
                {icon}
                <h2 className="text-xl font-extrabold tracking-wider">{title}</h2>
            </div>
        </div>
        <div className="p-4 sm:p-8">
            {children}
        </div>
    </div>
);

const MissionBriefing: React.FC<{ icon: React.ReactNode; title: string; buttonText: string; buttonAction: () => void; children: React.ReactNode; }> = ({ icon, title, buttonText, buttonAction, children }) => (
     <div className="cyber-module rounded-xl p-8 text-center">
        <div className="text-4xl text-brand-accent mx-auto mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-gray-400 max-w-2xl mx-auto">{children}</p>
        <button
            onClick={buttonAction}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition"
        >
            {buttonText} <FiArrowRight />
        </button>
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
            <main className="pt-20 bg-brand-primary">
                {/* Hero */}
                <AnimatedSection className="relative bg-brand-primary text-white py-24 sm:py-32">
                    <div className="absolute inset-0 z-0 opacity-10 mix-blend-soft-light pointer-events-none bg-grid-pattern"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/50 to-brand-primary"></div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="absolute top-8 left-8">
                            <PageBackButton variant="on-dark" />
                        </div>
                        <div className="pt-12 sm:pt-0">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-glow-turq">ZONA DE EJECUCIÓN: CIBERDISCIPLINA</h1>
                            <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
                                La teoría se acabó. Aquí es donde forjas la disciplina, la mentalidad y la precisión de un trader profesional. Completa los 5 niveles para evaluar tu preparación.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Modules Section */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 max-w-5xl">
                    <AnimatedSection id="module-1">
                        <ModuleWrapper level={1} title="Evaluación Psicológica" icon={<FaBrain size={24} />}>
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
                    
                    <AnimatedSection id="module-2">
                        <ModuleWrapper level={2} title="Entrenamiento de Patrones" icon={<FiEye size={24} />}>
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

                    <AnimatedSection id="module-3">
                        <ModuleWrapper level={3} title="Simulador de Disciplina" icon={<FaShieldAlt size={24} />}>
                            <BinaryExecutionControl />
                        </ModuleWrapper>
                    </AnimatedSection>
                    
                    <AnimatedSection id="module-4">
                        <ModuleWrapper level={4} title="Reprogramación Mental" icon={<FiCpu size={24} />}>
                            <AdvancedMindset />
                        </ModuleWrapper>
                    </AnimatedSection>

                    <AnimatedSection id="module-5">
                         <ModuleWrapper level={5} title="Cálculo de Alto Riesgo" icon={<FaCalculator size={24} />}>
                            <HighRiskCalculator />
                        </ModuleWrapper>
                    </AnimatedSection>

                    <AnimatedSection id="feedback">
                         <MissionBriefing
                            icon={<FiMail />}
                            title="Participa en la Evolución"
                            buttonText="Sugerir Cambios"
                            buttonAction={() => window.open("mailto:tradevision2026@gmail.com?subject=Sugerencia%20para%20la%20Zona%20de%20Ejecuci%C3%B3n")}
                        >
                             Si deseas sugerir mejoras para la "Zona de Ejecución", te invitamos a ser parte de nuestra mejora continua. Envíanos tu propuesta para que sea evaluada.
                        </MissionBriefing>
                    </AnimatedSection>
                </div>

                {/* Final CTA */}
                <AnimatedSection className="py-24 bg-brand-primary text-center border-t border-brand-accent/20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold text-white text-glow-turq">¿LISTO PARA LA EJECUCIÓN REAL?</h2>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto mb-8">Has completado el entrenamiento. El siguiente paso es el sistema completo.</p>
                        <button
                            onClick={() => navigate('/cursos/binarias-pro-c90')}
                            className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 transform hover:scale-105 animate-pulse-glow"
                        >
                            Acceder a la Capacitación C90trade <FiArrowRight />
                        </button>
                    </div>
                </AnimatedSection>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default ExecutionZonePage;