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
import { FiArrowRight, FiBookOpen, FiUsers, FiMail } from 'react-icons/fi';

const ExecutionZonePage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Zona de Ejecución | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Evalúa tu psicología, entrena tu ejecución y calcula tu riesgo en nuestra zona de ejecución interactiva. Forja la disciplina de un trader profesional.");
        }
    }, []);

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20 bg-gray-100 dark:bg-gray-900">
                {/* Hero */}
                <AnimatedSection className="relative bg-brand-primary text-white py-24 sm:py-32">
                    <div className="absolute inset-0 z-0 opacity-10 mix-blend-soft-light pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0,320L48,314.7C96,309,192,299,288,272C384,245,480,203,576,197.3C672,192,768,224,864,240C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128" stroke="currentColor" strokeWidth="4" fill="none" className="text-brand-accent" />
                        </svg>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="absolute top-8 left-8">
                            <PageBackButton variant="on-dark" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Zona de Ejecución</h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
                            La teoría se acabó. Aquí es donde forjas la disciplina, la mentalidad y la precisión de un trader profesional. Completa los 5 niveles para evaluar tu preparación.
                        </p>
                    </div>
                </AnimatedSection>

                {/* Modules Section */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 max-w-5xl">
                    <AnimatedSection id="module-1">
                        <MindsetQuiz />
                    </AnimatedSection>
                    
                    <AnimatedSection>
                        <div className="text-center p-8 bg-white dark:bg-brand-primary rounded-xl shadow-lg border border-gray-200 dark:border-white/10">
                            <FiBookOpen className="text-4xl text-brand-accent mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-brand-primary dark:text-white">¿Listo para pasar de la simulación a la ejecución real?</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Has evaluado tu mentalidad. Ahora, aplica tu disciplina con nuestro sistema de ejecución profesional.</p>
                            <button
                                onClick={() => navigate('/premium-courses')}
                                className="mt-6 inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition"
                            >
                                Ver Colección de Cursos Premium <FiArrowRight />
                            </button>
                        </div>
                    </AnimatedSection>
                    
                    <AnimatedSection id="module-2">
                        <ExecutionPatterns />
                    </AnimatedSection>

                    <AnimatedSection>
                        <div className="text-center p-8 bg-white dark:bg-brand-primary rounded-xl shadow-lg border border-gray-200 dark:border-white/10">
                            <FiUsers className="text-4xl text-brand-accent mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-brand-primary dark:text-white">Refuerza tu disciplina en nuestro campo de entrenamiento.</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Únete a miles de traders que comparten tu compromiso con el profesionalismo.</p>
                            <button
                                onClick={() => navigate('/comunidad')}
                                className="mt-6 inline-flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition"
                            >
                                Únete a la Comunidad Gratuita <FiArrowRight />
                            </button>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection id="module-3">
                        <BinaryExecutionControl />
                    </AnimatedSection>

                    <AnimatedSection>
                        <div className="text-center p-8 bg-white dark:bg-brand-primary rounded-xl shadow-lg border border-gray-200 dark:border-white/10">
                            <h3 className="text-2xl font-bold text-brand-primary dark:text-white">Plataformas de Ejecución Recomendadas por <span translate="no">TRADEVISION</span></h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Utiliza las herramientas adecuadas para practicar en demo o para operar en mercados regulados.</p>
                            <button
                                onClick={() => navigate('/brokers')}
                                className="mt-6 inline-flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition"
                            >
                                Acceder a Plataformas Asociadas (Afiliados) <FiArrowRight />
                            </button>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection id="module-4">
                        <AdvancedMindset />
                    </AnimatedSection>

                    <AnimatedSection id="module-5">
                        <HighRiskCalculator />
                    </AnimatedSection>

                    <AnimatedSection id="feedback">
                        <div className="text-center p-8 bg-white dark:bg-brand-primary rounded-xl shadow-lg border border-gray-200 dark:border-white/10">
                            <FiMail className="text-4xl text-brand-accent mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-brand-primary dark:text-white">PARTICIPA EN LA EVOLUCIÓN DE <span translate="no">TRADEVISION</span></h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Si deseas sugerir cambios o mejoras para la "Zona de Ejecución" o cualquier otro servicio, te invitamos a ser parte de nuestra mejora continua. Envíanos un correo con tu propuesta para que sea evaluada.</p>
                            <a
                                href="mailto:tradevision2026@gmail.com?subject=Sugerencia%20para%20la%20Zona%20de%20Ejecuci%C3%B3n"
                                className="mt-6 inline-flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition"
                            >
                                Sugerir Cambios <FiMail />
                            </a>
                        </div>
                    </AnimatedSection>
                </div>


                {/* Final CTA */}
                <AnimatedSection className="py-24 bg-brand-primary text-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold text-white">¿Listo para la Ejecución Real?</h2>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto mb-8">Has evaluado tu mentalidad, repasado los patrones y calculado tu riesgo. El siguiente paso es el sistema completo.</p>
                        <button
                            onClick={() => navigate('/cursos/binarias-pro-c90')}
                            className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 transform hover:scale-105"
                        >
                            Acceda a la Capacitación C90trade <FiArrowRight />
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