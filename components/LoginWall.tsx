import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiGlobe, FiHash, FiLock, FiCheckCircle, FiCpu, FiAlertTriangle, FiShieldOff } from 'react-icons/fi';
import Logo from './Logo';
// 1. CONFIGURACIÓN DEL SERVIDOR (WEBHOOK) const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby87DhdC7O8YhaYE6BFEpO-hszGLNSAnRIiAL4WLHhwhECekhd8OGHXcTbyVj9xJnK53Q/exec";

// 2. CONFIGURACIÓN DE SESIÓN (48 HORAS) const SESSION_TTL = 172800000;

// 3. LISTA NEGRA DE SEGURIDAD const BLACKLIST = { ips: ['192.168.1.1', '200.10.50.20'], emails: ['estafador@gmail.com', 'hater@hotmail.com', 'scammer@tradevision.me'], phones: ['+573001234567', '+584120000000'] };

// 4. BASE DE DATOS LATAM const LATAM_DATA = [ { country: "Argentina", code: "+54" }, { country: "Bolivia", code: "+591" }, { country: "Brasil", code: "+55" }, { country: "Chile", code: "+56" }, { country: "Colombia", code: "+57" }, { country: "Costa Rica", code: "+506" }, { country: "Cuba", code: "+53" }, { country: "Ecuador", code: "+593" }, { country: "El Salvador", code: "+503" }, { country: "Guatemala", code: "+502" }, { country: "Honduras", code: "+504" }, { country: "México", code: "+52" }, { country: "Nicaragua", code: "+505" }, { country: "Panamá", code: "+507" }, { country: "Paraguay", code: "+595" }, { country: "Perú", code: "+51" }, { country: "Rep. Dominicana", code: "+1" }, { country: "Uruguay", code: "+598" }, { country: "Venezuela", code: "+58" }, { country: "Otro", code: "+" } ];

const LoginWall: React.FC = () => { const [isVisible, setIsVisible] = useState(false); const [isLoading, setIsLoading] = useState(false); const [isBanned, setIsBanned] = useState(false); const [clientIP, setClientIP] = useState(''); const [phonePrefix, setPhonePrefix] = useState(''); const [formData, setFormData] = useState({ nombre: '', email: '', whatsapp: '', pais: '', edad: '' });

useEffect(() => {
    // A. CAPTURA DE IP
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
    // B. GESTIÓN DE SESIÓN
    const accessGranted = localStorage.getItem('member_access');
    const sessionStart = localStorage.getItem('session_start');
    if (accessGranted === 'true' && sessionStart) {
        const now = Date.now();
        const elapsed = now - parseInt(sessionStart, 10);
        if (elapsed > SESSION_TTL) {
            localStorage.clear(); 
            blockAccess();
        } else {
            setIsVisible(false);
            document.body.style.overflow = 'auto';
        }
    } else {
        blockAccess();
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
    if (!validateForm()) { alert("Por favor, complete todos los campos."); return; }
    const fullPhone = `${phonePrefix}${formData.whatsapp}`.replace(/\s/g, '');
    
    if (BLACKLIST.emails.includes(formData.email.toLowerCase().trim()) || BLACKLIST.phones.includes(fullPhone)) {
        alert("⚠️ ACCESO DENEGADO.");
        setIsBanned(true);
        return;
    }
    setIsLoading(true);
    const payload = new FormData();
    payload.append('nombre', formData.nombre);
    payload.append('email', formData.email);
    payload.append('whatsapp', fullPhone);
    payload.append('pais', formData.pais);
    payload.append('edad', formData.edad);
    payload.append('ip_address', clientIP || 'Oculta'); 
    payload.append('device_info', navigator.userAgent);
    payload.append('registro_hora', new Date().toLocaleString());
    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: payload
        });
        setTimeout(() => {
            localStorage.setItem('member_access', 'true');
            localStorage.setItem('session_start', Date.now().toString());
            setIsLoading(false);
            setIsVisible(false);
            document.body.style.overflow = 'auto'; 
            alert("✅ Acceso Validado.");
            window.location.reload();
        }, 1500);
    } catch (error) {
        setIsLoading(false);
        alert("Error de red.");
    }
};
if (isBanned) return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black text-white p-6">
        <div className="text-center max-w-md"><FiShieldOff className="text-red-600 text-7xl mx-auto"/><h1>ACCESO DENEGADO</h1><p>IP: {clientIP}</p></div>
    </div>
);
if (!isVisible) return null;
return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050b14]/98 backdrop-blur-2xl">
        {/* ELIMINADA LA ANIMACIÓN 'fade-in-up' PARA ASEGURAR VISIBILIDAD */}
            <div className="relative z-50 w-full max-w-md bg-[#0A1931] p-8 rounded-2xl border border-blue-500 shadow-2xl">            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4"><Logo className="w-16 h-16" /></div>
                <h2 className="text-2xl font-black text-white uppercase">Validación de Miembro</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative"><FiUser className="absolute left-3 top-3 text-brand-accent/50"/><input name="nombre" onChange={handleChange} placeholder="Nombre" className="w-full bg-[#0d213f] text-white py-3 pl-10 rounded border border-gray-700" required/></div>
                <div className="relative"><FiMail className="absolute left-3 top-3 text-brand-accent/50"/><input name="email" type="email" onChange={handleChange} placeholder="Email" className="w-full bg-[#0d213f] text-white py-3 pl-10 rounded border border-gray-700" required/></div>
                <div className="relative"><FiGlobe className="absolute left-3 top-3 text-brand-accent/50"/><select name="pais" onChange={handleCountryChange} className="w-full bg-[#0d213f] text-white py-3 pl-10 rounded border border-gray-700" required><option value="">País</option>{LATAM_DATA.map(i=><option key={i.country} value={i.country}>{i.country}</option>)}</select></div>
                <div className="flex gap-2"><div className="w-20 bg-[#07162b] text-brand-accent border border-gray-700 flex items-center justify-center">{phonePrefix||'+'}</div><input name="whatsapp" type="tel" onChange={handleChange} placeholder="WhatsApp" className="flex-1 bg-[#0d213f] text-white py-3 px-4 rounded border border-gray-700" required/></div>
                <div className="relative"><FiHash className="absolute left-3 top-3 text-brand-accent/50"/><input name="edad" type="number" onChange={handleChange} placeholder="Edad" className="w-full bg-[#0d213f] text-white py-3 pl-10 rounded border border-gray-700" required/></div>
                <button type="submit" disabled={isLoading} className="w-full bg-brand-accent text-black font-bold py-4 rounded hover:bg-white transition-all">{isLoading ? 'VALIDANDO...' : 'DESBLOQUEAR'}</button>
            </form>
        </div>
    </div>
);
}; export default LoginWall;
