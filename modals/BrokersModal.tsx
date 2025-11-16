
import React from 'react';
import Modal from './Modal';
import { BINARY_BROKERS, FOREX_BROKERS, DIGITAL_WALLETS } from '../constants';
import BrokerCard from '../components/BrokerCard';
import { FaCheckCircle, FaClipboardList, FaRocket } from 'react-icons/fa';
import { FiShield } from 'react-icons/fi';

const BrokersModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Brokers y Herramientas Recomendadas">
            <div className="space-y-12">

                <section className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 rounded-r-lg">
                    <div className="flex items-start">
                        <FiShield className="h-6 w-6 mr-3 mt-1 text-blue-500 flex-shrink-0" />
                        <div>
                            <h3 className="font-extrabold text-lg">Ética de Afiliados y Fondos: Nuestra Transparencia</h3>
                            <ul className="mt-2 text-sm space-y-2">
                                <li><strong>Declaración de Comisión:</strong> Al registrarse con nuestro enlace, TRADEVISION Latam recibe una comisión. Esta comisión se reinvierte íntegramente en la mejora de nuestra plataforma educativa (Zona de Ejecución) y en la creación de contenido de valor, no en incentivos de alto riesgo.</li>
                                <li><strong>Descarga de Responsabilidad de Fondos:</strong> Debe entender que TRADEVISION no gestiona su capital ni sus retiros. Somos una entidad de formación. No somos responsables de los fondos depositados, los tiempos de retiro o los problemas técnicos del broker.</li>
                                <li><strong>Prohibición Ética:</strong> Nuestro enfoque es la disciplina. Nunca fomentaremos el exceso de depósito o el uso de estrategias de alto riesgo para cumplir volumen de bonos.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Opciones Binarias Section */}
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-brand-primary dark:text-white border-b-2 border-brand-accent pb-2">Opciones Binarias</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                       {BINARY_BROKERS.map(broker => (
                           <BrokerCard key={broker.name} broker={broker} />
                       ))}
                    </div>
                </div>

                {/* Forex Brokers Section */}
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-brand-primary dark:text-white border-b-2 border-brand-accent pb-2">Brokers de Forex (Premium/Regulados)</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                       {FOREX_BROKERS.map(broker => (
                           <BrokerCard key={broker.name} broker={broker} />
                       ))}
                    </div>
                </div>
                
                {/* Digital Wallets Section */}
                 <div>
                    <h3 className="text-2xl font-bold mb-4 text-brand-primary dark:text-white border-b-2 border-brand-accent pb-2">Wallets (Gestión de Capital)</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                       {DIGITAL_WALLETS.map(wallet => (
                           <BrokerCard key={wallet.name} broker={wallet} />
                       ))}
                    </div>
                </div>

                {/* Next Steps Section */}
                <section className="p-6 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 mt-8">
                    <h3 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        ¿Listo para el Siguiente Nivel?
                    </h3>
                    <div className="text-center text-gray-700 dark:text-gray-300 space-y-4 max-w-3xl mx-auto">
                        <p><strong>¿Ya te registraste en alguna de nuestras plataformas recomendadas? ¡Felicidades!</strong> Has completado el primer paso hacia tu profesionalización.</p>
                        <p>Como Director de Estrategia de <strong>TradeVision Latam</strong>, te doy la bienvenida. Tu compromiso es el inicio del camino.</p>
                        <p>Pero nuestro trabajo no termina dándote un enlace; <strong>apenas comienza.</strong></p>
                        <p>Para activar tu acceso completo a nuestro <strong>Ecosistema Premium de Soporte</strong>, el siguiente paso es <strong>obligatorio</strong> y demuestra tu disciplina.</p>
                    </div>

                    <div className="border-t border-gray-200 dark:border-white/10 my-6"></div>

                    <div>
                        <h4 className="text-xl font-bold text-center mb-3 flex items-center justify-center gap-2">
                            <FaClipboardList className="text-brand-accent" />
                            Acción Requerida: Valida tu Cuenta (Envía tu ID)
                        </h4>
                        <div className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                            <p className="mb-4">Necesitamos que <strong>envíes tu ID de cuenta</strong> (el número de cuenta que te asignó el broker) a nuestro equipo de soporte.</p>
                            <p className="mb-4 text-sm"><strong>¿Por qué?</strong> Este ID nos permite verificar que tu cuenta fue registrada correctamente a través de nuestra red y confirmar que está <strong>activa y funcional con operativas</strong>.</p>
                            <a 
                                href="https://wa.me/message/T6UFHN3SSTIEJ1" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300"
                            >
                                ENVIAR MI ID AL EQUIPO DE SOPORTE
                            </a>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-white/10 my-6"></div>

                    <div>
                        <h4 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
                            <FaRocket className="text-brand-accent" />
                            Tu Recompensa (El Valor de TradeVision)
                        </h4>
                        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
                            <p className="text-center mb-4">Una vez que tu cuenta esté verificada y activa, desbloquearás:</p>
                            <ul className="space-y-2 text-left bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                                    <span><strong>Soporte Prioritario:</strong> Acceso a la <strong>Asesoría de José Quintana</strong> y nuestro equipo para resolver dudas sobre tu operativa.</span>
                                </li>
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                                    <span><strong>Acceso a Comunidades Privadas:</strong> Canales exclusivos en Discord/Telegram solo para <em>traders</em> activos de nuestra red.</span>
                                </li>
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                                    <span><strong>Guías y Recursos Adicionales:</strong> Herramientas y análisis que complementan tu formación.</span>
                                </li>
                            </ul>
                            <p className="text-center mt-4 font-semibold">No operes solo. Completa la validación y bienvenido a la <strong>Zona de Disciplina</strong>.</p>
                        </div>
                    </div>
                </section>
            </div>
        </Modal>
    );
};

export default BrokersModal;