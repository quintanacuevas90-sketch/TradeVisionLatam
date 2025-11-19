import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FaUserGraduate, FaShieldAlt, FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import { FiTrendingUp, FiAlertTriangle, FiHome, FiArrowLeft, FiMail, FiCopy, FiCheck } from 'react-icons/fi';
import CollaborationTermsModal from '../modals/CollaborationTermsModal';
import PageBackButton from '../components/PageBackButton';
import { EMAIL_ADDRESS } from '../utils/emailHandler';

interface CollaboratePageProps {
    onOpenModal: (modal: ModalType) => void;
}

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-white dark:bg-white/5 p-6 rounded-lg border border-gray-200 dark:border-white/10 shadow-md h-full">
        <div className="text-brand-accent text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-brand-primary dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{children}</p>
    </div>
);

const ProfileCard: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border-l-4 border-brand-accent">
        <h3 className="text-2xl font-bold text-brand-primary dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{children}</p>
    </div>
);

const RequirementItem: React.FC<{ text: string }> = ({ text }) => (
    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
        <FaCheckCircle className="text-brand-accent mt-1 flex-shrink-0" />
        <span>{text}</span>
    </li>
);

const CollaboratePage: React.FC<CollaboratePageProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showLegalModal, setShowLegalModal] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        document.title = "Forma Parte de TradeVision | Colabora con Nosotros";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Buscamos líderes, mentores e influencers para una alianza estratégica. Te formamos gratis con nuestras metodologías avanzadas a cambio de tu compromiso ético.");
        }
    }, []);

    const handleOpenLegalModal = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowLegalModal(true);
    };

    const handleCloseLegalModal = () => {
        setShowLegalModal(false);
    };

    const handleCopyEmail = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(EMAIL_ADDRESS);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    
    return (
        <>
            <Header onOpenModal={onOpenModal} />
            
            {showLegalModal && <CollaborationTermsModal onClose={handleCloseLegalModal} />}

            <main className="pt-20">
                {/* Hero */}
                <AnimatedSection className="relative bg-brand-primary text-white py-24 sm:py-32">
                    <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/80 to-brand-primary"></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="absolute top-8 left-8">
                            <PageBackButton variant="on-dark" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Impulsa la Próxima Generación de Traders</h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">Buscamos líderes, mentores e influencers comprometidos con el trading ético y la disciplina. Esta no es una oferta de empleo; es una alianza estratégica para dominar el mercado latino.</p>
                    </div>
                </AnimatedSection>

                {/* The Offer */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Crece, Innova y Triunfa con <span translate="no">TradeVision</span></h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Si tienes una comunidad (YouTube, Telegram, TikTok) o la pasión por enseñar, te proporcionamos las herramientas para crecer profesionalmente.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <BenefitCard icon={<FaUserGraduate />} title="Te Formamos Gratis.">Si cumples los requisitos y demuestras compromiso, te formamos gratis con nuestras metodologías avanzadas (Lógica Institucional, Psicotrading) bajo la supervisión directa de nuestros Mentores Globales (Amara Srisuk, José Quintana).</BenefitCard>
                            <BenefitCard icon={<FiTrendingUp />} title="Recompensas Reales.">Accede a nuestro programa de partnership (RevShare/CPA) y obtén las comisiones más competitivas del mercado, respaldadas por nuestra transparencia total. (Ref: Modal de Afiliados).</BenefitCard>
                            <BenefitCard icon={<FaShieldAlt />} title="Respaldo Profesional.">Te damos el branding (Azul/Turquesa), el soporte técnico (Bots/Scripts) y la autoridad de la marca José Quintana para impulsar tu crecimiento y credibilidad.</BenefitCard>
                            <BenefitCard icon={<FiAlertTriangle />} title="Crecimiento Ético.">Solo colaboramos con líderes que comparten nuestra ética. No aceptamos 'vendedores de humo'. Exigimos transparencia y la Advertencia de Riesgo como pilar fundamental.</BenefitCard>
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* Opportunities */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Oportunidades de Colaboración</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Buscamos jóvenes dispuestos a ser mentores y líderes con comunidades establecidas.</p>
                        </div>
                        <div className="space-y-8">
                            <ProfileCard title="Influencers y Youtubers (Líderes de Opinión)">Si ya tienes una audiencia (TikTok, YouTube, Instagram) y quieres monetizarla de forma ética y profesional, te damos la estructura, el compliance legal (Manual de Afiliados) y la autoridad de la marca.</ProfileCard>
                            <ProfileCard title="Gestores de Comunidad (Líderes de Telegram/Discord)">Si manejas grupos de trading y buscas dar el salto a una marca profesional, te damos el respaldo, el contenido de valor y la infraestructura tecnológica para escalar.</ProfileCard>
                            <ProfileCard title="Nuevos Mentores (Jóvenes Talentos)">Si eres un trader rentable, disciplinado y tienes pasión por enseñar pero te falta la plataforma, te formamos gratis para convertirte en un Asesor oficial de <span translate="no">TradeVision Latam</span>.</ProfileCard>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Application Guidelines */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">¡Conectemos!</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Nuestro proceso de selección es riguroso. Para obtener el contacto de aplicación, debes confirmar que has leído las pautas y aceptado nuestro código de ética.</p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900/50 p-8 rounded-lg shadow-xl border border-gray-200 dark:border-white/10">
                            <h3 className="text-xl font-bold text-brand-primary dark:text-white mb-6 flex items-center gap-2">
                                <FaClipboardList className="text-brand-accent" />
                                Checklist de Requisitos
                            </h3>
                            
                            <div className="space-y-6 mb-8">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Al escribirnos, asegúrate de incluir la siguiente información en el cuerpo del correo:</p>
                                <ul className="space-y-3 pl-2">
                                    <RequirementItem text="Nombre Completo y País de Residencia." />
                                    <RequirementItem text="Número de contacto (WhatsApp)." />
                                    <RequirementItem text="Enlace directo a tu Red Social Principal (donde tienes tu audiencia)." />
                                    <RequirementItem text="Rol al que aplicas (Influencer, Gestor, Mentor)." />
                                    <RequirementItem text="Breve biografía y visión: ¿Por qué TradeVision?" />
                                </ul>
                            </div>

                            <div className="p-4 bg-brand-accent/10 rounded-lg border border-brand-accent/20 mb-8">
                                <div className="flex items-start">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="h-5 w-5 mt-1 text-brand-accent focus:ring-brand-accent border-gray-300 rounded cursor-pointer"
                                    />
                                    <label htmlFor="terms" className="ml-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                        Certifico que he leído y acepto los{' '}
                                        <button type="button" onClick={handleOpenLegalModal} className="text-brand-accent hover:underline font-bold">
                                            Términos y Condiciones de Colaboración
                                        </button>
                                        {' '}de <span translate="no">TradeVision Latam</span>, incluyendo el compromiso de ética y transparencia.
                                    </label>
                                </div>
                            </div>

                            {/* Email Display Section */}
                            <div className={`transition-all duration-500 ${termsAccepted ? 'opacity-100 translate-y-0' : 'opacity-50 grayscale pointer-events-none translate-y-2'}`}>
                                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-bold uppercase tracking-wide">Enviar Solicitud A:</p>
                                    
                                    <div className="flex flex-col items-center justify-center gap-4 mb-6">
                                        <div className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-mono font-bold text-brand-primary dark:text-white bg-white dark:bg-black/30 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 select-all break-all">
                                            <FiMail className="text-brand-accent flex-shrink-0" />
                                            <span>{EMAIL_ADDRESS}</span>
                                        </div>
                                        <button 
                                            onClick={handleCopyEmail}
                                            className="flex items-center gap-2 bg-brand-accent text-brand-primary font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition shadow-md text-sm uppercase tracking-wider"
                                            title="Copiar al portapapeles"
                                            disabled={!termsAccepted}
                                        >
                                            {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
                                            {copied ? 'Copiado' : 'Copiar'}
                                        </button>
                                    </div>

                                    <div className="text-left max-w-lg mx-auto bg-white dark:bg-gray-900 p-4 rounded border-l-4 border-brand-accent shadow-sm">
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">❗ Instrucción Obligatoria:</p>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                                            Debes enviar el correo con el siguiente <strong>Asunto exacto</strong> para que sea filtrado por nuestro equipo de reclutamiento:
                                        </p>
                                        <p className="font-mono font-bold text-brand-primary dark:text-white bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 select-all text-center">
                                            Solicitud de Alianza Estratégica
                                        </p>
                                    </div>
                                </div>
                                {!termsAccepted && (
                                    <p className="mt-2 text-xs text-center text-red-500 font-semibold animate-pulse">
                                        * Debes aceptar los términos para ver el contacto.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Alternative CTA */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
                        <h3 className="text-2xl font-bold text-brand-primary dark:text-white">¿Ya eres un Mentor Establecido?</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Si ya operas a nivel profesional y buscas una alianza de alto nivel (Branding, Diseño Web, Estrategia Legal), tenemos un servicio de consultoría élite.</p>
                        <button onClick={() => navigate('/consultancy')} className="mt-6 bg-transparent border-2 border-brand-accent text-brand-accent font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300">
                            Ver Consultoría para Mentores
                        </button>
                     </div>
                </AnimatedSection>

                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800">
                    <button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 bg-brand-primary dark:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300">
                        <FiHome /> Volver a la Página Principal
                    </button>
                </div>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default CollaboratePage;