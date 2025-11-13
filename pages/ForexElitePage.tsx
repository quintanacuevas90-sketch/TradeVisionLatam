import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Accordion from '../components/Accordion';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FaBrain, FaWhatsapp } from 'react-icons/fa';
import { FiBarChart2, FiGitCommit, FiRepeat, FiTarget, FiTrendingUp, FiGlobe, FiUsers, FiDollarSign, FiZapOff, FiArrowLeft } from 'react-icons/fi';
import BenefitCard from '../components/BenefitCard';


const ForexElitePage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Forex Élite: Lógica Institucional | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Deja de ser la liquidez. Aprende a operar junto al 'Dinero Inteligente' con nuestro programa avanzado de Smart Money Concepts (SMC) y domina el mercado.");
        }
    }, []);

    const objectives = [
        { icon: <FiBarChart2 size={24} />, title: "Lógica Pura del Precio", description: "Entenderás por qué se mueve el precio. Dominarás la Acción del Precio (Velas Japonesas) y leerás el mercado como un lenguaje." },
        { icon: <FiGitCommit size={24} />, title: "Estructura y Contexto (BOS/CHoCH)", description: "Aprenderás a leer la estructura del mercado, identificando rompimientos (BOS) y cambios de carácter (CHoCH)." },
        { icon: <FiRepeat size={24} />, title: "El Patrón AMD (El Ciclo del Mercado)", description: "Dominarás el patrón universal (Acumulación, Manipulación, Distribución) y operarás después de la Manipulación." },
        { icon: <FiTarget size={24} />, title: "Zonas de Alta Probabilidad (OB/FVG)", description: "Identificarás con precisión quirúrgica dónde las instituciones colocan sus órdenes (Order Blocks) y las zonas de ineficiencia (Imbalance/FVG)." },
        { icon: <FiTrendingUp size={24} />, title: "Entradas de Precisión (Riesgo/Beneficio)", description: "Aprenderás a ejecutar entradas tras una manipulación de liquidez (Inducement), buscando ratios Riesgo/Beneficio (R/R) de 3:1, 5:1 o más." },
        { icon: <FaBrain size={24} />, title: "Psicotrading y Disciplina", description: "Aplicarás un Plan de Trading (Bitácora) y la psicología necesaria para gestionar tu capital y tus emociones." },
    ];
    
    const advantages = [
        { icon: <FiGlobe size={24} />, title: "Metodología Universal", description: "Lo que aprendes aquí (SMC) es universal. Te permite operar cualquier mercado (Forex, Cripto, Índices) en cualquier temporalidad." },
        { icon: <FiUsers size={24} />, title: "Acceso a Mentores (Comunidad Privada)", description: "No es un curso grabado y olvidado. Tienes acceso a la Comunidad Privada de Discord y al soporte de José Quintana." },
        { icon: <FiDollarSign size={24} />, title: "Enfoque en Rentabilidad (R/R)", description: "Dejamos de buscar 'ganar siempre' y nos enfocamos en 'ganar más cuando ganamos'. Te enseñamos a arriesgar 1% para ganar 5%." },
        { icon: <FiZapOff size={24} />, title: "Sin Herramientas Mágicas", description: "No dependemos de bots milagrosos ni scripts confusos. Solo pura lógica del precio, disciplina y herramientas profesionales." },
    ];
    
    const faqs = [
        { q: "¿Necesito saber de Binarias para tomar este curso?", a: "No. Este curso es independiente y es la evolución profesional del trading. Recomendamos este programa a traders que ya entienden lo básico pero buscan consistencia real en mercados regulados." },
        { q: "¿Esto es lo mismo que 'Smart Money Concepts' (SMC)?", a: "Sí. Esta es nuestra metodología refinada de Lógica Institucional y Smart Money Concepts (SMC), adaptada por José Quintana para el mercado LATAM. Eliminamos el 'ruido' y nos enfocamos 100% en la ejecución práctica del AMD y los Order Blocks." },
        { q: "¿Qué recibo con el pago de $349 USD?", a: "Recibes acceso vitalicio al programa de videos, acceso a la comunidad privada de Discord/Telegram para alumnos Élite, y soporte directo de nuestro equipo de mentores para tus análisis." },
        { q: "¿Qué brokers necesito para este curso?", a: "Esta metodología funciona en cualquier broker. Sin embargo, para una operativa profesional, recomendamos usar brokers de Forex regulados como Fusion Markets (Regulado ASIC) o plataformas de análisis avanzadas como cTrader y TradingView." },
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
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">ÉLITE INSTITUCIONAL: LÓGICA Y EJECUCIÓN</h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">Deja de ser la liquidez. Aprende a operar junto al 'Dinero Inteligente' (Smart Money) y domina el mercado con la metodología que mueve el 90% del volumen.</p>
                        <p className="text-sm text-gray-400 mb-8">Un programa avanzado diseñado y guiado por José Quintana, Asesor Principal de TradeVision Latam.</p>
                        <a href="https://t.me/trainfxbot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 w-full sm:w-auto transform hover:scale-105 shadow-lg shadow-brand-accent/30">
                            COMPRAR AHORA ($349)
                        </a>
                    </div>
                </AnimatedSection>

                {/* The Problem Section */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Si Estás Estancado, es Porque te Enseñaron Mal.</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">El 90% de los traders minoristas (Retail) pierden dinero porque siguen las mismas reglas obsoletas: saturación de indicadores, soportes y resistencias obvios, y estrategias genéricas. Están operando contra el mercado. El precio no se mueve por azar ni por noticias; se mueve por una sola razón: <strong className="text-brand-accent">LIQUIDEZ</strong>.</p>
                        <div className="mt-6 p-6 bg-white dark:bg-brand-primary rounded-lg border border-gray-200 dark:border-white/10">
                            <h3 className="text-xl font-bold text-brand-accent">El Reseteo Mental</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">Este curso es un reseteo mental completo. Te enseñamos a dejar de ser la carnada (el Retail) y a identificar dónde las instituciones (bancos, fondos) colocan sus trampas (cazas de stop loss) para que puedas operar con ellos, no contra ellos.</p>
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* Objectives Section */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                         <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">¿Qué Vas a Dominar en este Programa?</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">Esto no es un curso de indicadores. Este es un sistema de ejecución profesional basado 100% en la Lógica del Precio y el Smart Money Concepts (SMC).</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {objectives.map(obj => <BenefitCard key={obj.title} icon={obj.icon} title={obj.title} description={obj.description} />)}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Advantages Section */}
                 <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                         <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Las Ventajas de la Formación Élite TradeVision</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {advantages.map(adv => <BenefitCard key={adv.title} icon={adv.icon} title={adv.title} description={adv.description} />)}
                        </div>
                    </div>
                </AnimatedSection>

                {/* FAQ Section */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <h3 className="text-3xl font-bold text-center mb-8 text-brand-primary dark:text-white">Preguntas Frecuentes del Programa Forex</h3>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <Accordion key={index} title={faq.q}>
                                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{faq.a}</p>
                                </Accordion>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Closing CTA Section */}
                <AnimatedSection className="py-24 bg-brand-primary text-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold text-white">Tu Transformación Profesional Comienza Hoy.</h2>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto mb-8">El precio de la ignorancia siempre será mayor que el precio de la educación. Deja de ser la liquidez y únete a la élite.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="https://t.me/trainfxbot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 w-full sm:w-auto transform hover:scale-105">
                                COMPRAR AHORA ($349)
                            </a>
                            <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition duration-300 w-full sm:w-auto">
                                <FaWhatsapp /> Pagar por Soporte Directo
                            </a>
                            <button onClick={() => navigate('/premium-courses')} className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-gray-500 text-gray-300 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-700 hover:border-gray-700 transition duration-300 w-full sm:w-auto">
                                <FiArrowLeft /> Volver a Cursos Premium
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

export default ForexElitePage;