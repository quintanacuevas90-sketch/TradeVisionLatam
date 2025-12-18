import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiGlobe, FiHash, FiLock, FiCpu, FiShieldOff, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import Logo from './Logo';

// --- CONFIGURACIÓN Y CONSTANTES ---
const WEBHOOK_URL = "hhttps://script.google.com/macros/s/AKfycbwN8vg3oGDL5E4lM_kdh2HBhPQVPBD_jSwGnUbtvot6Y_fAArTRk1-HKgzPlXppKn9Kpg/exec
const SESSION_TTL = 172800000; // 48 Horas

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

        // Preparación de metadatos solicitados
        const payload = {
            ...formData,
            whatsapp: fullPhone,
            ip_address: clientIP,
            device_info: navigator.userAgent,
            registro_hora: new Date().toLocaleString('es-ES')
        };

        try {
            // Envío al Webhook
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Éxito simulado (no-cors no retorna respuesta legible)
            setTimeout(() => {
                localStorage.setItem('member_access', 'true');
                localStorage.setItem('session_start', Date.now().toString());
                setIsLoading(false);
                setIsVisible(false);
                document.body.style.overflow = 'auto';
                alert("✅ Bienvenido a TradeVision Latam.");
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
            {/* Tarjeta en Blanco para Depuración y Visibilidad Máxima */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-brand-accent p-8 animate-fade-in-up">
                
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4 scale-125">
                        {/* Fallback para el Logo */}
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
                        <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded text-[9px] text-gray-500 leading-tight">
                            <FiAlertTriangle className="inline mr-1 text-red-500" />
                            <strong>ADVERTENCIA:</strong> El trading conlleva riesgo de pérdida. TradeVision Latam es una academia educativa.
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginWall;
