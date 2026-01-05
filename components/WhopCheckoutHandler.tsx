
import React, { useState, useEffect } from 'react';
import { FiX, FiShield, FiArrowLeft } from 'react-icons/fi';

interface WhopCheckoutHandlerProps {
    planId: string;
    trigger: (open: () => void) => React.ReactNode;
}

export const WhopCheckoutHandler: React.FC<WhopCheckoutHandlerProps> = ({ planId, trigger }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // BLOQUEO DE SEGURIDAD: Evita que el fondo se mueva mientras se procesa el pago
            // Esto es estándar en Checkouts de Élite para evitar distracciones.
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';

            // 1. LIMPIEZA
            const existingScript = document.getElementById('whop-loader-script');
            if (existingScript) {
                existingScript.remove();
            }

            // 2. INYECCIÓN DINÁMICA
            const script = document.createElement('script');
            script.id = 'whop-loader-script';
            script.src = "https://js.whop.com/static/checkout/loader.js";
            script.async = true;
            script.defer = true;
            
            // 3. MONTAJE
            document.body.appendChild(script);

            // 4. CLEANUP: Restaurar scroll al cerrar
            return () => {
                document.body.style.overflow = originalStyle;
                if (script) script.remove();
            };
        }
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {trigger(handleOpen)}

            {/* Vista Full-Screen Dedicada */}
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex flex-col bg-[#050b14] animate-fade-in overflow-hidden touch-none">
                    
                    {/* Header de Conversión */}
                    <div className="w-full bg-[#0A1931] border-b border-cyan-500/20 px-4 sm:px-8 py-4 shrink-0 z-50 shadow-2xl">
                        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                            
                            <button 
                                onClick={handleClose}
                                className="order-2 sm:order-1 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-black text-[10px] sm:text-xs uppercase tracking-widest group"
                            >
                                <FiArrowLeft className="text-brand-accent group-hover:-translate-x-1 transition-transform" size={18} />
                                <span>VOLVER A LA ACADEMIA</span>
                            </button>

                            <div className="order-1 sm:order-2 text-center">
                                <h2 className="text-white font-black text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] leading-tight">
                                    INSCRIPCIÓN OFICIAL: <span className="text-brand-accent">SISTEMA DE EJECUCIÓN</span>
                                </h2>
                                <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-[0.3em]">
                                    Metodología Profesional - José Quintana
                                </p>
                            </div>

                            <div className="hidden sm:flex order-3 items-center gap-2 opacity-50">
                                <FiShield className="text-brand-accent" size={20} />
                                <span className="text-[9px] text-white font-black uppercase tracking-widest">Pago Blindado</span>
                            </div>
                        </div>
                    </div>

                    {/* Área de la Pasarela - Aquí el scroll es nativo y capturado */}
                    <div 
                        className="flex-1 w-full overflow-y-auto bg-black relative custom-scrollbar overscroll-contain"
                        style={{ WebkitOverflowScrolling: 'touch' }} // Fluidez total en iOS
                    >
                        
                        {/* Fallback Detrás de Whop */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 z-0">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-brand-accent/10 border-t-brand-accent rounded-full animate-spin"></div>
                                <div className="absolute inset-0 m-auto w-10 h-10 flex items-center justify-center">
                                    <FiShield className="text-brand-accent text-2xl animate-pulse" />
                                </div>
                            </div>
                            <h4 className="mt-8 text-white font-black uppercase tracking-[0.3em] text-xs animate-pulse">
                                ESTABLECIENDO CONEXIÓN SEGURA...
                            </h4>
                        </div>

                        {/* Whop Embedded Checkout Container */}
                        <div className="container mx-auto max-w-4xl min-h-full py-4 px-0 sm:px-4">
                            <div 
                                id="whop-embedded-checkout"
                                data-whop-checkout-plan-id={planId}
                                data-whop-checkout-theme="dark"
                                data-whop-checkout-theme-accent-color="cyan"
                                data-whop-checkout-return-url="https://tradevision.me/checkout/complete"
                                className="relative z-10 w-full"
                                style={{ minHeight: '800px' }}
                            >
                            </div>
                        </div>
                    </div>

                    {/* Footer de Seguridad */}
                    <div className="bg-[#050b14] border-t border-white/5 py-3 px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 shrink-0 z-50">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                            <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Protocolo SSL: Activo</span>
                        </div>
                        <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                        <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Protección 256-Bit</span>
                        <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                        <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Whop Secure Gateway</span>
                    </div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #000;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(64, 224, 208, 0.2);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(64, 224, 208, 0.5);
                }
                /* Evitar que el scroll del contenedor afecte al resto de la UI */
                .overscroll-contain {
                    overscroll-behavior: contain;
                }
            `}</style>
        </>
    );
};

export default WhopCheckoutHandler;
