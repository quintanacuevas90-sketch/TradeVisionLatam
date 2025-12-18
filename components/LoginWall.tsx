import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiGlobe, FiHash, FiLock, FiCheckCircle, FiCpu, FiAlertTriangle, FiShieldOff } from 'react-icons/fi';
import Logo from './Logo';
// 1. CONFIGURACIÓN DEL SERVIDOR (WEBHOOK) const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby87DhdC7O8YhaYE6BFEpO-hszGLNSAnRIiAL4WLHhwhECekhd8OGHXcTbyVj9xJnK53Q/exec";

// 2. CONFIGURACIÓN DE SESIÓN (48 HORAS) const SESSION_TTL = 172800000;

// 3. LISTA NEGRA DE SEGURIDAD const BLACKLIST = { ips: ['192.168.1.1', '200.10.50.20'], // IPs prohibidas emails: ['estafador@gmail.com', 'hater@hotmail.com', 'scammer@tradevision.me'], phones: ['+573001234567', '+584120000000'] };

// 4. BASE DE DATOS LATAM const LATAM_DATA = [ { country: "Argentina", code: "+54" }, { country: "Bolivia", code: "+591" }, { country: "Brasil", code: "+55" }, { country: "Chile", code: "+56" }, { country: "Colombia", code: "+57" }, { country: "Costa Rica", code: "+506" }, { country: "Cuba", code: "+53" }, { country: "Ecuador", code: "+593" }, { country: "El Salvador", code: "+503" }, { country: "Guatemala", code: "+502" }, { country: "Honduras", code: "+504" }, { country: "México", code: "+52" }, { country: "Nicaragua", code: "+505" }, { country: "Panamá", code: "+507" }, { country: "Paraguay", code: "+595" }, { country: "Perú", code: "+51" }, { country: "Rep. Dominicana", code: "+1" }, { country: "Uruguay", code: "+598" }, { country: "Venezuela", code: "+58" }, { country: "Otro", code: "+" } ];

