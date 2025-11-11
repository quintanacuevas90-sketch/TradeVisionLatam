
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import { BLOG_POSTS, SOCIAL_LINKS } from '../constants';
import { ModalType } from '../types';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { useRouter } from '../hooks/useRouter';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface SitemapPageProps {
    onOpenModal: (modal: ModalType) => void;
}

const SitemapPage: React.FC<SitemapPageProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();

    useEffect(() => {
        document.title = "Mapa del Sitio | TradeVision";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Encuentra rápidamente todo el contenido y los recursos que TradeVision tiene para ofrecer. Navega por nuestras páginas, artículos del blog y secciones informativas.");
        }
    }, []);

    const mainPages = [
        { name: 'Página de Inicio', path: '/' },
        { name: 'Blog de Trading', path: '/blog' },
        { name: 'Brokers Recomendados', path: '/brokers' },
        { name: 'Preguntas Frecuentes', path: '/faq' },
        { name: 'Cursos Premium', path: '/premium-courses' },
        { name: 'Consultoría para Mentores', path: '/consultancy' },
    ];

    const infoSections = [
        { name: 'Nuestra Metodología', path: '/methodology' },
        { name: 'Programa de Afiliados', modal: 'affiliate' },
        { name: 'Legal y Términos', modal: 'legal' },
        { name: 'Comunidad', modal: 'community' },
        { name: 'Conócenos', modal: 'about' },
    ];

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">Mapa del Sitio</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                                Una guía completa para navegar por todos los recursos y contenidos que TradeVision ha creado para ti.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-bold mb-4 border-b-2 border-brand-accent pb-2">Navegación Principal</h2>
                                <ul className="space-y-3">
                                    {mainPages.map(page => (
                                        <li key={page.name}>
                                            <button onClick={() => navigate(page.path)} className="flex items-center gap-2 text-brand-accent hover:underline">
                                                <FiArrowRight /> {page.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-brand-accent pb-2">Secciones Informativas</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {infoSections.map(section => {
                                        const action = 'path' in section && section.path
                                            ? () => navigate(section.path)
                                            : () => onOpenModal(section.modal as ModalType);
                                        return (
                                            <button key={section.name} onClick={action} className="flex items-center gap-2 text-brand-accent hover:underline text-left">
                                               <FiArrowRight /> {section.name}
                                            </button>
                                        );
                                    })}
                                </div>

                                <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-brand-accent pb-2">Enlaces Externos y Redes Sociales</h2>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {SOCIAL_LINKS.map(link => (
                                         <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-accent hover:underline">
                                            {React.createElement(link.icon, { className: 'text-brand-accent' })} {link.name}
                                        </a>
                                    ))}
                                    <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-accent hover:underline">
                                        <FaWhatsapp className="text-brand-accent" /> Soporte Directo WhatsApp
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 border-b-2 border-brand-accent pb-2">Artículos del Blog</h2>
                                <ul className="space-y-3 columns-1 sm:columns-2">
                                    {BLOG_POSTS.map(post => (
                                        <li key={post.id} className="break-inside-avoid">
                                            <button onClick={() => navigate(`/blog/${post.slug}`)} className="flex items-start gap-2 text-brand-accent hover:underline text-left">
                                               <FiArrowRight className="mt-1.5 flex-shrink-0" /> <span>{post.title}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
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

export default SitemapPage;
