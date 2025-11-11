import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Accordion from '../components/Accordion';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiChevronLeft, FiChevronRight, FiUsers, FiBookOpen, FiAward, FiTrendingUp, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';

// Testimonial type for the carousel
interface ResponsibilityTestimonial {
    quote: string;
    author: string;
}

const testimonials: ResponsibilityTestimonial[] = [
    { quote: "El curso privado de Binarias me abrió los ojos. Pasé de quemar cuentas a entender el porqué de cada operación. ¡La gestión de riesgo lo es todo!", author: "Javier R., Colombia" },
    { quote: "No sabía nada de Forex, pero con el curso premium y el apoyo en Telegram, ahora opero con confianza en mercados regulados. ¡Esto es ser un trader profesional!", author: "Ana G., España" },
    { quote: "La cantidad de material gratuito en el grupo de Telegram es increíble. Libros, guías, clases... Más que suficiente para empezar con el pie derecho. ¡Gracias!", author: "Carlos M., Argentina" },
];

// Testimonial Carousel Component
const TestimonialCarousel: React.FC<{ testimonials: ResponsibilityTestimonial[] }> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1)),
            5000
        );
        return () => resetTimeout();
    }, [currentIndex, testimonials.length]);

    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    const nextSlide = () => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

    return (
        <div className="relative w-full max-w-2xl mx-auto h-56">
            <div className="overflow-hidden relative h-full">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border-l-4 border-brand-accent shadow-lg flex flex-col justify-center h-full">
                             <p className="text-gray-600 dark:text-gray-300 italic text-lg">"{testimonial.quote}"</p>
                            <p className="font-bold text-right mt-4 text-brand-primary dark:text-white">- {testimonial.author}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 rounded-full p-2 z-10"><FiChevronLeft size={24} /></button>
            <button onClick={nextSlide} className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 rounded-full p-2 z-10"><FiChevronRight size={24} /></button>
        </div>
    );
};

