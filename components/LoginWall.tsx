import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiGlobe, FiHash, FiLock, FiCpu, FiShieldOff, FiAlertTriangle, FiCheckCircle, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import Logo from './Logo';

// --- CONFIGURACIÓN Y CONSTANTES ---
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwA_U_zDdmjtm5mfuV5BRaQd26xtw9iNVUgqnDZUPbo5af2rX07ohPZRHKlyDkPu03etQ/exec";
const SESSION_TTL = 172800000; // 48 Horas
const PAYPAL_LINK = "https://www.paypal.com/ncp/payment/5WHSRBUSQSZSS"; 

const LATAM_DATA = [
  { country: "Argentina", code: "+54", digits: 10 }, 
  { country: "Bolivia", code: "+591", digits: 8 }, 
  { country: "Brasil", code: "+55", digits: 11 },
  { country: "Chile", code: "+56", digits: 9 }, 
  { country: "Colombia", code: "+57", digits: 10 }, 
  { country: "Costa Rica", code: "+506", digits: 8 },
  { country: "Cuba", code: "+53", digits: 8 }, 
  { country: "Ecuador", code: "+593", digits: 9 }, 
  { country: "El Salvador", code: "+503", digits: 8 },
  { country: "Guatemala", code: "+502", digits: 8 }, 
  { country: "Honduras", code: "+504", digits: 8 }, 
  { country: "México", code: "+52", digits: 10 },
  { country: "Nicaragua", code: "+505", digits: 8 }, 
  { country: "Panamá", code: "+507", digits: 8 }, 
  { country: "Paraguay", code: "+595", digits: 9 },
  { country: "Perú", code: "+51", digits: 9 }, 
  { country: "Rep. Dominicana", code: "+1", digits: 10 }, 
  { country: "Uruguay", code: "+598", digits: 9 },
  { country: "Venezuela", code: "+58", digits: 10 }, 
  { country: "Otro", code: "+", digits: 0 }
];

const BLACKLIST = {
  ips: ['192.168.1.1', '200.10.50.20'],
  emails: ['scammer@tradevision.me', 'test@test.com'],
  phones: ['+000000000000']
};

const LoginWall: React.FC = () => {
    // IMPORTANTE: Inicializamos en true porque el componente solo se llama si no hay sesión
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showOffer, setShowOffer] = useState(false);
    const [isBanned, setIsBanned] = useState(false);
    const [clientIP, setClientIP] = useState('0.0.0.0');
    const [phonePrefix, setPhonePrefix] = useState('');
    const [phoneDigits, setPhoneDigits] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        whatsapp: '',
        pais: '',
        edad: '',
        password: ''
    });

    // Limpieza overflow segura al desaparecer modal por cualquier vía
    useEffect(() => {
        if (!isVisible) {
            document.body.style.overflow = 'auto';
        }
    }, [isVisible]);

    useEffect(() => {
        const initSecurity = async () => {
            document.body.style.overflow = 'hidden';
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);
                const response = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
                const data = await response.json();
                clearTimeout(timeoutId);
                setClientIP(data.ip);
                if (BLACKLIST.ips.includes(data.ip)) {
                    setIsBanned(true);
                }
            } catch (e) {
                setClientIP('IP_NO_DETECTADA');
                console.warn("IP check bypassed or timed out"); 
            }
        };
        initSecurity();
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = e.target.value;
        const info = LATAM_DATA.find(item => item.country === country);
        setFormData({ ...formData, pais: country });
        if (info) {
            setPhonePrefix(info.code);
            setPhoneDigits(info.digits);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkipOffer = () => {
        localStorage.setItem('member_access', 'true');
        localStorage.setItem('session_start', Date.now().toString());
        setIsVisible(false);
        document.body.style.overflow = 'auto'; // refuerzo
    };

    // Regex robusta y segura para Cloudflare/esbuild
// Regex simple y segura para Cloudflare/esbuild
const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

    const validateForm = () => {
        const nameParts = formData.nombre.trim().split(/\s+/);
        if (nameParts.length < 2) {
            alert("⚠️ IDENTIDAD: Ingresa tu Nombre y Apellido real.");
            return false;
        }
        // Validación robusta de email
        if (!emailPattern.test(formData.email.trim())) {
            alert("⚠️ EMAIL: Ingresa un email válido.");
            return false;
        }
        if (phoneDigits > 0) {
            const cleanPhone = formData.whatsapp.replace(/\D/g, '');
            if (cleanPhone.length !== phoneDigits) {
                alert(`⚠️ NÚMERO: Para ${formData.pais}, el número debe tener ${phoneDigits} dígitos.`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Limpiar todos los campos de espacios antes de enviar
        const cleanedData = {
            nombre: formData.nombre.trim(),
            email: formData.email.trim(),
            whatsapp: formData.whatsapp.trim(),
            pais: formData.pais.trim(),
            edad: formData.edad.trim(),
            password: formData.password.trim(),
        };

        const fullPhone = `${phonePrefix}${cleanedData.whatsapp}`.replace(/\s/g, '');

        if (BLACKLIST.emails.includes(cleanedData.email.toLowerCase()) || BLACKLIST.phones.includes(fullPhone)) {
            setIsBanned(true);
            return;
        }

        setIsLoading(true);

        try {
            const data = new URLSearchParams();
            data.append('nombre', cleanedData.nombre);
            data.append('email', cleanedData.email);
            data.append('whatsapp', fullPhone);
            data.append('pais', cleanedData.pais);
            data.append('edad', cleanedData.edad);
            data.append('password', cleanedData.password);
            data.append('ip_address', clientIP);
            data.append('registro_hora', new Date().toLocaleString('es-ES'));
            
            // Construcción de la URL con Query Params
            const finalUrl = `${WEBHOOK_URL}?${data.toString()}`;
            
            await fetch(finalUrl, {
                method: 'GET',
                mode: 'no-cors'
            });

            setTimeout(() => {
                setIsLoading(false);
                setShowOffer(true); 
            }, 1000);

        } catch (error) {
            setIsLoading(false);
            setShowOffer(true); // Fallback exitoso ante error de webhook
        }
    };

    if (isBanned) {
        return (
            <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6 text-center">
                <div className="max-w-md">
                    <FiShieldOff className="text-red-500 text-7xl mx-auto mb-4 animate-pulse" />
                    <h1 className="text-white text-3xl font-black mb-4">ACCESO BLOQUEADO</h1>
                    <p className="text-gray-400 font-mono text-sm">Tu IP o identidad ha sido restringida por seguridad.</p>
                </div>
            </div>
        );
    }

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-[#050b14]/98 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
            {showOffer ? (
                <div className="w-full max-w-md bg-[#0A1931] rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-500 p-8 animate-fade-in-up text-center relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500 animate-pulse"></div>
                    <h2 className="text-xl font-bold text-green-400 mb-2 uppercase tracking-widest">¡Excelente!</h2>
                    <h1 className="text-3xl font-black text-white mb-4 leading-none uppercase italic">OFERTA DE BIENVENIDA</h1>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        Desbloquea los <strong className="text-yellow-400">PROMPTS MAESTROS</strong>. Solo por hoy.
                    </p>
                    <div className="mb-8 bg-black/30 p-4 rounded-lg border border-white/10">
                        <span className="text-red-500 line-through text-lg font-bold mr-3">$97.00</span>
                        <span className="text-yellow-400 text-4xl font-black">$19.99</span>
                    </div>
                    <button onClick={() => window.open(PAYPAL_LINK, '_blank')} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-lg shadow-[0_0_20px_rgba(234,234,59,0.3)]">
                        <FiLock /> ASEGURAR COPIA
                    </button>
                    <button onClick={handleSkipOffer} className="text-gray-500 text-xs hover:text-white underline transition-colors">
                        Saltar y entrar al Dashboard gratuito.
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-md bg-[#0A1931] rounded-3xl border border-white/10 p-8 relative flex flex-col items-center animate-fade-in-up shadow-[0_0_100px_rgba(0,229,255,0.1)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-40"></div>
                    
                    <div className="text-center mb-6">
                        <Logo className="w-16 h-16 drop-shadow-[0_0_15px_rgba(64,224,208,0.4)] mb-4 mx-auto" />
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">Terminal de Acceso</h2>
                        <p className="text-brand-accent text-[10px] uppercase font-bold tracking-widest opacity-60">Seguridad TradeVision v4.0</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                        <div className="relative group">
                            <FiUser className="absolute left-3 top-3.5 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" />
                            <input 
                                name="nombre" type="text" required placeholder="Nombre Completo"
                                value={formData.nombre} onChange={handleChange}
                                className="w-full bg-[#112240] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <FiMail className="absolute left-3 top-3.5 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" />
                            <input 
                                name="email" type="email" required placeholder="Email de Registro"
                                value={formData.email} onChange={handleChange}
                                className="w-full bg-[#112240] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <FiGlobe className="absolute left-3 top-3.5 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" />
                            <select 
                                name="pais" required value={formData.pais} onChange={handleCountryChange}
                                className="w-full bg-[#112240] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-1 focus:ring-brand-accent outline-none appearance-none transition-all"
                            >
                                <option value="" disabled>País de Residencia</option>
                                {LATAM_DATA.map(i => <option key={i.country} value={i.country} className="bg-[#0A1931]">{i.country}</option>)}
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <div className="w-20 bg-[#050b14] text-brand-accent border border-white/5 rounded-xl flex items-center justify-center font-bold text-xs font-mono">
                                {phonePrefix || '+--'}
                            </div>
                            <div className="relative flex-1 group">
                                <FiPhone className="absolute left-3 top-3.5 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" />
                                <input 
                                    name="whatsapp" type="tel" required placeholder="WhatsApp"
                                    value={formData.whatsapp} onChange={handleChange}
                                    className="w-full bg-[#112240] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <FiLock className="absolute left-3 top-3.5 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" />
                            <input 
                                name="password" 
                                type={showPassword ? "text" : "password"} 
                                required placeholder="Crea tu Contraseña"
                                value={formData.password} onChange={handleChange}
                                className="w-full bg-[#112240] border border-white/5 rounded-xl py-3 pl-10 pr-10 text-white placeholder-gray-600 focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                            />
                            <div className="absolute right-3 top-3.5 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </div>
                        </div>

                        <div className="relative group">
                            <FiHash className="absolute left-3 top-3.5 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" />
                            <input 
                                name="edad" type="number" min="18" max="99" required placeholder="Edad"
                                value={formData.edad} onChange={handleChange}
                                className="w-full bg-[#112240] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                            />
                        </div>

                        <button 
                            type="submit" disabled={isLoading}
                            className="w-full bg-gradient-to-r from-brand-accent to-blue-600 text-[#0A1931] font-black py-4 rounded-xl shadow-lg hover:shadow-brand-accent/20 transition-all flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <FiCpu className="animate-spin text-xl" />
                            ) : (
                                <><FiLock /> VALIDAR ACCESO <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>

                        <p className="text-[9px] text-center text-gray-500 uppercase font-black tracking-[0.2em] flex items-center justify-center gap-1.5 opacity-60">
                            <FiCheckCircle className="text-brand-accent" /> SSL SECURE TERMINAL
                        </p>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginWall;
