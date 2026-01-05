
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FaBookOpen, FaWhatsapp } from 'react-icons/fa';
import { FiCheck, FiClock, FiCheckSquare, FiShield, FiAlertTriangle, FiArrowLeft, FiCreditCard } from 'react-icons/fi';
import PageBackButton from '../components/PageBackButton';
import SocialProofWidget from '../components/SocialProofWidget';
import WhopCheckoutHandler from '../components/WhopCheckoutHandler';

const BinariasIntermedioPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Curso Intermedio de Binarias ($99) | Deja de Quemar Cuentas | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "¿No eres rentable? Este no es un curso más. Aprende 4 estrategias de alta efectividad y domina el Psicotrading con José Quintana. El sistema para traders estancados.");
        }
    }, []);

    const keyPoints = [
        "4 Estrategias de Alta Efectividad (Basadas en Patrones y Horarios).",
        "Foco Intensivo en Psicotrading (El 80% del éxito).",
        "Ejemplos Reales de cómo operar (y qué NO hacer)."
    ];

    const pilar1 = [
        { icon: <FaBookOpen className="text-brand-accent text-3xl" />, title: "Dominio de Patrones", description: "Aprenderás a identificar los patrones de velas de alta probabilidad que realmente funcionan." },
        { icon: <FiClock className="text-brand-accent text-3xl" />, title: "Dominio de Horarios", description: "Te enseñamos a operar solo cuando el mercado tiene volumen (Sesiones de Londres/NY) y a evitar las zonas 'inestables'." },
        { icon: <FiCheckSquare className="text-brand-accent text-3xl" />, title: "Dominio del Backtesting", description: "Te enseñamos a usar el backtesting al extremo para validar las estrategias y construir confianza real en tu sistema." },
        { icon: <FiShield className="text-brand-accent text-3xl" />, title: "Dominio del Riesgo", description: "La regla de oro: cómo aplicar una gestión de riesgo del 1-5% para sobrevivir a las rachas de pérdidas." }
    ];

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                {/* Hero Section */}
                <AnimatedSection className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden bg-brand-primary">
                    <div className="absolute inset-0 z-0 opacity-10 mix-blend-soft-light pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0,320L48,314.7C96,309,192,299,288,272C384,245,480,203,576,197.3C672,192,768,224,864,240C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128" stroke="currentColor" strokeWidth="4" fill="none" className="text-brand-accent" />
                            <path d="M0,400L48,380C96,360,192,320,288,325.3C384,331,480,384,576,394.7C672,405,768,373,864,362.7C960,352,1056,363,1152,341.3C1248,320,1344,267,1392,240L1440,213" stroke="currentColor" strokeWidth="2" fill="none" className="text-white" />
                        </svg>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
                        <div className="absolute top-8 left-8">
                            <PageBackButton />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 uppercase">SISTEMA DE EJECUCIÓN: BINARIAS INTERMEDIO</h1>
                        
                        <SocialProofWidget variant="binarias-premium" className="mb-6" />

                        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">Para ti, que ya sabes lo básico, pero sigues sin ser rentable.</p>
                        <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mb-8">"Este no es un curso más. Es el sistema diseñado para sacarte del estancamiento, eliminar la improvisación y forjar la mentalidad correcta."</p>
                        
                        <ul className="flex flex-col sm:flex-row justify-center gap-x-6 gap-y-2 text-gray-200 mb-8">
                            {keyPoints.map(point => <li key={point} className="flex items-center gap-2"><FiCheck className="text-brand-accent"/> {point}</li>)}
                        </ul>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {/* INTEGRACIÓN DE WHOP CHECKOUT */}
                            <WhopCheckoutHandler 
                                planId="plan_ojropXjBUERKG"
                                /* Fix: Removed isLoading from parameters as WhopCheckoutHandler only provides 'open' function to trigger */
                                trigger={(open) => (
                                    <button 
                                        onClick={open}
                                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-accent to-blue-600 text-brand-primary font-black py-4 px-10 rounded-xl text-xl hover:opacity-90 transition duration-300 w-full sm:w-auto transform hover:scale-105 shadow-xl shadow-brand-accent/20"
                                    >
                                        <FiCreditCard /> INICIAR INSCRIPCIÓN ($99)
                                    </button>
                                )}
                            />
                            
                            <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-whatsapp-green text-whatsapp-green font-bold py-3.5 px-8 rounded-xl text-lg hover:bg-whatsapp-green hover:text-white transition duration-300 w-full sm:w-auto">
                                <FaWhatsapp /> Soporte e Inscripción Manual
                            </a>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Secciones de contenido omitidas para brevedad, permanecen igual */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white uppercase">I. ¿Por Qué Sigues Quemando Cuentas?</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">"Si no eres rentable, no es (solo) tu estrategia. Es tu mentalidad. Estás operando con miedo, avaricia o venganza. Este curso está diseñado para romper ese ciclo."</p>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white uppercase">II. La Clave Maestra: 80% Mente, 20% Estrategia</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-brand-accent uppercase">Pilar 1: Las 4 Estrategias (El 20% Técnico)</h3>
                                {pilar1.map(item => (
                                    <div key={item.title} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">{item.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-lg text-brand-primary dark:text-white">{item.title}</h4>
                                            <p className="text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-2xl border-2 border-brand-accent shadow-lg">
                                <h3 className="text-2xl font-bold text-brand-accent uppercase">Pilar 2: El Psicotrading (El 80% Mental)</h3>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">Aquí es donde fallan el 99% de los cursos. Te enseñamos a dominar el FOMO, la impaciencia y el miedo.</p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Closing CTA Section */}
                <AnimatedSection className="py-24 bg-brand-primary text-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold text-white uppercase">La Consistencia está a una Decisión.</h2>
                        <div className="mt-8">
                            <p className="text-5xl font-black text-white mt-2">$99 <span className="text-2xl font-bold text-brand-accent">USD</span></p>
                            <p className="mt-4 text-red-500 font-black tracking-widest uppercase">🚨 ¡SOLO 20 CUPOS DISPONIBLES ESTE MES!</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                            <WhopCheckoutHandler 
                                planId="plan_ojropXjBUERKG"
                                /* Fix: Removed isLoading from parameters as WhopCheckoutHandler only provides 'open' function to trigger */
                                trigger={(open) => (
                                    <button 
                                        onClick={open}
                                        className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-black py-4 px-10 rounded-xl text-xl hover:bg-white transition duration-300 w-full sm:w-auto transform hover:scale-105"
                                    >
                                        INICIAR SISTEMA DE EJECUCIÓN
                                    </button>
                                )}
                            />
                            <button onClick={() => navigate('/premium-courses')} className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-gray-500 text-gray-300 font-bold py-3 px-8 rounded-xl text-lg hover:bg-gray-700 hover:border-gray-700 transition duration-300 w-full sm:w-auto">
                                <FiArrowLeft /> Volver al Catálogo
                            </button>
                        </div>
                    </div>
                </AnimatedSection>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default BinariasIntermedioPage;
