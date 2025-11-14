
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
                { label: 'Información Legal', action: () => onOpenModal('legal') },
                { label: 'Verificación y Alcance', action: () => navigate('/verificacion-legal') },
                { label: 'Política de Riesgo', action: () => onOpenModal('legal') },
                { label: 'Mapa del Sitio', action: () => navigate('/sitemap') },
            ]
        }
    ];

    return (
        <footer className="bg-gray-100 dark:bg-brand-primary py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-extrabold mb-4">Trade<span className="text-brand-accent">Vision</span></h3>
                        <p className="text-gray-500 dark:text-gray-400">Forjando traders disciplinados en Latinoamérica.</p>
                        <div className="flex space-x-4 mt-6">
                            {SOCIAL_LINKS.map((link) => (
                                <a key={link.name} href={link.href} className={`transition text-2xl hover:opacity-80 ${link.colorClass}`} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                                    {React.createElement(link.icon)}
                                </a>
                            ))}
                        </div>
                    </div>
                    {footerLinkGroups.map((group) => (
                        <div key={group.title}>
                            <h4 className="font-bold text-lg mb-4">{group.title}</h4>
                            <ul className="space-y-2">
                                {group.links.map((item) => (
                                    <li key={item.label}>
                                        <button onClick={item.action} className="text-gray-500 dark:text-gray-400 hover:text-brand-accent transition text-left">
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 dark:border-white/10 pt-8">
                    <h5 className="font-bold mb-2">Advertencia de Riesgo</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{LEGAL_TEXT}</p>
                    
                    <h5 className="font-bold mb-2 mt-4">Propiedad Intelectual y Prohibición de Distribución</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 whitespace-pre-line">{IP_LEGAL_TEXT}</p>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                        <p className="text-center sm:text-left text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} TradeVision Latam. Todos los derechos reservados.</p>
                        <VerifiedBadge />
                    </div>

                    <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 mt-4">
                        Reclamaciones de Propiedad de Material: TradeVision Latam respeta la propiedad intelectual de terceros. Si usted considera que algún material alojado en este sitio infringe sus derechos de autor, por favor contacte a nuestro equipo legal a tradevision2026@gmail.com con la petición detallada para su pronta revisión y atención.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;