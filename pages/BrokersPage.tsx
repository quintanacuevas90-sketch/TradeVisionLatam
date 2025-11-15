import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrokerCard from '../components/BrokerCard';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ALL_BROKERS_AND_TOOLS, BROKER_CATEGORIES } from '../constants';
import { ModalType, PartnerTool } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiSearch, FiX, FiArrowLeft } from 'react-icons/fi';
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
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white"><span translate="no">Brokers</span> y Herramientas</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                                La selección de plataformas y herramientas recomendadas por nuestro equipo para una operativa segura y eficiente.
                            </p>
                        </div>

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
                                {Object.entries(BROKER_CATEGORIES).map(([key, value]) => {
                                    let label: React.ReactNode = value;
                                    if (value.startsWith('Forex')) {
                                        label = <><span translate="no">Forex</span> y Herramientas Premium</>;
                                    } else if (value.startsWith('Wallets')) {
                                        label = <><span translate="no">Wallets</span> (Gestión de Capital)</>;
                                    }
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setActiveCategory(key)}
                                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory === key ? 'bg-brand-accent text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 border-t border-gray-200 dark:border-white/10 pt-4">
                                <button onClick={() => setActiveRegulation(null)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${!activeRegulation ? 'bg-brand-accent/80 text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>Todos</button>
                                <button onClick={() => setActiveRegulation('regulated')} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeRegulation === 'regulated' ? 'bg-brand-accent/80 text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>Regulados</button>
                                <button onClick={() => setActiveRegulation('unregulated')} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeRegulation === 'unregulated' ? 'bg-brand-accent/80 text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>No Regulados</button>
                            </div>
                        </div>

                        {/* How to Start Section */}
                        <AnimatedSection className="my-12 p-8 bg-white dark:bg-gray-900/50 rounded-lg shadow-lg border border-gray-200 dark:border-white/10">
                            <h2 className="text-3xl font-bold text-center mb-6 text-brand-primary dark:text-white">¿Cómo Empezar con tu Primer <span translate="no">Broker</span>?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent text-brand-primary text-2xl font-bold mb-4">1</div>
                                    <h3 className="text-xl font-semibold mb-2">Educa tu Criterio</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Antes de elegir, entiende los fundamentos. Visita nuestra sección educativa para aprender a diferenciar entre tipos de brokers y estrategias.</p>
                                    <button onClick={() => navigate('/methodology')} className="font-bold text-brand-accent hover:underline text-sm">Ver Metodología</button>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent text-brand-primary text-2xl font-bold mb-4">2</div>
                                    <h3 className="text-xl font-semibold mb-2">Elige tu Plataforma</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Usa los filtros de arriba para comparar brokers. Prioriza las plataformas reguladas para mayor seguridad, especialmente para Forex.</p>
                                    <button onClick={() => navigate('/aviso-legal-riesgo')} className="font-bold text-brand-accent hover:underline text-sm">Leer Advertencia de Riesgo</button>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent text-brand-primary text-2xl font-bold mb-4">3</div>
                                    <h3 className="text-xl font-semibold mb-2">Regístrate y Valida</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Usa nuestros enlaces para registrarte y envíanos tu ID de cuenta para obtener soporte prioritario y acceso a nuestra comunidad privada.</p>
                                    <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-accent hover:underline text-sm">Contactar a Soporte</a>
                                </div>
                            </div>
                        </AnimatedSection>
                        
                        {/* Content */}
                        <div className="max-w-7xl mx-auto">
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
