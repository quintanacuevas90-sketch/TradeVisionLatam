
import React from 'react';
import { BLOG_POSTS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import PostCard from '../components/PostCard';
import { FiArrowRight } from 'react-icons/fi';
import { useRouter } from '../hooks/useRouter';

const BlogSection: React.FC = () => {
    const recentPosts = BLOG_POSTS.slice(0, 3);
    const { navigate } = useRouter();

    return (
        <AnimatedSection className="py-20 bg-white dark:bg-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-extrabold text-brand-primary dark:text-white">Desde Nuestro Blog</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4 mb-12">
                    Conocimiento y análisis de nuestros expertos para potenciar tu operativa
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {recentPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
                <div className="mt-12">
                    <button
                        onClick={() => navigate('/blog')}
                        className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-primary transition-colors duration-300"
                    >
                        Ver todos los artículos
                        <FiArrowRight />
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default BlogSection;
