
import { ModalType, PageType } from '../types';
import { 
    BINARY_BROKERS, 
    FOREX_BROKERS, 
    DIGITAL_WALLETS, 
    PREMIUM_TESTIMONIALS, 
    LEGAL_TEXT,
    BLOG_POSTS,
    MENTORS,
    COMPREHENSIVE_FAQS
} from '../constants';

export const generateContextualSummary = (modal: ModalType | null, page: PageType, slug?: string): string => {
    let context = `El usuario está en la página: ${page}.`;

    switch (page) {
        case 'blog':
            context += `\nEstá viendo la lista de artículos del blog, que incluye títulos como: "${BLOG_POSTS.slice(0, 3).map(p => p.title).join('", "')}".`;
            break;
        case 'post':
            if (slug) {
                const post = BLOG_POSTS.find(p => p.slug === slug);
                if (post) {
                    context += `\nEstá viendo el artículo del blog titulado: "${post.title}". El resumen es: "${post.excerpt}".`;
                } else {
                    context += `\nEstá viendo un artículo del blog con el slug: ${slug}, pero no se pudo encontrar en la base de datos.`;
                }
            }
            break;
        case 'sitemap':
            context += `\nEstá viendo el mapa del sitio, que lista todas las páginas y artículos.`;
            break;
        case 'faq':
            const faqSample = COMPREHENSIVE_FAQS.slice(0, 2).map(f => f.question).join('; ');
            context += `\nEstá en la página de Preguntas Frecuentes. Algunos temas cubiertos son: "${faqSample}".`;
            break;
        case 'brokers':
            const brokerSample = BINARY_BROKERS.slice(0, 2).map(b => b.name).join(', ');
            context += `\nEstá en la página de Brokers Recomendados. Se listan brokers para Binarias, Forex y Wallets. Algunos ejemplos son: ${brokerSample}.`;
            break;
        case 'premium-courses':
            context += `\nEstá en la página de Cursos Premium. Se muestran detalles sobre: 1) SISTEMA DE EJECUCIÓN (Intermedio, $79), 2) VISIÓN AVANZADA (Binarias Pro, $149), 3) ÉLITE INSTITUCIONAL (Forex, $349).`;
            break;
        case 'consultancy':
            context += `\nEstá en la página de Consultoría para Mentores. Se describe un servicio para ayudar a educadores a crear su marca, web y sistema de afiliados de forma ética.`;
            break;
        case 'methodology':
            context += `\nEstá en la página de Metodología Educativa. Se describe el Ecosistema de Ejecución Profesional de TradeVision, que integra: 1) Lógica del Precio y Smart Money Concepts (SMC). 2) Ventaja Tecnológica con Bots y Scripts. 3) Psicotrading y Gestión de Riesgo. 4) La síntesis en el patrón de ejecución AMD.`;
            break;
        case 'acerca-de':
            context += `\nEstá en la página 'Acerca de TradeVision Latam'. Esta página describe la misión, visión, hitos y presenta al equipo de mentores globales.`;
            break;
        case 'responsabilidad':
            context += `\nEstá en la página 'Nuestra Responsabilidad'. Esta página detalla el impacto y la ética de TradeVision, enfocándose en la educación gratuita, la disciplina y el apoyo comunitario. Se mencionan iniciativas como 'Trading con Disciplina' y 'Academia Abierta', testimonios y una sección de preguntas frecuentes sobre su responsabilidad social.`;
            break;
        case 'impacto-social':
            context += `\nEstá en la página de Impacto Social. Se detallan las iniciativas comunitarias de TradeVision, incluyendo talleres de IA, Cripto y economía para jóvenes. Se mencionan formas de donar a través de Volet, PayPal y Binance, con un estricto proceso de verificación de 2 pasos a través de Soporte para evitar fraudes.`;
            break;
        case 'colabora':
             context += `\nEstá en la página 'Forma Parte de TradeVision' (/colabora). Esta es una página de reclutamiento para mentores, influencers y gestores de comunidad que deseen asociarse con la academia.`;
            break;
        case 'main':
        default:
             context += `\nLa página principal de TradeVision Latam, una academia de trading.`;
            break;
    }
    
    if (modal) {
        context += `\nActualmente, tiene abierto el modal: "${modal}".\n\nContenido del modal:\n`;

        switch (modal) {
            case 'premium-courses':
                context += `Cursos Premium: 1) SISTEMA DE EJECUCIÓN (Intermedio, $79), 2) VISIÓN AVANZADA (Binarias Pro, $149), 3) ÉLITE INSTITUCIONAL (Forex, $349). Se mencionan testimonios de alumnos élite y herramientas recomendadas como Fusion Markets y cTrader.`;
                break;
            case 'affiliate':
                context += `Programa de Afiliados: Ofrece un Manual de Afiliados por $89.99 que enseña a evitar baneos y gestionar comunidades. Detalla plataformas de sub-afiliación como Affstore, Quotex, y CasaTrade con modelos RevShare y CPA. Advierte sobre prácticas prohibidas y explica términos legales.`;
                break;
            case 'legal':
                context += `Información Legal y Advertencia de Riesgo: ${LEGAL_TEXT}`;
                break;
            case 'brokers':
                const binaryNames = BINARY_BROKERS.map(b => b.name).join(', ');
                const forexNames = FOREX_BROKERS.map(b => b.name).join(', ');
                const walletNames = DIGITAL_WALLETS.map(w => w.name).join(', ');
                context += `Brokers Recomendados: Para Opciones Binarias (${binaryNames}). Para Forex (${forexNames}). Wallets recomendadas (${walletNames}). Se requiere que el usuario envíe su ID de cuenta para obtener soporte prioritario.`;
                break;
            case 'community':
                context += `Comunidad: Invita a los usuarios a unirse a los canales de WhatsApp y Telegram. Explica el camino del trader responsable: empezar en demo, educarse, y entender los riesgos.`;
                break;
            case 'support':
                context += `Soporte y Acceso: Indica a los usuarios cómo acceder a los cursos y contactar a soporte a través de WhatsApp o Telegram.`;
                break;
            case 'mentors':
                const mentorNames = MENTORS.map(m => `${m.name} (${m.role})`).join(', ');
                context += `Conoce a Nuestros Mentores: Muestra información sobre el equipo de TradeVision. Los mentores son: ${mentorNames}.`;
                break;
            default:
                context += `Viendo información general.`;
                break;
        }
    }

    return context;
};