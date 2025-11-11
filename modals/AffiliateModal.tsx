
import React from 'react';
import Modal from './Modal';
import Accordion from '../components/Accordion';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaWhatsapp, FaCheckCircle } from 'react-icons/fa';

const manualPurchaseLink = "https://wa.me/message/T6UFHN3SSTIEJ1?text=Hola,%20quisiera%20comprar%20el%20Manual%20de%20Afiliados.";

const platforms = [
    {
        name: "AFFSTORE (Plataforma Central)",
        benefits: ["80% RevShare / $3500 CPA", "Programa de Fidelización", "8% Sub-Afiliados"],
        cta: "Sub-Afiliado Affstore",
        link: "https://affstore.com?ref_id=753088&afftrack=Paginaweb",
        ctaColor: "bg-whatsapp-green hover:bg-green-600 text-white"
    },
    {
        name: "QX Broker / Quotex",
        benefits: ["80% RevShare", "Concurso $500k", "Mínimo 10 Clientes"],
        cta: "Sub-Afiliado Quotex",
        link: "https://quotex-partner.com/?pid=314570",
        ctaColor: "bg-brand-accent hover:bg-opacity-80 text-brand-primary"
    },
    {
        name: "CasaTrade",
        benefits: ["80% RevShare", "Concurso $10k", "Mínimo 5 Traders"],
        cta: "Sub-Afiliado CasaTrade",
        link: "https://affiliate.casatrade.com?ref_id=791900&afftrack=Paginaweb",
        ctaColor: "bg-brand-accent hover:bg-opacity-80 text-brand-primary"
    },
    {
        name: "Bullex",
        benefits: ["10% Sub-Afiliados", "Concurso \"Campaña Punta Cana\""],
        cta: "Sub-Afiliado Bullex",
        link: "https://affiliate.bull-ex.com?ref_id=792710&afftrack=Paginaweb",
        ctaColor: "bg-brand-accent hover:bg-opacity-80 text-brand-primary"
    }
];

const legalClauses = [
    { title: "Cláusula 1: Elegibilidad", content: "Para ser elegible en el programa de afiliados, debe ser un miembro activo de la comunidad y haber completado al menos nuestro curso intermedio. Nos reservamos el derecho de rechazar o cancelar cuentas en cualquier momento." },
    { title: "Cláusula 2: Comisiones y Pagos", content: "Se pagará una comisión sobre el precio de venta neto de productos referidos. El porcentaje y tipo (RevShare, CPA) varía por plataforma. Los pagos se realizan mensualmente, sujetos a umbrales mínimos." },
    { title: "Cláusula 3: Marketing y Promoción", content: "Está prohibido el uso de spam, publicidad engañosa o la representación de ganancias garantizadas. Todas las promociones deben cumplir con nuestra política de marca y la advertencia de riesgo." },
    { title: "Cláusula 4: Terminación", content: "Cualquier violación de estos términos, especialmente las normas de publicidad, resultará en la terminación inmediata de su cuenta y la cancelación de todas las comisiones pendientes." },
    { title: "Cláusula 5: Confidencialidad y Responsabilidad", content: "El afiliado es un contratista independiente y no un empleado. TradeVision Latam no se hace responsable de las acciones del afiliado ni de las pérdidas de los clientes referidos." }
];

