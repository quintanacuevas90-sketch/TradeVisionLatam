import React from 'react';
import Modal from './Modal';
import { FiBarChart2, FiCpu } from 'react-icons/fi';
import { FaBrain, FaRocket } from 'react-icons/fa';

interface PillarProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const MethodologyPillar: React.FC<PillarProps> = ({ icon, title, subtitle, children }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
        <div className="flex-shrink-0 text-brand-accent text-3xl mt-1">{icon}</div>
        <div>
            <h4 className="font-bold text-lg text-brand-primary dark:text-white">{title}</h4>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{subtitle}</p>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">{children}</div>
        </div>
    </div>
);


const EducationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Nuestra Metodología Educativa">
            <div className="space-y-6">
                <header className="text-center">
                    <h3 className="text-2xl font-extrabold text-brand-primary dark:text-white">
                        El Ecosistema de Ejecución Profesional
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        En TradeVision Latam, no te enseñamos una sola herramienta; te sumergimos en un ecosistema completo. La rentabilidad sostenida no proviene de una "bala de plata", sino de la integración de la <strong>tecnología</strong> (Indicadores, Bots, Scripts) con la <strong>lógica del precio</strong> (Acción del Precio, SMC) y la <strong>disciplina mental</strong>.
                    </p>
                </header>

                <div className="space-y-4">
                    <MethodologyPillar icon={<FiBarChart2 />} title="I. EL FUNDAMENTO" subtitle="Lógica del Precio e Indicadores (La Base)">
                        <p>
                            Antes de automatizar, debes entender qué automatizar. Nuestro Asesor Principal, <strong>José Quintana</strong>, te enseña a leer el mercado a través de la <strong>Acción del Precio</strong> (Velas Japonesas) y la <strong>Estructura del Mercado</strong>.
                        </p>
                        <p>
                            No descartamos los Indicadores; los usamos como herramientas de <strong>confirmación y contexto</strong>, no como señales ciegas. Te enseñamos a combinarlos con <strong>Smart Money Concepts (SMC)</strong> para identificar con precisión las zonas de alta probabilidad donde las instituciones colocan sus órdenes (Liquidez y Order Blocks).
                        </p>
                    </MethodologyPillar>

                    <MethodologyPillar icon={<FiCpu />} title="II. LA VENTAJA TECNOLÓGICA" subtitle="Bots, Scripts y SMC (El Ecosistema)">
                        <p>
                           El trader moderno no opera manualmente el 100% del tiempo; optimiza. La visión de nuestro CEO, <strong>Javier Solís</strong>, es profesionalizar el trading en LATAM mediante la tecnología.
                        </p>
                        <p>
                            Te enseñamos a usar <strong>Bots y Scripts</strong> no como "cajas mágicas", sino como asistentes de ejecución para <strong>Backtesting Riguroso</strong> y <strong>Ejecución Precisa</strong>, eliminando el error humano. Nuestro Subdirector, <strong>Lucas Almeida</strong>, asegura que tengas el soporte y la infraestructura comunitaria para implementar estas herramientas.
                        </p>
                    </MethodologyPillar>

                    <MethodologyPillar icon={<FaBrain />} title="III. EL BLINDAJE" subtitle="Psicología y Gestión de Riesgo (La Mente)">
                        <p>
                            La mejor estrategia del mundo fracasará si el operador la sabotea. Nuestra Asesora de Mercados Asiáticos, <strong>Amara Srisuk</strong>, es la autoridad en el pilar más importante: <strong>Psicología del Trading (Psicotrading)</strong>.
                        </p>
                        <p>
                           Te enseñamos a diseñar un <strong>Plan de Trading</strong> y una <strong>Gestión de Riesgo</strong> (la Bitácora) que protejan tu capital. Amara te proporciona las herramientas mentales para dominar el miedo, la avaricia y el trading por venganza, permitiendo que tu estrategia y tus bots funcionen.
                        </p>
                    </MethodologyPillar>
                    
                     <MethodologyPillar icon={<FaRocket />} title="IV. LA SÍNTESIS" subtitle="El Patrón AMD Institucional (La Ejecución)">
                        <p>
                            La metodología completa de TradeVision converge en el patrón de ejecución profesional: <strong>AMD (Acumulación, Manipulación, Distribución)</strong>.
                        </p>
                        <p>
                            Te enseñamos a identificar la <strong>Manipulación</strong> (caza de liquidez/Stop Loss) y a programar tus entradas (manuales o con bots) en la fase de <strong>Distribución</strong>, usando la confluencia de tu análisis técnico (SMC, Indicadores) y tu disciplina (Psicotrading).
                        </p>
                    </MethodologyPillar>
                </div>

                <footer className="mt-6 p-4 bg-brand-accent/10 border-l-4 border-brand-accent text-brand-primary dark:text-brand-accent rounded-r-lg text-center">
                    <p className="font-semibold italic">
                        "La metodología de TradeVision Latam no te da un 'pez'. Te damos el ecosistema de pesca completo: el <strong>mapa</strong> (Análisis Técnico/SMC), la <strong>caña de pescar automatizada</strong> (Bots/Indicadores) y la <strong>mentalidad</strong> (Psicotrading) para operar como un profesional."
                    </p>
                </footer>
            </div>
        </Modal>
    );
};

export default EducationModal;
