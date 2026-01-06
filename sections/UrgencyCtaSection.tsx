
import React, { useState, useEffect } from 'react';
import { FaTelegram, FaWhatsapp, FaCheckCircle, FaUserPlus, FaUsers } from 'react-icons/fa';
import { FiArrowDown, FiAward } from 'react-icons/fi';
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
