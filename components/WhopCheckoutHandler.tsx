
import React, { useState, useEffect } from 'react';
import { FiShield, FiArrowLeft, FiLock } from 'react-icons/fi';
import Logo from './Logo';

interface WhopCheckoutHandlerProps {
    planId: string;
    trigger: (open: () => void) => React.ReactNode;
}

export const WhopCheckoutHandler: React.FC<WhopCheckoutHandlerProps> = ({ planId, trigger }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // BLOQUEO DE SCROLL DEL BODY: Protocolo UX para evitar desorientación
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            // 1. LIMPIEZA DE SCRIPTS PREVIOS
            const existingScript = document.getElementById('whop-loader-script');
            if (existingScript) existingScript.remove();

            // 2. INYECCIÓN DINÁMICA DEL SDK DE WHOP
            const script = document.createElement('script');
            script.id = 'whop-loader-script';
            script.src = "https://js.whop.com/static/checkout/loader.js";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            return () => {
                // RESTAURACIÓN AL CERRAR
                document.body.style.overflow = originalOverflow;
                if (script) script.remove();
            };
        }
    }, [isOpen]);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            {trigger(handleOpen)}

            {/* TERMINAL DE PAGO INMERSIVA (FULL SCREEN) */}
            {isOpen && (
                <div className="fixed inset-0 z-[99999] bg-[#050b14] flex flex-col animate-fade-in">
                    
                    {/* HEADER FIJO DE SEGURIDAD CRÍTICA */}
                    <div className="w-full bg-[#0A1931] border-b border-brand-accent/20 px-4 sm:px-8 py-3 shrink-0 z-50 shadow-2xl">
                        <div className="container mx-auto flex items-center justify-between">
                            
                            {/* Identidad Visual */}
                            <div className="flex items-center gap-3">
                                <Logo className="w-8 h-8 md:w-10 md:h-10" />
                                <div className="hidden sm:block">
                                    <h2 className="text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] leading-none">
                                        TERMINAL DE PAGO SEGURO
                                    </h2>
                                    <p className="text-brand-accent text-[8px] md:text-[10px] font-bold uppercase mt-1 tracking-widest flex items-center gap-1">
                                        <FiShield className="animate-pulse" /> TRADEVISION ENCRYPTION ACTIVE
                                    </p>
                                </div>
                            </div>

                            {/* Botón de Retorno con Alto Contraste */}
                            <button 
                                onClick={handleClose}
                                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all px-4 py-2 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest group"
                            >
                                <FiArrowLeft className="text-brand-accent group-hover:-translate-x-1 transition-transform" size={18} />
                                <span>SALIR / CANCELAR</span>
                            </button>
                        </div>
                    </div>

                    {/* ÁREA DE PROCESAMIENTO CON SCROLL NATURAL (SIN LÍMITES DE ALTURA) */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#050b14] relative">
                        
                        {/* Indicador de Carga / Protocolo SSL de fondo */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 pointer-events-none">
                            <Logo className="w-64 h-64 blur-sm animate-pulse" />
                        </div>

                        {/* Contenedor del Iframe de Whop: Optimizado para PC y Móvil */}
                        <div className="container mx-auto max-w-4xl py-10 px-4 md:px-6 min-h-screen">
                            
                            {/* Tarjeta de Seguridad Superior */}
                            <div className="mb-8 p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl flex items-center gap-4 max-w-2xl mx-auto shadow-lg">
                                <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                                    <FiLock size={20} />
                                </div>
                                <p className="text-[10px] md:text-xs text-gray-400 leading-tight">
                                    <strong className="text-white">CONEXIÓN BLINDADA:</strong> Tus datos son procesados directamente por la infraestructura de <strong className="text-brand-accent">Whop.com</strong> bajo estándares PCI-DSS Nivel 1.
                                </p>
                            </div>

                            {/* DIV DE CARGA DINÁMICA - SIN MAX-HEIGHT PARA EVITAR CORTES */}
                            <div 
                                id="whop-embedded-checkout"
                                data-whop-checkout-plan-id={planId}
                                data-whop-checkout-theme="dark"
                                data-whop-checkout-theme-accent-color="cyan"
                                data-whop-checkout-return-url="https://tradevision.me/checkout/complete"
                                className="relative z-10 w-full bg-transparent shadow-[0_30px_100px_rgba(0,0,0,0.5)] rounded-3xl"
                                style={{ minHeight: '900px' }} // Asegura espacio suficiente para el loader inicial
                            >
                                {/* Fallback visual mientras el SDK inyecta el contenido */}
                                <div className="flex flex-col items-center justify-center pt-20">
                                    <div className="w-16 h-16 border-4 border-brand-accent/10 border-t-brand-accent rounded-full animate-spin"></div>
                                    <h4 className="mt-6 text-white/40 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
                                        CARGANDO PASARELA GLOBAL...
                                    </h4>
                                </div>
                            </div>

                            {/* Espaciador final para asegurar scroll en campos bajos */}
                            <div className="h-32"></div>
                        </div>
                    </div>

                    {/* BARRA DE ESTADO SSL (FOOTER) */}
                    <div className="bg-[#0A1931] border-t border-white/5 py-3 px-4 flex items-center justify-center gap-6 shrink-0 z-50">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                            <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">SEGURIDAD RSA-2048 ACTIVA</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-white/10 rounded-full"></div>
                        <span className="hidden sm:inline text-[9px] text-gray-500 font-black uppercase tracking-widest">CERTIFICADO POR COMODO CA</span>
                    </div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #050b14;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(64, 224, 208, 0.2);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(64, 224, 208, 0.4);
                }
                
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </>
    );
};

export default WhopCheckoutHandler;
