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
import PageBackButton from '../components/PageBackButton';

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
        { name: 'Sobre Nosotros', path: '/acerca-de' },
        { name: 'Nuestra Responsabilidad', path: '/responsabilidad' },
        { name: 'Impacto Social', path: '/impacto-social' },
        { name: 'Forma Parte de TradeVision', path: '/colabora' },
        { name: 'Comunidad', path: '/comunidad' },
    ];
    
    const legalPages = [
        { name: 'Aviso Legal y Riesgo', path: '/aviso-legal-riesgo' },
        { name: 'Términos de la Academia', path: '/terminos-academia' },
        { name: 'Política de Privacidad', path: '/politica-privacidad' },
        { name: 'Transparencia y Legalidad', path: '/transparencia-legal' },
    ];

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <PageBackButton />
                        </div>
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
                                    {infoSections.map(section => (
                                        <button key={section.name} onClick={() => navigate(section.path)} className="flex items-center gap-2 text-brand-accent hover:underline text-left">
                                           <FiArrowRight /> {section.name}
                                        </button>
                                    ))}
                                </div>
                                
                                <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-brand-accent pb-2">Sección Legal</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {legalPages.map(page => (
                                        <button key={page.name} onClick={() => navigate(page.path)} className="flex items-center gap-2 text-brand-accent hover:underline text-left">
                                           <FiArrowRight /> {page.name}
                                        </button>
                                    ))}
                                </div>

                                <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-brand-accent pb-2">Enlaces Externos y Redes Sociales</h2>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {SOCIAL_LINKS.map(link => (
                                         <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-accent dark:hover:text-brand-accent transition">
                                            {React.createElement(link.icon, { className: `flex-shrink-0 ${link.colorClass}` })}
                                            <span className="hover:underline">{link.name}</span>
                                        </a>
                                    ))}
                                    <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-accent dark:hover:text-brand-accent transition">
                                        <FaWhatsapp className="text-whatsapp-green" /> Soporte Directo WhatsApp
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
