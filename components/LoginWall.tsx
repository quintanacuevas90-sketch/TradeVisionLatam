import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiGlobe, FiHash, FiLock, FiCpu, FiShieldOff, FiAlertTriangle, FiCheckCircle, FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import Logo from './Logo';

// --- CONFIGURACIÓN Y CONSTANTES ---
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby87DhdC7O8YhaYE6BFEpO-hszGLNSAnRIiAL4WLHhwhECekhd8OGHXcTbyVj9xJnK53Q/exec";
const SESSION_TTL = 172800000; // 48 Horas
const PAYMENT_LINK = "https://www.paypal.com/ncp/payment/5WHSRBUSQSZSS";

const LATAM_DATA = [
  { country: "Argentina", code: "+54" }, { country: "Bolivia", code: "+591" }, { country: "Brasil", code: "+55" },
  { country: "Chile", code: "+56" }, { country: "Colombia", code: "+57" }, { country: "Costa Rica", code: "+506" },
  { country: "Cuba", code: "+53" }, { country: "Ecuador", code: "+593" }, { country: "El Salvador", code: "+503" },
  { country: "Guatemala", code: "+502" }, { country: "Honduras", code: "+504" }, { country: "México", code: "+52" },
  { country: "Nicaragua", code: "+505" }, { country: "Panamá", code: "+507" }, { country: "Paraguay", code: "+595" },
  { country: "Perú", code: "+51" }, { country: "Rep. Dominicana", code: "+1" }, { country: "Uruguay", code: "+598" },
  { country: "Venezuela", code: "+58" }, { country: "Otro", code: "+" }
];

const BLACKLIST = {
  ips: ['192.168.1.1', '200.10.50.20'],
  emails: ['estafador@gmail.com', 'hater@hotmail.com', 'scammer@tradevision.me'],
  phones: ['+573001234567', '+584120000000']
};

