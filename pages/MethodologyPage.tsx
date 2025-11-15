import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiBarChart2, FiCpu, FiArrowLeft } from 'react-icons/fi';
import { FaBrain, FaRocket } from 'react-icons/fa';
import PageBackButton from '../components/PageBackButton';

// Re-usable Pillar component from the modal
const MethodologyPillar: React.FC<{ icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode; }> = ({ icon, title, subtitle, children }) => (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
        <div className="flex-shrink-0 text-brand-accent text-3xl mt-1">{icon}</div>
        <div>
            <h4 className="font-bold text-lg text-brand-primary dark:text-white">{title}</h4>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{subtitle}</p>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">{children}</div>
        </div>
    </div>
);

const MethodologyPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Nuestra Metodología | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Descubre el Ecosistema de Ejecución Profesional de TradeVision. Integramos Lógica del Precio, Tecnología (Bots/SMC) y Disciplina Mental para forjar traders rentables.");
        }
    }, []);

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="mb-8">
                            <PageBackButton />
                        </div>
                        <header className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">
                                Nuestra Metodología
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                                En <span translate="no">TradeVision Latam</span>, no te enseñamos una sola herramienta; te sumergimos en un ecosistema completo. La rentabilidad sostenida no proviene de una "bala de plata", sino de la integración de la <strong>tecnología</strong> (Indicadores, Bots, Scripts) con la <strong>lógica del precio</strong> (Acción del Precio, SMC) y la <strong>disciplina mental</strong>.
                            </p>
                        </header>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                             <div className="space-y-4">
                                <MethodologyPillar icon={<FiBarChart2 />} title="I. EL FUNDAMENTO" subtitle="Lógica del Precio e Indicadores (La Base)">
                                    <p>Antes de automatizar, debes entender qué automatizar. Nuestro Asesor Principal, <strong>José Quintana</strong>, te enseña a leer el mercado a través de la <strong>Acción del Precio</strong> (Velas Japonesas) y la <strong>Estructura del Mercado</strong>.</p>
                                    <p>No descartamos los Indicadores; los usamos como herramientas de <strong>confirmación y contexto</strong>, no como señales ciegas. Te enseñamos a combinarlos con <strong>Smart Money Concepts (SMC)</strong> para identificar con precisión las zonas de alta probabilidad donde las instituciones colocan sus órdenes (Liquidez y Order Blocks).</p>
                                </MethodologyPillar>
                                <MethodologyPillar icon={<FiCpu />} title="II. LA VENTAJA TECNOLÓGICA" subtitle="Bots, Scripts y SMC (El Ecosistema)">
                                    <p>El trader moderno no opera manualmente el 100% del tiempo; optimiza. La visión de nuestro CEO, <strong>Javier Solís</strong>, es profesionalizar el trading en LATAM mediante la tecnología.</p>
                                    <p>Te enseñamos a usar <strong>Bots y Scripts</strong> no como "cajas mágicas", sino como asistentes de ejecución para <strong>Backtesting Riguroso</strong> y <strong>Ejecución Precisa</strong>, eliminando el error humano. Nuestro Subdirector, <strong>Lucas Almeida</strong>, asegura que tengas el soporte y la infraestructura comunitaria para implementar estas herramientas.</p>
                                </MethodologyPillar>
                            </div>
                            <div>
                                <img 
                                    src="https://i.pinimg.com/736x/33/1d/7e/331d7ee5c20f61edc6704019d192accd.jpg" 
                                    alt="Análisis de mercado en un monitor" 
                                    className="rounded-lg shadow-2xl shadow-brand-accent/20 w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 mb-12">
                             <MethodologyPillar icon={<FaBrain />} title="III. EL BLINDAJE" subtitle="Psicología y Gestión de Riesgo (La Mente)">
                                <p>La mejor estrategia del mundo fracasará si el operador la sabotea. Nuestra Asesora de Mercados Asiáticos, <strong>Amara Srisuk</strong>, es la autoridad en el pilar más importante: <strong>Psicología del Trading (Psicotrading)</strong>.</p>
                                <p>Te enseñamos a diseñar un <strong>Plan de Trading</strong> y una <strong>Gestión de Riesgo</strong> (la Bitácora) que protejan tu capital. Amara te proporciona las herramientas mentales para dominar el miedo, la avaricia y el trading por venganza, permitiendo que tu estrategia y tus bots funcionen.</p>
                            </MethodologyPillar>
                            
                             <MethodologyPillar icon={<FaRocket />} title="IV. LA SÍNTESIS" subtitle="El Patrón AMD Institucional (La Ejecución)">
                                <p>La metodología completa de TradeVision converge en el patrón de ejecución profesional: <strong>AMD (Acumulación, Manipulación, Distribución)</strong>.</p>
                                <p>Te enseñamos a identificar la <strong>Manipulación</strong> (caza de liquidez/Stop Loss) y a programar tus entradas (manuales o con bots) en la fase de <strong>Distribución</strong>, usando la confluencia de tu análisis técnico (SMC, Indicadores) y tu disciplina (Psicotrading).</p>
                            </MethodologyPillar>
                        </div>
                        
                        <footer className="mt-6 p-6 bg-brand-primary/90 text-white border-l-4 border-brand-accent rounded-r-lg text-center">
                            <p className="font-semibold italic text-lg">
                                "La metodología de <span translate="no">TradeVision Latam</span> no te da un 'pez'. Te damos el ecosistema de pesca completo: el <strong>mapa</strong> (Análisis Técnico/SMC), la <strong>caña de pescar automatizada</strong> (Bots/Indicadores) y la <strong>mentalidad</strong> (Psicotrading) para operar como un profesional."
                            </p>
                        </footer>

                        <div className="text-center mt-12">
                            <button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors duration-300">
                                <FiArrowLeft /> Volver a la Página Principal
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
export default MethodologyPage;
