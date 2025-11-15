
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FaWhatsapp } from 'react-icons/fa';
import { FiBarChart2, FiShield, FiBookOpen, FiDollarSign, FiTool, FiCpu, FiArrowLeft } from 'react-icons/fi';
import PageBackButton from '../components/PageBackButton';

interface PromptRoleCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const PromptRoleCard: React.FC<PromptRoleCardProps> = ({ icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
        <div className="flex-shrink-0 text-brand-accent text-2xl mt-1">{icon}</div>
        <div>
            <h4 className="font-bold text-lg text-brand-primary dark:text-white">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    </div>
);

const AiManualPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Manual IA: Ingeniería de Prompts | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Accede al manual que te da 10 asesores de IA expertos. Aprende los 6 prompts maestros para automatizar tu análisis de trading, gestión de riesgo y más.");
        }
    }, []);
    
    const promptRoles = [
        { icon: <FiBarChart2 />, title: "Análisis de Volumen y Order Block", description: "Detecta zonas de alta liquidez y la huella institucional en el mercado." },
        { icon: <FiShield />, title: "Gestión de Riesgo", description: "Calcula y gestiona el riesgo de forma automática para cuentas de CFD trading." },
        { icon: <FiBookOpen />, title: "Análisis Fundamental", description: "Monitorea calendarios económicos y noticias de alto impacto para anticipar la volatilidad." },
        { icon: <FiDollarSign />, title: "Análisis Smart Money (SMC)", description: "Identifica Imbalances (FVG) y la lógica del dinero inteligente para entradas de precisión." },
        { icon: <FiTool />, title: "Soporte Técnico Avanzado", description: "Resuelve problemas de vinculación, latencia y configuración en MetaTrader 4 y 5." },
        { icon: <FiCpu />, title: "Ingeniero de Prompts", description: "El rol maestro: aprende a pedirle a la IA que te genere nuevos prompts para cualquier estrategia que necesites." }
    ];

    const manualPurchaseLink = "https://wa.me/message/T6UFHN3SSTIEJ1?text=Hola,%20quisiera%20comprar%20el%20Manual%20de%20Ingeniería%20de%20Prompts%20por%20$15.";


    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                {/* Hero Section */}
                <AnimatedSection className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden bg-brand-primary">
                     <div className="absolute inset-0 z-0 opacity-10 mix-blend-soft-light pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0,320L48,314.7C96,309,192,299,288,272C384,245,480,203,576,197.3C672,192,768,224,864,240C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128" stroke="currentColor" strokeWidth="4" fill="none" className="text-brand-accent" />
                        </svg>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
                         <div className="absolute top-8 left-8">
                            <PageBackButton variant="on-dark" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">Manual de Ingeniería de Prompts para la Mente Maestra del Trading</h1>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">Reduce una década de aprendizaje a un año de automatización. Convierte a tu IA en un equipo de 10 asesores expertos que trabajan para ti 24/7.</p>
                        <a href={manualPurchaseLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 transform hover:scale-105 shadow-lg shadow-brand-accent/30">
                            Obtener el Manual Ahora ($15 USD)
                        </a>
                    </div>
                </AnimatedSection>

                {/* What is it Section */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Automatiza tu Análisis, No tu Disciplina</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">"Desde 2022, la IA ha sido el pilar de nuestra estrategia interna en TradeVision. No es un 'bot mágico', es una herramienta de productividad extrema. Este manual no te enseña a hacer clic; te enseña a PENSAR y a darle a tu IA las instrucciones precisas para que se convierta en tu analista personal."</p>
                        <p className="mt-4 font-bold text-gray-700 dark:text-gray-200">- José Quintana, Asesor Principal</p>
                    </div>
                </AnimatedSection>
                
                {/* Prompts Section */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Los 6 Prompts Maestros que Transformarán tu Trading</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">Cada prompt convierte a tu IA (GPT-4, Deepseek, Gemini) en un especialista diferente. Trabajan en conjunto para darte una visión 360° del mercado.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {promptRoles.map(role => <PromptRoleCard key={role.title} {...role} />)}
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* CTA Section */}
                <AnimatedSection className="py-24 bg-brand-primary text-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold text-white">Tu Inversión Más Rentable.</h2>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Por menos de lo que arriesgas en una mala operación, obtén el sistema que automatizará tu análisis para siempre.</p>
                        <div className="mt-8">
                             <p className="text-lg text-gray-400">Precio de Lanzamiento (Tiempo Limitado)</p>
                             <p className="text-5xl font-black text-white mt-2">$15 <span className="text-2xl font-bold">USD</span></p>
                             <p className="text-sm font-bold text-gray-300">(Pago Único)</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                            <a href={manualPurchaseLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 w-full sm:w-auto transform hover:scale-105">
                                Comprar el Manual Ahora
                            </a>
                            <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition duration-300 w-full sm:w-auto">
                                <FaWhatsapp /> Pagar por Soporte Directo
                            </a>
                        </div>
                         <div className="text-center mt-12">
                            <button
                                onClick={() => navigate('/premium-courses')}
                                className="inline-flex items-center justify-center gap-2 text-gray-300 font-bold py-3 px-8 rounded-lg text-lg hover:text-white transition duration-300"
                            >
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

export default AiManualPage;
