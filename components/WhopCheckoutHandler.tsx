
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
            // Prevenir el scroll del body principal
            document.body.style.overflow = 'hidden';

            // 1. LIMPIEZA: Eliminamos cualquier instancia previa para forzar el re-escaneo del DOM
            const existingScript = document.getElementById('whop-loader-script');
            if (existingScript) {
                existingScript.remove();
            }

            // 2. INYECCIÓN DINÁMICA: Creamos el script oficial de Whop
            const script = document.createElement('script');
            script.id = 'whop-loader-script';
            script.src = "https://js.whop.com/static/checkout/loader.js";
            script.async = true;
            script.defer = true;
            
            // 3. MONTAJE: Lo inyectamos al final del body
            document.body.appendChild(script);

            // 4. CLEANUP: Al cerrar el modal
            return () => {
                document.body.style.overflow = 'auto';
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

            {/* Vista de Pantalla Completa Inmersiva */}
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex flex-col bg-[#050b14] animate-fade-in overflow-hidden">
                    
                    {/* Header de Conversión Premium */}
                    <div className="w-full bg-[#0A1931] border-b border-cyan-500/20 px-4 sm:px-8 py-4 shrink-0 z-50 shadow-2xl">
                        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                            
                            {/* Botón de Regreso */}
                            <button 
                                onClick={handleClose}
                                className="order-2 sm:order-1 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-black text-[10px] sm:text-xs uppercase tracking-widest group"
                            >
                                <FiArrowLeft className="text-brand-accent group-hover:-translate-x-1 transition-transform" size={18} />
                                <span>VOLVER A LA ACADEMIA</span>
                            </button>

                            {/* Títulos Centrales */}
                            <div className="order-1 sm:order-2 text-center">
                                <h2 className="text-white font-black text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] leading-tight">
                                    INSCRIPCIÓN OFICIAL: <span className="text-brand-accent">SISTEMA DE EJECUCIÓN</span>
                                </h2>
                                <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-[0.3em]">
                                    Metodología Profesional - José Quintana
                                </p>
                            </div>

                            {/* Escudo de Seguridad (Desktop) */}
                            <div className="hidden sm:flex order-3 items-center gap-2 opacity-50">
                                <FiShield className="text-brand-accent" size={20} />
                                <span className="text-[9px] text-white font-black uppercase tracking-widest">Pago Blindado</span>
                            </div>
                        </div>
                    </div>

                    {/* Área Principal de la Pasarela con Scroll Nativo */}
                    <div className="flex-1 w-full overflow-y-auto bg-black relative custom-scrollbar">
                        
                        {/* Fallback de Carga (Posicionado detrás de la inyección de Whop) */}
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
                            <p className="text-gray-600 text-[10px] uppercase font-bold mt-2 tracking-[0.4em]">
                                Sincronizando protocolos de encriptación
                            </p>
                        </div>

                        {/* Contenedor Dinámico para Whop Checkout - Ocupa el ancho para evitar cortes */}
                        <div className="container mx-auto max-w-4xl min-h-screen pt-4 pb-20 px-0 sm:px-4">
                            <div 
                                id="whop-embedded-checkout"
                                data-whop-checkout-plan-id={planId}
                                data-whop-checkout-theme="dark"
                                data-whop-checkout-theme-accent-color="cyan"
                                data-whop-checkout-return-url="https://tradevision.me/checkout/complete"
                                className="relative z-10 w-full h-full min-h-[800px]"
                                style={{ width: '100%' }}
                            >
                            </div>
                        </div>
                    </div>

                    {/* Footer de Seguridad (Sticky) */}
                    <div className="bg-[#050b14] border-t border-white/5 py-3 px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 shrink-0 z-50">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                            <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Protocolo SSL: Activo</span>
                        </div>
                        <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                        <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Protección de Datos 256-Bit</span>
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
            `}</style>
        </>
    );
};

export default WhopCheckoutHandler;
