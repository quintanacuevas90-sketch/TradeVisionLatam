
import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Accordion from '../components/Accordion';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { COMPREHENSIVE_FAQS, COMPREHENSIVE_FAQ_CATEGORIES } from '../constants';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiSearch, FiX, FiArrowLeft } from 'react-icons/fi';

interface FaqPageProps {
    onOpenModal: (modal: ModalType) => void;
}

const FaqPage: React.FC<FaqPageProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useEffect(() => {
        document.title = "Preguntas Frecuentes | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Encuentra respuestas a todas tus dudas sobre nuestra metodología, cursos, brokers, ética de afiliados y más. La base de conocimiento completa de TradeVision.");
        }
    }, []);

    const filteredFaqs = useMemo(() => {
        let faqs = COMPREHENSIVE_FAQS;

        if (activeCategory) {
            faqs = faqs.filter(faq => faq.category === activeCategory);
        }

        if (searchTerm.trim()) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            faqs = faqs.filter(faq => 
                faq.question.toLowerCase().includes(lowerCaseSearch) ||
                faq.answer.toLowerCase().includes(lowerCaseSearch)
            );
        }

        return faqs;
    }, [searchTerm, activeCategory]);

    const groupedFaqs = useMemo(() => {
        return filteredFaqs.reduce((acc, faq) => {
            (acc[faq.category] = acc[faq.category] || []).push(faq);
            return acc;
        }, {} as Record<string, typeof COMPREHENSIVE_FAQS>);
    }, [filteredFaqs]);

    const categoriesInView = activeCategory ? [activeCategory] : COMPREHENSIVE_FAQ_CATEGORIES.filter(cat => groupedFaqs[cat]);

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">Preguntas Frecuentes</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                                Respuestas directas de nuestros expertos. En TradeVision Latam creemos en la transparencia total. Aquí no escondemos nada.
                            </p>
                        </div>

                        {/* Search and Filter Controls */}
                        <div className="bg-white dark:bg-gray-900/50 rounded-lg shadow-md p-4 mb-8">
                            <div className="relative mb-4">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar por palabra clave (ej. 'liquidez', 'broker', 'afiliado')..."
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
                            <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${!activeCategory ? 'bg-brand-accent text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                >
                                    Todas
                                </button>
                                {COMPREHENSIVE_FAQ_CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory === category ? 'bg-brand-accent text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* FAQ Content */}
                        <div className="max-w-4xl mx-auto">
                           {categoriesInView.length > 0 ? (
                                <div className="space-y-8">
                                    {categoriesInView.map(category => (
                                        <div key={category}>
                                            <h2 className="text-2xl font-bold mb-4 text-brand-primary dark:text-white">{category}</h2>
                                            <div className="space-y-4">
                                                {groupedFaqs[category].map((faq, index) => (
                                                    <Accordion key={index} title={faq.question}>
                                                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{faq.answer}</p>
                                                    </Accordion>
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

                         <div className="text-center mt-12">
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

export default FaqPage;