import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiChevronDown, FiChevronUp, FiAlertTriangle, FiShield, FiArrowRight } from 'react-icons/fi';
import PageBackButton from '../components/PageBackButton';

// --- PROPS INTERFACES ---
interface FaqPageProps {
    onOpenModal: (modal: ModalType) => void;
}
interface TrustAccordionProps {
    title: string;
    children: React.ReactNode;
    hasAlert?: boolean;
    isStrategic?: boolean;
}

// --- FAQ DATA ---
const faqSections = [
    {
        title: "I. Fondos, Retiros y Blindaje Legal",
        icon: '🛡️',
        faqs: [
            {
                question: "¿Cuánto tarda mi retiro y por qué se cancela repetidamente?",
                answer: "La demora es normal, pero la cancelación no. Los retiros por criptomonedas (USDT-Binance/Skrill) son los más rápidos (horas a 3 días hábiles). Las cancelaciones se deben casi siempre a fallas en la verificación (KYC) o porque el método de depósito no coincide con el de retiro. Protocolo: Nunca retire a una tarjeta bancaria si no puede cumplir la verificación.",
            },
            {
                question: "Mi depósito no llega, y el soporte del broker es lento (solo responde un bot).",
                answer: "TRADEVISION no gestiona sus fondos. El soporte del broker es lento debido al alto volumen. Protocolo: Envíe un correo electrónico único y detallado al broker (el chat es ineficaz). Nunca envíe múltiples mensajes o spam. Si el problema persiste más de 72 horas, contáctenos para guiarlo en el proceso de escalamiento.",
            },
            {
                question: "¿Es cierto que el broker puede manipular la vela en los últimos segundos?",
                answer: "No opere por paranoia. El trading conlleva volatilidad extrema, especialmente en OTC (mercado extrabursátil). Si usted no es rentable, la causa es el descontrol emocional, no la manipulación. Protocolo: Apague y tome un descanso si siente que el mercado le 'persigue'. El mercado no es personal.",
            },
            {
                question: "¿Por qué el broker me pide subir tantos documentos (KYC/Selfie/Papel)?",
                answer: "Es un protocolo estándar de seguridad para evitar el lavado de dinero y las multicuentas, lo cual es más estricto con los retiros de montos altos. Protocolo: Siga las instrucciones del broker al pie de la letra, envíe una sola foto clara con el documento y la fecha, y use siempre el mismo correo y método que usó para depositar."
            }
        ]
    },
    {
        title: "II. Bonos, Afiliados y Transparencia",
        icon: '🎁',
        faqs: [
            {
                question: "¿Por qué me quitaron el bono y las ganancias si no cumplí el volumen de operaciones?",
                answer: "Los bonos de alto porcentaje exigen un volumen de negociación que es extremadamente alto (a menudo x40 el monto depositado). Si no se cumple en el tiempo, el corredor cancela el bono. Protocolo: TRADEVISION recomienda no usar bonos si su capital es bajo; elija siempre operar sin compromiso.",
                hasAlert: true,
            },
            {
                question: "¿Me perjudica usar un enlace de afiliado? ¿Ganan de mis pérdidas?",
                answer: "Somos transparentes: existe el modelo de Revenue Share donde los afiliados ganan de la actividad del trader. Protocolo: La comisión que recibe TRADEVISION se invierte en educación. Si usted opera con disciplina y un riesgo bajo (1% a 3%), su pérdida no afectará su cuenta, y el enlace le dio acceso a nuestras herramientas educativas. La avaricia es el verdadero enemigo.",
            },
            {
                question: "¿Debo usar Martingala o un bot/script para ser rentable?",
                answer: "No. Martingala es un quemacuentas. Los bots solo sirven para vender cursos. Protocolo: Enfóquese en la disciplina mental (Nivel 1 de la 'Zona de Ejecución') y la gestión de riesgo (Nivel 3). La ejecución perfecta es mejor que la señal mágica.",
                hasAlert: true,
            }
        ]
    },
    {
        title: "III. Estrategia y Solución Profesional",
        icon: '🧠',
        faqs: [
            {
                question: "¿Qué temporalidad y estrategia son las mejores para ganar en binarias?",
                answer: "La mayoría de los comerciantes utilizan velas de 1 minuto. La mejor estrategia es la que usted domina (soporte/resistencia, Fibonacci) y con la que se ha 'casado'. Protocolo: No cambiar de estrategia cada semana. Domine una sola por 3 a 6 meses. La disciplina siempre vence a la ambición.",
            },
            {
                question: "¿Qué hago si pierdo 2 o 3 operaciones seguidas?",
                answer: "¡Retírese de inmediato! El peor error es el comercio de venganza. Protocolo: Apague la computadora, vaya a hacer otra actividad ('ir a la playa' o 'ver una película') y no regrese hasta el día siguiente con la mente limpia.",
            },
            {
                question: "¿Necesito un mentor? Los gurús de TikTok parecen ser los mejores.",
                answer: "Usted es su mejor mentor. La mayoría de los gurús de TikTok solo buscan referencias y crean falsas expectativas. Protocolo: Utilice nuestras herramientas gratuitas (Niveles 1, 2, 3 de la 'Zona de Ejecución') y aprenda a operar solo. El mejor trader es aquel que deja de depender de los demás.",
            },
            {
                question: "¿Puedo usar mi cuenta de Binance para Exnova y la de mi hermano para Pocket Option?",
                answer: "No se recomienda usar la misma cuenta de wallet (Binance) para múltiples brokers, ni usar cuentas de terceros. Esto puede generar conflictos de KYC (Know Your Customer) y bloquear sus retiros. Mantenga la máxima transparencia y utilice un solo método de depósito/retiro a su nombre."
            }
        ]
    },
    {
        title: "IV. El Camino Profesional (Transición a Forex)",
        icon: '🚀',
        faqs: [
            {
                question: "Veo que se habla mucho de binarias, pero ¿cuál es el camino para traders profesionales?",
                answer: "El trading de opciones binarias es un entrenamiento de ejecución. Sin embargo, el camino real y regulado hacia la consistencia se encuentra en el mercado Forex (divisas, índices y materias primas). Forex opera con brokers regulados y requiere una disciplina y gestión de capital de élite. Binarias vs Forex: Binarias es una apuesta de tiempo (sí/no); Forex es una inversión de valor (cuánto/cuándo).",
                isStrategic: true,
            },
            {
                question: "¿Cómo paso de la simulación de binarias a ser un trader de fondos grandes en Forex?",
                answer: "La disciplina es el puente. Necesita entrenamiento avanzado y mentoría personalizada para el mercado regulado. Protocolo: TRADEVISION ofrece el Curso FOREX Privado (Nivel PRO), diseñado para traders disciplinados que buscan la maestría de la ejecución en mercados regulados.",
                isStrategic: true,
            }
        ]
    }
];