const faqs = [
    { question: "¿Qué es RevShare?", answer: "Revenue Share es un porcentaje de los ingresos netos que el broker genera a partir de los traders que has referido." },
    { question: "¿Qué es CPA?", answer: "Cost Per Acquisition es un pago fijo que recibes por cada trader referido que cumple con ciertos requisitos, como un depósito mínimo (FTD)." },
    { question: "¿Qué es un FTD (First Time Deposit)?", answer: "Es el primer depósito que un cliente referido realiza en la plataforma del broker." },
    { question: "¿Cómo se rastrean mis referidos?", answer: "A través de un enlace de afiliado único que se te proporciona. Es crucial que tus referidos se registren usando ese enlace." },
    { question: "¿Cuándo y cómo recibo mis pagos?", answer: "Los pagos se procesan mensualmente, generalmente a principios del mes siguiente. Los métodos de pago varían según la plataforma (transferencia, cripto, e-wallets)." },
    { question: "¿Hay un mínimo de pago?", answer: "Sí, la mayoría de las plataformas tienen un umbral mínimo de pago (ej. $100). Si no alcanzas el mínimo, tu saldo se acumula para el siguiente mes." },
    { question: "¿Puedo usar publicidad pagada (PPC)?", answer: "Depende de la plataforma. Algunas lo permiten con restricciones (ej. no usar la marca del broker en los anuncios). Siempre consulta los términos específicos." },
    { question: "¿Qué tipo de contenido no está permitido?", answer: "Promesas de ganancias, señales falsas, uso de 'hágase rico rápido', y cualquier marketing que no incluya una clara advertencia de riesgo." },
    { question: "¿Qué es un sub-afiliado?", answer: "Es alguien que se registra en el programa de afiliados a través de tu enlace de sub-afiliado. Ganas un porcentaje de las comisiones que ellos generan." },
    { question: "¿Puedo referir a mis familiares o amigos?", answer: "Registrar cuentas propias, de familiares o amigos con el único propósito de generar comisiones se considera fraude y está estrictamente prohibido." },
    { question: "¿Qué soporte ofrecen a los afiliados?", answer: "Ofrecemos soporte a través de nuestros canales de comunidad, asesoría sobre cumplimiento y acceso a materiales de marketing aprobados." },
    { question: "¿Necesito una página web para ser afiliado?", answer: "No es estrictamente necesario, pero es muy recomendable. Puedes usar redes sociales, YouTube, etc., pero una web te da más control y credibilidad." },
    { question: "¿Qué es un trader activo?", answer: "Generalmente se define como un cliente que ha hecho un FTD y ha realizado al menos una operación con dinero real. La definición exacta puede variar." },
    { question: "¿Qué pasa si un referido usa un AdBlocker?", answer: "Los AdBlockers o configuraciones de privacidad pueden interferir con las cookies de seguimiento. No podemos garantizar el rastreo en esos casos." },
    { question: "¿Las comisiones son de por vida?", answer: "En los modelos RevShare, generalmente ganas comisiones mientras el trader referido siga operando y generando ingresos para el broker." },
    { question: "¿Cómo me aseguro de cumplir con las normas?", answer: "Siempre incluye la advertencia de riesgo completa, sé transparente sobre los riesgos del trading y nunca garantices resultados." },
    { question: "¿Pueden cambiar los términos del programa?", answer: "Sí, las plataformas de afiliados se reservan el derecho de cambiar sus términos. Te notificarán de cualquier cambio importante." },
    { question: "¿Tengo que pagar impuestos por mis comisiones?", answer: "Sí, eres responsable de declarar y pagar los impuestos sobre tus ingresos de afiliado según las leyes de tu país." },
    { question: "¿Qué es el 'churn' de clientes?", answer: "Es la tasa a la que los traders referidos dejan de operar. Es una métrica normal en esta industria." },
    { question: "¿Ofrecen material de marketing?", answer: "Sí, la mayoría de las plataformas ofrecen banners, landing pages y otros materiales que puedes utilizar." },
    { question: "¿Puedo promocionar varios brokers a la vez?", answer: "Sí, puedes y es recomendable para diversificar tus fuentes de ingresos." },
    { question: "¿Qué es una 'cookie de afiliado'?", answer: "Es un pequeño archivo que se guarda en el navegador del usuario cuando hace clic en tu enlace. Identifica que tú lo has referido. Suelen durar entre 30 y 90 días." },
    { question: "¿Qué significa 'posicionar el sitio como no oficial'?", answer: "Significa dejar claro en tu sitio web o canal que no eres el broker oficial, sino un socio independiente (afiliado)." },
    { question: "¿Qué pasa si me suspenden la cuenta?", answer: "Si te suspenden por violar las normas, generalmente pierdes el acceso y cualquier comisión pendiente de pago." }
];

