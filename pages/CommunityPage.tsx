import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { SOCIAL_LINKS } from '../constants';
import { FaBook, FaGraduationCap, FaUsers } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { handleEmailClick, EMAIL_TOOLTIP } from '../utils/emailHandler';
import UrgencyCtaSection from '../sections/UrgencyCtaSection';

interface CommunityPageProps {
    onOpenModal: (modal: ModalType) => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();

    useEffect(() => {
        document.title = "Comunidad Gratuita | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Accede al Ecosistema Gratuito de TradeVision: +2000 libros, +20 cursos y análisis de expertos. Únete a la comunidad de traders más disciplinada de LATAM.");
        }
    }, []);

    const valueProps = [
        { icon: <FaBook />, title: "+2000 Libros Gratis", description: "Accede a la biblioteca de trading más completa de LATAM (PDFs para leer y descargar)." },
        { icon: <FaGraduationCap />, title: "+20 Cursos Gratis", description: "Cursos introductorios de Análisis Técnico, Psicotrading y Gestión de Riesgo." },
        { icon: <FaUsers />, title: "Análisis de Expertos", description: "Acceso al análisis de nuestros mentores y una red de traders profesionales." },
    ];

    const filteredSocialLinks = SOCIAL_LINKS.filter(link => 
        !['Comunidad Telegram', 'Canal WhatsApp'].includes(link.name)
    );

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <UrgencyCtaSection showBackButton={true} />

                {/* Hero Section */}
                <AnimatedSection className="relative flex items-center justify-center text-center overflow-hidden bg-brand-primary py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">"La disciplina y el conocimiento real no deberían ser un lujo. Te damos las herramientas, tú pones el trabajo."</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            {valueProps.map(prop => (
                                <div key={prop.title} className="flex flex-col items-center">
                                    <div className="text-brand-accent text-4xl mb-4">{prop.icon}</div>
                                    <h3 className="font-bold text-xl text-white">{prop.title}</h3>
                                    <p className="text-gray-400 mt-2">{prop.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Brand Summary */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Nuestra Misión: Educación, Ética y Compromiso</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            <span translate="no">TradeVision Latam</span>, liderada por un equipo global (España, Brasil, Tailandia, Venezuela), fue fundada para combatir la desinformación. No vendemos 'sueños de millonario'. Enseñamos la Metodología de Lógica Institucional y el Lenguaje del Precio. Te enseñamos a ser un trader profesional, disciplinado y rentable.
                            <br/><br/>
                            Apertura reciente y crecimiento masivo en: Venezuela, Perú, Colombia, Ecuador, Bolivia, R. Dominicana, Argentina, Chile, Panamá, Cuba, Paraguay, Uruguay.
                        </p>
                        <div className="mt-8">
                            <h3 className="font-bold text-lg text-brand-primary dark:text-white mb-4">Nuestras Redes</h3>
                             <div className="flex justify-center flex-wrap gap-4">
                                {filteredSocialLinks.map((link) => {
                                    const isMail = link.href.startsWith('mailto:');
                                    if (isMail) {
                                        return (
                                            <button
                                                key={link.name}
                                                onClick={handleEmailClick}
                                                className="flex items-center gap-2 bg-white dark:bg-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                                                title={EMAIL_TOOLTIP}
                                            >
                                                {React.createElement(link.icon, { className: link.colorClass })}
                                                <span className="font-semibold">{link.name}</span>
                                            </button>
                                        );
                                    }
                                    return (
                                        <a key={link.name} href={link.href} className="flex items-center gap-2 bg-white dark:bg-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition" target="_blank" rel="noopener noreferrer">
                                            {React.createElement(link.icon, { className: link.colorClass })}
                                            <span className="font-semibold">{link.name}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* Rules Section */}
                <AnimatedSection className="py-24 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
                        <h3 className="text-3xl font-bold text-brand-primary dark:text-white">Todo este Conocimiento. Cero Costo.</h3>
                        <div className="mt-12 text-center text-sm">
                            <h4 className="font-bold text-red-500 uppercase">REGLAS DE LA COMUNIDAD (OBLIGATORIO LEER)</h4>
                            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Nuestra comunidad gratuita es un entorno de disciplina y respeto profesional. No toleramos el spam, las faltas de respeto, el marketing no autorizado o la promoción de 'esquemas mágicos'. Debes cumplir las reglas del grupo. Si no lo haces, serás baneado permanentemente.</p>
                            <button onClick={() => navigate('/aviso-legal-riesgo')} className="mt-4 text-brand-accent hover:underline font-semibold">
                                Para más detalles, revisa nuestra Información Legal y Advertencia de Riesgo completa.
                            </button>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="text-center py-12 bg-white dark:bg-brand-primary">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center justify-center gap-2 bg-brand-primary dark:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300"
                    >
                        <FiArrowLeft /> Volver a la Página Principal
                    </button>
                </div>

            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default CommunityPage;