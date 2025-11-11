
import React from 'react';
import Modal from './Modal';
import Accordion from '../components/Accordion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiAward, FiCode, FiUsers, FiCamera, FiEdit, FiAlertTriangle } from 'react-icons/fi';

const ServicePillar: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="flex items-start gap-3 p-2">
        <div className="flex-shrink-0 text-brand-accent text-xl mt-1">
            {icon}
        </div>
        <div>
            <h5 className="font-bold text-gray-800 dark:text-white">{title}</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    </div>
);

const ConsultancyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Impulsa tu Visión: Consultoría Élite">
            <div className="space-y-6">
                {/* Value Proposition */}
                <section className="text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Un servicio integral para educadores y mentores de trading que buscan construir una comunidad profesional y ética desde cero, con el respaldo y la estrategia de TradeVision.
                    </p>
                </section>

                {/* Pillars */}
                <div className="space-y-4">
                    <Accordion title="Pilar 1: Creación 360° desde Cero">
                        <div className="space-y-3">
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
                            <div className="flex items-start">
                                <FiAlertTriangle className="h-6 w-6 mr-3 mt-1 text-orange-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-extrabold text-lg">¡ATENCIÓN! Ética y Transparencia</h4>
                                    <p className="mt-2 text-sm">
                                        Esta consultoría es <strong>legal y real</strong>. No participamos en estafas, pirámides, esquemas de Ponzi, negocios turbios o apuestas. No colaboramos con proyectos basados en promesas falsas o resultados garantizados.
                                    </p>
                                </div>
                            </div>
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
                <section className="text-center pt-4 border-t border-gray-200 dark:border-white/10">
                    <h3 className="text-xl font-bold mb-4">¿Listo para construir tu legado?</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition">
                            <FaWhatsapp /> Contactar por WhatsApp
                        </a>
                        <a href="mailto:tradevision2026@gmail.com" className="inline-flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition">
                            <FiMail /> Enviar un Correo
                        </a>
                    </div>
                </section>
                
                 {/* Close Button */}
                <div className="text-center pt-4">
                    <button onClick={onClose} className="bg-brand-primary text-white font-bold py-2 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300">
                        Cerrar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConsultancyModal;