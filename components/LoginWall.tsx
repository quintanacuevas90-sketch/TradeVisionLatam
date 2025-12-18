import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiGlobe, FiHash, FiLock, FiCpu, FiShieldOff, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import Logo from './Logo';

// --- CONFIGURACIÓN Y CONSTANTES ---
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxyAvB6GF3j6AxbfAx74I39QseHxZnW5qUDgXnMKyPrRg6weyvJp7fPR8dQFN6SNwo0KA/exec";
const SESSION_TTL = 172800000; // 48 Horas
const PAYPAL_LINK = "https://www.paypal.com/ncp/payment/5WHSRBUSQSZSS"; // Tu botón de pago real

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
    const [showOffer, setShowOffer] = useState(false); // Estado para el Upsell
    const [isBanned, setIsBanned] = useState(false);
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
            // 1. Obtener IP
            let ip = '0.0.0.0';
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                ip = data.ip;
                setClientIP(ip);
            } catch (e) { console.error("IP check failed"); }

            // 2. Verificar Baneo
            if (BLACKLIST.ips.includes(ip)) {
                setIsBanned(true);
                return;
            }

            // 3. Verificar Sesión
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

            // 4. Bloquear si no hay sesión válida
            localStorage.clear();
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

    const handleSkipOffer = () => {
        // Guardar sesión y dejar pasar al usuario GRATIS
        localStorage.setItem('member_access', 'true');
        localStorage.setItem('session_start', Date.now().toString());
        setIsVisible(false);
        document.body.style.overflow = 'auto';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fullPhone = `${phonePrefix}${formData.whatsapp}`.replace(/\s/g, '');

        // Validación de Blacklist Manual
        if (BLACKLIST.emails.includes(formData.email.toLowerCase().trim()) || BLACKLIST.phones.includes(fullPhone)) {
            alert("Acceso denegado: Usuario bloqueado por seguridad.");
            setIsBanned(true);
            return;
        }

        setIsLoading(true);

        try {
            // ✅ CORRECCIÓN CRÍTICA: Usamos URLSearchParams para asegurar que Google Sheets reciba los datos
            const data = new URLSearchParams();
            data.append('nombre', formData.nombre);
            data.append('email', formData.email);
            data.append('whatsapp', fullPhone);
            data.append('pais', formData.pais);
            data.append('edad', formData.edad);
            data.append('ip_address', clientIP);
            data.append('device_info', navigator.userAgent);
            data.append('registro_hora', new Date().toLocaleString('es-ES'));

            // Envío al Webhook
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors', // Necesario para Google Apps Script
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data.toString()
            });

            // Éxito simulado + Activación de UPSELL
            setTimeout(() => {
                setIsLoading(false);
                // NO cerramos el muro todavía, mostramos la oferta
                setShowOffer(true); 
            }, 1500);

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
                    <p className="text-gray-400 font-mono">Su IP ({clientIP}) ha sido bloqueada permanentemente.</p>
                </div>
            </div>
        );
    }

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            {/* --- RENDERIZADO CONDICIONAL: OFERTA VS FORMULARIO --- */}
            
            {showOffer ? (
                // 💰 TARJETA DE VENTA (UPSELL)
                <div className="w-full max-w-md bg-[#0A1931] rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-500 p-8 animate-fade-in-up text-center relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500 animate-pulse"></div>
                    
                    <h2 className="text-xl font-bold text-green-400 mb-2 uppercase tracking-widest">¡Registro Exitoso!</h2>
                    <h1 className="text-3xl font-black text-white mb-4 leading-none">OFERTA ÚNICA DE BIENVENIDA</h1>
                    
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        ¿Por qué operar solo? Obtén los <strong className="text-yellow-400">PROMPTS MAESTROS</strong> para obligar a ChatGPT y Gemini a analizar el mercado por ti. Ahorra 3 años de errores.
                    </p>

                    <div className="mb-8 bg-black/30 p-4 rounded-lg border border-white/10">
                        <span className="text-red-500 line-through text-lg font-bold mr-3">$97.00</span>
                        <span className="text-yellow-400 text-4xl font-black">$19.99</span>
                    </div>

                    <button 
                        onClick={() => window.open(PAYPAL_LINK, '_blank')}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all transform hover:scale-105 flex items-center justify-center gap-2 mb-4 text-lg"
                    >
                        <FiLock /> DESCARGAR AHORA
                    </button>

                    <button 
                        onClick={handleSkipOffer}
                        className="text-gray-500 text-xs hover:text-gray-300 underline transition-colors"
                    >
                        No gracias, prefiero entrar al Dashboard gratuito y aprender lento.
                    </button>
                </div>

            ) : (
                // 📝 FORMULARIO DE REGISTRO (Original)
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-brand-accent p-8 animate-fade-in-up">
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4 scale-125">
                            <React.Suspense fallback={<div className="text-black font-bold">TRADEVISION</div>}>
                                <Logo className="w-16 h-16" />
                            </React.Suspense>
                        </div>
                        <h2 className="text-2xl font-black text-black uppercase tracking-tighter">Validación Obligatoria</h2>
                        <p className="text-gray-600 text-xs mt-1 uppercase font-bold tracking-widest">TradeVision Latam Security</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                            <input 
                                name="nombre" type="text" required placeholder="Nombre Completo"
                                value={formData.nombre} onChange={handleChange}
                                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-black focus:ring-2 focus:ring-brand-accent outline-none"
                            />
                        </div>

                        <div className="relative">
                            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                            <input 
                                name="email" type="email" required placeholder="Correo Electrónico"
                                value={formData.email} onChange={handleChange}
                                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-black focus:ring-2 focus:ring-brand-accent outline-none"
                            />
                        </div>

                        <div className="relative">
                            <FiGlobe className="absolute left-3 top-3.5 text-gray-400" />
                            <select 
                                name="pais" required value={formData.pais} onChange={handleCountryChange}
                                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-black focus:ring-2 focus:ring-brand-accent outline-none appearance-none"
                            >
                                <option value="" disabled>Selecciona tu País</option>
                                {LATAM_DATA.map(i => <option key={i.country} value={i.country}>{i.country}</option>)}
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <div className="w-20 bg-gray-200 text-black border border-gray-300 rounded-lg flex items-center justify-center font-bold text-sm">
                                {phonePrefix || '+--'}
                            </div>
                            <div className="relative flex-1">
                                <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                                <input 
                                    name="whatsapp" type="tel" required placeholder="WhatsApp"
                                    value={formData.whatsapp} onChange={handleChange}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-black focus:ring-2 focus:ring-brand-accent outline-none"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <FiHash className="absolute left-3 top-3.5 text-gray-400" />
                            <input 
                                name="edad" type="number" min="18" max="99" required placeholder="Edad (Min 18)"
                                value={formData.edad} onChange={handleChange}
                                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-black focus:ring-2 focus:ring-brand-accent outline-none"
                            />
                        </div>

                        <button 
                            type="submit" disabled={isLoading}
                            className="w-full bg-black text-white font-black py-4 rounded-lg shadow-xl hover:bg-brand-primary transition-all flex items-center justify-center gap-2 group active:scale-95"
                        >
                            {isLoading ? (
                                <FiCpu className="animate-spin text-xl" />
                            ) : (
                                <><FiLock /> DESBLOQUEAR CONTENIDO</>
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest flex items-center justify-center gap-1">
                                <FiCheckCircle className="text-green-600" /> Sesión segura verificada (48H)
                            </p>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginWall;
