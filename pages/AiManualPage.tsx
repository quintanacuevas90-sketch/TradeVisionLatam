import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FaWhatsapp } from 'react-icons/fa';
import { FiBarChart2, FiShield, FiBookOpen, FiDollarSign, FiTool, FiCpu, FiArrowLeft } from 'react-icons/fi';

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
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">SALTO CUÁNTICO EN TU TRADING</h1>
                        <p className="text-xl sm:text-2xl font-semibold text-gray-300 mb-6">ACCESO INMEDIATO A 10 ASESORES EXPERTOS</p>
                        <h2 className="text-2xl sm:text-3xl text-brand-accent font-bold mb-8">MANUAL: INGENIERÍA DE PROMPTS PARA LA MENTE MAESTRA DEL TRADING (GPT/DEEPSEEK)</h2>
                        <a href={manualPurchaseLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-accent text-brand-primary font-bold py-4 px-10 rounded-lg text-xl hover:bg-opacity-90 transition duration-300 transform hover:scale-105 shadow-lg shadow-brand-accent/30">
                            Acceder al Manual ($15 USD)
                        </a>
                    </div>
                </AnimatedSection>

                {/* Body Content */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8 text-lg text-gray-700 dark:text-gray-300">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">El Final de la Frustración: La Revolución de la Inteligencia Artificial en el Trading</h2>
                        </div>
                        <p>El tiempo de leer libros desordenados y depender de cursos desactualizados ha terminado. Esta es la revolución real: ¿Puedes imaginar un trader, ya sea principiante, avanzado o incluso un gran fondo de inversión, que no tenga integrado un sistema de inteligencia artificial para analizar, para la operativa o para la gestión automática? Es inimaginable en 2025. Esto es lo valioso de la IA: donde antes tenías que leer informes, artículos o ver videos desordenados, la Inteligencia Artificial ya es experta prácticamente en toda la información que hay en la red. Con este sistema, tienes el equivalente a 10 asesores de trading a primera mano que lo automatizan todo, permitiendo que tu enfoque sea únicamente la tutoría y el asesoramiento final. Este nivel 2025 de tecnología es un salto cuántico respecto al Day Trading de 2010. Lo que antes tardaba diez años en aprenderse, ahora puede reducirse a un año de aprendizaje disciplinado y automatización total con la Inteligencia Artificial.</p>
                    </div>
                </AnimatedSection>
                
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8 text-lg text-gray-700 dark:text-gray-300">
                         <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Cómo Logramos la Automatización en TradeVision Latam</h2>
                        </div>
                        <p>La Inteligencia Artificial, que ha empoderado al mundo desde 2022, ha revolucionado nuestro Day Trading y nuestro Swing Trading en TradeVision Latam. Desde 2024, en nuestra academia hemos perfeccionado todas las ingenierías, técnicas y prácticas para utilizar esta tecnología en prácticamente todas las tareas que a diario tiene un Day Trader. La clave es la Ingeniería de Prompts: saber escribirle a la Inteligencia Artificial de forma categórica. Ella necesita los máximos datos posibles, especificados no solo en una narrativa, sino en categorías claras de roles, tareas y objetivos, para que pueda darte un output profesional.</p>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Los 6 Roles que Tendrá tu IA Personal (Tu Propia Mesa de Asesores)</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">Este manual te entrega las fórmulas maestras, los prompts que hemos automatizado para cada rol vital de nuestras estrategias:</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {promptRoles.map(role => <PromptRoleCard key={role.title} {...role} />)}
                        </div>
                    </div>
                </AnimatedSection>
                
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8 text-lg text-gray-700 dark:text-gray-300">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Tu Estrategia ya es Perfecta, Ahora Automatiza la Ejecución</h2>
                        </div>
                        <p>La imperfección humana no tiene cabida aquí. La IA, por más avanzada que sea, no es el estratega, tú lo eres. Ella es el automatizador perfecto de tu proceso. Con esta guía, obtendrás el copy exacto para entrenar a tus chats, como nuestro ejemplo con el Análisis Footprint en el Oro, donde la IA proyecta la dirección de largo, medio y corto plazo sin siquiera especificarle el activo o la temporalidad, detectando todos los detalles cruciales y hablando con la nomenclatura experta de Delta, Absorción de Ventas y Niveles Clave. Esto es para que tú converses con ella, resuelvas tus límites y mejores tu trading con la ayuda de 10 asesores expertos. Esto reduce el aprendizaje de una década a solo un año de automatización, dándote la verdadera ventaja competitiva en el mercado.</p>
                    </div>
                </AnimatedSection>

                {/* Closing CTA */}
                <AnimatedSection className="py-24 bg-brand-primary text-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <h2 className="text-4xl font-extrabold text-white">¡DOMINA EL JUEGO INSTITUCIONAL AHORA!</h2>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">MANUAL COMPLETO DE INGENIERÍA DE PROMPTS</p>
                        <p className="text-5xl font-black text-white mt-4">$15 <span className="text-2xl font-bold">USD</span></p>
                        
                        <div className="p-4 bg-red-900/20 border-t-2 border-b-2 border-red-500 text-red-300 text-xs text-left rounded-lg my-8">
                           <p><strong>Advertencia de Riesgo Obligatoria:</strong> El trading de derivados y opciones conlleva un alto riesgo de pérdida de capital y puede no ser adecuado para todos los inversores. El capital invertido está en riesgo. Los resultados pasados no garantizan el rendimiento futuro. No garantizamos resultados ni ganancias, solo ofrecemos formación de alta calidad.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                             <a href={manualPurchaseLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 w-full sm:w-auto transform hover:scale-105">
                                Acceder al Manual ($15 USD)
                            </a>
                            <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition duration-300 w-full sm:w-auto">
                                <FaWhatsapp /> Soporte Vía WhatsApp
                            </a>
                        </div>
                        <button onClick={() => navigate('/premium-courses')} className="mt-6 text-gray-400 hover:text-white transition inline-flex items-center gap-2">
                           <FiArrowLeft /> Volver a Cursos Premium
                        </button>
                    </div>
                </AnimatedSection>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default AiManualPage;