
import { Testimonial, Broker, Post, FAQ } from './types';

export const NEWS_TICKER_ITEMS: string[] = [
    "Jerome Powell signals potential rate hikes amidst inflation concerns.",
    "Bitcoin surges past $70,000, setting new all-time highs.",
    "European Central Bank maintains its current monetary policy.",
    "Tech stocks lead market rally after strong earnings reports.",
    "Gold prices reach a six-month peak due to geopolitical tensions."
];

export const TESTIMONIALS: Testimonial[] = [
    {
        name: "Carlos R.",
        text: "La disciplina y el enfoque de José son contagiosos. TradeVision me dio las herramientas para operar con confianza y estrategia, no con emociones.",
        image: "https://picsum.photos/100/100?random=1"
    },
    {
        name: "Ana G.",
        text: "Entender la gestión de riesgo lo cambió todo. Ya no temo al mercado, lo respeto. La comunidad de Telegram es un apoyo invaluable.",
        image: "https://picsum.photos/100/100?random=2"
    },
    {
        name: "Luis F.",
        text: "Los cursos son directos y sin rodeos. Aprendí más en un mes con TradeVision que en un año por mi cuenta. Totalmente recomendado.",
        image: "https://picsum.photos/100/100?random=3"
    },
     {
        name: "Sofia M.",
        text: "El enfoque en la psicología del trading es único. Me ha ayudado no solo en mis operaciones, sino en mi vida profesional. Gracias, José.",
        image: "https://picsum.photos/100/100?random=4"
    }
];

export const BROKERS: Broker[] = [
    { name: "Quotex", logo: "/quotex-logo.png", type: "Binarias", description: "Plataforma líder para opciones binarias." },
    { name: "IC Markets", logo: "/icmarkets-logo.png", type: "Forex", description: "Spreads bajos y ejecución rápida." },
    { name: "Exness", logo: "/exness-logo.png", type: "Forex", description: "Broker confiable con múltiples activos." },
    { name: "Binance", logo: "/binance-logo.png", type: "Wallets", description: "El exchange de criptomonedas más grande." },
    { name: "Ledger", logo: "/ledger-logo.png", type: "Wallets", description: "Seguridad máxima para tus activos digitales." }
];

export const BLOG_POSTS: Post[] = [
    {
        id: 1,
        title: "La Psicología del Trader Exitoso",
        excerpt: "Más allá de las gráficas, la mentalidad lo es todo. Descubre los pilares psicológicos que separan a los ganadores...",
        imageUrl: "https://picsum.photos/400/250?random=10",
        author: "José Quintana",
        date: "24 Julio, 2024"
    },
    {
        id: 2,
        title: "Gestión de Riesgo: Tu Escudo en el Mercado",
        excerpt: "La primera regla del trading no es ganar, es no perder. Aprende a calcular el tamaño de tu posición y a usar stop-loss...",
        imageUrl: "https://picsum.photos/400/250?random=11",
        author: "José Quintana",
        date: "15 Julio, 2024"
    },
    {
        id: 3,
        title: "Análisis Técnico vs. Fundamental: ¿Cuál Usar?",
        excerpt: "Desmitificamos las dos grandes escuelas de análisis. Entiende sus diferencias, fortalezas y cómo combinarlas...",
        imageUrl: "https://picsum.photos/400/250?random=12",
        author: "José Quintana",
        date: "05 Julio, 2024"
    }
];

export const FAQS: FAQ[] = [
    {
        question: "¿Necesito experiencia previa para unirme?",
        answer: "No. Nuestros cursos están diseñados para llevar a un principiante desde los conceptos básicos hasta estrategias avanzadas. La disciplina es más importante que la experiencia."
    },
    {
        question: "¿Qué capital necesito para empezar a operar?",
        answer: "Recomendamos empezar en una cuenta demo para practicar sin riesgo. Para operar con capital real, puedes empezar con montos pequeños (ej. $100-$200) mientras aplicas una estricta gestión de riesgo."
    },
    {
        question: "¿Los cursos garantizan ganancias?",
        answer: "No. El trading implica un riesgo significativo y ninguna formación puede garantizar ganancias. Nuestro objetivo es enseñarte a tomar decisiones informadas y a gestionar el riesgo de manera profesional. Los resultados pasados no garantizan rendimientos futuros."
    }
];

export const LEGAL_TEXT = "Advertencia de Riesgo: El trading de divisas, criptomonedas y otros instrumentos financieros en margen conlleva un alto nivel de riesgo y puede no ser adecuado para todos los inversores. El alto grado de apalancamiento puede funcionar tanto a favor como en contra de usted. Antes de decidir invertir, debe considerar cuidadosamente sus objetivos de inversión, nivel de experiencia y apetito por el riesgo. Existe la posibilidad de que pueda sufrir la pérdida de parte o la totalidad de su inversión inicial y, por lo tanto, no debe invertir dinero que no pueda permitirse perder. Debe ser consciente de todos los riesgos asociados con el trading y buscar el asesoramiento de un asesor financiero independiente si tiene alguna duda. TradeVision Latam no se hace responsable de las pérdidas o ganancias. Todo el contenido es de carácter educativo.";
