import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FaWhatsapp, FaLock, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import { FiBarChart2, FiShield, FiBookOpen, FiDollarSign, FiTool, FiCpu, FiArrowLeft, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';
import PageBackButton from '../components/PageBackButton';
import SocialProofWidget from '../components/SocialProofWidget';

interface PromptRoleCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const PromptRoleCard: React.FC<PromptRoleCardProps> = ({ icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 opacity-90 hover:opacity-100 transition-opacity">
        <div className="flex-shrink-0 text-brand-accent text-2xl mt-1">{icon}</div>
        <div>
            <h4 className="font-bold text-lg text-gray-700 dark:text-gray-300">{title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-500">{description}</p>
        </div>
    </div>
);

const AiManualPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    // --- SCARCITY LOGIC START ---
    const OFFER_DURATION = 180; // 3 minutes in seconds
    const STORAGE_KEY = 'tv_manual_offer_expiry_v2'; // Unique key for this offer

    const [timeLeft, setTimeLeft] = useState<number>(OFFER_DURATION);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        // 1. Check for existing expiry timestamp
        const storedExpiry = localStorage.getItem(STORAGE_KEY);
        const now = Date.now();

        if (storedExpiry) {
            const expiryTime = parseInt(storedExpiry, 10);
            const remaining = Math.ceil((expiryTime - now) / 1000);

            if (remaining <= 0) {
                setTimeLeft(0);
                setIsExpired(true);
            } else {
                setTimeLeft(remaining);
            }
        } else {
            // 2. Set new expiry if none exists
            const newExpiry = now + (OFFER_DURATION * 1000);
            localStorage.setItem(STORAGE_KEY, newExpiry.toString());
            setTimeLeft(OFFER_DURATION);
        }
    }, []);

    useEffect(() => {
        // 3. Countdown Interval
        if (isExpired) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsExpired(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isExpired]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };
    // --- SCARCITY LOGIC END ---

    useEffect(() => {
        document.title = "Pre-Venta Exclusiva: Manual IA V2.0 | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Acceso Anticipado al Protocolo de Prompts V2.0. Asegura tu copia con precio preferencial de Pre-Venta antes del lanzamiento oficial.");
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

    const preOrderLink = "https://wa.me/message/T6UFHN3SSTIEJ1?text=Hola%2C%20quiero%20asegurar%20mi%20copia%20del%20Manual%20IA%20V2.0%20en%20Pre-Venta%20por%20$19.99%20USD.";
    
    // Rescue Link for expired users
    const rescueLink = "https://wa.me/message/T6UFHN3SSTIEJ1?text=Hola%20equipo%20TradeVision%20Latam.%20Mi%20contador%20de%20oferta%20expir%C3%B3%20mientras%20le%C3%ADa.%20Por%20favor%2C%20%C2%BFpueden%20reactivarme%20el%20link%20de%20%2419.99%20para%20el%20Manual%20de%20Prompts%3F";

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            
            <main className="pt-20">
                {/* Hero Section */}
                <AnimatedSection className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden bg-gray-900">
                     <div className="absolute inset-0 z-0 opacity-10 mix-blend-soft-light pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0,320L48,314.7C96,309,192,299,288,272C384,245,480,203,576,197.3C672,192,768,224,864,240C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-600" />
                        </svg>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
                         <div className="absolute top-8 left-8">
                            <PageBackButton variant="on-dark" />
                        </div>
                        
                        {!isExpired ? (
                            <div className="inline-block mb-6 px-4 py-1 rounded-full border border-brand-accent/50 bg-brand-accent/10 text-brand-accent text-sm font-bold tracking-widest animate-pulse">
                                🚀 ACCESO ANTICIPADO HABILITADO
                            </div>
                        ) : (
                            <div className="inline-block mb-6 px-4 py-1 rounded-full border border-red-500/50 bg-red-900/20 text-red-500 text-sm font-bold tracking-widest">
                                🔒 OFERTA CERRADA
                            </div>
                        )}

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                            ACCESO ANTICIPADO: Protocolo de Prompts V2.0
                        </h1>

                        <SocialProofWidget variant="manual" className="mb-8" />

                        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                            Estamos actualizando nuestro motor de IA. Únete a la lista de espera prioritaria y asegura tu copia antes del lanzamiento oficial.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a 
                                href={!isExpired ? preOrderLink : '#pricing-box'}
                                target={!isExpired ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    if(isExpired) {
                                        e.preventDefault();
                                        document.getElementById('pricing-box')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className={`inline-flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-lg transform ${
                                    !isExpired 
                                    ? "bg-brand-accent text-brand-primary hover:bg-opacity-90 hover:scale-105 shadow-brand-accent/30"
                                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {!isExpired ? "ASEGURAR MI COPIA AHORA ($19.99)" : "OFERTA EXPIRADA"}
                            </a>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">Entrega programada para el lanzamiento oficial. Prioridad de descarga garantizada.</p>
                    </div>
                </AnimatedSection>

                {/* What is it Section */}
                <AnimatedSection className="py-20 bg-gray-100 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Automatiza tu Análisis, No tu Disciplina</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            "La IA no es un 'bot mágico', es una herramienta de productividad extrema que evoluciona cada semana. Este manual ya no es estático; se ha convertido en una <strong>Suite Evolutiva</strong> que actualizamos constantemente para adaptarse a los nuevos modelos de lenguaje."
                        </p>
                        <p className="mt-4 font-bold text-gray-700 dark:text-gray-200">- José Quintana, Asesor Principal</p>
                    </div>
                </AnimatedSection>
                
                {/* Prompts Section */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Arquitectura de Prompts Dinámicos para Trading Institucional</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                Una estructura viva que cubre múltiples áreas del trading profesional, adaptada a la volatilidad del mercado actual.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {promptRoles.map(role => <PromptRoleCard key={role.title} {...role} />)}
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* CTA & Trust Section */}
                <AnimatedSection id="pricing-box" className="py-24 bg-gray-900 text-center border-t border-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">La Herramienta está Evolucionando.</h2>
                        <p className="text-lg text-gray-400 mb-8">Asegúrala antes que nadie a un precio irrepetible.</p>
                        
                        {/* Pricing Box Container */}
                        <div className={`bg-gray-800/50 p-8 rounded-2xl border mb-8 relative overflow-hidden transition-all duration-500 ${isExpired ? 'border-red-900 grayscale-[0.5]' : 'border-gray-700'}`}>
                            
                            {!isExpired && (
                                <div className="absolute top-0 right-0 bg-brand-accent text-brand-primary text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    PRE-VENTA LIMITADA
                                </div>
                            )}
                            
                            {/* --- SCARCITY TIMER UI --- */}
                            {!isExpired ? (
                                <div className="mb-4 flex flex-col items-center">
                                    <span className="text-[10px] md:text-xs font-bold text-red-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                        <FiClock /> Tiempo Restante para Precio de Lista de Espera
                                    </span>
                                    <div className={`font-mono text-4xl md:text-5xl font-black text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)] ${timeLeft < 30 ? 'animate-pulse' : ''}`}>
                                        {formatTime(timeLeft)}
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6 p-4 bg-red-900/40 border border-red-600 rounded-lg animate-pulse">
                                    <div className="flex flex-col items-center text-red-500">
                                        <FaExclamationTriangle className="text-3xl mb-2" />
                                        <span className="font-extrabold uppercase text-lg">Ventana de Oportunidad Cerrada</span>
                                        <span className="text-sm text-red-300">El sistema ha reasignado tu cupo a otro usuario.</span>
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex flex-col items-center justify-center mb-6">
                                <span className={`text-gray-500 text-lg line-through mb-1 decoration-red-500 decoration-2`}>Precio Regular: $29.99 USD</span>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-5xl font-black ${isExpired ? 'text-gray-600 line-through' : 'text-brand-accent'}`}>
                                        $19.99
                                    </span>
                                    <span className={`text-xl font-bold ${isExpired ? 'text-gray-600' : 'text-white'}`}>USD</span>
                                </div>
                                {!isExpired && (
                                    <p className="text-sm text-yellow-500 font-semibold mt-2 bg-yellow-500/10 px-3 py-1 rounded-full">
                                        Oferta válida solo para los primeros 50 registros en lista de espera
                                    </p>
                                )}
                            </div>

                            {!isExpired ? (
                                <a 
                                    href={preOrderLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full block bg-brand-accent text-brand-primary font-bold py-4 px-6 rounded-xl text-xl hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(64,224,208,0.3)]"
                                >
                                    ASEGURAR MI COPIA AHORA ($19.99)
                                </a>
                            ) : (
                                <div className="space-y-4">
                                    <button 
                                        disabled
                                        className="w-full block bg-gray-700 text-gray-500 font-bold py-4 px-6 rounded-xl text-xl cursor-not-allowed border border-gray-600"
                                    >
                                        OFERTA NO DISPONIBLE
                                    </button>
                                    
                                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                                        <p className="text-sm text-gray-400 mb-3">¿Todavía interesado? Intenta contactar a soporte:</p>
                                        <a 
                                            href={rescueLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 bg-whatsapp-green/90 text-white font-bold py-3 px-6 rounded-xl text-base hover:bg-whatsapp-green transition-all"
                                        >
                                            <FaWhatsapp size={20} /> Solicitar Reactivación Manual a Soporte
                                        </a>
                                    </div>
                                </div>
                            )}
                            
                            {!isExpired && (
                                <p className="text-xs text-gray-500 mt-3">Entrega programada para el lanzamiento oficial. Prioridad de descarga garantizada.</p>
                            )}

                            {/* Trust Module */}
                            <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-center gap-4 text-left">
                                <div className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 w-full md:w-auto">
                                    <div className={`flex -space-x-1 ${isExpired ? 'text-gray-600' : 'text-green-500'}`}>
                                        <FaLock size={20} />
                                        <FaShieldAlt size={20} />
                                    </div>
                                    <div className="text-xs text-gray-300 leading-tight">
                                        <p className="font-bold text-white">Compra Blindada</p>
                                        <p>Congelas el precio más bajo. Acceso garantizado.</p>
                                    </div>
                                </div>
                                <div className="text-left text-sm text-gray-300 space-y-1">
                                    <p className="flex items-center gap-2"><FiCheckCircle className={isExpired ? 'text-gray-600' : 'text-brand-accent'} /> Ahorro Inmediato: $10 USD OFF</p>
                                    <p className="flex items-center gap-2"><FiCheckCircle className={isExpired ? 'text-gray-600' : 'text-brand-accent'} /> Prioridad de entrega (24h antes)</p>
                                    <p className="flex items-center gap-2"><FiCheckCircle className={isExpired ? 'text-gray-600' : 'text-brand-accent'} /> Bonus: Actualizaciones futuras</p>
                                </div>
                            </div>
                        </div>
                        
                         <div className="text-center mt-12">
                            <button
                                onClick={() => navigate('/premium-courses')}
                                className="inline-flex items-center justify-center gap-2 text-gray-500 font-bold py-3 px-8 rounded-lg text-lg hover:text-gray-300 transition duration-300"
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