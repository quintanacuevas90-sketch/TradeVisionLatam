
import React, { useState, useEffect } from 'react';
import { FaTelegram, FaWhatsapp, FaCheckCircle, FaUserPlus, FaUsers, FaArrowRight } from 'react-icons/fa';
import { FiArrowDown, FiAward, FiTarget } from 'react-icons/fi';
import PageBackButton from '../components/PageBackButton';

// --- SUB-COMPONENTS ---

const SocialProofToast: React.FC = () => {
    const [notification, setNotification] = useState<{ text: string; isVisible: boolean } | null>(null);

    const countries = ['Perú', 'Colombia', 'Venezuela', 'Argentina', 'Chile', 'México', 'Ecuador', 'España'];
    const actions = [
        'ingresaron a la comunidad en los últimos 2 minutos',
        'accedieron a la Biblioteca hace un momento',
        'se unió al Grupo de Debate desde'
    ];
    
    useEffect(() => {
        const showNotification = () => {
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            const randomNumber = Math.floor(Math.random() * (12 - 3 + 1)) + 3;
            const randomCountry = countries[Math.floor(Math.random() * countries.length)];
            
            let text = '';
            if (randomAction.includes('se unió')) {
                text = `Nuevo miembro ${randomAction} ${randomCountry}.`;
            } else {
                text = `${randomNumber} personas ${randomAction}.`;
            }

            setNotification({ text, isVisible: true });

            setTimeout(() => {
                setNotification(prev => prev ? { ...prev, isVisible: false } : null);
            }, 5000);
        };

        const intervalId = setInterval(showNotification, 20000);
        
        // Show one notification shortly after component mounts
        const initialTimeout = setTimeout(showNotification, 5000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(initialTimeout);
        };
    }, []);

    if (!notification) return null;

    return (
        <div className={`fixed bottom-5 left-5 z-50 p-4 rounded-lg shadow-2xl border border-brand-accent/30 bg-[#111827] text-white flex items-center gap-3 transition-all duration-500 ${notification.isVisible ? 'animate-toast-in' : 'animate-toast-out'}`}>
            <FaUserPlus className="text-brand-accent text-2xl"/>
            <p className="text-sm font-semibold">{notification.text}</p>
        </div>
    );
};


// --- MAIN COMPONENT ---

interface UrgencyCtaSectionProps {
    showBackButton?: boolean;
}

const UrgencyCtaSection: React.FC<UrgencyCtaSectionProps> = ({ showBackButton = false }) => {

    const channels = [
        {
            icon: <FaTelegram />,
            buttonText: "INGRESAR AL CANAL",
            link: "https://t.me/tradevision90",
            benefits: ['Últimas noticias TradeVision', 'Lives Exclusivos', 'Códigos de Torneos', 'Nuevas Apps', 'Actualizaciones Academia']
        },
        {
            icon: <FaWhatsapp />,
            buttonText: "INGRESAR AL CANAL",
            link: "https://whatsapp.com/channel/0029Vb6gcptJZg49w13b0L1H",
            benefits: ['Avisos de la Academia', 'Info General', 'Cómo Participar']
        }
    ];

    const metrics = [
        { icon: <FaCheckCircle/>, text: '100+ Reseñas Verificadas' },
        { icon: <FiAward/>, text: '700+ Casos de Éxito' },
        { icon: <FaUsers/>, text: 'Comunidad Activa' },
    ];

    return (
        <section className={`bg-[#0B1120] text-white font-sans ${showBackButton ? 'pt-8 pb-16' : 'py-16'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {showBackButton && (
                    <div className="mb-8">
                        <PageBackButton variant="on-dark" />
                    </div>
                )}
                
                <div className="space-y-12">
                    {/* --- HERO CONVERSION BUTTON (NEW) --- */}
                    <div className="max-w-4xl mx-auto animate-fade-in-up">
                        <a 
                            href="https://tradevision.me/#/cursos/binarias-intermedio"
                            className="group relative flex flex-col md:flex-row items-center justify-center gap-4 bg-[#FACC15] hover:bg-[#EAB308] text-black p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(250,204,21,0.2)] hover:shadow-[0_25px_60px_rgba(250,204,21,0.4)] border-b-8 border-[#A16207] active:border-b-0 active:translate-y-1 transition-all duration-300 text-center md:text-left overflow-hidden"
                        >
                            {/* Brillo animado */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                            
                            <div className="bg-black/10 p-3 rounded-full hidden md:block group-hover:scale-110 transition-transform">
                                <FiTarget size={40} className="text-black" />
                            </div>
                            
                            <div className="flex-1">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase leading-tight tracking-tighter">
                                    CONOCE EL CURSO QUE TE LLEVARÁ <br className="hidden lg:block" /> A LA RENTABILIDAD AQUÍ
                                </h2>
                                <p className="text-xs md:text-sm font-bold uppercase mt-1 opacity-70 tracking-widest flex items-center justify-center md:justify-start gap-2">
                                    <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span> OFERTA DE LANZAMIENTO V2.0
                                </p>
                            </div>
                            
                            <div className="shrink-0 flex items-center justify-center bg-black text-white w-12 h-12 md:w-16 md:h-16 rounded-full group-hover:translate-x-2 transition-transform shadow-xl">
                                <FaArrowRight size={24} />
                            </div>
                        </a>
                        <p className="text-center text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] mt-4 opacity-50">
                            Prioridad de acceso recomendada por José Quintana
                        </p>
                    </div>

                    {/* Access Buttons & Benefits - Grid adjusted to 2 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {channels.map((channel, index) => (
                            <div key={index} className="p-6 rounded-lg bg-[#111827]/70 border border-white/10 flex flex-col items-center">
                                <div className="text-6xl text-brand-accent mb-6">{channel.icon}</div>
                                <FiArrowDown className="text-3xl animate-bounce-arrow mb-4" style={{ color: '#00FF41' }}/>
                                <a href={channel.link} target="_blank" rel="noopener noreferrer" className="w-full bg-[#00F0FF] text-black font-bold py-3 text-center rounded-lg transition-transform transform hover:scale-105">
                                    {channel.buttonText}
                                </a>
                                <ul className="mt-6 space-y-2 text-sm text-left w-full">
                                    {channel.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <FaCheckCircle style={{ color: '#00FF41' }}/>
                                            <span className="text-gray-300">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Authority Section */}
                    <div className="p-6 md:p-8 rounded-lg bg-[#111827] border border-white/10 text-center">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white">YA SOMOS <span className="text-brand-accent">1,620</span> MIEMBROS EN LA ACADEMIA</h3>
                        <p className="text-xs md:text-sm text-gray-400 mt-2 max-w-3xl mx-auto">
                            Apertura reciente y crecimiento masivo en: Venezuela, Perú, Colombia, Ecuador, Bolivia, R. Dominicana, Argentina, Chile, Panamá, Cuba, Paraguay, Uruguay.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mt-6">
                            {metrics.map((metric, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm font-semibold">
                                    <span className="text-brand-accent">{metric.icon}</span>
                                    <span className="text-gray-300">{metric.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Social Proof Toast */}
            <SocialProofToast />

        </section>
    );
};

export default UrgencyCtaSection;
