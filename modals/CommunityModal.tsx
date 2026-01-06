
import React from 'react';
import Modal from './Modal';
import { FaTelegram, FaWhatsapp, FaLink, FaRobot, FaShieldAlt, FaBrain, FaExclamationTriangle } from 'react-icons/fa';

const socialLinks = [
    { name: "Canal de WhatsApp", icon: <FaWhatsapp />, href: "https://whatsapp.com/channel/0029Vb6gcptJZg49w13b0L1H", color: "bg-whatsapp-green", description: "Anuncios y noticias importantes" },
    { name: "Comunidad Telegram", icon: <FaTelegram />, href: "https://t.me/tradevision90", color: "bg-telegram-blue", description: "Grupo principal para debates y análisis" },
    { name: "Curso Forex Premium", icon: <FaRobot />, href: "https://t.me/trainfxbot", color: "bg-telegram-blue", description: "Bot para acceder a nuestro curso Forex Pro" },
    { name: "Todas las Redes", icon: <FaLink />, href: "https://linktr.ee/TradeVisionLatam", color: "bg-link-gray", description: "Encuéntranos en todas las plataformas" },
];

const EthicalPillar: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-brand-accent text-3xl mt-1">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-lg text-brand-primary dark:text-white">{title}</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">{children}</div>
        </div>
    </div>
);

const CommunityModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="¡Bienvenido/a a TradeVision!">
            <div className="space-y-8">
                {/* Welcome Message */}
                <section className="relative text-center p-6 rounded-lg overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-20 scale-110"
                        style={{ backgroundImage: "url('https://i.pinimg.com/736x/e9/ef/40/e9ef4018b2c4129308241a97cb01e5c4.jpg')" }}
                    ></div>
                    <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">¡Bienvenido/a a TraderVision, comunidad latina de trading responsable! 👋</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            No importa si eres novato; todos empezamos desde cero. Nuestro objetivo es brindarte la <strong>Educación, Ética y Compromiso</strong> necesarios para que te conviertas en un trader que toma decisiones informadas. ¿Buscas un cambio? Aquí se trabaja con visión, disciplina y mentalidad ganadora.
                        </p>
                    </div>
                </section>

                {/* The Path of the Responsible Trader */}
                <section>
                    <h3 className="text-xl font-bold text-center mb-6">El Camino del Comerciante Responsable</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <EthicalPillar icon={<FaShieldAlt />} title="1. Empieza sin Riesgo">
                            <p>Antes de arriesgar tu capital, domina la plataforma. Abre tu <strong>cuenta demo gratuita</strong> con $10,000 virtuales en <a href="https://affiliate.iqoption.net/redir/?aff=753088&afftrack=PaginaWeb" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">IQ Option</a> o <a href="https://exnova.org/es/?aff=753088&afftrack=PaginaWeb&aff_model=revenue" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">Exnova</a>.</p>
                        </EthicalPillar>
                        <EthicalPillar icon={<FaBrain />} title="2. El Conocimiento es Poder">
                             <p>Accede a nuestra <strong>Guía de Patrones de Velas</strong> gratuita y explora nuestros <strong>Cursos Premium</strong> para una formación profunda. El mercado premia la preparación.</p>
                        </EthicalPillar>
                         <EthicalPillar icon={<FaExclamationTriangle />} title="3. El Filtro de la Realidad">
                            <p className="font-bold text-amber-500">Si buscas atajos o sueños de millonario sin esfuerzo, este no es tu sitio.</p>
                            <p>Promovemos el <strong>Plan de Trading</strong> y una gestión de riesgo estricta (1-5% por operación). Recuerde que el trading conlleva alto riesgo y las Opciones Binarias no están reguladas.</p>
                        </EthicalPillar>
                    </div>
                </section>

                {/* Social Links */}
                <section className="text-center p-6 bg-gray-100 dark:bg-white/5 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">Únete a la Conversación</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">¡Únete a nuestra comunidad de Telegram para empezar tu camino hacia la consistencia hoy!</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {socialLinks.map(link => (
                            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                               className={`relative group flex items-center p-4 rounded-lg text-white font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 ${link.color}`}>
                                <span className="text-3xl mr-4">{link.icon}</span>
                                <span>{link.name}</span>
                                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-xs bg-gray-800 text-white text-xs rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                    {link.description}
                                </span>
                            </a>
                        ))}
                    </div>
                </section>
                
                {/* Close Button */}
                <div className="text-center pt-4">
                    <button onClick={onClose} className="bg-brand-primary text-white font-bold py-2 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300">
                        Cerrar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CommunityModal;
