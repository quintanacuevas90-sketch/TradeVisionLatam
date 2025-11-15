import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PostCard from '../components/PostCard';
import { BLOG_POSTS } from '../constants';
import { ModalType } from '../types';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { useRouter } from '../hooks/useRouter';
import { FiCalendar, FiUser, FiBookmark, FiTwitter, FiFacebook, FiLinkedin, FiArrowLeft, FiHome } from 'react-icons/fi';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import Accordion from '../components/Accordion';
import PageBackButton from '../components/PageBackButton';

interface BlogPostPageProps {
    slug: string;
}

const STORAGE_KEY = 'tradevision_read_later';

const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
    const { navigate } = useRouter();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    const [isSaved, setIsSaved] = useState(false);
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeHeading, setActiveHeading] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const onOpenModal = (modal: ModalType) => {
        navigate(`/?open=${modal}`);
    };

    // Effect for ToC generation
    useEffect(() => {
        if (post && contentRef.current) {
            const headingElements = contentRef.current.querySelectorAll('h2, h3');
            const extractedHeadings = Array.from(headingElements).map((h, index) => {
                const heading = h as HTMLElement;
                const text = heading.textContent || '';
                const level = parseInt(heading.tagName.substring(1), 10);
                const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + `-${index}`;
                heading.id = id;
                return { id, text, level };
            });
            setHeadings(extractedHeadings);
        }
    }, [post]);

    // Effect for "Read Later" status
    useEffect(() => {
        if (post) {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const savedSlugs: string[] = JSON.parse(saved);
                    setIsSaved(savedSlugs.includes(post.slug));
                } catch (e) {
                    console.error("Failed to parse saved slugs", e);
                    setIsSaved(false);
                }
            }
        }
    }, [post]);

    // Effect for SEO and JSON-LD
    useEffect(() => {
        if (post) {
            document.title = `${post.title} | TradeVision`;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', post.excerpt);
            }

            const oldScript = document.getElementById('json-ld-blog-post');
            if (oldScript) oldScript.remove();

            const parseSpanishDate = (dateString: string) => {
                 const months: { [key: string]: string } = { 'Enero': '01', 'Febrero': '02', 'Marzo': '03', 'Abril': '04', 'Mayo': '05', 'Junio': '06', 'Julio': '07', 'Agosto': '08', 'Septiembre': '09', 'Octubre': '10', 'Noviembre': '11', 'Diciembre': '12' };
                 const parts = dateString.replace(',', '').split(' ');
                 if (parts.length === 3) {
                     const day = parts[0].padStart(2,'0');
                     const month = months[parts[1]];
                     const year = parts[2];
                     if (day && month && year) return `${year}-${month}-${day}`;
                 }
                 return new Date().toISOString().split('T')[0];
            };
            
            const script = document.createElement('script');
            script.id = 'json-ld-blog-post';
            script.type = 'application/ld+json';
            script.innerHTML = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: post.title,
                description: post.excerpt,
                image: post.imageUrl,
                author: { '@type': 'Person', name: post.author === 'José Quintana' ? 'José Quintana' : 'TradeVision' },
                publisher: { '@type': 'Organization', name: 'TradeVision', logo: { '@type': 'ImageObject', url: window.location.origin + '/vite.svg' } },
                datePublished: parseSpanishDate(post.date),
            });
            document.head.appendChild(script);

            return () => {
                const scriptToRemove = document.getElementById('json-ld-blog-post');
                if (scriptToRemove) scriptToRemove.remove();
            };
        }
    }, [post]);

    // Effect for active heading on scroll
    useEffect(() => {
        if (headings.length === 0) return;

        const handleScroll = () => {
            const scrollOffset = 120; // A fixed offset from the top to account for the header
            let latestActiveId: string | null = null;
            
            for (const heading of headings) {
                const element = document.getElementById(heading.id);
                if (element && element.getBoundingClientRect().top < scrollOffset) {
                    latestActiveId = heading.id;
                } else {
                    // Since headings are ordered, once we find one below the offset, we can stop
                    break;
                }
            }
            setActiveHeading(latestActiveId);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings]);


    const handleToggleSave = () => {
        if (!post) return;
        const saved = localStorage.getItem(STORAGE_KEY);
        let savedSlugs: string[] = saved ? JSON.parse(saved) : [];
        
        if (isSaved) {
            savedSlugs = savedSlugs.filter((s: string) => s !== post.slug);
        } else {
            savedSlugs.push(post.slug);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSlugs));
        setIsSaved(!isSaved);
    };
    
    const handleTocLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href')?.substring(1);
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };


    if (!post) {
        return (
            <>
                <Header onOpenModal={onOpenModal} />
                <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-800">
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <PageBackButton />
                        <div className="text-center mt-8">
                            <h1 className="text-4xl font-bold">Artículo no encontrado</h1>
                            <p className="mt-4">El artículo que buscas no existe o ha sido movido.</p>
                            <button onClick={() => navigate('/blog')} className="mt-6 bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg">
                                Volver al Blog
                            </button>
                        </div>
                    </div>
                </main>
                <Footer onOpenModal={onOpenModal} />
            </>
        );
    }

    const shareUrl = window.location.href;
    const shareTitle = encodeURIComponent(post.title);
    const socialShares = [
        { icon: FiTwitter, href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, name: 'Twitter' },
        { icon: FiFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, name: 'Facebook' },
        { icon: FiLinkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`, name: 'LinkedIn' },
        { icon: FaWhatsapp, href: `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`, name: 'WhatsApp' },
        { icon: FaTelegram, href: `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`, name: 'Telegram' },
    ];
    
    const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <article>
                    <header className="py-20 bg-brand-primary text-white text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: `url(${post.imageUrl})`}}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/80 to-transparent"></div>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                            <h1 className="text-4xl md:text-5xl font-extrabold">{post.title}</h1>
                            <div className="mt-4 flex items-center justify-center gap-6 text-gray-300">
                                <span className="flex items-center gap-2"><FiUser /> {post.author}</span>
                                <span className="flex items-center gap-2"><FiCalendar /> {post.date}</span>
                            </div>
                        </div>
                    </header>
                    
                    <div className="py-12 bg-gray-50 dark:bg-gray-900">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                             <div className="mb-8">
                                <PageBackButton />
                            </div>
                            <div className="lg:grid lg:grid-cols-4 lg:gap-12">
                                <aside className="hidden lg:block lg:col-span-1">
                                    <div className="sticky top-24">
                                        {headings.length > 0 && (
                                            <>
                                                <h4 className="font-bold mb-4">Índice del Artículo</h4>
                                                <ul className="space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
                                                    {headings.map(h => (
                                                        <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 1.5}rem` }}>
                                                            <a 
                                                                href={`#${h.id}`}
                                                                onClick={handleTocLinkClick}
                                                                className={`text-sm block border-l-2 -ml-px pl-3 transition-all duration-200 ${
                                                                    activeHeading === h.id 
                                                                        ? 'text-brand-accent font-bold border-brand-accent' 
                                                                        : 'text-gray-600 dark:text-gray-400 hover:text-brand-accent border-transparent hover:border-gray-400'
                                                                }`}
                                                            >
                                                                {h.text}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </aside>
                                <div className="lg:col-span-3">
                                    {/* Table of Contents for smaller screens */}
                                    {headings.length > 0 && (
                                        <div className="mb-8 lg:hidden">
                                            <Accordion title="Índice del Artículo">
                                                <ul className="space-y-2 pl-2">
                                                    {headings.map(h => (
                                                        <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 1}rem` }}>
                                                            <a 
                                                                href={`#${h.id}`}
                                                                onClick={handleTocLinkClick}
                                                                className="text-sm block py-1 text-gray-600 dark:text-gray-400 hover:text-brand-accent transition-colors"
                                                            >
                                                                {h.text}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Accordion>
                                        </div>
                                    )}

                                    <div 
                                        ref={contentRef}
                                        className="prose dark:prose-invert prose-lg max-w-none prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-2 prose-h2:mt-12 prose-h3:mt-8 prose-headings:text-brand-primary dark:prose-headings:text-white prose-a:text-brand-accent hover:prose-a:underline prose-strong:text-brand-primary dark:prose-strong:text-white prose-li:my-1"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                    <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-b border-gray-200 dark:border-gray-700">
                                        <button
                                            onClick={handleToggleSave}
                                            className={`inline-flex items-center gap-2 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${isSaved ? 'bg-brand-accent/10 text-brand-accent' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'}`}
                                        >
                                            <FiBookmark />
                                            {isSaved ? 'Guardado' : 'Leer más Tarde'}
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold">Compartir:</span>
                                            {socialShares.map(social => (
                                                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-brand-accent rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={`Share on ${social.name}`}>
                                                    {React.createElement(social.icon)}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <button
                                            onClick={() => navigate('/blog')}
                                            className="inline-flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 w-full sm:w-auto"
                                        >
                                            <FiArrowLeft /> Volver a los Artículos
                                        </button>
                                        <button
                                            onClick={() => navigate('/')}
                                            className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300 w-full sm:w-auto"
                                        >
                                           <FiHome /> Salir del Blog (Ir al Inicio)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                <AnimatedSection className="py-20 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-8">También te puede interesar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map(p => <PostCard key={p.id} post={p} />)}
                        </div>
                    </div>
                </AnimatedSection>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default BlogPostPage;
