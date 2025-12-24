import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Accordion from '../components/Accordion';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FaWhatsapp, FaShieldAlt } from 'react-icons/fa';
import { FiMail, FiAward, FiCode, FiUsers, FiCpu, FiEdit, FiAlertTriangle, FiArrowLeft, FiCheckCircle, FiGlobe, FiLock } from 'react-icons/fi';
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
        document.title = "Arquitectos de Comunidades | Consultoría B2B | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Construimos la infraestructura digital para mentores de trading. Auditoría de redes, desarrollo web con IA y seguridad SSL profesional.");
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
                        
                        {/* Header Principal */}
                        <header className="text-center">
                            <h1 className="text-4xl md:text-5xl font-black text-brand-primary dark:text-white uppercase tracking-tighter">Arquitectos de Comunidades de Trading</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 font-medium">
                                Desde la auditoría de tu perfil hasta tu propia web con IA. Construimos la infraestructura para que tú solo te ocupes de enseñar.
                            </p>
                        </header>
                        
                        {/* Pilares de Servicio */}
                        <div className="space-y-4">
                            <Accordion title="Pilar 1: Auditoría y Branding (La Imagen)">
                                <div className="space-y-3 p-2">
                                    <ServicePillar 
                                        icon={<FiUsers />} 
                                        title="Auditoría de Perfil: ¿Vendes o espantas?" 
                                        description="Realizamos un Estudio Profesional de Redes. Revisamos tu biografía, feed y estrategia de contenido para detectar fugas de credibilidad." 
                                    />
                                    <ServicePillar 
                                        icon={<FiAward />} 
                                        title="Diseño de Marca sin límites" 
                                        description="Creamos tu identidad visual (Logos, paletas, tipografías) para que te diferencies del trader promedio y proyectes autoridad." 
                                    />
                                </div>
                            </Accordion>
                            
                            <Accordion title="Pilar 2: Infraestructura Web (El Embudo)">
                                <div className="space-y-3 p-2">
                                    <ServicePillar 
                                        icon={<FiCode />} 
                                        title="Páginas Web a Medida" 
                                        description="Desde Landing Pages básicas para captar prospectos hasta Ecosistemas Web Profesionales completos con áreas de miembros." 
                                    />
                                    <ServicePillar 
                                        icon={<FiLock />} 
                                        title="Dominio y Seguridad SSL Profesional" 
                                        description="Incluimos tu dominio .com y Certificado SSL (El candado verde de seguridad) por 1, 3 o 5 años. Sin esto, Google no te respeta y los navegadores marcarán tu sitio como peligroso." 
                                    />
                                    <ServicePillar 
                                        icon={<FiGlobe />} 
                                        title="Mantenimiento y Soporte Recurrente" 
                                        description="Ofrecemos planes de bajo costo para asegurar que tu web esté activa 24/7, segura contra ataques y siempre actualizada." 
                                    />
                                </div>
                            </Accordion>

                            <Accordion title="Pilar 3: Tecnología y Crecimiento (La IA)">
                                <div className="space-y-3 p-2">
                                    <ServicePillar 
                                        icon={<FiCpu />} 
                                        title="Marketing con IA" 
                                        description="Implementamos flujos de inteligencia artificial para captar correos y números (Leads) de forma automática para que hagas Remarketing efectivo." 
                                    />
                                    <ServicePillar 
                                        icon={<FiCheckCircle />} 
                                        title="Automatización de Ventas" 
                                        description="No te quedes atrás. Compite con los grandes del sector usando nuestra tecnología de automatización y cierre de ventas." 
                                    />
                                </div>
                            </Accordion>

                            {/* Sección: Condiciones Comerciales */}
                            <div className="bg-white dark:bg-gray-900 border border-brand-accent/20 rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-brand-primary dark:text-white mb-4 flex items-center gap-2">
                                    <FiEdit className="text-brand-accent" /> Condiciones Comerciales y Transparencia
                                </h3>
                                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex gap-3">
                                        <span className="font-black text-brand-accent">01.</span>
                                        <p><strong className="text-gray-800 dark:text-gray-200">Modelo de Trabajo:</strong> Todo desarrollo web requiere un 50% de anticipo para iniciar el montaje y el 50% restante contra entrega final verificada.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="font-black text-brand-accent">02.</span>
                                        <p><strong className="text-gray-800 dark:text-gray-200">Compromiso de Seriedad:</strong> Para filtrar curiosos y asegurar el tiempo de nuestros arquitectos, la Primera Sesión de Estrategia requiere una inversión de <strong className="text-white">$20 USD</strong> (vía Volet/Binance). Si contratas cualquier servicio, estos $20 se descuentan del precio final. Es nuestra garantía de tu compromiso.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Alerta Ética */}
                            <div className="p-4 bg-orange-100 dark:bg-orange-900/20 border-l-4 border-orange-500 text-orange-800 dark:text-orange-300 rounded-r-lg">
                                <div className="flex items-start">
                                    <FiAlertTriangle className="h-6 w-6 mr-3 mt-1 text-orange-500 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-extrabold text-lg">FILTRO ÉTICO OBLIGATORIO</h4>
                                        <p className="mt-2 text-sm italic">
                                            Esta consultoría es <strong>legal y real</strong>. No construimos infraestructura para estafas, pirámides, esquemas de Ponzi o negocios que no incluyan Advertencias de Riesgo claras. Si tu proyecto no es ético, no pierdas tu tiempo ni el nuestro.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Final CTAs */}
                        <section className="text-center pt-8 border-t border-gray-200 dark:border-white/10">
                            <h3 className="text-xl font-bold mb-4">¿Listo para construir tu legado digital?</h3>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a 
                                    href="https://wa.me/message/T6UFHN3SSTIEJ1?text=QUIERO%20MI%20INFRAESTRUCTURA" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-black py-4 px-8 rounded-xl hover:bg-green-600 transition shadow-lg transform hover:scale-[1.02]"
                                >
                                    <FaWhatsapp className="text-2xl" /> ENVIAR "QUIERO MI INFRAESTRUCTURA"
                                </a>
                                <button onClick={handleEmailClick} title={EMAIL_TOOLTIP} className="inline-flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-700 transition">
                                    <FiMail /> Consulta Vía Correo
                                </button>
                            </div>
                            <p className="mt-4 text-xs text-gray-500 uppercase font-bold tracking-widest">Soporte Humano Elite 24/7</p>
                        </section>

                        {/* Botón de Retorno */}
                        <div className="text-center mt-12">
                            <button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300">
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

export default ConsultancyPage;