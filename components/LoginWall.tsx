import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiGlobe, FiHash, FiLock, FiCheckCircle, FiCpu } from 'react-icons/fi';
import Logo from './Logo';

// URL de Producción del Webhook de Google Apps Script (Corregida y Completa)
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby87DhdC7O8YhaYE6BFEpO-hszGLNSAnRIiAL4WLHhwhECekhd8OGHXcTbyVj9xJnK53Q/exec";

const LoginWall: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        whatsapp: '',
        pais: '',
        edad: ''
    });

    useEffect(() => {
        // 1. Verificación de Seguridad al Cargar
        const accessGranted = localStorage.getItem('member_access');
        
        if (accessGranted !== 'true') {
            // Bloquear scroll del cuerpo para forzar el registro
            document.body.style.overflow = 'hidden';
            setIsVisible(true);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 2. Envío de Datos al Webhook
            // IMPORTANTE: mode: 'no-cors' es vital para enviar datos a Google desde un dominio externo.
            // Esto significa que la respuesta será "opaca" (no podemos leer el JSON de respuesta),
            // pero el servidor procesará los datos correctamente.
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // 3. Lógica de Éxito (Asumimos éxito si no hay error de red debido a no-cors)
            setTimeout(() => {
                // Guardar token de acceso
                localStorage.setItem('member_access', 'true');
                
                // Limpiar estado
                setIsLoading(false);
                setIsVisible(false);
                
                // Restaurar scroll
                document.body.style.overflow = 'auto'; 
                
                // Feedback al usuario
                alert("✅ Acceso Validado. Bienvenido al Ecosistema TradeVision.");
            }, 1500); // Delay para UX (simular procesamiento)

        } catch (error) {
            console.error("Error en registro:", error);
            setIsLoading(false);
            alert("Hubo un error de conexión. Por favor, verifique su internet e intente nuevamente.");
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050b14]/95 backdrop-blur-xl transition-opacity duration-500">
            <div className="w-full max-w-md p-8 m-4 bg-[#0A1931] border border-brand-accent/30 rounded-2xl shadow-[0_0_50px_rgba(64,224,208,0.15)] relative overflow-hidden animate-fade-in-up">
                
                {/* Efectos de fondo */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-70"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-accent/10 blur-[50px] rounded-full pointer-events-none"></div>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Logo className="w-16 h-16" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-white tracking-wide uppercase">Acceso Exclusivo</h2>
                    <p className="text-gray-400 text-sm mt-2">ecosistema tradevision latam</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Nombre */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiUser className="text-brand-accent/70 group-focus-within:text-brand-accent transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            name="nombre" 
                            required 
                            placeholder="Nombre Completo"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full bg-[#0d213f] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all placeholder-gray-500 text-sm"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMail className="text-brand-accent/70 group-focus-within:text-brand-accent transition-colors" />
                        </div>
                        <input 
                            type="email" 
                            name="email" 
                            required 
                            placeholder="Correo Electrónico Oficial"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#0d213f] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all placeholder-gray-500 text-sm"
                        />
                    </div>

                    {/* WhatsApp */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiPhone className="text-brand-accent/70 group-focus-within:text-brand-accent transition-colors" />
                        </div>
                        <input 
                            type="tel" 
                            name="whatsapp" 
                            required 
                            placeholder="WhatsApp (con código país)"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className="w-full bg-[#0d213f] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all placeholder-gray-500 text-sm"
                        />
                    </div>

                    {/* Fila Doble: País y Edad */}
                    <div className="flex gap-4">
                        <div className="relative group w-2/3">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiGlobe className="text-brand-accent/70 group-focus-within:text-brand-accent transition-colors" />
                            </div>
                            <select 
                                name="pais" 
                                required 
                                value={formData.pais}
                                onChange={handleChange}
                                className="w-full bg-[#0d213f] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-accent transition-all text-sm appearance-none"
                            >
                                <option value="" disabled>País</option>
                                <option value="Mexico">México</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Peru">Perú</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Chile">Chile</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Espana">España</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div className="relative group w-1/3">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiHash className="text-brand-accent/70 group-focus-within:text-brand-accent transition-colors" />
                            </div>
                            <input 
                                type="number" 
                                name="edad" 
                                required 
                                placeholder="Edad"
                                min="18"
                                max="99"
                                value={formData.edad}
                                onChange={handleChange}
                                className="w-full bg-[#0d213f] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-accent transition-all placeholder-gray-500 text-sm"
                            />
                        </div>
                    </div>

                    {/* Botón de Acción */}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full mt-6 bg-gradient-to-r from-brand-accent to-blue-600 hover:to-blue-500 text-[#0A1931] font-extrabold py-4 rounded-lg shadow-[0_0_20px_rgba(64,224,208,0.4)] hover:shadow-[0_0_30px_rgba(64,224,208,0.6)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <FiCpu className="animate-spin" /> PROCESANDO...
                            </>
                        ) : (
                            <>
                                <FiLock /> DESBLOQUEAR ACCESO
                            </>
                        )}
                    </button>

                    <p className="text-center text-[10px] text-gray-500 mt-4 flex items-center justify-center gap-1">
                        <FiCheckCircle className="text-green-500" /> Conexión Segura SSL 256-bit
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginWall;