

import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX, FiFileText, FiHelpCircle } from 'react-icons/fi';
import { BLOG_POSTS, COMPREHENSIVE_FAQS } from '../constants';
import { SearchResultItem } from '../types';
import { useRouter } from '../hooks/useRouter';

interface SearchProps {
    isOpen: boolean;
    onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResultItem[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const { navigate } = useRouter();

    useEffect(() => {
        if (!isOpen) {
            // Reset state when closed
            setQuery('');
            setResults([]);
        } else {
            // Focus input when opened
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim().length < 3) {
            setResults([]);
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        
        const blogResults = BLOG_POSTS
            .filter(p => 
                p.title.toLowerCase().includes(lowerCaseQuery) || 
                p.excerpt.toLowerCase().includes(lowerCaseQuery)
            )
            .map(data => ({ type: 'blog' as const, data }));

        const faqResults = COMPREHENSIVE_FAQS
            .filter(f => 
                f.question.toLowerCase().includes(lowerCaseQuery) || 
                f.answer.toLowerCase().includes(lowerCaseQuery)
            )
            .map(data => ({ type: 'faq' as const, data }));

        setResults([...blogResults, ...faqResults]);
    }, [query]);

    const handleBlogClick = (slug: string) => {
        navigate(`/blog/${slug}`);
        onClose();
    }
    
    const handleFaqClick = () => {
        navigate('/faq');
        onClose();
    }

    return (
        <div 
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <div 
                className="relative w-full max-w-2xl mx-auto mt-[10vh] p-4"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Buscar en el sitio... (e.g., 'riesgo', 'broker')"
                        className="w-full bg-white dark:bg-gray-800 text-lg p-4 pl-12 pr-12 rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    />
                    <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition">
                        <FiX size={24} />
                    </button>
                </div>

                {/* Results */}
                {query.length >= 3 && (
                     <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-h-[60vh] overflow-y-auto">
                        {results.length > 0 ? (
                             <ul>
                                {results.map((item, index) => (
                                    <li key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                        {item.type === 'blog' ? (
                                             <button onClick={() => handleBlogClick(item.data.slug)} className="w-full text-left p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-start gap-4">
                                                <FiFileText className="text-brand-accent flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-bold text-brand-primary dark:text-white">{item.data.title}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.data.excerpt}</p>
                                                </div>
                                             </button>
                                        ) : (
                                            <button onClick={handleFaqClick} className="w-full text-left p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-start gap-4">
                                                <FiHelpCircle className="text-brand-accent flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-bold text-brand-primary dark:text-white">{item.data.question}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.data.answer}</p>
                                                </div>
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <p>No se encontraron resultados para "{query}"</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;