const LoginWall: React.FC = () => { const [isVisible, setIsVisible] = useState(false); const [isLoading, setIsLoading] = useState(false); const [isBanned, setIsBanned] = useState(false); const [clientIP, setClientIP] = useState(''); const [phonePrefix, setPhonePrefix] = useState(''); const [formData, setFormData] = useState({ nombre: '', email: '', whatsapp: '', pais: '', edad: '' });

useEffect(() => {
    // A. CAPTURA DE IP Y VERIFICACIÓN DE BANEO
    const fetchIP = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            setClientIP(data.ip);
            
            if (BLACKLIST.ips.includes(data.ip)) {
                setIsBanned(true);
                document.body.style.overflow = 'hidden';
            }
        } catch (error) {
            console.error("Error obteniendo IP:", error);
        }
    };
    fetchIP();
    // B. GESTIÓN DE CADUCIDAD DE SESIÓN
    const accessGranted = localStorage.getItem('member_access');
    const sessionStart = localStorage.getItem('session_start');
    if (accessGranted === 'true' && sessionStart) {
        const now = Date.now();
        const elapsed = now - parseInt(sessionStart, 10);
        if (elapsed > SESSION_TTL) {
            localStorage.clear(); // Sesión expirada
            blockAccess();
        } else {
            setIsVisible(false); // Sesión válida
            document.body.style.overflow = 'auto';
        }
    } else {
        blockAccess(); // Sin sesión
    }
}, []);
const blockAccess = () => {
    document.body.style.overflow = 'hidden';
    setIsVisible(true);
};
const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    const countryInfo = LATAM_DATA.find(item => item.country === selectedCountry);
    setFormData({ ...formData, pais: selectedCountry });
    if (countryInfo) setPhonePrefix(countryInfo.code);
};
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
const validateForm = () => {
    return (formData.nombre && formData.email && formData.pais && formData.whatsapp && formData.edad);
};
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }
    const fullPhone = `${phonePrefix}${formData.whatsapp}`.replace(/\s/g, '');
    // VALIDACIÓN DE LISTA NEGRA (EMAIL/TLF)
    if (BLACKLIST.emails.includes(formData.email.toLowerCase().trim()) || BLACKLIST.phones.includes(fullPhone)) {
        alert("⚠️ ACCESO DENEGADO: Tu cuenta ha sido restringida.");
        setIsBanned(true);
        return;
    }
    setIsLoading(true);
    // --- CONSTRUCCIÓN DEL PAQUETE DE DATOS (FORMDATA) ---
    const payload = new FormData();
    payload.append('nombre', formData.nombre);
    payload.append('email', formData.email);
    payload.append('whatsapp', fullPhone);
    payload.append('pais', formData.pais);
    payload.append('edad', formData.edad);
    
    // --- DATOS DE INTELIGENCIA (NO BORRAR) ---
    payload.append('ip_address', clientIP || 'Oculta'); 
    payload.append('device_info', navigator.userAgent); // Detecta Modelo de Celular/PC
    payload.append('registro_hora', new Date().toLocaleString()); // Hora Local
    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', // Requerido para Google Apps Script
            body: payload
        });
        // Éxito
        setTimeout(() => {
            localStorage.setItem('member_access', 'true');
            localStorage.setItem('session_start', Date.now().toString());
            setIsLoading(false);
            setIsVisible(false);
            document.body.style.overflow = 'auto'; 
            alert("✅ Acceso Validado. Bienvenido al Ecosistema TradeVision.");
            window.location.reload();
        }, 1500);
    } catch (error) {
        console.error("Error de conexión:", error);
        setIsLoading(false);
        alert("Error de red. Intenta nuevamente.");
    }
};
// VISTA DE BANEO
if (isBanned) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black text-white p-6">
            <div className="text-center max-w-md animate-pulse">
                <FiShieldOff className="text-red-600 text-7xl mx-auto mb-6" />
                <h1 className="text-3xl font-black uppercase text-red-600 mb-2">Acceso Restringido</h1>
                <p className="text-gray-400 font-mono text-sm border border-red-900/50 p-4 bg-red-900/10">
                    IP EN LISTA NEGRA<br/>
                    <span className="mt-2 block text-red-500 font-bold">CLIENTE: {clientIP}</span>
                </p>
            </div>
        </div>
    );
}
if (!isVisible) return null;
// VISTA DEL FORMULARIO
return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050b14]/98 backdrop-blur-2xl transition-opacity duration-500">
        <div className="w-full max-w-md p-8 m-4 bg-[#0A1931] border border-brand-accent/20 rounded-2xl shadow-[0_0_60px_rgba(64,224,208,0.1)] relative overflow-hidden animate-fade-in-up">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4"><Logo className="w-16 h-16" /></div>
                <h2 className="text-2xl font-black text-white tracking-wider uppercase">Validación de Miembro</h2>
                <p className="text-brand-accent/70 text-[10px] uppercase tracking-[3px] mt-1 font-bold">TradeVision Latam</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <FiUser className="absolute left-3 top-3 text-brand-accent/50" />
                    <input type="text" name="nombre" required placeholder="Nombre y Apellido" onChange={handleChange} className="w-full bg-[#0d213f] text-white border border-gray-700/50 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-accent transition-all placeholder-gray-600 text-sm" />
                </div>
                <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-brand-accent/50" />
                    <input type="email" name="email" required placeholder="Email Principal" onChange={handleChange} className="w-full bg-[#0d213f] text-white border border-gray-700/50 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-accent transition-all placeholder-gray-600 text-sm" />
                </div>
                <div className="relative">
                    <FiGlobe className="absolute left-3 top-3 text-brand-accent/50" />
                    <select name="pais" required onChange={handleCountryChange} className="w-full bg-[#0d213f] text-white border border-gray-700/50 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-accent transition-all text-sm appearance-none cursor-pointer">
                        <option value="" disabled selected>Seleccionar País</option>
                        {LATAM_DATA.map(item => <option key={item.country} value={item.country}>{item.country}</option>)}
                    </select>
                </div>
                <div className="flex gap-2">
                    <div className="w-24 bg-[#07162b] text-brand-accent border border-gray-700/50 rounded-lg flex items-center justify-center font-mono text-sm font-bold shadow-inner">{phonePrefix || '+'}</div>
                    <div className="relative flex-1">
                        <FiPhone className="absolute left-3 top-3 text-brand-accent/50" />
                        <input type="tel" name="whatsapp" required placeholder="WhatsApp" onChange={handleChange} className="w-full bg-[#0d213f] text-white border border-gray-700/50 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-accent transition-all placeholder-gray-600 text-sm" />
                    </div>
                </div>
                <div className="relative">
                    <FiHash className="absolute left-3 top-3 text-brand-accent/50" />
                    <input type="number" name="edad" required placeholder="Edad (Mín. 18)" min="18" max="99" onChange={handleChange} className="w-full bg-[#0d213f] text-white border border-gray-700/50 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-accent transition-all placeholder-gray-600 text-sm" />
                </div>
                <button type="submit" disabled={isLoading} className="w-full mt-4 bg-gradient-to-r from-brand-accent to-blue-600 text-[#0A1931] font-black py-4 rounded-lg shadow-[0_4px_15px_rgba(64,224,208,0.2)] hover:shadow-[0_4px_25px_rgba(64,224,208,0.4)] transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-30">
                    {isLoading ? <><FiCpu className="animate-spin" /> PROCESANDO...</> : <><FiLock /> DESBLOQUEAR ECOSISTEMA</>}
                </button>
                <div className="text-center space-y-3 mt-6">
                    <p className="text-[9px] text-gray-500 flex items-center justify-center gap-1 font-bold uppercase tracking-widest"><FiCheckCircle className="text-green-500" /> Protección de Sesión Activa (48H)</p>
                    <div className="p-3 bg-red-900/10 border border-red-900/20 rounded-lg">
                        <p className="text-[9px] text-gray-500 leading-tight italic"><FiAlertTriangle className="inline mr-1 text-red-500/50" /><strong>Aviso Legal:</strong> El trading conlleva riesgo de capital. <span translate="no">TradeVision Latam</span> es una entidad educativa.</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
);
};

export default LoginWall;
