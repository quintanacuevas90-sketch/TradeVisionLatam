import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Accordion from '../components/Accordion';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiAward, FiCode, FiUsers, FiCamera, FiEdit, FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';
import PageBackButton from '../components/PageBackButton';
import { handleEmailClick, EMAIL_TOOLTIP } from '../utils/emailHandler';

// --- SUB-COMPONENTS ---
const ServicePillar: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="flex items-start gap-3 p-2">
        <div className="flex-shrink-0 text-brand-accent text-xl mt-1">{icon}</div>
        <div>
            <h5 className="font-bold text-gray-800 dark:text-white">{title}</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    </div>
);

// --- MAIN PAGE COMPONENT ---
const ConsultancyPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Consultoría para Mentores | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Servicio de consultoría élite para educadores de trading. Construye tu comunidad, marca y sistema de afiliados con nuestra guía profesional y ética.");
        }
    }, []);

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20 bg-gray-50 dark:bg-gray-800">
                <AnimatedSection className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
                        <div className="mb-8">
                            <PageBackButton />
                        </div>
                        {/* Header */}
                        <header className="text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">Impulsa tu Visión: Consultoría Élite</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                                Un servicio integral para educadores y mentores de trading que buscan construir una comunidad profesional y ética desde cero, con el respaldo y la estrategia de TradeVision.
                            </p>
                        </header>
                        
                        {/* Pillars */}
                        <div className="space-y-4">
                            <Accordion title="Pilar 1: Creación 360° desde Cero">
                                <div className="space-y-3 p-2">
                                    <ServicePillar icon={<FiAward />} title="Branding Profesional" description="Creación de logo, paleta de colores e identidad visual que inspira confianza." />
                                    <ServicePillar icon={<FiCode />} title="Diseño Web y Digital" description="Desarrollo de una landing page profesional, optimizada para la conversión." />
                                    <ServicePillar icon={<FiUsers />} title="Ecosistema de Redes" description="Guía estratégica para configurar y hacer crecer tus canales en Telegram, WhatsApp y más." />
                                    <ServicePillar icon={<FiCamera />} title="Contenido de Alto Impacto" description="Estrategias para crear imágenes, vídeos y recursos educativos que aporten valor real." />
                                    <ServicePillar icon={<FiEdit />} title="Textos Persuasivos (Copywriting)" description="Creación de textos para tu web, anuncios y bots de Telegram que conecten con tu audiencia." />
                                </div>
                            </Accordion>
                            
                            <Accordion title="Pilar 2: Sistema de Afiliados y Legalidad">
                                <div className="space-y-3 p-2 text-gray-600 dark:text-gray-400 text-sm">
                                    <p>Te guiamos en la configuración de un sistema de afiliados robusto, cubriendo:</p>
                                    <ul className="list-disc list-inside pl-4 space-y-1">
                                        <li><strong>Modelos de Comisión:</strong> Entendiendo y aplicando RevShare y CPA.</li>
                                        <li><strong>Cumplimiento Legal y Marca:</strong> Cómo usar la marca de los brokers sin infringir sus términos (basada en información oficial de brokers).</li>
                                        <li><strong>Distinción Crucial:</strong> Énfasis en la diferencia entre brokers Regulados (Forex) y No Regulados (Binarias) en tu comunicación.</li>
                                    </ul>
                                </div>
                            </Accordion>

                            <Accordion title="Pilar 3: Compromiso Ético y Transparencia">
                                <div className="p-4 bg-orange-100 dark:bg-orange-900/20 border-l-4 border-orange-500 text-orange-800 dark:text-orange-300 rounded-r-lg">
                                    <div className="flex items-start"><FiAlertTriangle className="h-6 w-6 mr-3 mt-1 text-orange-500 flex-shrink-0" /><div><h4 className="font-extrabold text-lg">¡ATENCIÓN! Ética y Transparencia</h4><p className="mt-2 text-sm">Esta consultoría es <strong>legal y real</strong>. No participamos en estafas, pirámides, esquemas de Ponzi, negocios turbios o apuestas. No colaboramos con proyectos basados en promesas falsas o resultados garantizados.</p></div></div>
                                </div>
                            </Accordion>

                            <Accordion title="Pilar 4: Proceso de Adquisición y Verificación">
                                <div className="space-y-3 p-2 text-gray-600 dark:text-gray-400 text-sm">
                                    <ol className="list-decimal list-inside space-y-2">
                                        <li><strong>Contacto Inicial:</strong> Envía la frase clave <strong>"CREAR COMUNIDAD"</strong> a nuestro Soporte de WhatsApp para iniciar el proceso.</li>
                                        <li><strong>Pre-Calificación Obligatoria:</strong> Para filtrar curiosos y asegurar el compromiso, se requiere un pedido mínimo de <strong>$20 USD</strong> para agendar la primera llamada. (Aceptamos Volet, Binance).</li>
                                        <li><strong>Verificación Legal:</strong> Nos reservamos el derecho a pedir información adicional y documentos legales para garantizar la legitimidad del proyecto.</li>
                                    </ol>
                                </div>
                            </Accordion>
                        </div>
                        
                        {/* Final CTAs */}
                        <section className="text-center pt-8 border-t border-gray-200 dark:border-white/10">
                            <h3 className="text-xl font-bold mb-4">¿Listo para construir tu legado?</h3>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition"><FaWhatsapp /> Contactar por WhatsApp</a>
                                <button onClick={handleEmailClick} title={EMAIL_TOOLTIP} className="inline-flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition"><FiMail /> Enviar un Correo</button>
                            </div>
                        </section>

                        {/* Return Button */}
                        <div className="text-center mt-8">
                            <button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300"><FiArrowLeft /> Volver a la Página Principal</button>
                        </div>
                    </div>
                </AnimatedSection>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default ConsultancyPage;