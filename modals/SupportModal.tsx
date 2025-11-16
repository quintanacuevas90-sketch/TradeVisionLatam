

import React from 'react';
import Modal from './Modal';
import { FaWhatsapp, FaUniversity } from 'react-icons/fa';
import { FiMail, FiHelpCircle, FiThumbsUp } from 'react-icons/fi';

const SupportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Protocolo de Soporte 24/7">
             <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <p className="text-center text-lg">Para ofrecerte la ayuda más rápida y eficiente, por favor, dirige tu consulta al equipo correcto.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Broker Support */}
                    <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-lg border border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                            <FaUniversity className="text-2xl text-brand-accent"/>
                            <h3 className="text-xl font-bold text-brand-primary dark:text-white">Soporte del Broker</h3>
                        </div>
                        <p className="text-sm mb-4">Para problemas relacionados con tu cuenta en la plataforma del broker:</p>
                        <ul className="space-y-2 text-sm list-disc list-inside">
                            <li>Retiros y Depósitos</li>
                            <li>Verificación de Cuenta (KYC)</li>
                            <li>Comisiones o Spreads</li>
                            <li>Problemas técnicos de la plataforma</li>
                        </ul>
                        <p className="text-xs mt-4 font-semibold">Debes contactar directamente al <strong className="text-brand-accent">Soporte Oficial de tu Broker</strong> (Ej: Exnova, Quotex, Fusion Markets). TRADEVISION no tiene acceso a tus fondos ni a tu cuenta.</p>
                    </div>

                    {/* TradeVision Support */}
                    <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-lg border border-gray-200 dark:border-white/10">
                         <div className="flex items-center gap-3 mb-3">
                            <FiHelpCircle className="text-2xl text-brand-accent"/>
                            <h3 className="text-xl font-bold text-brand-primary dark:text-white">Soporte de la Academia</h3>
                        </div>
                        <p className="text-sm mb-4">Para consultas sobre nuestro ecosistema educativo:</p>
                         <ul className="space-y-2 text-sm list-disc list-inside">
                            <li>Estrategias y Metodología</li>
                            <li>Dudas sobre el contenido de los cursos</li>
                            <li>Psicología del Trading</li>
                            <li>Fallos en la 'Zona de Ejecución'</li>
                        </ul>
                         <p className="text-xs mt-4 font-semibold">Nuestro equipo te dará soporte personalizado en <strong className="text-brand-accent">24-48 horas</strong>.</p>
                         <div className="flex flex-col gap-2 mt-4">
                            <button onClick={() => window.open('mailto:tradevision2026@gmail.com')} className="inline-flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg text-sm">
                                <FiMail /> Enviar Correo a Soporte
                            </button>
                            <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp-green text-white font-bold py-2 px-4 rounded-lg text-sm">
                                <FaWhatsapp /> Contactar por WhatsApp
                            </a>
                         </div>
                    </div>
                </div>

                <div className="p-4 bg-blue-100 dark:bg-blue-900/20 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 rounded-r-lg">
                    <h4 className="font-extrabold flex items-center gap-2"><FiThumbsUp /> Regla de Oro</h4>
                    <p className="mt-2 text-sm">Para evitar demoras en tus transacciones, recuerda siempre: <strong>Retira por el mismo método con el que depositaste</strong> (Ej: si depositaste con USDT-TRC20, retira con USDT-TRC20).</p>
                </div>
            </div>
        </Modal>
    );
};

export default SupportModal;