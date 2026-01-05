
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

    // 1. Filtrado de herramientas
    const filteredTools = useMemo(() => {
        let tools = [...ALL_BROKERS_AND_TOOLS];

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
                tool.advantages.some(adv => adv.toLowerCase().includes(lowerCaseSearch))
            );
        }

        return tools;
    }, [searchTerm, activeCategory, activeRegulation]);

    // 2. Agrupación segura
    const groupedTools = useMemo(() => {
        const groups: Record<string, PartnerTool[]> = {
            binary: [],
            forex: [],
            wallet: []
        };
        
        filteredTools.forEach(tool => {
            if (groups[tool.category]) {
                groups[tool.category].push(tool);
            }
        });
        
        return groups;
    }, [filteredTools]);
    
    // 3. Determinar qué categorías mostrar
    const categoriesInView = useMemo(() => {
        const allKeys = Object.keys(BROKER_CATEGORIES) as (keyof typeof BROKER_CATEGORIES)[];
        if (activeCategory) {
            return groupedTools[activeCategory]?.length > 0 ? [activeCategory] : [];
        }
        return allKeys.filter(cat => groupedTools[cat] && groupedTools[cat].length > 0);
    }, [activeCategory, groupedTools]);


    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20 bg-gray-50 dark:bg-brand-primary min-h-screen">
                <div className="py-12 md:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <PageBackButton />
                        </div>

                        {/* Encabezado Principal */}
                        <header className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-black text-brand-primary dark:text-white uppercase tracking-tighter">Brokers y Herramientas</h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl font-medium">
                                    La selección de plataformas y herramientas recomendadas para una operativa segura y eficiente en Latinoamérica.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-brand-accent/20 blur-2xl rounded-full"></div>
                                    <img 
                                        src="https://i.pinimg.com/736x/08/a9/be/08a9be7a9a02639197bb6f7985d715f8.jpg" 
                                        alt="Mascota TradeVision Pensando" 
                                        className="relative w-40 md:w-56 rounded-full border-4 border-brand-accent shadow-2xl"
                                    />
                                </div>
                            </div>
                        </header>

                        {/* Banner de Soporte Élite */}
                        <AnimatedSection className="my-12 p-6 bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl border-l-8 border-yellow-500 text-yellow-800 dark:text-yellow-100 max-w-5xl mx-auto shadow-xl">
                            <div className="flex items-start">
                                <FiShield className="h-10 w-10 mr-4 mt-1 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                                <div>
                                    <h2 className="font-black text-xl uppercase tracking-tight">🛡️ Activa el Soporte Humano Contra el Bot</h2>
                                    <p className="mt-2 text-sm leading-relaxed">
                                        <strong>¡Evita el soporte automático!</strong> Si no está afiliado a <span translate="no">TRADEVISION</span>, solo obtendrá soporte de IA del broker. Beneficio de Afiliación: Al registrarse con nuestro link y enviar su ID, desbloquea el Protocolo de Élite de Soporte Humano.
                                    </p>
                                    <button
                                        onClick={() => {
                                            document.getElementById('broker-list-container')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="mt-4 inline-flex items-center justify-center gap-2 bg-yellow-500 text-black font-black py-2 px-6 rounded-lg hover:bg-yellow-400 transition shadow-md uppercase text-xs tracking-widest"
                                    >
                                        Afiliarme y Activar Soporte
                                    </button>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Controles de Búsqueda y Filtro */}
                        <div className="bg-white dark:bg-[#112240] rounded-2xl shadow-2xl border border-white/5 p-6 mb-12 max-w-5xl mx-auto">
                            <div className="relative mb-6">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre o ventaja..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-10 py-4 bg-gray-100 dark:bg-[#0A1931] border-none rounded-xl text-brand-primary dark:text-white focus:ring-2 focus:ring-brand-accent transition-all font-medium"
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-red-500">
                                        <FiX size={20} />
                                    </button>
                                )}
                            </div>
                            
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-wrap justify-center gap-2">
                                    <button
                                        onClick={() => setActiveCategory(null)}
                                        className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${!activeCategory ? 'bg-brand-accent text-brand-primary shadow-[0_0_15px_rgba(64,224,208,0.3)]' : 'bg-gray-200 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-white/10'}`}
                                    >
                                        Todas las Categorías
                                    </button>
                                    {Object.entries(BROKER_CATEGORIES).map(([key, value]) => (
                                        <button
                                            key={key}
                                            onClick={() => setActiveCategory(key)}
                                            className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${activeCategory === key ? 'bg-brand-accent text-brand-primary shadow-[0_0_15px_rgba(64,224,208,0.3)]' : 'bg-gray-200 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-white/10'}`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                                
                                <div className="flex justify-center gap-4 border-t border-gray-200 dark:border-white/10 pt-4">
                                    <button onClick={() => setActiveRegulation(null)} className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded border transition-colors ${!activeRegulation ? 'border-brand-accent text-brand-accent' : 'border-gray-500 text-gray-500'}`}>Todos</button>
                                    <button onClick={() => setActiveRegulation('regulated')} className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded border transition-colors ${activeRegulation === 'regulated' ? 'border-brand-accent text-brand-accent' : 'border-gray-500 text-gray-500'}`}>Regulados</button>
                                    <button onClick={() => setActiveRegulation('unregulated')} className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded border transition-colors ${activeRegulation === 'unregulated' ? 'border-brand-accent text-brand-accent' : 'border-gray-500 text-gray-500'}`}>No Regulados</button>
                                </div>
                            </div>
                        </div>

                        {/* Listado de Brokers */}
                        <div id="broker-list-container" className="max-w-7xl mx-auto">
                           {categoriesInView.length > 0 ? (
                                <div className="space-y-16">
                                    {categoriesInView.map(category => (
                                        <div key={category} className="animate-fade-in-up">
                                            <div className="flex items-center gap-4 mb-8">
                                                <h2 className="text-2xl md:text-3xl font-black text-brand-primary dark:text-white uppercase tracking-tighter">{BROKER_CATEGORIES[category as keyof typeof BROKER_CATEGORIES]}</h2>
                                                <div className="h-1 flex-grow bg-gradient-to-r from-brand-accent/40 to-transparent rounded-full"></div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {groupedTools[category].map((tool) => (
                                                   <BrokerCard key={tool.name} broker={tool} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                           ) : (
                                <div className="text-center py-24 px-6 bg-white dark:bg-[#112240] rounded-3xl border border-white/5 shadow-inner">
                                    <FiSearch className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-6 opacity-50" />
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Sin resultados tácticos</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto font-medium">No se encontraron herramientas con los filtros actuales. Prueba ampliando tu búsqueda o cambiando de categoría.</p>
                                    <button 
                                        onClick={() => {setSearchTerm(''); setActiveCategory(null); setActiveRegulation(null);}}
                                        className="mt-8 bg-brand-accent text-brand-primary font-black py-3 px-8 rounded-xl hover:scale-105 transition-all uppercase text-xs tracking-widest"
                                    >
                                        Limpiar Filtros
                                    </button>
                                </div>
                           )}
                        </div>

                        {/* Footer de Página */}
                         <div className="text-center mt-20 pb-10">
                            <button
                                onClick={() => navigate('/')}
                                className="inline-flex items-center justify-center gap-2 bg-brand-primary dark:bg-white/5 text-white font-black py-4 px-10 rounded-2xl border border-white/10 hover:bg-brand-accent hover:text-brand-primary hover:border-brand-accent transition-all duration-300 uppercase text-sm tracking-widest group"
                            >
                                <FiArrowLeft className="group-hover:-translate-x-2 transition-transform" /> Volver al Centro de Mando
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default BrokersPage;
