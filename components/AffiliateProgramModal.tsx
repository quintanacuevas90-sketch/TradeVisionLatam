import React from 'react';
import { FiX, FiLock, FiCheckCircle, FiMessageCircle, FiExternalLink, FiAlertTriangle, FiArrowRight, FiLayers } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useRouter } from '../hooks/useRouter';

interface AffiliateProgramModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AffiliateProgramModal: React.FC<AffiliateProgramModalProps> = ({ isOpen, onClose }) => {
    const { navigate } = useRouter();

    if (!isOpen) return null;

    const handleWhatsApp = () => {
        const message = encodeURIComponent("Hola TradeVision Latam. He cumplido el reto de iniciación ($50 a $300). Adjunto mis evidencias para acceder al ecosistema de Partners.");
        window.open(`https://wa.me/573000000000?text=${message}`, '_blank');
    };

    const handleGoToBrokers = () => {
        onClose();
        navigate('/brokers');
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            {/* Contenedor con scroll habilitado y altura máxima controlada */}
            <div className="relative w-full max-w-xl bg-[#050b14] rounded-3xl border-2 border-yellow-500/50 shadow-[0_0_50px_rgba(234,179,8,0.2)] overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                
                {/* Botón Cerrar Flotante */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors z-30 bg-black/40 rounded-full"
                >
                    <FiX size={24} />
                </button>

                {/* Área de Contenido con Scroll */}
                <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 mb-4 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                            <FiLock size={28} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">ACCESO RESTRINGIDO</h2>
                        <p className="text-yellow-500 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Ecosistema de Partners TradeVision</p>
                    </div>

                    {/* Funnel Steps */}
                    <div className="space-y-8">
                        {/* Step 1: Brokers */}
                        <div className="relative pl-8 border-l-2 border-yellow-500/20">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-500 border-4 border-[#050b14]"></div>
                            <h4 className="text-white font-bold text-sm uppercase mb-4 flex items-center gap-2">
                                <span className="text-yellow-500">1.</span> Cuenta Blindada (Registro)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                <a href="https://exnova.org/es/?aff=753088&afftrack=PartnerLock" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-[#112240] hover:bg-brand-accent hover:text-brand-primary text-white text-xs font-black rounded-xl border border-white/5 transition-all group">
                                    EXNOVA <FiExternalLink className="group-hover:scale-110" />
                                </a>
                                <a href="https://affiliate.iqoption.net/redir/?aff=753088&afftrack=PartnerLock" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-[#112240] hover:bg-brand-accent hover:text-brand-primary text-white text-xs font-black rounded-xl border border-white/5 transition-all group">
                                    IQ OPTION <FiExternalLink className="group-hover:scale-110" />
                                </a>
                                <a href="https://trade.casatrade.com/register?aff=791900&afftrack=PartnerLock" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-[#112240] hover:bg-brand-accent hover:text-brand-primary text-white text-xs font-black rounded-xl border border-white/5 transition-all group">
                                    CASATRADE <FiExternalLink className="group-hover:scale-110" />
                                </a>
                                <a href="https://broker-qx.pro/sign-up/fast/?lid=1544796" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-[#112240] hover:bg-brand-accent hover:text-brand-primary text-white text-xs font-black rounded-xl border border-white/5 transition-all group">
                                    QUOTEX <FiExternalLink className="group-hover:scale-110" />
                                </a>
                            </div>

                            {/* Botón Navegación Todos los Brokers */}
                            <button 
                                onClick={handleGoToBrokers}
                                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg border border-dashed border-white/20 text-[10px] font-bold uppercase tracking-widest transition-all mb-2"
                            >
                                <FiLayers /> Ver catálogo completo de herramientas
                            </button>
                            
                            <p className="text-[10px] text-gray-500 italic">* Debes usar nuestros links para que el sistema valide tu ID de partner.</p>
                        </div>

                        {/* Step 2: El Reto */}
                        <div className="relative pl-8 border-l-2 border-yellow-500/20">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-500 border-4 border-[#050b14]"></div>
                            <h4 className="text-white font-bold text-sm uppercase mb-2 flex items-center gap-2">
                                <span className="text-yellow-500">2.</span> Prueba de Disciplina (El Reto)
                            </h4>
                            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5 shadow-inner">
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Demuestra que eres un ejecutor: <strong className="text-white">Fondea $50 USD</strong> y escala tu cuenta a <strong className="text-yellow-500">$300 USD</strong> en 30 días operando con el sistema.
                                </p>
                            </div>
                        </div>

                        {/* Step 3: WhatsApp */}
                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-500 border-4 border-[#050b14]"></div>
                            <h4 className="text-white font-bold text-sm uppercase mb-4 flex items-center gap-2">
                                <span className="text-yellow-500">3.</span> Activación de Acceso
                            </h4>
                            <button 
                                onClick={handleWhatsApp}
                                className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-xl shadow-[0_10px_25px_rgba(34,197,94,0.3)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 group"
                            >
                                <FaWhatsapp className="text-2xl group-hover:rotate-12 transition-transform" /> 
                                CUMPLÍ EL RETO: ENVIAR EVIDENCIA
                            </button>
                            <p className="text-center text-[9px] text-gray-500 mt-3 uppercase tracking-tighter">
                                Al hacer clic, serás dirigido al soporte humano para verificación manual.
                            </p>
                        </div>
                    </div>

                    {/* Legal Disclaimer */}
                    <div className="mt-10 pt-8 border-t border-white/5">
                        <div className="flex gap-4 bg-red-500/5 p-4 rounded-2xl border border-red-500/10">
                            <FiAlertTriangle className="text-red-500 shrink-0 mt-0.5 text-xl" />
                            <p className="text-[10px] text-gray-500 leading-tight italic">
                                <strong>ADVERTENCIA DE RIESGO:</strong> El acceso a esta zona es bajo tu propia responsabilidad. TradeVision Latam no garantiza resultados. El trading de derivados financieros implica un riesgo elevado de pérdida de capital.
                            </p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-full text-center text-gray-500 hover:text-white text-xs mt-8 transition-colors underline decoration-gray-800"
                        >
                            No estoy listo, prefiero volver al curso gratuito.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffiliateProgramModal;