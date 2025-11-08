
import React from 'react';
import { BLOG_POSTS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import { FaArrowRight } from 'react-icons/fa';

const BlogSection: React.FC = () => {
    const recentPosts = BLOG_POSTS.slice(0, 3);

    return (
        <AnimatedSection className="py-20 bg-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Desde Nuestro <span className="text-brand-accent">Blog</span></h2>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-12">Análisis, guías y reflexiones para potenciar tu operativa.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map((post) => (
                        <div key={post.id} className="bg-brand-primary rounded-lg overflow-hidden group border border-transparent hover:border-brand-accent transition-all duration-300">
                           <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                           <div className="p-6">
                                <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-brand-accent transition-colors">{post.title}</h3>
                                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                                <a href="#" className="font-bold text-brand-accent inline-flex items-center gap-2">
                                    Leer más <FaArrowRight />
                                </a>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default BlogSection;