// Main Page Component
const ResponsibilityPage: React.FC<{ onOpenModal: (modal: ModalType) => void; }> = ({ onOpenModal }) => {
    const { navigate } = useRouter();

    useEffect(() => {
        document.title = "Nuestra Responsabilidad | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Descubre cómo TradeVision Latam impacta a la comunidad a través de la educación gratuita, la disciplina ética y el apoyo comunitario.");
        }
    }, []);
    
    const impactStats = [
        { icon: <FiTrendingUp size={32} />, label: "Desde 2018", description: "Fundados en Europa y Brasil, expandidos a LATAM en 2024. Años de experiencia consolidada." },
        { icon: <FiUsers size={32} />, label: "4 Mentores Globales", description: "Un equipo de expertos reales (España, Brasil, Tailandia, Venezuela) cubriendo todos los mercados." },
        { icon: <FiBookOpen size={32} />, label: "+1000 Libros Gratuitos", description: "Nuestra biblioteca de recursos gratuitos, accesible para toda nuestra comunidad de Telegram." },
        { icon: <FiAward size={32} />, label: "Artículos de Autoridad", description: "Publicaciones mensuales de alta calidad en nuestro blog, enfocadas en disciplina y análisis real." },
    ];
    
    const initiatives = [
        { title: "Trading con Disciplina (Venezuela/LATAM 2024)", description: "Liderada por José Quintana, esta iniciativa combate la desinformación en redes sociales (TikTok/Instagram) proporcionando análisis reales y promoviendo la gestión de riesgo, filtrando a los 'vendedores de humo'." },
        { title: "Academia Abierta (Brasil 2018)", description: "Liderada por Lucas Almeida, esta iniciativa se enfoca en crear la comunidad de Discord más robusta para traders de Bolsa (B3), asegurando que el soporte técnico y la infraestructura comunitaria sean accesibles." },
    ];
    
    const mediaMentions = [
        { source: "Forbes LATAM", quote: "'La nueva ola de academias de trading ético en Venezuela y Colombia'.", date: "Marzo 2025" },
        { source: "El Economista (España)", quote: "'Javier Solís habla sobre la regulación de Forex y la protección al inversor'.", date: "Diciembre 2024" },
        { source: "Brazil Journal (Brasil)", quote: "'Lucas Almeida y el crecimiento del trading en la B3 post-pandemia'.", date: "Enero 2025" },
    ];
    
    const faqs = [
        { q: "¿Por qué TradeVision se enfoca en la Responsabilidad Social?", a: "Creemos que el éxito financiero debe llevar a un cambio positivo. A diferencia de un broker, nuestra responsabilidad no es solo caridad; es educación. Nuestro trabajo de RSC se centra en la formación gratuita, el soporte comunitario y la promoción de la ética para proteger a los traders de la desinformación." },
        { q: "¿Dónde opera TradeVision?", a: "TradeVision Latam es una academia global. Iniciamos en 2018 en España y Brasil, construyendo nuestra base de autoridad. En 2024, expandimos nuestras operaciones a Venezuela y toda Latinoamérica, con José Quintana liderando la formación en español." },
        { q: "¿Con quién colaboran?", a: "Colaboramos con iniciativas locales de educación financiera y promovemos activamente la transparencia. En lugar de solo donar a ONGs, nuestra 'caridad' es nuestra biblioteca gratuita de +1000 libros y nuestros análisis de mercado abiertos en Telegram." },
        { q: "¿Cuál es la diferencia entre TradeVision y un broker?", a: "Somos una academia de formación. Nuestra misión es que aprendas a operar con disciplina. Proporcionamos herramientas para el crecimiento financiero (cursos, bots, análisis), pero no manejamos tu capital. Creemos que el verdadero éxito es sostenible y responsable, tanto dentro como fuera del trading." },
    ];

    const supportFaq = {
        q: "¿Cómo puedo involucrarme o apoyar?",
        a: "El verdadero éxito es inclusivo. Cada Curso Premium adquirido en TradeVision ayuda a financiar la expansión de nuestra biblioteca gratuita, nuestros bots de comunidad (Discord) y nuestros seminarios de trading ético. Cada operación que realizas a través de nuestros enlaces de afiliados verificados nos ayuda a mantener la infraestructura de soporte gratuita.\n\nAdemás, puedes apoyar directamente nuestros talleres comunitarios y nuestra misión de llevar educación financiera a jóvenes en Latinoamérica. Para más detalles sobre nuestras iniciativas y cómo colaborar de forma segura, visita nuestra página de Impacto Social.",
    };

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                {/* Hero */}
                <AnimatedSection className="relative bg-brand-primary text-white py-24 sm:py-32">
                    <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/80 to-brand-primary"></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Cambiando Mentalidades, No Solo Cuentas</h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">En TradeVision Latam, vamos más allá del trading. Creemos que el éxito financiero real comienza con la educación gratuita, la disciplina ética y el apoyo comunitario.</p>
                    </div>
                </AnimatedSection>

                {/* Impact */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Nuestro Impacto en Números</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {impactStats.map((stat, index) => (
                                <div key={index} className="bg-white dark:bg-white/5 p-6 rounded-lg text-center">
                                    <div className="text-brand-accent mx-auto mb-4">{stat.icon}</div>
                                    <h3 className="text-xl font-bold text-brand-primary dark:text-white">{stat.label}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{stat.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* Initiatives */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Nuestras Iniciativas Clave</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {initiatives.map((item, index) => (
                                <div key={index} className="bg-brand-primary text-white p-8 rounded-lg border-2 border-brand-accent shadow-lg">
                                    <FaGraduationCap size={32} className="text-brand-accent mb-4" />
                                    <h3 className="text-xl font-bold text-brand-accent mb-2">{item.title}</h3>
                                    <p className="text-gray-300">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Community Voices */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Voces de la Comunidad</h2>
                        </div>
                        <TestimonialCarousel testimonials={testimonials} />
                    </div>
                </AnimatedSection>
                
                {/* Media Mentions */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">TradeVision en Medios</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Nuestro compromiso con el trading ético está siendo reconocido.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {mediaMentions.map((mention, index) => (
                                <div key={index} className="bg-gray-100 dark:bg-white/5 p-6 rounded-lg">
                                    <p className="text-gray-600 dark:text-gray-300 italic">"{mention.quote}"</p>
                                    <p className="font-bold text-right mt-4 text-brand-primary dark:text-white">- {mention.source} <span className="text-sm font-normal text-gray-500">({mention.date})</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* FAQ */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">¿Necesitas más Información?</h2>
                        </div>
                        <div className="max-w-3xl mx-auto space-y-4">
                            {faqs.map((faq, index) => (
                                <Accordion key={index} title={faq.q}>
                                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{faq.a}</p>
                                </Accordion>
                            ))}
                            <Accordion title={supportFaq.q}>
                                <div className="space-y-4">
                                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{supportFaq.a}</p>
                                    <button
                                        onClick={() => navigate('/impacto-social')}
                                        className="inline-flex items-center gap-2 bg-brand-accent text-brand-primary font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition duration-300"
                                    >
                                        Ver Página de Impacto Social <FiArrowRight />
                                    </button>
                                </div>
                            </Accordion>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800">
                    <button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 bg-brand-primary dark:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300">
                        <FiArrowLeft /> Volver a la Página Principal
                    </button>
                </div>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default ResponsibilityPage;