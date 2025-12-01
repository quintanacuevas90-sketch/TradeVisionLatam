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
        case 'protocolo-confianza':
            context += `\nEstá en la página 'FAQ & Protocolo de Confianza'. Esta página aborda las dudas más críticas de la comunidad sobre seguridad de fondos, retiros, bonos, y la diferencia entre binarias y Forex.`;
            break;
        case 'brokers':
            const brokerSample = BINARY_BROKERS.slice(0, 2).map(b => b.name).join(', ');
            context += `\nEstá en la página de Brokers Recomendados. Se listan brokers para Binarias, Forex y Wallets. Algunos ejemplos son: ${brokerSample}.`;
            break;
        case 'premium-courses':
            context += `\nEstá en la página de Cursos Premium. Se muestran detalles sobre: 1) MANUAL PRO: INGENIERÍA DE PROMPTS CON IA ($15), 2) SISTEMA DE EJECUCIÓN (Intermedio, $79), 3) VISIÓN AVANZADA (Binarias Pro, $149), 4) ÉLITE INSTITUCIONAL (Forex, $349).`;
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
            context += `\nEstá en la página 'Nuestra Responsabilidad'. Esta página detalla el impacto y la ética de TradeVision, enfocándose en la educación gratuita, la disciplina y el apoyo comunitario. Se mencionan iniciativas como 'Trading con Disciplina' y 'Academia Aberta', testimonios y una sección de preguntas frecuentes sobre su responsabilidad social.`;
            break;
        case 'impacto-social':
            context += `\nEstá en la página de Impacto Social. Se detallan las iniciativas comunitarias de TradeVision, incluyendo talleres de IA, Cripto y economía para jóvenes. Se mencionan formas de donar a través de Volet, PayPal y Binance, con un estricto proceso de verificación de 2 pasos a través de Soporte para evitar fraudes.`;
            break;
        case 'colabora':
             context += `\nEstá en la página 'Forma Parte de TradeVision' (/colabora). Esta es una página de reclutamiento para mentores, influencers y gestores de comunidad que deseen asociarse con la academia.`;
            break;
        case 'forex-elite':
            context += `\nEstá en la página de ventas del curso 'ÉLITE INSTITUCIONAL: LÓGICA Y EJECUCIÓN'. Este es el programa avanzado de Forex y Smart Money Concepts (SMC) de $349. La página detalla el problema que resuelve, los objetivos del curso (AMD, Order Blocks, etc.), las ventajas y FAQs.`;
            break;
        case 'binarias-pro-c90':
            context += `\nEstá en la página de ventas del curso 'VISIÓN AVANZADA: EL LENGUAJE DEL PRECIO (C90trade)'. Este es el programa avanzado de opciones binarias de $149. La página se enfoca en el concepto de 'reseteo mental', enseñando a operar sin indicadores y dominando la acción del precio, aplicable a cualquier temporalidad, incluyendo 'ráfagas' y 'blitz'.`;
            break;
        case 'binarias-intermedio':
            context += `\nEstá en la página de ventas del curso 'SISTEMA DE EJECUCIÓN: BINARIAS INTERMEDIO'. Este es un programa para traders estancados que no son rentables, con un costo de $79. Se enfoca en 4 estrategias de alta efectividad, gestión de riesgo y, principalmente, en Psicotrading para eliminar la improvisación.`;
            break;
        case 'comunidad':
            context += `\nEstá en la página de aterrizaje del 'Ecosistema Gratuito'. Esta página ofrece acceso a +1000 libros, +20 cursos gratis y análisis de expertos. El objetivo principal es que el usuario se una a la comunidad de Telegram.`;
            break;
        case 'ia-manual':
            context += `\nEstá en la página de ventas del 'MANUAL: INGENIERÍA DE PROMPTS PARA LA MENTE MAESTRA DEL TRADING'. Este es un manual de $15 que enseña a usar IA (GPT/Deepseek) con 6 prompts maestros para automatizar el análisis de trading, gestión de riesgo, SMC, etc.`;
            break;
        case 'legal-verification':
            context += `\nEstá en la página de 'Verificación Legal y Alcance Global'. Esta página detalla la estructura educativa de TradeVision, su registro bajo normativas de consultoría en Canadá, Brasil y la UE (España), y su compromiso con la transparencia.`;
            break;
        case 'aviso-legal-riesgo':
            context += `\nEstá viendo la página de 'Aviso Legal y Advertencia de Riesgo'. El contenido detalla los riesgos del trading, la exención de responsabilidad de la academia, y las políticas sobre el contenido educativo.`;
            break;
        case 'terminos-academia':
            context += `\nEstá viendo la página de 'Términos de la Academia (T&C)'. Detalla las reglas de uso de los servicios de TradeVision, incluyendo políticas de propiedad intelectual, reglas de ejecución anti-juego y cláusulas de protección de la reputación.`;
            break;
        case 'politica-privacidad':
            context += `\nEstá viendo la página de 'Política de Privacidad'. Explica cómo TradeVision recopila, usa y protege los datos de los usuarios, así como los derechos de los usuarios sobre su información.`;
            break;
        case 'transparencia-legal':
            context += `\nEstá viendo la página de 'Transparencia y Legalidad'. Describe la estructura corporativa de TradeVision como una consultoría educativa registrada internacionalmente y su compromiso con el cumplimiento normativo.`;
            break;
        case 'execution-zone':
            context += `\nEstá en la 'TRADING ARENA', una página interactiva para traders. Contiene módulos de entrenamiento como Calibración Mental (quiz), Reconocimiento Táctico (patrones), Modo Entrenamiento (simulador), Mejora de Habilidades (mentalidad) y Potenciador de XP (calculadora). El objetivo es forjar la disciplina.`;
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
                context += `Cursos Premium: 1) MANUAL PRO: INGENIERÍA DE PROMPTS CON IA ($15), 2) SISTEMA DE EJECUCIÓN (Intermedio, $79), 3) VISIÓN AVANZADA (Binarias Pro, $149), 4) ÉLITE INSTITUCIONAL (Forex, $349). Se mencionan testimonios de alumnos élite y herramientas recomendadas como Fusion Markets y cTrader.`;
                break;
            case 'affiliate':
                context += `Programa de Afiliados: Ofrece un Manual de Afiliados por $89.99 que enseña a evitar baneos y gestionar comunidades. Detalla plataformas de sub-afiliación como Affstore, Quotex, y CasaTrade con modelos RevShare y CPA. Advierte sobre prácticas prohibidas y explica términos legales.`;
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