const AffiliateModal: React.FC<{ onClose: () => void; onOpenModal: (modal: 'consultancy') => void; }> = ({ onClose, onOpenModal }) => {
    return (
        <Modal onClose={onClose} title="Programa de Afiliados de Alto Rendimiento">
            <div className="space-y-8">
                {/* 1. Gancho de Venta y Alerta de Riesgo */}
                <section id="risk-alert" className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 rounded-r-lg">
                    <div className="flex items-start">
                        <FiAlertTriangle className="h-6 w-6 mr-3 mt-1 text-red-500 flex-shrink-0" />
                        <div>
                            <h3 className="font-extrabold text-lg">ALERTA DE RIESGO Y CUMPLIMIENTO LEGAL</h3>
                            <p className="mt-2 text-sm">Somos el único equipo en Latinoamérica que te ofrece la solución completa para construir tu imperio de afiliados con <strong>Cumplimiento Legal y Máxima Conversión</strong>.</p>
                        </div>
                    </div>
                </section>

                {/* 2. Oferta Principal (El Manual de Afiliados) */}
                <section id="affiliate-manual" className="text-center p-6 bg-gray-100 dark:bg-white/5 rounded-lg">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-brand-primary dark:text-white">¡MANUAL DISPONIBLE AHORA!</h2>
                    <p className="text-brand-accent font-bold mb-4">LA GUÍA DEFINITIVA PARA AFILIADOS DE TRADING</p>
                    
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 my-6 text-left text-sm">
                        <div className="flex items-start"><FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Evita Baneo y Pérdida de Beneficios</span></div>
                        <div className="flex items-start"><FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Ahorro de Tiempo y Dinero</span></div>
                        <div className="flex items-start"><FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Gestión Profesional de Comunidad</span></div>
                        <div className="flex items-start"><FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Automatización de Telegram</span></div>
                        <div className="flex items-start"><FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Acceso a Asesoría</span></div>
                    </div>

                    <p className="text-4xl font-bold my-4">$89.99 <span className="text-lg font-normal">USD</span></p>

                    <a href={manualPurchaseLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-whatsapp-green text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition duration-300 transform hover:scale-105">
                        <FaWhatsapp size={24} />
                        ¡OBTÉN TU MANUAL AHORA!
                    </a>
                </section>

                {/* 3. Cumplimiento Ético (Reglas de Publicidad) */}
                <section id="advertising-rules">
                    <h2 className="text-2xl font-bold text-center mb-4">LA LÍNEA ROJA: NORMAS DE PUBLICIDAD</h2>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Tácticas Prohibidas</th>
                                    <th scope="col" className="px-6 py-3">Normas de Cumplimiento</th>
                                    <th scope="col" className="px-6 py-3">Consecuencias</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium">"Hágase millonario", "beneficios garantizados", "trabajo en el sofá".</td>
                                    <td className="px-6 py-4">Advertencia de Riesgo obligatoria en toda comunicación.</td>
                                    <td className="px-6 py-4 text-red-500 font-semibold">Suspensión de cuenta.</td>
                                </tr>
                                <tr className="bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium">Registrar familiares/amigos (Antifraude).</td>
                                    <td className="px-6 py-4">Transparencia: aclarar que el trading es un producto complejo.</td>
                                    <td className="px-6 py-4 text-red-500 font-semibold">Cancelación de comisiones.</td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <td className="px-6 py-4 font-medium">Usar la marca del broker en anuncios de pago.</td>
                                    <td className="px-6 py-4">Posicionar el sitio/canal como "no oficial".</td>
                                    <td className="px-6 py-4 text-red-500 font-semibold">Multas y bloqueo permanente.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 4. Servicios Adicionales */}
                <section id="additional-services" className="text-center p-6 bg-gray-100 dark:bg-white/5 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Servicios Adicionales (Desarrollo Profesional)</h2>
                    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-gray-600 dark:text-gray-300">
                        <li>Creación de Logos</li>
                        <li>•</li>
                        <li>Desarrollo de Páginas Web</li>
                        <li>•</li>
                        <li>Publicidad en TikTok/Facebook</li>
                        <li>•</li>
                        <li>Auditoría de Comunidades</li>
                    </ul>
                    <button 
                        onClick={() => onOpenModal('consultancy')}
                        className="bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300"
                    >
                        Consultoría para Mentores
                    </button>
                </section>

                {/* 5. Plataformas de Sub-Afiliación */}
                <section id="platforms">
                    <h2 className="text-2xl font-bold text-center mb-4">Principales Plataformas y Programas de Sub-Afiliación</h2>
                    <div className="p-4 mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 rounded-r-lg">
                        <div className="flex items-start">
                            <FiAlertTriangle className="h-5 w-5 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold">Aviso Legal Obligatorio</h4>
                                <p className="text-sm mt-1">Es obligatorio incluir la advertencia de riesgo en todas las promociones. Prometer ganancias está estrictamente prohibido y resultará en la terminación de su cuenta.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {platforms.map(platform => (
                            <div key={platform.name} className="border border-gray-200 dark:border-white/20 rounded-lg p-6 flex flex-col bg-white dark:bg-white/5">
                                <h3 className="text-xl font-extrabold text-brand-primary dark:text-white mb-3">{platform.name}</h3>
                                <ul className="space-y-2 mb-4 flex-grow text-gray-600 dark:text-gray-300">
                                    {platform.benefits.map(benefit => (
                                        <li key={benefit} className="flex items-start">
                                            <FaCheckCircle className="text-brand-accent mr-2 mt-1 flex-shrink-0" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a href={platform.link} target="_blank" rel="noopener noreferrer" className={`mt-auto w-full text-center font-bold py-2 px-6 rounded-lg transition duration-300 ${platform.ctaColor}`}>
                                    {platform.cta}
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. Requisitos Clave y Preguntas Frecuentes */}
                <section id="faq-affiliate">
                    <div className="p-4 mb-6 bg-brand-accent/10 border-l-4 border-brand-accent text-brand-primary dark:text-brand-accent rounded-r-lg">
                        <h4 className="font-bold">Definiciones Clave</h4>
                        <ul className="list-disc list-inside mt-2 text-sm text-gray-700 dark:text-gray-300">
                            <li><strong>Trader Activo:</strong> Cliente que realiza un Primer Depósito (FTD) y ejecuta al menos una operación con dinero real.</li>
                            <li><strong>Requisito Exnova/IQ:</strong> Se requiere un mínimo de 5 Traders Activos para calificar para comisiones en estas plataformas.</li>
                        </ul>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-center mb-4 mt-8">Términos Legales y Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {legalClauses.map(clause => (
                            <Accordion key={clause.title} title={clause.title}>
                                <p className="text-gray-600 dark:text-gray-300">{clause.content}</p>
                            </Accordion>
                        ))}
                        {faqs.map((faq, index) => (
                            <Accordion key={index} title={faq.question}>
                                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                            </Accordion>
                        ))}
                    </div>
                </section>
            </div>
        </Modal>
    );
};

export default AffiliateModal;