// --- STYLING & HELPER COMPONENTS ---

const HighlightedAnswer = ({ text }: { text: string }) => {
    const parts = text.split(/(RIESGO|Martingala|bots y scripts|estafa|bots solo sirven para vender cursos)/gi);

    return (
        <p style={{ fontSize: '1.1em' }} className="flex items-start">
            <FiShield className="inline-block mr-2 mt-1 text-brand-accent flex-shrink-0" />
            <span className="text-gray-300">
                {parts.map((part, index) => {
                    const lowerPart = part.toLowerCase();
                    if (lowerPart === 'riesgo') {
                        return <span key={index} className="font-bold text-red-500 uppercase">{part}</span>;
                    }
                    if (lowerPart === 'martingala' || lowerPart === 'estafa') {
                        return <strong key={index} className="text-gray-100 font-extrabold uppercase">{part}</strong>;
                    }
                    if (lowerPart.includes('bots')) {
                         return <strong key={index} className="text-gray-100 font-extrabold">{part}</strong>;
                    }
                    return part;
                })}
            </span>
        </p>
    );
};

const TrustAccordion: React.FC<TrustAccordionProps> = ({ title, children, hasAlert = false, isStrategic = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const containerClasses = isStrategic
        ? 'border-2 border-brand-accent bg-brand-accent/10 rounded-lg'
        : 'border-b border-white/20';

    return (
        <div className={containerClasses}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-lg focus:outline-none"
            >
                <span className="flex items-center gap-3">
                    {hasAlert && <FiAlertTriangle className="text-yellow-400" />}
                    {title}
                </span>
                <span className="text-brand-accent">{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-5">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const FaqTrustPage: React.FC<FaqPageProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();

    useEffect(() => {
        document.title = "FAQ & Protocolo de Confianza | TRADEVISION Latam";
    }, []);

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20 bg-brand-primary text-white">
                <AnimatedSection className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="mb-8">
                            <PageBackButton variant="on-dark" />
                        </div>
                        <header className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold">FAQ & Protocolo de Confianza</h1>
                            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                                Esta sección está diseñada para abordar las dudas más críticas de la comunidad de trading de Latam (basadas en el análisis de Exnova, IQ Option y Pocket Option). Nuestro objetivo es la transparencia total y el blindaje ético.
                            </p>
                        </header>

                        <div className="space-y-12">
                            {faqSections.map((section) => (
                                <div key={section.title}>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <span className="text-2xl">{section.icon}</span>
                                        {section.title}
                                    </h2>
                                    <div className="space-y-1">
                                        {section.faqs.map((faq) => (
                                            <TrustAccordion key={faq.question} title={faq.question} hasAlert={faq.hasAlert} isStrategic={faq.isStrategic}>
                                                <HighlightedAnswer text={faq.answer} />
                                            </TrustAccordion>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
                
                <AnimatedSection className="py-20 bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <h2 className="text-4xl font-extrabold text-white uppercase">¡ASCENDA AL NIVEL REGULADO!</h2>
                        <p className="mt-4 text-xl text-gray-300">
                           Deje la simulación de corto plazo. Nuestro programa <span translate="no">TRADEVISIÓN | Forex Privado</span> está diseñado para traders que buscan operar con brokers regulados y capital escalable.
                        </p>
                        <div className="mt-8">
                            <button
                                onClick={() => navigate('/cursos/forex-elite')}
                                className="inline-flex items-center justify-center gap-3 bg-brand-accent text-brand-primary font-extrabold py-4 px-10 rounded-lg text-xl transform hover:scale-105 transition duration-300 shadow-lg shadow-brand-accent/30 animate-pulse-glow"
                            >
                                Acceder al Curso FOREX Privado (Nivel PRO)
                                <FiArrowRight />
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

export default FaqTrustPage;