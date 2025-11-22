
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import AnimatedSection from '../components/AnimatedSection';
import Pagination from '../components/Pagination';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../constants';
import { ModalType } from '../types';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { FiSearch, FiBookmark, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from '../hooks/useRouter';
import PageBackButton from '../components/PageBackButton';

const STORAGE_KEY = 'tradevision_read_later';
const POSTS_PER_PAGE = 9;

const BlogListPage: React.FC = () => {
    const { navigate } = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'all' | 'saved'>('all');
    const [savedSlugs, setSavedSlugs] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const onOpenModal = (modal: ModalType) => {
        navigate(`/?open=${modal}`);
    };

    useEffect(() => {
        document.title = "Blog | TradeVision - Análisis y Guías de Trading";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Artículos, guías y análisis para traders que buscan consistencia y profesionalismo. Aprende sobre gestión de riesgo, psicología del trading y más.");
        }
    }, []);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setSavedSlugs(new Set(JSON.parse(saved)));
            }
        } catch (error) {
            console.error("Failed to parse saved slugs from localStorage", error);
            setSavedSlugs(new Set());
        }
    }, []);

    const handleToggleSave = (slug: string) => {
        const newSavedSlugs = new Set(savedSlugs);
        if (newSavedSlugs.has(slug)) {
            newSavedSlugs.delete(slug);
        } else {
            newSavedSlugs.add(slug);
        }
        setSavedSlugs(newSavedSlugs);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSavedSlugs)));
    };

    const filteredPosts = useMemo(() => {
        let posts = BLOG_POSTS;
        if (viewMode === 'saved') {
            posts = posts.filter(p => savedSlugs.has(p.slug));
        }
        if (activeCategory) {
            posts = posts.filter(p => p.category === activeCategory);
        }
        if (searchTerm.trim()) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            posts = posts.filter(p => 
                p.title.toLowerCase().includes(lowerCaseSearch) ||
                p.excerpt.toLowerCase().includes(lowerCaseSearch)
            );
        }
        return posts;
    }, [searchTerm, viewMode, savedSlugs, activeCategory]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, viewMode, activeCategory]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

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
                                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">Blog de <span translate="no">TradeVision</span></h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl">
                                    Artículos, guías y análisis para traders que buscan consistencia y profesionalismo.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <img 
                                    src="https://i.pinimg.com/736x/13/5b/ab/135babacb14935c50766b891f049bdb6.jpg" 
                                    alt="Mascota TradeVision Leyendo" 
                                    className="w-40 md:w-56 rounded-full border-4 border-brand-accent shadow-2xl hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <div className="relative flex-grow">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar artículos por título o contenido..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                                />
                            </div>
                            <div className="flex-shrink-0 flex gap-2">
                                <button 
                                    onClick={() => setViewMode('all')}
                                    className={`px-4 py-3 rounded-lg font-semibold transition-colors ${viewMode === 'all' ? 'bg-brand-accent text-brand-primary' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                                >
                                    Todos los Artículos
                                </button>
                                <button 
                                    onClick={() => setViewMode('saved')}
                                    className={`px-4 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${viewMode === 'saved' ? 'bg-brand-accent text-brand-primary' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                                >
                                    Leer más Tarde
                                    <span className="bg-brand-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{savedSlugs.size}</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mb-8 border-t border-b border-gray-200 dark:border-gray-700 py-4">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${!activeCategory ? 'bg-brand-accent text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                            >
                                Todas
                            </button>
                            {BLOG_CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory === category ? 'bg-brand-accent text-brand-primary' : 'bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {paginatedPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedPosts.map(post => (
                                    <PostCard 
                                        key={post.id} 
                                        post={post}
                                        onToggleSave={handleToggleSave}
                                        isSaved={savedSlugs.has(post.slug)}
                                        highlightTerm={searchTerm}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 px-6 bg-white dark:bg-gray-700/50 rounded-lg">
                                {viewMode === 'saved' ? (
                                    <>
                                        <FiBookmark className="text-5xl text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold">No has guardado artículos</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2">Usa el icono del marcador para guardar artículos y leerlos más tarde.</p>
                                    </>
                                ) : (
                                    <>
                                        <FiSearch className="text-5xl text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold">No se encontraron resultados</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                                            {activeCategory 
                                                ? `No se encontraron resultados para "${searchTerm}" en la categoría "${activeCategory}".`
                                                : 'Intenta con una búsqueda diferente.'
                                            }
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                        
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />

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

export default BlogListPage;
