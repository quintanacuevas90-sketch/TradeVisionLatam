

import React from 'react';
import { ModalType } from '../types';
import { LEGAL_TEXT, IP_LEGAL_TEXT, SOCIAL_LINKS } from '../constants';
import { useRouter } from '../hooks/useRouter';
import VerifiedBadge from './VerifiedBadge';

interface FooterProps {
    onOpenModal: (modal: ModalType) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();

    const footerLinkGroups = [
        {
            title: 'Navegación',
            links: [
                { label: 'Cursos Premium', action: () => navigate('/premium-courses') },
                { label: 'Zona de Ejecución', action: () => navigate('/zona-de-ejecucion') },
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
                { label: 'Forma Parte de TradeVision', action: () => navigate('/colabora') },
                { label: 'Preguntas Frecuentes', action: () => navigate('/faq') },
            ]
        },
        {
            title: 'Legal',
            links: [
                { label: 'Protocolo de Confianza', action: () => navigate('/protocolo-confianza') },
                { label: 'Aviso Legal y Riesgo', action: () => navigate('/aviso-legal-riesgo') },
                { label: 'Términos de la Academia', action: () => navigate('/terminos-academia') },
                { label: 'Política de Privacidad', action: () => navigate('/politica-privacidad') },
                { label: 'Transparencia y Legalidad', action: () => navigate('/transparencia-legal') },
                { label: 'Mapa del Sitio', action: () => navigate('/sitemap') },
            ]
        }
    ];

    const claimsText = "Reclamaciones de Propiedad de Material: TradeVision Latam respeta la propiedad intelectual de terceros. Si usted considera que algún material alojado en este sitio infringe sus derechos de autor, por favor contacte a nuestro equipo legal a tradevision2026@gmail.com con la petición detallada para su pronta revisión y atención.";
    const claimsParts = claimsText.split('TradeVision Latam');
    const legalParts = LEGAL_TEXT.split('TradeVision Latam');
    const ipLegalParts = IP_LEGAL_TEXT.split('TradeVision Latam');

    return (
        <footer className="bg-gray-100 dark:bg-brand-primary">
            <div className="bg-yellow-500/90 dark:bg-yellow-600/90 text-black py-2 px-4 text-xs font-bold text-center tracking-wide">
                <p>
                    <span className="font-extrabold">❗ LEYENDA CLAVE: SOPORTE DE ÉLITE.</span> Si no está afiliado a <span translate="no">TRADEVISION</span> (con ID registrado), NO podemos prestar asistencia ni gestión en problemas de broker o retiros. El soporte es un beneficio exclusivo para la comunidad activa.
                </p>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-extrabold mb-4" translate="no">Trade<span className="text-brand-accent">Vision</span></h3>
                        <p className="text-gray-500 dark:text-gray-400">Forjando traders disciplinados en Latinoamérica.</p>
                        <div className="flex space-x-4 mt-6">
                            {SOCIAL_LINKS.map((link) => {
                                const isMail = link.href.startsWith('mailto:');
                                if (isMail) {
                                    return (
                                        <button
                                            key={link.name}
                                            onClick={() => { window.open(link.href); }}
                                            className={`transition text-2xl hover:opacity-80 ${link.colorClass}`}
                                            aria-label={link.name}
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
                                        <button onClick={item.action} className="text-gray-500 dark:text-gray-400 hover:text-brand-accent transition text-left">
                                            {item.label === 'Brokers Recomendados' ? <><span translate="no">Brokers</span> Recomendados</> : item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 dark:border-white/10 pt-8">
                    <h5 className="font-bold mb-2">Advertencia de Riesgo</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        {legalParts[0]}<span translate="no">TradeVision Latam</span>{legalParts[1]}
                    </p>
                    
                    <h5 className="font-bold mb-2 mt-4">Propiedad Intelectual y Prohibición de Distribución</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 whitespace-pre-line">
                        {ipLegalParts[0]}<span translate="no">TradeVision Latam</span>{ipLegalParts[1]}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                        <div className='text-center sm:text-left'>
                            <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} <span translate="no">TradeVision Latam</span>. Todos los derechos reservados.</p>
                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Estructura de Consultoría Educativa registrada para operar en Canadá, Brasil y Unión Europea (España).</p>
                        </div>
                        <VerifiedBadge />
                    </div>

                    <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 mt-4">
                        {claimsParts[0]}<span translate="no">TradeVision Latam</span>{claimsParts[1]}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;