import React, { useState } from 'react';
import { ModalType } from '../types';
import { LEGAL_TEXT, IP_LEGAL_TEXT, SOCIAL_LINKS } from '../constants';
import { useRouter } from '../hooks/useRouter';
import { handleEmailClick, EMAIL_TOOLTIP } from '../utils/emailHandler';
import { FaShieldAlt } from 'react-icons/fa';
import { FiLock, FiKey, FiUnlock } from 'react-icons/fi';
import AffiliateProgramModal from './AffiliateProgramModal';

interface FooterProps {
    onOpenModal: (modal: ModalType) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();
    const [isAffiliateLocked, setIsAffiliateLocked] = useState(false);

    const footerLinkGroups = [
        {
            title: 'Navegación',
            links: [
                { label: 'Cursos Premium', action: () => navigate('/premium-courses') },
                { label: 'TRADING ARENA 🎮', action: () => navigate('/zona-de-ejecucion') },
                { label: 'Recursos Gratuitos', action: () => navigate('/comunidad') },
                { label: 'Brokers Recomendados', action: () => navigate('/brokers') },
                { label: 'Blog de Trading', action: () => navigate('/blog') },
            ]
        },
        {
            title: 'Academia',
            links: [
                { label: 'Sobre Nosotros', action: () => navigate('/acerca-de') },
                { label: 'Nuestra Responsabilidad', action: () => navigate('/responsabilidad') },
                { label: 'Impacto Social', action: () => navigate('/impacto-social') },
                { label: 'Consultoría para Mentores', action: () => navigate('/consultancy') },
                { 
                    label: 'Forma Parte de TradeVision Latam', 
                    isLocked: true,
                    action: () => setIsAffiliateLocked(true) 
                },
                { label: 'Preguntas Frecuentes', action: () => navigate('/faq') },
            ]
        },
        {
            title: 'Comunidad',
            links: [
                { 
                    label: '🏆 Salón de la Fama', 
                    action: () => navigate('/hall-of-fame') 
                },
                { 
                    label: 'Programa de Afiliados', 
                    isLocked: true,
                    action: () => setIsAffiliateLocked(true) 
                },
                { label: 'Protocolo de Confianza', action: () => navigate('/protocolo-confianza') },
                { label: 'Aviso Legal y Riesgo', action: () => navigate('/aviso-legal-riesgo') },
                { label: 'Términos de la Academia', action: () => navigate('/terminos-academia') },
                { label: 'Política de Privacidad', action: () => navigate('/politica-privacidad') },
            ]
        }
    ];

    const claimsText = "Reclamaciones de Propiedad de Material: TradeVision Latam respeta la propiedad intelectual de terceros. Si usted considera que algún material alojado en este sitio infringe sus derechos de autor, por favor contacte a nuestro equipo legal a tradevision2026@gmail.com con la petición detallada para su pronta revisión y atención.";
    const claimsParts = claimsText.split('TradeVision Latam');
    const legalParts = LEGAL_TEXT.split('TradeVision Latam');
    const ipLegalParts = IP_LEGAL_TEXT.split('TradeVision Latam');