const LoginWall: React.FC = () => {
    // --- ESTADOS ---
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isBanned, setIsBanned] = useState(false);
    const [showOffer, setShowOffer] = useState(false); // Estado para el Upsell
    const [clientIP, setClientIP] = useState('0.0.0.0');
    const [phonePrefix, setPhonePrefix] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        whatsapp: '',
        pais: '',
        edad: ''
    });

    // --- LÓGICA DE INICIO Y SEGURIDAD ---
    useEffect(() => {
        const initSecurity = async () => {
            let ip = '0.0.0.0';
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                ip = data.ip;
                setClientIP(ip);
            } catch (e) { console.error("IP check failed"); }

            if (BLACKLIST.ips.includes(ip)) {
                setIsBanned(true);
                return;
            }

            const access = localStorage.getItem('member_access');
            const start = localStorage.getItem('session_start');
            const now = Date.now();

            if (access === 'true' && start) {
                const elapsed = now - parseInt(start, 10);
                if (elapsed < SESSION_TTL) {
                    setIsVisible(false);
                    document.body.style.overflow = 'auto';
                    return;
                }
            }

            localStorage.removeItem('member_access');
            localStorage.removeItem('session_start');
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        };

        initSecurity();
    }, []);

    // --- MANEJADORES ---
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = e.target.value;
        const info = LATAM_DATA.find(item => item.country === country);
        setFormData({ ...formData, pais: country });
        if (info) setPhonePrefix(info.code);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Función para saltar la oferta (Downsell)
    const handleSkipOffer = () => {
        localStorage.setItem('member_access', 'true');
        localStorage.setItem('session_start', Date.now().toString());
        setIsVisible(false);
        document.body.style.overflow = 'auto';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const fullPhone = `${phonePrefix}${formData.whatsapp}`.replace(/\s/g, '');

        if (BLACKLIST.emails.includes(formData.email.toLowerCase().trim()) || BLACKLIST.phones.includes(fullPhone)) {
            alert("Acceso denegado: Usuario bloqueado por seguridad.");
            setIsBanned(true);
            return;
        }

        setIsLoading(true);

        // Lógica CRÍTICA: URLSearchParams para Google Sheets
        const params = new URLSearchParams();
        params.append('nombre', formData.nombre);
        params.append('email', formData.email);
        params.append('whatsapp', fullPhone);
        params.append('pais', formData.pais);
        params.append('edad', formData.edad);
        params.append('ip_address', clientIP);
        params.append('device_info', navigator.userAgent);
        params.append('registro_hora', new Date().toLocaleString('es-ES'));

        try {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors', // Crítico para evitar errores de CORS con Google Apps Script
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString()
            });

            // En lugar de cerrar el muro, activamos la oferta de Bienvenida
            setTimeout(() => {
                setIsLoading(false);
                setShowOffer(true); // <--- ACTIVACIÓN DE UPSELL
            }, 1000);

        } catch (error) {
            console.error("Submit Error:", error);
            setIsLoading(false);
            alert("Error de conexión. Intente nuevamente.");
        }
    };

    // --- RENDER DE BLOQUEO (BANEO) ---
    if (isBanned) {
        return (
            <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6 text-center">
                <div className="max-w-md">
                    <FiShieldOff className="text-red-500 text-7xl mx-auto mb-4" />
                    <h1 className="text-white text-3xl font-black mb-4">ACCESO DENEGADO</h1>
                    <p className="text-gray-400 font-mono">Su IP ({clientIP}) ha sido bloqueada permanentemente por seguridad.</p>
                </div>
            </div>
        );
    }

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-[#050b14]/98 backdrop-blur-xl flex items-center justify-center p-4">
            
            {/* VISTA 2: OFERTA DE BIENVENIDA (UPSELL) */}
            {showOffer ? (
                <div className="w-full max-w-xl bg-[#0A1931] rounded-2xl shadow-[0_0_60px_rgba(255,215,0,0.25)] border-2 border-yellow-500 overflow-hidden p-8 relative animate-fade-in-up">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-xs font-black uppercase mb-4 tracking-widest border border-green-500/30">
                            <FiCheckCircle /> ¡REGISTRO EXITOSO!
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2 uppercase italic">
                            OFERTA ÚNICA DE BIENVENIDA
                        </h1>
                        <h2 className="text-yellow-500 text-lg font-bold mb-6 uppercase tracking-widest">
                            MANUAL DE TRADING CON I.A.
                        </h2>
                        
                        <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                            ¿Por qué operar solo? Obtén los <span className="text-brand-accent font-bold">PROMPTS MAESTROS</span> para obligar a ChatGPT y Gemini a analizar el mercado por ti. Ahorra 3 años de errores técnicos. Esta oferta desaparece al cerrar esta ventana.
                        </p>

                        <div className="bg-black/40 p-6 rounded-xl border border-white/10 mb-8 flex flex-col items-center">
                            <span className="text-red-500 line-through text-lg font-bold opacity-70">VALOR REGULAR: $97.00 USD</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-6xl font-black text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]">$19.99</span>
                                <span className="text-white font-bold">USD</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => window.open(PAYMENT_LINK, '_blank')}
                            className="w-full bg-gradient-to-r from-yellow-600 to-orange-500 text-black font-black py-5 rounded-xl shadow-lg hover:from-yellow-500 hover:to-orange-400 transition-all flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-95 text-lg"
                        >
                            <FiShoppingCart className="text-xl" /> DESCARGAR AHORA POR $19.99
                        </button>

                        <button 
                            onClick={handleSkipOffer}
                            className="mt-6 text-gray-500 text-xs hover:text-white transition-colors underline decoration-gray-700"
                        >
                            No gracias, prefiero entrar al Dashboard gratuito y aprender lento.
                        </button>
                    </div>
                </div>
            ) : (
                /* VISTA 1: FORMULARIO DE REGISTRO ORIGINAL */
                <div className="w-full max-w-md bg-[#0A1931] rounded-2xl shadow-[0_0_50px_rgba(64,224,208,0.15)] border border-brand-accent/20 overflow-hidden p-8 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>

                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <Logo className="w-16 h-16" />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-wider">Validación de Acceso</h2>
                        <p className="text-brand-accent text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Ecosistema TradeVision Latam</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                            <FiUser className="absolute left-3 top-3.5 text-brand-accent/50 group-focus-within:text-brand-accent transition-colors" />
                            <input 
                                name="nombre" type="text" required placeholder="Nombre Completo"
                                value={formData.nombre} onChange={handleChange}
                                className="w-full bg-[#0d213f] border border-gray-700/50 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-1 focus:ring-brand-accent outline-none transition-all placeholder-gray-500 text-sm"
                            />
                        </div>

                        <div className="relative group">
                            <FiMail className="absolute left-3 top-3.5 text-brand-accent/50 group-focus-within:text-brand-accent transition-colors" />
                            <input 
                                name="email" type="email" required placeholder="Correo Electrónico"
                                value={formData.email} onChange={handleChange}
                                className="w-full bg-[#0d213f] border border-gray-700/50 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-1 focus:ring-brand-accent outline-none transition-all placeholder-gray-500 text-sm"
                            />
                        </div>

                        <div className="relative group">
                            <FiGlobe className="absolute left-3 top-3.5 text-brand-accent/50 group-focus-within:text-brand-accent transition-colors" />
                            <select 
                                name="pais" required value={formData.pais} onChange={handleCountryChange}
                                className="w-full bg-[#0d213f] border border-gray-700/50 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-1 focus:ring-brand-accent outline-none appearance-none transition-all text-sm cursor-pointer"
                            >
                                <option value="" disabled className="bg-[#0A1931]">Selecciona tu País</option>
                                {LATAM_DATA.map(i => <option key={i.country} value={i.country} className="bg-[#0A1931]">{i.country}</option>)}
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <div className="w-20 bg-[#0d213f] text-brand-accent border border-gray-700/50 rounded-lg flex items-center justify-center font-bold text-sm font-mono">
                                {phonePrefix || '+--'}
                            </div>
                            <div className="relative flex-1 group">
                                <FiPhone className="absolute left-3 top-3.5 text-brand-accent/50 group-focus-within:text-brand-accent transition-colors" />
                                <input 
                                    name="whatsapp" type="tel" required placeholder="WhatsApp"
                                    value={formData.whatsapp} onChange={handleChange}
                                    className="w-full bg-[#0d213f] border border-gray-700/50 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-1 focus:ring-brand-accent outline-none transition-all placeholder-gray-500 text-sm"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <FiHash className="absolute left-3 top-3.5 text-brand-accent/50 group-focus-within:text-brand-accent transition-colors" />
                            <input 
                                name="edad" type="number" min="18" max="99" required placeholder="Edad (Mínimo 18)"
                                value={formData.edad} onChange={handleChange}
                                className="w-full bg-[#0d213f] border border-gray-700/50 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-1 focus:ring-brand-accent outline-none transition-all placeholder-gray-500 text-sm"
                            />
                        </div>

                        <button 
                            type="submit" disabled={isLoading}
                            className="w-full bg-gradient-to-r from-brand-accent to-blue-600 text-[#0A1931] font-black py-4 rounded-lg shadow-lg hover:shadow-brand-accent/20 transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {isLoading ? (
                                <FiCpu className="animate-spin text-xl" />
                            ) : (
                                <><FiLock /> DESBLOQUEAR ECOSISTEMA <FiArrowRight /></>
                            )}
                        </button>

                        <div className="text-center mt-6 space-y-3">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest flex items-center justify-center gap-1">
                                <FiCheckCircle className="text-green-500" /> Registro Seguro SSL (H-48)
                            </p>
                            <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg text-left">
                                <p className="text-[9px] text-gray-500 leading-tight italic">
                                    <FiAlertTriangle className="inline mr-1 text-red-500/50" />
                                    <strong>Advertencia de Riesgo:</strong> El trading conlleva la posibilidad de pérdida de capital. <span translate="no">TradeVision Latam</span> es una entidad educativa.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginWall;