import React, { useState, useEffect } from 'react';
import { FiX, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const VenezuelaSpecialModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDismissed, setIsDismissed] = useState(() => {
        return localStorage.getItem('venezuela_banner_dismissed') === 'true';
    });
    const [showPulse, setShowPulse] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowPulse(false), 15000);
        
        // Escuchar evento global para abrir desde Menu o Footer
        const handleOpenEvent = () => setIsOpen(true);
        window.addEventListener('open-venezuela-modal', handleOpenEvent);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('open-venezuela-modal', handleOpenEvent);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setIsDismissed(true);
        localStorage.setItem('venezuela_banner_dismissed', 'true');
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent("🇻🇪 Hola TradeVision. Estoy en Venezuela y me interesa inscribirme. Por favor, facilítenme los datos de Pago Móvil para los cursos.");
        window.open(`https://wa.me/message/T6UFHN3SSTIEJ1?text=${message}`, '_blank');
    };

    return (
        <>
            {/* BOTÓN FLOTANTE: Desaparece si el modal está abierto o si ya fue descartado */}
            {!isOpen && !isDismissed && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`fixed bottom-6 left-6 z-[60] flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-3.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-all duration-500 transform hover:scale-105 active:scale-95 group border border-white/20 ${showPulse ? 'animate-bounce' : ''}`}
                    style={{ 
                        background: 'linear-gradient(135deg, #F7D117 0%, #F7D117 33%, #003893 33%, #003893 66%, #CE1126 66%, #CE1126 100%)',
                        backgroundSize: '300% 300%',
                        animation: 'gradientMove 3s ease infinite'
                    }}
                >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors rounded-full"></div>
                    
                    <span className="relative z-10 text-base sm:text-lg filter drop-shadow-md">🇻🇪</span>
                    <span className="relative z-10 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                        ¿En Venezuela? Lee, Chamo
                    </span>
                    
                    <style>{`
                        @keyframes gradientMove {
                            0% { background-position: 0% 50% }
                            50% { background-position: 100% 50% }
                            100% { background-position: 0% 50% }
                        }
                        @media (max-width: 400px) {
                            .fixed.bottom-6.left-6 { bottom: 1.5rem; left: 1rem; right: 1rem; width: auto; justify-content: center; }
                        }
                    `}</style>
                </button>
            )}

            {/* MODAL INFORMATIVO */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
                    <div className="relative w-full max-w-lg bg-[#0A1931] rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(0,229,255,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
                        
                        <div className="h-2 w-full flex shrink-0">
                            <div className="h-full w-1/3 bg-[#F7D117]"></div>
                            <div className="h-full w-1/3 bg-[#003893]"></div>
                            <div className="h-full w-1/3 bg-[#CE1126]"></div>
                        </div>

                        <button 
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-20 bg-black/20 rounded-full"
                        >
                            <FiX size={24} />
                        </button>

                        <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                            <div className="text-center mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter flex items-center justify-center gap-3 flex-wrap">
                                    HERMANDAD <span className="text-brand-accent">Y OPORTUNIDAD</span> <span className="text-xl">🇻🇪</span>
                                </h2>
                                <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-2 border-t border-white/5 pt-2 inline-block">
                                    Entendemos la situación, porque somos de aquí.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <p className="text-gray-300 text-sm leading-relaxed text-center italic px-2">
                                    "Sabemos lo difícil que es el manejo de divisas y las pocas oportunidades que hay allá afuera. Queremos darte la mano con reglas claras."
                                </p>

                                <div className="space-y-3">
                                    <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 items-center">
                                        <div className="text-brand-accent shrink-0"><FiCheckCircle size={20} /></div>
                                        <div>
                                            <h4 className="text-white font-bold text-xs sm:text-sm uppercase">Servicios Externos</h4>
                                            <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5">Dominios y webs se cancelan en <strong className="text-white">USD</strong> (Tasa del día).</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-4 bg-brand-accent/5 rounded-2xl border border-brand-accent/20 items-center">
                                        <div className="text-brand-accent shrink-0"><FiCheckCircle size={20} /></div>
                                        <div>
                                            <h4 className="text-brand-accent font-bold text-xs sm:text-sm uppercase">Educación y Mentoría</h4>
                                            <p className="text-blue-100 text-[11px] sm:text-xs mt-0.5">Aceptamos <strong className="text-white">Bolívares (Bs)</strong> vía Pago Móvil (Tasa Euro).</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-red-950/30 border border-red-500/40 rounded-2xl flex gap-3 items-start">
                                        <FiAlertTriangle className="text-red-500 shrink-0 mt-0.5" />
                                        <p className="text-[10px] sm:text-[11px] text-red-200 leading-tight">
                                            <strong className="text-red-500 uppercase block mb-1">⚠️ EVITA ESTAFAS:</strong> 
                                            Todo pago en Bs debe ir a nombre de: <strong className="text-white">JOSÉ QUINTANA</strong>. Si te dan otros datos, NO PAGUES y repórtalo.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3">
                                <button 
                                    onClick={handleWhatsApp}
                                    className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-xl shadow-[0_10px_25px_rgba(34,197,94,0.3)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 text-sm uppercase tracking-wider"
                                >
                                    <FaWhatsapp size={20} /> Solicitar Pago Móvil
                                </button>
                                <button 
                                    onClick={handleClose}
                                    className="w-full text-gray-500 hover:text-white font-bold py-2 text-xs uppercase tracking-widest transition-colors"
                                >
                                    Cerrar Ventana
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VenezuelaSpecialModal;