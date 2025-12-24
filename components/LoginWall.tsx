import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiGlobe, FiHash, FiLock, FiCpu, FiShieldOff, FiCheckCircle, FiArrowRight, FiEye, FiEyeOff, FiLogOut } from 'react-icons/fi';
import Logo from './Logo';

// --- CONFIGURACIÓN Y CONSTANTES ---
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwA_U_zDdmjtm5mfuV5BRaQd26xtw9iNVUgqnDZUPbo5af2rX07ohPZRHKlyDkPu03etQ/exec";
const SESSION_TTL = 172800000; // 48 Horas

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
    // --- ESTADOS DE FLUJO ---
    const [isVisible, setIsVisible] = useState(true);
    const [mode, setMode] = useState<'register' | 'login'>('register');
    const [isLoading, setIsLoading] = useState(false);
    const [isBanned, setIsBanned] = useState(false);
    const [clientIP, setClientIP] = useState('0.0.0.0');
    
    // --- ESTADOS DE FORMULARIO ---
    const [phonePrefix, setPhonePrefix] = useState('');
    const [phoneDigits, setPhoneDigits] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [loginPassword, setLoginPassword] = useState('');
    const [savedName, setSavedName] = useState('');
    
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        whatsapp: '',
        pais: '',
        edad: '',
        password: ''
    });

    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

    // --- EFECTOS INICIALES ---
    useEffect(() => {
        const initSecurityAndSession = async () => {
            document.body.style.overflow = 'hidden';
            
            // 1. Verificar si ya está registrado localmente
            const isRegistered = localStorage.getItem('tv_is_registered') === 'true';
            const firstName = localStorage.getItem('tv_user_name');
            if (isRegistered && firstName) {
                setMode('login');
                setSavedName(firstName);
            }

            // 2. Seguridad de IP
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
            }
        };
        initSecurityAndSession();
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    useEffect(() => {
        if (!isVisible) {
            document.body.style.overflow = 'auto';
        }
    }, [isVisible]);

    // --- ACCIONES ---
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

    const grantAccess = () => {
        localStorage.setItem('member_access', 'true');
        localStorage.setItem('session_start', Date.now().toString());
        setIsVisible(false);
    };

    const handleSwitchAccount = () => {
        if (confirm("¿Quieres registrar una nueva cuenta? Se borrarán tus credenciales locales.")) {
            localStorage.removeItem('tv_user_name');
            localStorage.removeItem('tv_user_pass');
            localStorage.removeItem('tv_is_registered');
            setMode('register');
            setFormData({ nombre: '', email: '', whatsapp: '', pais: '', edad: '', password: '' });
        }
    };

    // --- LÓGICA DE REGISTRO (NUEVO USUARIO) ---
    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validación básica
        const nameParts = formData.nombre.trim().split(/\s+/);
        if (nameParts.length < 2) { alert("⚠️ IDENTIDAD: Ingresa Nombre y Apellido."); return; }
        if (!emailPattern.test(formData.email.trim())) { alert("⚠️ EMAIL: Ingresa un email válido."); return; }
        
        if (phoneDigits > 0) {
            const cleanPhone = formData.whatsapp.replace(/\D/g, '');
            if (cleanPhone.length !== phoneDigits) {
                alert(`⚠️ NÚMERO: Para ${formData.pais}, deben ser ${phoneDigits} dígitos.`);
                return;
            }
        }

        const fullPhone = `${phonePrefix}${formData.whatsapp}`.replace(/\s/g, '');
        if (BLACKLIST.emails.includes(formData.email.toLowerCase()) || BLACKLIST.phones.includes(fullPhone)) {
            setIsBanned(true);
            return;
        }

        setIsLoading(true);

        try {
            const data = new URLSearchParams();
            data.append('nombre', formData.nombre.trim());
            data.append('email', formData.email.trim());
            data.append('whatsapp', fullPhone);
            data.append('pais', formData.pais.trim());
            data.append('edad', formData.edad.trim());
            data.append('password', formData.password.trim());
            data.append('ip_address', clientIP);
            data.append('registro_hora', new Date().toLocaleString('es-ES'));
            
            const finalUrl = `${WEBHOOK_URL}?${data.toString()}`;
            
            // Envío al Webhook
            await fetch(finalUrl, { method: 'GET', mode: 'no-cors' });

            // Persistencia para Login Recurrente
            localStorage.setItem('tv_user_name', formData.nombre.trim());
            localStorage.setItem('tv_user_pass', formData.password.trim());
            localStorage.setItem('tv_is_registered', 'true');

            setTimeout(() => {
                setIsLoading(false);
                grantAccess();
            }, 800);

        } catch (error) {
            console.error("Webhook error, granting bypass access...");
            grantAccess();
        }
    };

    // --- LÓGICA DE LOGIN (USUARIO RECURRENTE) ---
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const savedPass = localStorage.getItem('tv_user_pass');
        
        if (loginPassword === savedPass) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                grantAccess();
            }, 500);
        } else {
            alert("❌ Contraseña incorrecta para esta cuenta.");
        }
    };

    if (isBanned) {
        return (
            <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6 text-center">
                <div className="max-w-md">
                    <FiShieldOff className="text-red-500 text-7xl mx-auto mb-4 animate-pulse" />
                    <h1 className="text-white text-3xl font-black mb-4 uppercase">Acceso Restringido</h1>
                    <p className="text-gray-400 font-mono text-sm">Tu identidad ha sido bloqueada por seguridad institucional.</p>
                </div>
            </div>
        );
    }

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-[#050b14]/98 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-md bg-[#0A1931] rounded-3xl border border-white/10 p-8 relative flex flex-col items-center animate-fade-in-up shadow-[0_0_100px_rgba(0,229,255,0.15)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-40"></div>
                
                <div className="text-center mb-6">
                    <Logo className="w-16 h-16 drop-shadow-[0_0_15px_rgba(64,224,208,0.4)] mb-4 mx-auto" />
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">
                        {mode === 'register' ? 'Terminal de Registro' : 'Bienvenido de Nuevo'}
                    </h2>
                    <p className="text-brand-accent text-[10px] uppercase font-bold tracking-widest opacity-60">
                        {mode === 'register' ? 'Crea tu Identidad Académica' : `Hola, ${savedName}`}
                    </p>
                </div>

                {mode === 'register' ? (
                    // FORMULARIO DE REGISTRO
                    <form onSubmit={handleSubmitRegister} className="space-y-4 w-full">
                        <div className="relative group">
                            <FiUser className="absolute left-3 top-3.5 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" />
                            <input 
                                name="nombre" type="text" required placeholder="Nombre y Apellido"
                                value={formData.nombre} onChange={handleChange}
                                className="w-full bg-[#112240] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <FiMail className="absolute left-3 top-3.5 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" />
                            <input 
                                name="email" type="email" required placeholder="Email Principal"
                                value={formData.email} onChange={handleChange}
                                className="w-full bg-[#112240] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <FiGlobe className="absolute left-3 top-3.5 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" />
                            <select 
                                name="pais" required value={formData.pais} onChange={handleCountryChange}
                                className="w-full bg-[#112240] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-1 focus:ring-brand-accent outline-none appearance-none transition-all cursor-pointer"
                            >
                                <option value="" disabled>Selecciona tu País</option>
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
                                required placeholder="Crea una Contraseña"
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
                                name="edad" type="number" min="18" max="99" required placeholder="Edad (Mín 18)"
                                value={formData.edad} onChange={handleChange}
                                className="w-full bg-[#112240] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                            />
                        </div>

                        <button 
                            type="submit" disabled={isLoading}
                            className="w-full bg-gradient-to-r from-brand-accent to-blue-600 text-[#0A1931] font-black py-4 rounded-xl shadow-lg hover:shadow-brand-accent/20 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50 mt-2"
                        >
                            {isLoading ? <FiCpu className="animate-spin text-xl" /> : <><FiLock /> REGISTRAR Y ENTRAR <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>
                ) : (
                    // FORMULARIO DE LOGIN (USUARIO EXISTENTE)
                    <form onSubmit={handleLogin} className="space-y-6 w-full py-4">
                        <div className="relative group">
                            <FiLock className="absolute left-3 top-3.5 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                required placeholder="Ingresa tu Contraseña"
                                value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                                className="w-full bg-[#112240] border border-white/5 rounded-xl py-4 pl-10 pr-10 text-white placeholder-gray-600 focus:ring-2 focus:ring-brand-accent outline-none transition-all text-center text-lg tracking-widest"
                            />
                            <div className="absolute right-4 top-4.5 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </div>
                        </div>

                        <button 
                            type="submit" disabled={isLoading}
                            className="w-full bg-brand-accent text-[#0A1931] font-black py-4 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-brand-accent/50 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? <FiCpu className="animate-spin text-xl" /> : <><FiCheckCircle /> ACCEDER AL ECOSISTEMA</>}
                        </button>

                        <div className="text-center">
                            <button 
                                type="button"
                                onClick={handleSwitchAccount}
                                className="text-[10px] text-gray-500 hover:text-brand-accent uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
                            >
                                <FiLogOut /> ¿No eres {savedName.split(' ')[0]}? Crear nueva cuenta
                            </button>
                        </div>
                    </form>
                )}

                <p className="text-[9px] text-center text-gray-500 uppercase font-black tracking-[0.2em] flex items-center justify-center gap-1.5 opacity-60 mt-6">
                    <FiCheckCircle className="text-brand-accent" /> SSL SECURE TERMINAL
                </p>
            </div>
        </div>
    );
};

export default LoginWall;