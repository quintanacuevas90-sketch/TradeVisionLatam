import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import MentorProfileCard from '../components/MentorProfileCard';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { MENTORS } from '../constants';
import { FiArrowLeft, FiArrowRight, FiTarget, FiEye, FiZap, FiUsers, FiCpu, FiGlobe, FiBriefcase } from 'react-icons/fi';
import PageBackButton from '../components/PageBackButton';

interface AboutPageProps {
    onOpenModal: (modal: ModalType) => void;
}

const Milestone: React.FC<{ year: string, title: string, description: string, icon: React.ReactNode }> = ({ year, title, description, icon }) => (
    <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center">
                {icon}
            </div>
            <div className="w-px h-full bg-brand-accent/20 my-2"></div>
        </div>
        <div className="pb-8">
            <p className="font-bold text-brand-accent">{year}</p>
            <h4 className="font-bold text-lg text-brand-primary dark:text-white mt-1">{title}</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
        </div>
    </div>
);

const AboutPage: React.FC<AboutPageProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();

    useEffect(() => {
        document.title = "Acerca de Nosotros | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Conoce la misión, visión y el equipo global detrás de TradeVision Latam. Somos un ecosistema dedicado a la disciplina, ética y rentabilidad sostenible en el trading.");
        }
    }, []);
    
    const milestones = [
        { year: "2018", title: "La Fundación (Europa)", description: "Nace TradeVision en España bajo la visión de nuestro CEO, Javier Solís, con la misión de crear una academia honesta y regulada éticamente, en respuesta a la desinformación de la industria.", icon: <FiTarget size={24} /> },
        { year: "2024", title: "Expansión a LATAM", description: "TradeVision cruza el Atlántico, adaptando su metodología europea probada para el mercado latinoamericano y fundando oficialmente TradeVision Latam.", icon: <FiGlobe size={24} /> },
        { year: "2025", title: "Metodología Premium", description: "Lanzamiento de la Metodología de Ecosistema 360°, integrando Lógica Institucional (SMC), Ventaja Tecnológica (Bots/Scripts) y Psicotrading (Disciplina Mental).", icon: <FiZap size={24} /> },
        { year: "2025", title: "Equipo Global", description: "Consolidación de nuestra Mesa de Mentores Globales, uniendo expertos de España (Javier Solís), Brasil (Lucas Almeida), Tailandia (Amara Srisuk) y Venezuela (José Quintana).", icon: <FiUsers size={24} /> },
        { year: "2025", title: "Despliegue Tecnológico", description: "Implementación de nuestro stack tecnológico Premium: Google AI Studio para contenido, GitHub/Copilot para desarrollo de código, y Netlify (CI/CD) para un despliegue web automatizado.", icon: <FiCpu size={24} /> },
        { year: "2025", title: "Comunidad", description: "Lanzamiento de nuestras comunidades de Telegram y Discord, creando un ecosistema de soporte real para miles de estudiantes en LATAM.", icon: <FiUsers size={24} /> }
    ];

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                {/* Hero Section */}
                <AnimatedSection className="relative bg-brand-primary text-white py-24 sm:py-32">
                    <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-8d04421cd6e1?q=80&w=2070&auto=format&fit=crop')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/80 to-brand-primary"></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="absolute top-8 left-8">
                            <PageBackButton variant="on-dark" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Somos <span translate="no">TradeVision Latam</span></h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
                            Más que una academia. Somos un ecosistema global de traders profesionales dedicados a la disciplina, la ética y la rentabilidad sostenible.
                        </p>
                    </div>
                </AnimatedSection>
                
                {/* Mission & Vision */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-4">
                                <FiEye size={40} className="text-brand-accent" />
                                <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Nuestra Visión: Un Ecosistema de Disciplina</h2>
                                <p className="text-gray-600 dark:text-gray-300">Entendemos los desafíos que enfrentan los traders en Latinoamérica: desde superar las pérdidas y las fluctuaciones del mercado, hasta filtrar el 'ruido' de la desinformación. Creemos que el trading no es solo un camino hacia la independencia financiera; es un recorrido hacia el crecimiento personal y la disciplina profesional.</p>
                            </div>
                             <div className="space-y-4">
                                <FiBriefcase size={40} className="text-brand-accent" />
                                <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Nuestra Misión: Profesionalizar el Trading en LATAM</h2>
                                <p className="text-gray-600 dark:text-gray-300">En <span translate="no">TradeVision Latam</span>, estamos comprometidos a hacer del trading una experiencia transparente, accesible y gratificante. No somos solo instructores; somos asesores y estrategas (liderados por la voz de José Quintana) comprometidos con tu crecimiento. Te apoyamos con condiciones educativas excepcionales, herramientas tecnológicas (Bots/Scripts) y una comunidad que valora la lógica sobre la suerte.</p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* Milestones */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white mb-12">Nuestros Hitos de Fundación</h2>
                         <div className="relative max-w-2xl mx-auto text-left">
                            {milestones.map((milestone, index) => {
                                const descriptionParts = milestone.description.split('TradeVision');
                                const finalDescription = descriptionParts.length > 1 
                                    ? <>{descriptionParts[0]}<span translate="no">TradeVision</span>{descriptionParts[1]}</>
                                    : milestone.description;

                                return <Milestone key={index} {...milestone} description={finalDescription} />
                            })}
                         </div>
                    </div>
                </AnimatedSection>

                {/* Knowledge and Transparency */}
                <AnimatedSection className="py-20 bg-brand-accent/10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Conocimiento y Transparencia</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">No solo informamos sobre cambios técnicos. Nuestra prioridad es mantener a la comunidad informada sobre la realidad del mercado. A través de nuestro Blog de Autoridad y los análisis diarios de José Quintana, filtramos el ruido y nos enfocamos en lo que realmente importa: la Lógica del Precio, la Gestión de Riesgo y el Psicotrading. La transparencia es la base de la confianza.</p>
                        <button onClick={() => navigate('/blog')} className="mt-8 inline-flex items-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition">
                            Ir al Blog de Autoridad <FiArrowRight />
                        </button>
                    </div>
                </AnimatedSection>

                {/* Mentors Section */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary dark:text-white">Nuestra Autoridad: Un Equipo Global de Expertos</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">El trading es una profesión global. Tu educación también debería serlo.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {MENTORS.map(mentor => <MentorProfileCard key={mentor.name} mentor={mentor} />)}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Ethics Section */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                         <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Nuestra Regulación: La Ética Profesional</h2>
                         <p className="mt-4 text-gray-600 dark:text-gray-300"><span translate="no">TradeVision Latam</span> no es un broker, somos una academia de formación. No manejamos su capital de inversión. Nuestra "regulación" es el Cumplimiento Ético (Pilar I).</p>
                         <div className="mt-8 text-left grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                                <h4 className="font-bold text-brand-primary dark:text-white">Transparencia de Riesgo</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Advertimos activamente sobre los instrumentos de alto riesgo (Opciones Binarias) y promovemos su uso solo para fines educativos (cuentas demo).</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                                <h4 className="font-bold text-brand-primary dark:text-white">Enfoque en Regulación</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Impulsamos la profesionalización de nuestros alumnos guiándolos hacia brokers de Forex regulados internacionalmente.</p>
                            </div>
                             <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg sm:col-span-2 lg:col-span-1">
                                <h4 className="font-bold text-brand-primary dark:text-white">Ética de Afiliados</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Prohibimos el marketing engañoso (cero "Hágase Millonario"). Nuestro programa se basa en la transparencia, como se detalla en nuestra página de FAQ.</p>
                            </div>
                         </div>
                         <button onClick={() => navigate('/aviso-legal-riesgo')} className="mt-8 inline-flex items-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition">
                            Leer Nuestra Política de Riesgo <FiArrowRight />
                        </button>
                    </div>
                </AnimatedSection>

                {/* Back button */}
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800">
                    <button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300">
                        <FiArrowLeft /> Volver a la Página Principal
                    </button>
                </div>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default AboutPage;
