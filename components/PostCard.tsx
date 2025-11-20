
import React from 'react';
import { Post } from '../types';
import { FiArrowRight, FiBookmark } from 'react-icons/fi';
import { useRouter } from '../hooks/useRouter';

interface PostCardProps {
    post: Post;
    onToggleSave?: (slug: string) => void;
    isSaved?: boolean;
    highlightTerm?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, onToggleSave, isSaved, highlightTerm }) => {
    const { navigate } = useRouter();

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (window.getSelection()?.toString()) {
            return;
        }
        e.preventDefault();
        navigate(`/blog/${post.slug}`);
    };

    const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent navigation when clicking the save button
        onToggleSave?.(post.slug);
    };

    const highlightText = (text: string, highlight: string): React.ReactNode => {
        if (!highlight.trim()) {
            return text;
        }
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return (
            <span>
                {parts.map((part, i) =>
                    regex.test(part) ? (
                        <mark key={i} className="bg-brand-gold text-brand-primary rounded-sm px-1 py-0">
                            {part}
                        </mark>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div 
            onClick={handleCardClick}
            className="cursor-pointer bg-white dark:bg-brand-primary rounded-lg overflow-hidden group border border-gray-200 dark:border-white/10 hover:border-brand-accent transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-brand-accent/10 transform hover:-translate-y-2 flex flex-col"
        >
            <div className="relative h-48 overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                {onToggleSave && isSaved !== undefined && (
                     <button
                        onClick={handleSaveClick}
                        className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-300 z-10
                            ${isSaved ? 'bg-brand-accent text-white' : 'bg-black/50 text-white hover:bg-brand-accent/80'}
                        `}
                        aria-label={isSaved ? "Quitar de Leer más Tarde" : "Guardar para Leer más Tarde"}
                    >
                        <FiBookmark size={18} />
                    </button>
                )}
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
                <h3 className="text-xl font-bold mb-3 text-brand-primary dark:text-white group-hover:text-brand-accent transition-colors duration-300 min-h-[56px]">{highlightText(post.title, highlightTerm || '')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-base flex-grow">{highlightText(post.excerpt, highlightTerm || '')}</p>
                <span className="font-bold text-brand-accent inline-flex items-center gap-2 mt-auto">
                    Leer más <FiArrowRight />
                </span>
            </div>
        </div>
    );
};

export default PostCard;