import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiClock, FiAlertTriangle, FiArrowRight, FiCpu, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import { FaFire, FaPaypal, FaShieldAlt, FaLock, FaWhatsapp } from 'react-icons/fa';

interface ManualSalesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ManualSalesModal: React.FC<ManualSalesModalProps> = ({ isOpen, onClose }) => {
    // --- ESTADOS ---
    const [offerState, setOfferState] = useState<'active' | 'expired'>('active');
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutos
    const [isReactivating, setIsReactivating] = useState(false);
    const [hasClickedBuy, setHasClickedBuy] = useState(false); // Nuevo estado para confirmación
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // --- LÓGICA DEL TEMPORIZADOR ---
    useEffect(() => {
        if (isOpen && offerState === 'active') {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setOfferState('expired');
                        if (timerRef.current) clearInterval(timerRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isOpen, offerState]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // --- ACCIONES ---
    const handleReactivate = () => {
        setIsReactivating(true);
        // Simular aprobación manual del servidor/soporte
        setTimeout(() => {
            setIsReactivating(false);
            setOfferState('active');
            setTimeLeft(120);
            setHasClickedBuy(false); // Resetear estado de compra al reactivar
        }, 2000);
    };

    const handlePurchase = () => {
        window.open('https://www.paypal.com/ncp/payment/5WHSRBUSQSZSS', '_blank');
        setHasClickedBuy(true); // Cambiar a la fase de confirmación
    };

    const handleConfirmWhatsApp = () => {
        const message = encodeURIComponent("Hola, ya realicé el pago de $19.99 por el Manual IA. Mi correo es: ");
        window.open(`https://wa.me/573000000000?text=${message}`, '_blank');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-[#050b14] rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(0,229,255,0.15)] overflow-hidden animate-fade-in-up">
                
                {/* Botón Cerrar */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors z-20"
                >
                    <FiX size={28} />
                </button>

                {/* Brillo superior decorativo */}
                <div className={`absolute top-0 left-0 w-full h-1.5 transition-colors duration-500 ${offerState === 'active' ? 'bg-brand-accent' : 'bg-red-600'}`}></div>

                <div className="p-6 md:p-10">
                    
                    {/* 1. Header & Badge */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-xs font-black tracking-widest uppercase mb-6 animate-pulse">
                            <FaLock className="text-xs" /> ACCESO ANTICIPADO: Protocolo de Prompts V2.0
                        </div>

                        <div className="flex items-center justify-center gap-2 text-amber-400 text-sm font-bold mb-4">
                            <FaFire className="animate-bounce" /> 
                            <span>Tendencia: 26 usuarios han asegurado su documento recientemente.</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase italic">
                            Estamos actualizando nuestro motor de IA.
                        </h1>
                        <p className="text-gray-400 mt-2 font-bold tracking-wider">Únete a la lista de espera prioritaria.</p>
                    </div>

                    {/* 2. Condicional: Oferta Activa vs Expirada */}
                    {offerState === 'active' ? (
                        <div className="space-y-6">
                            {/* Reloj */}
                            <div className="bg-black/40 rounded-2xl py-4 border border-white/5 flex flex-col items-center">
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1 flex items-center gap-2">
                                    <FiClock /> El precio de pre-venta expira en:
                                </p>
                                <p className="text-4xl md:text-5xl font-mono font-bold text-red-500 tracking-tighter drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                                    {formatTime(timeLeft)}
                                </p>
                            </div>

                            {/* Aviso de Entrega */}
                            <div className="p-5 bg-blue-900/20 border-2 border-brand-accent/30 rounded-2xl flex items-start gap-4">
                                <FiAlertTriangle className="text-brand-accent text-3xl shrink-0 mt-1" />
                                <div className="text-xs md:text-sm text-blue-100 leading-tight">
                                    <strong className="text-brand-accent block mb-1 uppercase tracking-tighter">⚠️ NOTA DE ACTUALIZACIÓN:</strong>
                                    La IA avanza como un rayo. No entregamos documentos obsoletos. Su manual actualizado se enviará en 2 días hábiles tras la compra para incluir los últimos modelos de lenguaje.
                                </div>
                            </div>

                            {/* Precio */}
                            <div className="text-center">
                                <div className="text-gray-500 line-through text-lg font-bold decoration-red-500/50">$50.00 USD</div>
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-6xl font-black text-white">$19.99</span>
                                    <span className="text-brand-accent font-bold text-xl uppercase">USD</span>
                                </div>
                            </div>

                            {/* Botón Compra / Confirmación */}
                            {!hasClickedBuy ? (
                                <button 
                                    onClick={handlePurchase}
                                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-5 rounded-xl shadow-[0_10px_25px_rgba(234,179,8,0.3)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-xl"
                                >
                                    ASEGURAR MI COPIA AHORA <FiArrowRight className="text-2xl" />
                                </button>
                            ) : (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="text-center p-3 bg-blue-900/10 rounded-lg border border-blue-500/20">
                                        <p className="text-blue-400 text-sm font-bold flex items-center justify-center gap-2">
                                            <FiClock className="animate-spin" /> ⏳ Estamos verificando tu transacción...
                                        </p>
                                    </div>
                                    <button 
                                        onClick={handleConfirmWhatsApp}
                                        className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded-xl shadow-[0_10px_25px_rgba(34,197,94,0.3)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg"
                                    >
                                        <FiMessageCircle className="text-2xl" /> YA REALICÉ EL PAGO: Enviar mis datos
                                    </button>
                                    <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest italic">
                                        * Haz clic arriba para notificar a soporte y agilizar tu entrega.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6 animate-shake">
                            {/* Estado Expirado */}
                            <div className="p-6 bg-red-900/40 border-2 border-red-600 rounded-2xl text-center">
                                <FiAlertTriangle className="text-5xl text-red-500 mx-auto mb-4 animate-pulse" />
                                <h3 className="text-2xl font-black text-white uppercase mb-2">VENTANA DE OPORTUNIDAD CERRADA</h3>
                                <p className="text-red-200 text-sm">El sistema ha reasignado tu cupo de pre-venta a otro usuario en espera.</p>
                            </div>

                            <div className="text-center opacity-40 grayscale">
                                <div className="text-gray-500 line-through text-lg font-bold">$50.00 USD</div>
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-6xl font-black text-white">$19.99</span>
                                    <span className="text-gray-500 font-bold text-xl uppercase">USD</span>
                                </div>
                            </div>

                            <button 
                                disabled
                                className="w-full bg-gray-800 text-gray-500 font-black py-5 rounded-xl flex items-center justify-center gap-3 text-xl cursor-not-allowed border border-white/5"
                            >
                                OFERTA NO DISPONIBLE
                            </button>

                            {/* Rescate / Reactivación */}
                            <div className="pt-4">
                                <button 
                                    onClick={handleReactivate}
                                    disabled={isReactivating}
                                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
                                >
                                    {isReactivating ? (
                                        <><FiCpu className="animate-spin" /> SOLICITANDO CUPO AL SERVIDOR...</>
                                    ) : (
                                        <><FiCheckCircle /> SOLICITAR REACTIVACIÓN MANUAL A SOPORTE</>
                                    )}
                                </button>
                                <p className="text-center text-[10px] text-gray-500 mt-3 uppercase tracking-widest italic">
                                    * Esta acción intentará recuperar el precio de $19.99 por 2 minutos extra.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Trust Footer */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="flex items-center gap-3 opacity-60">
                            <FaShieldAlt className="text-brand-accent text-xl" />
                            <div className="text-left">
                                <p className="text-[10px] font-bold text-white uppercase tracking-tighter">Compra Blindada</p>
                                <p className="text-[9px] text-gray-400">Transacción Segura SSL</p>
                            </div>
                        </div>
                        <button 
                            /* Fix: removed non-existent variable 'onOpenModal' */
                            onClick={onClose}
                            className="text-gray-500 text-xs hover:text-white transition-colors underline decoration-gray-700"
                        >
                            No, prefiero volver al catálogo de cursos.
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManualSalesModal;