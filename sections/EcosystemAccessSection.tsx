import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { FaWhatsapp, FaTelegram, FaComments } from 'react-icons/fa';

const cards = [
    {
        icon: <FaWhatsapp />,
        title: "Canal de Alertas Rápidas",
        subtitle: "Notificaciones en Tiempo Real",
        tag: { text: "97% LLENO", color: "bg-red-600 animate-blink", textColor: "text-white" },
        link: "https://whatsapp.com/channel/0029Vb6gcptJZg49w13b0L1H"
    },
    {
        icon: <FaTelegram />,
        title: "Análisis Institucional",
        subtitle: "Proyecciones de Mercado",
        tag: { text: "CIERRE INMINENTE", color: "bg-yellow-500", textColor: "text-black" },
        link: "https://t.me/tradevision90"
    },
    {
        icon: <FaComments />,
        title: "Comunidad de Debate",
        subtitle: "Networking con Traders",
        tag: { text: "Acceso por Aprobación", color: "bg-blue-500", textColor: "text-white" },
        link: "https://t.me/tradevision90"
    }
];

const EcosystemCard: React.FC<{ card: typeof cards[0] }> = ({ card }) => (
    <div className="ecosystem-card flex flex-col p-6 md:p-8 text-center bg-gray-900/50 border border-white/10 rounded-lg transition-all duration-300 relative overflow-hidden group">
        <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${card.tag.color} ${card.tag.textColor}`}>
            {card.tag.text}
        </div>
        <div className="text-5xl text-brand-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            {card.icon}
        </div>
        <h3 className="font-bold text-xl text-white mb-2">{card.title}</h3>
        <p className="text-gray-400 text-sm mb-6 flex-grow">{card.subtitle}</p>
        <a 
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
        >
            SOLICITAR ACCESO
        </a>
    </div>
);

const EcosystemAccessSection: React.FC = () => {
    return (
        <AnimatedSection className="bg-brand-primary text-white py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-3xl md:text-4xl font-extrabold uppercase tracking-wider mb-4">
                    ACCESO AL ECOSISTEMA
                </h2>
                <h3 className="text-center text-xl md:text-2xl font-bold text-red-500 mb-12 animate-pulse">
                    ÚLTIMAS PLAZAS DISPONIBLES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <EcosystemCard key={index} card={card} />
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default EcosystemAccessSection;
