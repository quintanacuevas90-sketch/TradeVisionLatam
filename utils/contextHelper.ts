
import { ModalType, PageType } from '../types';
import { 
    BINARY_BROKERS, 
    FOREX_BROKERS, 
    DIGITAL_WALLETS, 
    PREMIUM_TESTIMONIALS, 
    LEGAL_TEXT,
    BLOG_POSTS,
    MENTORS,
    COMPREHENSIVE_FAQS,
    /* Added missing import */
    COMPREHENSIVE_FAQ_CATEGORIES
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
            /* Fixed typo COMPRE_FAQ_CATEGORIES to COMPREHENSIVE_FAQ_CATEGORIES */
            const faqSample = COMPREHENSIVE_FAQ_CATEGORIES ? COMPREHENSIVE_FAQS.slice(0, 2).map(f => f.question).join('; ') : '';
            context += `\nEstá en la página de Preguntas Frecuentes. Algunos temas cubiertos son: "${faqSample}".`;
            break;
        case 'protocolo-confianza':
            context += `\nEstá en la página 'FAQ & Protocolo de Confianza'. Esta página aborda las dudas más críticas de la comunidad sobre seguridad de fondos, retiros, bonos, y la diferencia entre binarias y Forex.`;
            break;
        case 'brokers':
            const brokerSample = BINARY_BROKERS.slice(0, 2).map(b => b.name).join(', ');
            context += `\nEstá en la página de Brokers Recomendados. Se listan brokers para Binarias, Forex y Wallets. Algunos ejemplos son: ${brokerSample}.`;
            break;
        case 'premium-courses':
            context += `\nEstá en la página de Cursos Premium. Se muestran detalles sobre: 1) MANUAL PRO: INGENIERÍA DE PROMPTS CON IA ($29.99), 2) SISTEMA DE EJECUCIÓN (Intermedio, $99), 3) VISIÓN AVANZADA (Binarias Pro, $199), 4) ÉLITE INSTITUCIONAL (Forex, $499).`;
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
            context += `\nEstá en la página 'Nuestra Responsabilidad'. Esta página detalla el impacto y la ética de TradeVision, enfocándose en la educación gratuita, la disciplina y el apoyo comunitario.`;
            break;
        case 'impacto-social':
            context += `\nEstá en la página de Impacto Social. Se detallan las iniciativas comunitarias de TradeVision, incluyendo talleres de IA, Cripto y economía para jóvenes.`;
            break;
        case 'colabora':
             context += `\nEstá en la página 'Forma Parte de TradeVision' (/colabora). Esta es una página de reclutamiento para mentores e influencers.`;
            break;
        case 'colaboradores':
             context += `\nEstá en la página 'Socio Certificado | Acceso Gold'. Esta es una zona exclusiva de meritocracia donde se explica el reto de 4 pasos (Formación, Fondeo de $100, Subir a $500 en 30 días y Auditoría) para ganar el derecho a comisionar de por vida.`;
            break;
        case 'forex-elite':
            context += `\nEstá en la página de ventas del curso 'ÉLITE INSTITUCIONAL: LÓGICA Y EJECUCIÓN'. Este es el programa avanzado de Forex y Smart Money Concepts (SMC) de $499.`;
            break;
        case 'binarias-pro-c90':
            context += `\nEstá en la página de ventas del curso 'VISIÓN AVANZADA: EL LENGUAJE DEL PRECIO (C90trade)'. Este es el programa avanzado de opciones binarias de $199.`;
            break;
        case 'binarias-intermedio':
            context += `\nEstá en la página de ventas del curso 'SISTEMA DE EJECUCIÓN: BINARIAS INTERMEDIO'. Este es un programa para traders estancados que no son rentables, con un costo de $99.`;
            break;
        case 'comunidad':
            context += `\nEstá en la página de aterrizaje del 'Ecosistema Gratuito'. Esta página ofrece acceso a +1000 libros, +20 cursos gratis y análisis de expertos.`;
            break;
        case 'ia-manual':
            context += `\nEstá en la página de ventas del 'MANUAL: INGENIERÍA DE PROMPTS PARA LA MENTE MAESTRA DEL TRADING'. Este es un manual de $29.99 que enseña a usar IA.`;
            break;
        case 'legal-verification':
            context += `\nEstá en la página de 'Verificación Legal y Alcance Global'. Detalla la estructura educativa registrada en Canadá, Brasil y la UE.`;
            break;
        case 'aviso-legal-riesgo':
            context += `\nEstá viendo la página de 'Aviso Legal y Advertencia de Riesgo'.`;
            break;
        case 'terminos-academia':
            context += `\nEstá viendo la página de 'Términos de la Academia (T&C)'.`;
            break;
        case 'politica-privacidad':
            context += `\nEstá viendo la página de 'Política de Privacidad'.`;
            break;
        case 'transparencia-legal':
            context += `\nEstá viendo la página de 'Transparencia y Legalidad'.`;
            break;
        case 'execution-zone':
            context += `\nEstá en la 'TRADING ARENA', una página interactiva para traders. Contiene módulos de entrenamiento.`;
            break;
        case 'main':
        default:
             context += `\nLa página principal de TradeVision Latam, una academia de trading.`;
            break;
    }
    
    if (modal) {
        context += `\nActualmente, tiene abierto el modal: "${modal}".`;
    }

    return context;
};
