import React from 'react';
import Modal from './Modal';
import Accordion from '../components/Accordion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiAward, FiCode, FiUsers, FiCpu, FiEdit, FiAlertTriangle, FiGlobe, FiLock } from 'react-icons/fi';
import { handleEmailClick, EMAIL_TOOLTIP } from '../utils/emailHandler';

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
        <Modal onClose={onClose} title="Arquitectos de Comunidades de Trading">
            <div className="space-y-6">
                {/* Propuesta de Valor */}
                <section className="text-center">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        Construimos la infraestructura digital para que tú solo te ocupes de enseñar. Auditoría, Webs con IA y Seguridad SSL.
                    </p>
                </section>

                {/* Acordeones de Pilares */}
                <div className="space-y-4">
                    <Accordion title="Pilar 1: Auditoría y Branding (Imagen)">
                        <div className="space-y-3 p-2">
                            <ServicePillar icon={<FiUsers />} title="Estudio de Perfil" description="¿Tu perfil vende o espanta? Revisamos biografía, feed y estrategia para profesionalizar tu impacto." />
                            <ServicePillar icon={<FiAward />} title="Identidad Visual" description="Diseño de marca completo para diferenciarte del trader promedio y proyectar autoridad real." />
                        </div>
                    </Accordion>
                    
                    <Accordion title="Pilar 2: Infraestructura Web (Embudo)">
                        <div className="space-y-3 p-2">
                            <ServicePillar icon={<FiCode />} title="Webs & Landing Pages" description="Desde páginas de captura básicas hasta infraestructuras profesionales con áreas de miembros." />
                            <ServicePillar icon={<FiLock />} title="Seguridad SSL Profesional" description="Incluimos certificado SSL (El candado verde). Sin esto, Google no te respeta y los clientes no confían." />
                            <ServicePillar icon={<FiGlobe />} title="Dominio .COM Incluido" description="Gestión total de tu dominio y planes de mantenimiento de bajo costo para tu web activa 24/7." />
                        </div>
                    </Accordion>

                    <Accordion title="Pilar 3: IA y Crecimiento">
                        <div className="space-y-3 p-2">
                            <ServicePillar icon={<FiCpu />} title="Leads con IA" description="Usamos inteligencia artificial para captar correos y números de prospectos para Remarketing efectivo." />
                            <ServicePillar icon={<FiEdit />} title="Copywriting Persuasivo" description="Textos optimizados para tu web y anuncios que conectan con el dolor y deseo de tu audiencia." />
                        </div>
                    </Accordion>

                    {/* Condiciones Comerciales */}
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-white/5">
                        <h4 className="font-black text-xs uppercase tracking-widest text-brand-accent mb-3">Condiciones de Trabajo</h4>
                        <ul className="text-xs space-y-2 text-gray-600 dark:text-gray-400">
                            <li>• <strong>Pagos:</strong> 50% de anticipo / 50% contra entrega.</li>
                            <li>• <strong>Validación:</strong> La sesión de estrategia inicial requiere una inversión de <strong>$20 USD</strong> (deducibles del precio final).</li>
                        </ul>
                    </div>

                    <Accordion title="Compromiso Ético (ALERTA)">
                        <div className="p-4 bg-orange-100 dark:bg-orange-900/20 border-l-4 border-orange-500 text-orange-800 dark:text-orange-300 rounded-r-lg">
                            <div className="flex items-start">
                                <FiAlertTriangle className="h-6 w-6 mr-3 mt-1 text-orange-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-extrabold text-sm uppercase">Cero Tolerancia a Estafas</h4>
                                    <p className="mt-2 text-xs italic">
                                        No colaboramos con proyectos basados en promesas falsas, pirámides o captación ilegal. Solo arquitectura real para negocios éticos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Accordion>
                </div>
                
                {/* CTAs Finales */}
                <section className="text-center pt-4 border-t border-gray-200 dark:border-white/10">
                    <h3 className="text-xl font-bold mb-4">¿Iniciamos la arquitectura?</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a 
                            href="https://wa.me/message/T6UFHN3SSTIEJ1?text=QUIERO%20MI%20INFRAESTRUCTURA" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-black py-3 px-6 rounded-xl hover:bg-green-600 transition transform hover:scale-[1.02]"
                        >
                            <FaWhatsapp className="text-xl" /> "QUIERO MI INFRAESTRUCTURA"
                        </a>
                        <button onClick={handleEmailClick} title={EMAIL_TOOLTIP} className="inline-flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-700 transition">
                            <FiMail /> Enviar Correo
                        </button>
                    </div>
                </section>
                
                 {/* Botón Cerrar */}
                <div className="text-center pt-4">
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-500 font-bold hover:text-white transition-colors uppercase text-xs tracking-widest">
                        Cerrar Ventana
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConsultancyModal;