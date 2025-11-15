import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FaBookOpen, FaBrain, FaWhatsapp } from 'react-icons/fa';
import { FiCheck, FiClock, FiXCircle, FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';
import PageBackButton from '../components/PageBackButton';

const BinariasProPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Curso Binarias Pro Avanzado (C90trade) | Domina el Lenguaje del Precio | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Deja de depender de indicadores y bots. Nuestro curso avanzado de +130 videos, impartido por José Quintana, es un reseteo mental. Aprende Lógica del Precio y opera con disciplina en cualquier temporalidad (incluyendo ráfagas y blitz).");
        }
    }, []);

    const keyPoints = [
        "+130 Videos de pura Acción del Precio.",
        "Metodología Universal (aplica a cualquier activo).",
        "Diseñado para la Ejecución Rápida (Ráfagas / Blitz)."
    ];

    const myths = [
        { title: "Bots y Scripts Milagrosos", description: "Buscas una 'caja mágica' que opere por ti. Eso no es disciplina, es pereza." },
        { title: "Saturación de Indicadores", description: "Tu gráfico parece un arcoíris (RSI, MACD, Bandas). Estás operando con información retrasada (lagging)." },
        { title: "Estrategias Genéricas", description: "Sigues ciegamente 'estrategias' de YouTube que miles están usando, convirtiéndote en la liquidez del mercado." }
    ];

    const courseContent = [
        "Acceso Vitalicio a +130 Videos grabados y actualizados por José Quintana.",
        "El Manual 'Lenguaje del Precio' (basado en los PDFs VIP).",
        "Acceso a la Comunidad Privada de Alumnos Élite (Discord/Telegram).",
        "Módulos de Psicotrading y Gestión de Riesgo (desarrollados con Amara Srisuk).",
        "Bono de Oferta: El Script Premium de regalo."
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
                            <PageBackButton variant="on-dark" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">VISIÓN AVANZADA: EL LENGUAJE DEL PRECIO</h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">"Un reseteo mental completo. Olvida los indicadores, los mitos y los 'scripts mágicos'. Aprende a leer el verdadero motor del mercado."</p>
                        <ul className="flex flex-col sm:flex-row justify-center gap-x-6 gap-y-2 text-gray-200 mb-8">
                            {keyPoints.map(point => <li key={point} className="flex items-center gap-2"><FiCheck className="text-brand-accent"/> {point}</li>)}
                        </ul>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 w-full sm:w-auto transform hover:scale-105 shadow-lg shadow-brand-accent/30">
                                Asegurar Acceso Prioritario ($149)
                            </a>
                            <button onClick={() => navigate('/premium-courses')} className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-brand-accent text-brand-accent font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300 w-full sm:w-auto">
                                Volver a Cursos Premium
                            </button>
                        </div>
                    </div>
                </AnimatedSection>

                {/* The Problem Section */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">I. ROMPIENDO LOS MITOS QUE TE MANTIENEN EN CERO</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">"Como tu Asesor Principal, soy directo: si estás aquí, es porque estás frustrado. Estás estancado porque basas tu operativa en herramientas que están diseñadas para fallarle al minorista. Crees que la rentabilidad está en un laberinto de herramientas:"</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            {myths.map(myth => (
                                <div key={myth.title} className="bg-white dark:bg-brand-primary p-6 rounded-lg border border-gray-200 dark:border-white/10">
                                    <FiXCircle className="text-red-500 text-3xl mx-auto mb-3" />
                                    <h3 className="font-bold text-lg text-brand-primary dark:text-white">{myth.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{myth.description}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 font-semibold text-gray-700 dark:text-gray-200">Este programa te obliga a desechar esas muletas y a pensar por ti mismo.</p>
                    </div>
                </AnimatedSection>
                
                {/* The Solution Section */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">II. LA METODOLOGÍA: EL LENGUAJE DEL PRECIO</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">Te enseñamos el verdadero motor del mercado. Un conocimiento universal que te permite operar CUALQUIER activo, en CUALQUIER temporalidad.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center">
                                <FaBookOpen className="text-brand-accent text-4xl mb-4" />
                                <h3 className="font-bold text-xl text-brand-primary dark:text-white">Dominio de Patrones y Gráficos</h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">Accederás a nuestro análisis avanzado de patrones de velas de alta probabilidad. No solo te enseñamos a ver un patrón, te enseñamos a entender por qué se forma, dónde es relevante y quién está moviendo el precio.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <FiClock className="text-brand-accent text-4xl mb-4" />
                                <h3 className="font-bold text-xl text-brand-primary dark:text-white">Dominio del Tiempo (Sesiones)</h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">El precio no se mueve igual a todas horas. Te enseñamos a dominar los horarios de mercado de alta volatilidad (Londres, Nueva York, Asia). Aprenderás cuándo operar y, más importante, cuándo NO operar.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <FaBrain className="text-brand-accent text-4xl mb-4" />
                                <h3 className="font-bold text-xl text-brand-primary dark:text-white">Dominio Psicológico (Psicotrading)</h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">Integramos la metodología de nuestra experta, Amara Srisuk. Este curso es un 80% disciplina mental. Te enseñamos a ejecutar tu plan sin dudar, gestionar el riesgo y eliminar el trading por venganza.</p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Blitz/Ráfagas Section */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">III. ¿PUEDO OPERAR RÁFAGAS (BLITZ) CON ESTO?</h2>
                        <div className="mt-6 text-gray-600 dark:text-gray-300 space-y-4">
                            <p className="font-bold text-lg text-brand-accent">Sí. Esta es la ventaja principal del Lenguaje del Precio.</p>
                            <p>Cuando dejas de esperar que un indicador retrasado (como el RSI) te dé una señal, tu ejecución se vuelve instantánea. Estás leyendo la acción del precio en tiempo real, vela a vela.</p>
                            <p>Esta metodología te da la confianza y la velocidad mental para operar en cualquier temporalidad. Es la misma lógica para un gráfico de 1 Hora que para operaciones de 'Ráfaga' (Blitz) de 5 segundos en brokers como Exnova o Quotex. La estructura del precio es universal.</p>
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* Course Content Section */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">IV. ¿Qué Incluye el Programa Avanzado C90trade?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <img src="https://picsum.photos/500/600?random=90" alt="Manual del Lenguaje del Precio" className="rounded-lg shadow-xl" />
                            <ul className="space-y-4">
                                {courseContent.map(item => (
                                    <li key={item} className="flex items-start gap-3">
                                        <FiCheck className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Warning Section */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <div className="p-6 bg-red-100 dark:bg-red-900/30 border-t-4 border-red-500 rounded-b-lg shadow-2xl">
                            <div className="flex items-start">
                                <FiAlertTriangle className="h-8 w-8 mr-4 text-red-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-extrabold text-red-800 dark:text-red-300">ADVERTENCIA: ESTO NO ES MAGIA, ES DISCIPLINA.</h3>
                                    <p className="mt-2 text-red-700 dark:text-red-200">"Como tu Asesor Principal, debo ser directo. Este curso exige un reseteo mental completo. Te obligará a desaprender años de malos hábitos. Si buscas una solución rápida, no estás dispuesto a estudiar (Backtesting) o crees que esto es un 'script milagroso', NO COMPRES ESTE CURSO. Este programa es para traders serios que están listos para trabajar."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Closing CTA Section */}
                <AnimatedSection className="py-24 bg-brand-primary text-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-extrabold text-white">Es Hora de Dejar de Ser el 99%. Únete a la Élite.</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                            <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 w-full sm:w-auto transform hover:scale-105">
                                Asegurar Acceso Prioritario ($149)
                            </a>
                            <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition duration-300 w-full sm:w-auto">
                                <FaWhatsapp /> Tengo Dudas (Soporte)
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

export default BinariasProPage;