    return (
        <footer className="bg-gray-100 dark:bg-brand-primary relative overflow-hidden">
            <div className="bg-yellow-500/90 dark:bg-yellow-600/90 text-black py-2 px-4 text-xs font-bold text-center tracking-wide relative z-20">
                <p>
                    <span className="font-extrabold">❗ LEYENDA CLAVE: SOPORTE DE ÉLITE.</span> Si no está afiliado a <span translate="no">TRADEVISION LATAM</span> (con ID registrado), NO podemos prestar asistencia ni gestión en problemas de broker o retiros. El soporte es un beneficio exclusivo para la comunidad activa.
                </p>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-extrabold mb-4" translate="no">TradeVision<span className="text-brand-accent"> Latam</span></h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Forjando traders disciplinados en Latinoamérica.</p>
                        
                        {/* BOTÓN DESTACADO: INFO PRIVILEGIADA */}
                        <button 
                            onClick={() => setIsAffiliateLocked(true)}
                            className="mb-8 flex items-center justify-between p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 font-black text-xs uppercase tracking-widest hover:bg-yellow-500/20 transition-all group w-full max-w-xs shadow-[0_0_20px_rgba(234,179,8,0.1)]"
                        >
                            <div className="flex items-center gap-3">
                                <FiKey className="text-xl group-hover:rotate-12 transition-transform" />
                                <span>INFO PRIVILEGIADA</span>
                            </div>
                            <FiUnlock className="opacity-50" />
                        </button>

                        <div className="flex space-x-4 mt-6">
                            {SOCIAL_LINKS.map((link) => {
                                const isMail = link.href.startsWith('mailto:');
                                if (isMail) {
                                    return (
                                        <button
                                            key={link.name}
                                            onClick={handleEmailClick}
                                            className={`transition text-2xl hover:opacity-80 ${link.colorClass}`}
                                            aria-label={link.name}
                                            title={EMAIL_TOOLTIP}
                                        >
                                            {React.createElement(link.icon)}
                                        </button>
                                    );
                                }
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`transition text-2xl hover:opacity-80 ${link.colorClass}`}
                                        aria-label={link.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {React.createElement(link.icon)}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    {footerLinkGroups.map((group) => (
                        <div key={group.title}>
                            <h4 className="font-bold text-lg mb-4">{group.title}</h4>
                            <ul className="space-y-2">
                                {group.links.map((item) => (
                                    <li key={item.label}>
                                        <button 
                                            onClick={item.action} 
                                            className={`transition text-left flex items-center justify-between w-full group/link ${
                                            (item as any).isLocked
                                                ? 'text-yellow-600 dark:text-yellow-400 font-bold'
                                                : item.label.includes('TRADING ARENA')
                                                    ? 'font-bold text-cyber-violet text-glow-violet hover:opacity-80'
                                                    : item.label.includes('🏆 Salón de la Fama')
                                                        ? 'text-yellow-500 hover:text-yellow-400 font-bold'
                                                        : 'text-gray-500 dark:text-gray-400 hover:text-brand-accent'
                                            }`}
                                        >
                                            <span className="flex-1">
                                                {item.label === 'Brokers Recomendados' ? <><span translate="no">Brokers</span> Recomendados</> : item.label}
                                            </span>
                                            {(item as any).isLocked && (
                                                <FiLock size={12} className="ml-2 opacity-60 group-hover/link:scale-110 transition-transform" />
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 dark:border-white/10 pt-8 relative">
                    <h5 className="font-bold mb-2">Advertencia de Riesgo</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        {legalParts[0]}<span translate="no">TradeVision Latam</span>{legalParts[1]}
                    </p>
                    
                    <h5 className="font-bold mb-2 mt-4">Propiedad Intelectual y Prohibición de Distribución</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 whitespace-pre-line">
                        {ipLegalParts[0]}<span translate="no">TradeVision Latam</span>{ipLegalParts[1]}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mt-6 gap-8 relative">
                        <div className='text-center sm:text-left'>
                            <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} <span translate="no">TradeVision Latam</span>. Todos los derechos reservados.</p>
                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Estructura de Consultoría Educativa registrada para operar en Canadá, Brasil y Unión Europea (España).</p>
                        </div>
                        
                        <div className="relative group flex flex-col items-center cursor-pointer" onClick={() => navigate('/verificacion-legal')}>
                            <div className="flex items-center gap-3 p-3 pr-5 rounded-xl bg-blue-900/50 border border-blue-700/50 hover:border-brand-accent transition-all duration-300 shadow-lg backdrop-blur-sm relative z-10 transform translate-y-4 group-hover:translate-y-0">
                                 <FaShieldAlt className="text-brand-accent text-2xl sm:text-3xl" />
                                 <div className="text-left">
                                     <span className="block text-sm sm:text-base font-extrabold text-white leading-tight" translate="no">TRADEVISION LATAM</span>
                                     <span className="block text-[10px] sm:text-xs text-brand-accent uppercase tracking-wider">Verified Academy</span>
                                     <p className="text-[10px] text-gray-400 leading-tight mt-0.5 group-hover:text-white transition-colors">Ver Certificación &gt;</p>
                                 </div>
                            </div>

                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 z-0 -mt-4">
                                 <img 
                                    src="https://i.pinimg.com/736x/db/31/b4/db31b46235afd233c0372a0c5eaeb931.jpg" 
                                    alt="Mascota TradeVision Latam Señalando Arriba" 
                                    className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 mt-4">
                        {claimsParts[0]}<span translate="no">TradeVision Latam</span>{claimsParts[1]}
                    </p>
                </div>
            </div>

            <AffiliateProgramModal 
                isOpen={isAffiliateLocked} 
                onClose={() => setIsAffiliateLocked(false)} 
            />
        </footer>
    );
};

export default Footer;