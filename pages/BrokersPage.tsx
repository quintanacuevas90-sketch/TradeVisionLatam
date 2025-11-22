
import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrokerCard from '../components/BrokerCard';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ALL_BROKERS_AND_TOOLS, BROKER_CATEGORIES } from '../constants';
import { ModalType, PartnerTool } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiSearch, FiX, FiArrowLeft, FiShield } from 'react-icons/fi';
import PageBackButton from '../components/PageBackButton';

interface BrokersPageProps {
    onOpenModal: (modal: ModalType) => void;
}

const BrokersPage: React.FC<BrokersPageProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeRegulation, setActiveRegulation] = useState<string | null>(null);

    useEffect(() => {
        document.title = "Brokers Recomendados | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Descubre la lista completa de brokers y herramientas recomendadas por TradeVision para Opciones Binarias, Forex y gestión de capital.");
        }
    }, []);

    const filteredTools = useMemo(() => {
        let tools = ALL_BROKERS_AND_TOOLS;

        if (activeCategory) {
            tools = tools.filter(tool => tool.category === activeCategory);
        }

        if (activeRegulation) {
            if (activeRegulation === 'regulated') {
                tools = tools.filter(tool => ['regulated', 'tool_platform', 'crypto_exchange'].includes(tool.regulation));
            } else if (activeRegulation === 'unregulated') {
                tools = tools.filter(tool => tool.regulation === 'unregulated');
            }
        }

        if (searchTerm.trim()) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            tools = tools.filter(tool => 
                tool.name.toLowerCase().includes(lowerCaseSearch) ||
                tool.description.toLowerCase().includes(lowerCaseSearch) ||
                tool.advantages.join(' ').toLowerCase().includes(lowerCaseSearch)
            );
        }

        return tools;
    }, [searchTerm, activeCategory, activeRegulation]);

    const groupedTools = useMemo(() => {
        return filteredTools.reduce((acc, tool) => {
            (acc[tool.category] = acc[tool.category] || []).push(tool);
            return acc;
        }, {} as Record<string, PartnerTool[]>);
    }, [filteredTools]);
    
    const categoriesInView = activeCategory ? [activeCategory] : (Object.keys(BROKER_CATEGORIES) as (keyof typeof BROKER_CATEGORIES)[]).filter(cat => groupedTools[cat]);


    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <PageBackButton />
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">Brokers y Herramientas</h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl">
                                    La selección de plataformas y herramientas recomendadas por nuestro equipo para una operativa segura y eficiente.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <img 
                                    src="https://i.pinimg.com/736x/08/a9/be/08a9be7a9a02639197bb6f7985d715f8.jpg" 
                                    alt="Mascota TradeVision Pensando" 
                                    className="w-40 md:w-56 rounded-full border-4 border-brand-accent shadow-2xl hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>

                        {/* Elite Support Banner */}
                        <AnimatedSection className="my-12 p-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 max-w-5xl mx-auto">
                            <div className="flex items-start">
                                <FiShield className="h-10 w-10 mr-4 mt-1 text-yellow-500 flex-shrink-0" />
                                <div>
                                    <h2 className="font-extrabold text-xl text-yellow-900 dark:text-yellow-100">🛡️ ¡ACTIVA EL SOPORTE HUMANO CONTRA EL BOT!</h2>
                                    <p className="mt-2 text-sm">
                                        <strong>¡EL PROBLEMA ES EL SOPORTE AUTOMÁTICO!</strong> Si no está afiliado a <span translate="no">TRADEVISION</span>, solo obtendrá soporte de la IA del broker para sus problemas de retiro o verificación.
                                    </p>
                                    <p className="mt-2 text-sm font-bold">
                                        Beneficio de Afiliación: Al registrar su cuenta a través de nuestro link y enviar su ID, usted desbloquea el Protocolo de Élite de Soporte Humano.
                                    </p>
                                    <p className="mt-2 text-sm">
                                        Nuestros Abogados y Equipo de Soporte Reales: Podemos interceder, dar asesoría especializada y gestionar sus problemas de retiros/verificación/cancelaciones con el broker en nombre de la academia.
                                    </p>
                                    <button
                                        onClick={() => {
                                            document.getElementById('broker-list-container')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="mt-4 inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition"
                                    >
                                        Afiliarme y Activar Soporte Élite
                                    </button>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Search and Filter Controls */}
                        <div className="bg-white dark:bg-gray-900/50 rounded-lg shadow-md p-4 mb-8">
                            <div className="relative mb-4">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre, descripción o ventajas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-red-500">
                                        <FiX />
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${!activeCategory ? 'bg-brand-accent text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                >
                                    Todas
                                </button>
                                {Object.entries(BROKER_CATEGORIES).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveCategory(key)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory === key ? 'bg-brand-accent text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 border-t border-gray-200 dark:border-white/10 pt-4">
                                <button onClick={() => setActiveRegulation(null)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${!activeRegulation ? 'bg-brand-accent/80 text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>Todos</button>
                                <button onClick={() => setActiveRegulation('regulated')} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeRegulation === 'regulated' ? 'bg-brand-accent/80 text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>Regulados</button>
                                <button onClick={() => setActiveRegulation('unregulated')} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeRegulation === 'unregulated' ? 'bg-brand-accent/80 text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>No Regulados</button>
                            </div>
                        </div>

                        <AnimatedSection className="my-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 max-w-5xl mx-auto">
                            <div className="flex items-start">
                                <FiShield className="h-8 w-8 mr-4 mt-1 text-blue-500 flex-shrink-0" />
                                <div>
                                    <h2 className="font-extrabold text-xl">Ética de Afiliados y Fondos: Nuestra Transparencia</h2>
                                    <ul className="mt-4 text-sm space-y-3">
                                        <li><strong>Declaración de Comisión:</strong> Al registrarse con nuestro enlace, TRADEVISION Latam recibe una comisión. Esta comisión se reinvierte íntegramente en la mejora de nuestra plataforma educativa (Zona de Ejecución) y en la creación de contenido de valor, no en incentivos de alto riesgo.</li>
                                        <li><strong>Descarga de Responsabilidad de Fondos:</strong> Debe entender que TRADEVISION no gestiona su capital ni sus retiros. Somos una entidad de formación. No somos responsables de los fondos depositados, los tiempos de retiro o los problemas técnicos del broker.</li>
                                        <li><strong>Prohibición Ética:</strong> Nuestro enfoque es la disciplina. Nunca fomentaremos el exceso de depósito o el uso de estrategias de alto riesgo para cumplir volumen de bonos.</li>
                                    </ul>
                                </div>
                            </div>
                        </AnimatedSection>
                        
                        {/* Content */}
                        <div id="broker-list-container" className="max-w-7xl mx-auto">
                           {categoriesInView.length > 0 ? (
                                <div className="space-y-12">
                                    {categoriesInView.map(category => (
                                        <div key={category}>
                                            <h2 className="text-3xl font-bold mb-6 text-brand-primary dark:text-white border-l-4 border-brand-accent pl-4">{BROKER_CATEGORIES[category as keyof typeof BROKER_CATEGORIES]}</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {groupedTools[category].map((tool) => (
                                                   <BrokerCard key={tool.name} broker={tool} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                           ) : (
                                <div className="text-center py-16 px-6 bg-white dark:bg-gray-700/50 rounded-lg">
                                    <FiSearch className="text-5xl text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold">No se encontraron resultados</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">Intenta con una búsqueda diferente o selecciona otra categoría.</p>
                                </div>
                           )}
                        </div>

                         <div className="text-center mt-16">
                            <button
                                onClick={() => navigate('/')}
                                className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300"
                            >
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

export default BrokersPage;
