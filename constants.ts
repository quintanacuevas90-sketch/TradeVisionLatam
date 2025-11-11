import { Testimonial, Post, ComprehensiveFAQ, PartnerTool, Mentor } from './types';
import { FaTelegram, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export const TESTIMONIALS: Testimonial[] = [
    {
        name: "João Silva",
        quote: "Os livros gratuitos no Telegram são uma mina de ouro. Os mentores realmente se importam com nosso progresso.",
        location: "Brasil",
        flagUrl: "https://flagcdn.com/w40/br.png"
    },
    {
        name: "Sofia Vargas",
        quote: "Gracias a los cursos premium, mi visión del mercado cambió por completo. La información es invaluable y directa.",
        location: "Perú",
        flagUrl: "https://flagcdn.com/w40/pe.png"
    },
    {
        name: "Matías Rojas",
        quote: "La academia te da las herramientas, pero el curso gratuito de Telegram ya es un gran comienzo. ¡Increíble la cantidad de libros!",
        location: "Chile",
        flagUrl: "https://flagcdn.com/w40/cl.png"
    },
    {
        name: "Isabella Castillo",
        quote: "Incluso en tiempos difíciles, la educación de TradeVision me ha dado una nueva habilidad. Los mentores son excelentes.",
        location: "Venezuela",
        flagUrl: "https://flagcdn.com/w40/ve.png"
    },
    {
        name: "Mateo Zambrano",
        quote: "El curso privado es intenso pero vale cada centavo. Los conceptos son claros y aplicables desde el primer día.",
        location: "Ecuador",
        flagUrl: "https://flagcdn.com/w40/ec.png"
    },
    {
        name: "Valentina Morales",
        quote: "¡Qué comunidad! Los mentores y los libros gratis del grupo de Telegram son un apoyo constante. Nunca te sientes solo.",
        location: "Argentina",
        flagUrl: "https://flagcdn.com/w40/ar.png"
    },
    {
        name: "Santiago Peña",
        quote: "Empecé con el curso gratuito y me convenció para invertir en el premium. El nivel de detalle es profesional.",
        location: "Colombia",
        flagUrl: "https://flagcdn.com/w40/co.png"
    },
    {
        name: "Camila Torres",
        quote: "La cantidad de libros y recursos gratuitos que ofrecen es abrumadora. Se nota que su foco principal es enseñar de verdad.",
        location: "Panamá",
        flagUrl: "https://flagcdn.com/w40/pa.png"
    },
    {
        name: "Adrián Quispe",
        quote: "Los mentores son muy pacientes y explican todo desde cero en los cursos gratis. Muy recomendado para principiantes.",
        location: "Bolivia",
        flagUrl: "https://flagcdn.com/w40/bo.png"
    },
    {
        name: "Gabriel Ríos",
        quote: "El curso premium me dio la estructura que necesitaba para ser rentable. La información es de muy alto valor.",
        location: "Puerto Rico",
        flagUrl: "https://flagcdn.com/w40/pr.png"
    },
    {
        name: "Lucía de la Cruz",
        quote: "Esta academia es seria y profesional. Los libros gratis que comparten en Telegram son un verdadero tesoro.",
        location: "República Dominicana",
        flagUrl: "https://flagcdn.com/w40/do.png"
    },
    {
        name: "Alejandro Fernández",
        quote: "Crucé el charco buscando buena formación en español y la encontré aquí. Los mentores son de primera categoría.",
        location: "España",
        flagUrl: "https://flagcdn.com/w40/es.png"
    },
    {
        name: "Daniel Valdés",
        quote: "Con recursos limitados, el curso gratuito y los libros de Telegram han sido mi universidad de trading. Eternamente agradecido.",
        location: "Cuba",
        flagUrl: "https://flagcdn.com/w40/cu.png"
    },
    {
        name: "Maria Oliveira",
        quote: "O curso privado premium tem informações que não se encontram em nenhum outro lugar. Valeu a pena o investimento!",
        location: "Brasil",
        flagUrl: "https://flagcdn.com/w40/br.png"
    },
    {
        name: "Alejandro Quispe",
        quote: "La disciplina que enseñan los mentores es la clave del éxito. Los cursos privados te forman como un profesional.",
        location: "Perú",
        flagUrl: "https://flagcdn.com/w40/pe.png"
    },
    {
        name: "Javiera Soto",
        quote: "La comunidad es lo mejor de todo. Siempre hay alguien dispuesto a ayudar y los libros gratis son un plus gigante.",
        location: "Chile",
        flagUrl: "https://flagcdn.com/w40/cl.png"
    },
    {
        name: "Ricardo Mendoza",
        quote: "Los cursos gratis son sorprendentemente completos, te dan una base muy sólida para empezar con confianza en el mercado.",
        location: "Venezuela",
        flagUrl: "https://flagcdn.com/w40/ve.png"
    },
    {
        name: "Lucas Giménez",
        quote: "TradeVision tiene los mejores mentores, sin duda. El valor que aportan en los cursos premium es increíble.",
        location: "Argentina",
        flagUrl: "https://flagcdn.com/w40/ar.png"
    },
    {
        name: "Carolina Jaramillo",
        quote: "Estoy impresionada con la cantidad de libros gratuitos que comparten. El material de la academia es de primera calidad.",
        location: "Colombia",
        flagUrl: "https://flagcdn.com/w40/co.png"
    },
    {
        name: "David Andrade",
        quote: "El curso privado avanzado me abrió los ojos a nuevas estrategias que ya estoy aplicando. Los mentores son unos cracks.",
        location: "Ecuador",
        flagUrl: "https://flagcdn.com/w40/ec.png"
    },
    {
        name: "Sofia Navarro",
        quote: "La mejor academia de trading en español. El curso premium es oro puro y la comunidad es simplemente increíble.",
        location: "España",
        flagUrl: "https://flagcdn.com/w40/es.png"
    },
    {
        name: "Diego Hernández",
        quote: "Los mentores son de lo mejor que hay, y los cursos gratis son el punto de partida perfecto. Los libros en Telegram son un tesoro.",
        location: "México",
        flagUrl: "https://flagcdn.com/w40/mx.png"
    },
    {
        name: "Carlos Ruiz",
        quote: "La mentoría en Forex Pro es de otro nivel. Los análisis en vivo y el seguimiento personalizado hacen toda la diferencia. Vale cada dólar.",
        location: "Uruguay",
        flagUrl: "https://flagcdn.com/w40/uy.png"
    },
    {
        name: "Ana López",
        quote: "Como principiante, el curso gratuito fue mi salvación. Explicaciones claras, muchísimos libros y una comunidad que de verdad apoya.",
        location: "Paraguay",
        flagUrl: "https://flagcdn.com/w40/py.png"
    },
    {
        name: "Luis Morales",
        quote: "¡Pura vida! La academia me dio la confianza para operar. El curso avanzado es denso, pero la calidad de la información es brutal.",
        location: "Costa Rica",
        flagUrl: "https://flagcdn.com/w40/cr.png"
    },
    {
        name: "Elena Torres",
        quote: "Los cursos premium tienen información súper valiosa que no encuentras gratis. Me ayudó a estructurar mi plan de trading de forma profesional.",
        location: "México",
        flagUrl: "https://flagcdn.com/w40/mx.png"
    }
];

export const PREMIUM_TESTIMONIALS: Testimonial[] = [
    {
        name: "Carlos Mendoza (Intermedio)",
        quote: "El Sistema de Ejecución me sacó del estancamiento. Pasé de operar por impulsos a seguir un plan con reglas claras. Mi consistencia mejoró en el primer mes.",
        location: "Colombia",
        flagUrl: "https://flagcdn.com/w40/co.png"
    },
    {
        name: "Sofía Valenzuela (Avanzado)",
        quote: "Entender el 'lenguaje del precio' fue un antes y un después. Ya no dependo de indicadores que fallan, ahora leo la acción del precio directamente.",
        location: "Chile",
        flagUrl: "https://flagcdn.com/w40/cl.png"
    },
    {
        name: "Javier Ríos (Forex)",
        quote: "Dejé de ser la liquidez del mercado. El patrón AMD que enseña José es oro puro. Mis operaciones ahora tienen una lógica institucional detrás.",
        location: "México",
        flagUrl: "https://flagcdn.com/w40/mx.png"
    },
    {
        name: "Valentina Rojas (Intermedio)",
        quote: "La gestión de riesgo que enseñan es la clave. Antes quemaba cuentas, ahora sé exactamente cuánto arriesgar y cómo proteger mi capital.",
        location: "Argentina",
        flagUrl: "https://flagcdn.com/w40/ar.png"
    },
    {
        name: "Mateo Solís (Avanzado)",
        quote: "Romper con los mitos de los bots fue liberador. Este curso te obliga a pensar como un trader profesional, no como un apostador.",
        location: "Perú",
        flagUrl: "https://flagcdn.com/w40/pe.png"
    },
    {
        name: "Isabella Cruz (Forex)",
        quote: "Entender la liquidez cambió mi juego. Ahora busco zonas de alta probabilidad en lugar de perseguir el precio. Mis ratios riesgo/beneficio son increíbles.",
        location: "España",
        flagUrl: "https://flagcdn.com/w40/es.png"
    },
    {
        name: "Lucas Ferreira (Intermedio)",
        quote: "El backtesting es una herramienta que subestimaba. Validar las fórmulas de operación me dio una confianza brutal para ejecutar sin dudar.",
        location: "Brasil",
        flagUrl: "https://flagcdn.com/w40/br.png"
    },
    {
        name: "Daniela Morales (Avanzado)",
        quote: "La simpleza es la máxima sofisticación. Este curso eliminó el ruido de mis gráficos y me enseñó a enfocarme en lo que realmente importa: el precio.",
        location: "Venezuela",
        flagUrl: "https://flagcdn.com/w40/ve.png"
    },
    {
        name: "Ricardo Núñez (Forex)",
        quote: "Operar con ratios de 5:1 o más parecía imposible. Con la lógica institucional que aprendí, ahora es mi estándar. Es otro nivel de trading.",
        location: "Ecuador",
        flagUrl: "https://flagcdn.com/w40/ec.png"
    },
    {
        name: "Camila Ortiz (Intermedio)",
        quote: "Lo mejor fue la parte de psicotrading. Entendí por qué saboteaba mis propias operaciones y cómo construir una mentalidad ganadora.",
        location: "Uruguay",
        flagUrl: "https://flagcdn.com/w40/uy.png"
    },
    {
        name: "Andrés Jiménez (Avanzado)",
        quote: "Aplico los conceptos de lenguaje del precio no solo en binarias, sino también en criptos. Es una habilidad universal para cualquier mercado.",
        location: "Costa Rica",
        flagUrl: "https://flagcdn.com/w40/cr.png"
    },
    {
        name: "Gabriela Lima (Forex)",
        quote: "El concepto de 'Acumulación, Manipulación, Distribución' me abrió los ojos. Ahora veo el mercado con la claridad de un institucional.",
        location: "Portugal",
        flagUrl: "https://flagcdn.com/w40/pt.png"
    },
    {
        name: "José Torres (Intermedio)",
        quote: "Por fin un sistema claro y repetible. No más adivinar. Ejecuto mis entradas y salidas con la precisión de un cirujano. ¡Gracias!",
        location: "Panamá",
        flagUrl: "https://flagcdn.com/w40/pa.png"
    },
    {
        name: "Ana Lucía Peña (Avanzado)",
        quote: "Este curso es un 'reset' mental. Te quita todas las malas costumbres y te construye desde cero con una base sólida sobre la acción del precio.",
        location: "República Dominicana",
        flagUrl: "https://flagcdn.com/w40/do.png"
    },
    {
        name: "Sebastián Londoño (Forex)",
        quote: "Dejar de pensar en noticias y centrarme en la liquidez fue el cambio más rentable de mi carrera. Este programa vale 10 veces su precio.",
        location: "Colombia",
        flagUrl: "https://flagcdn.com/w40/co.png"
    }
];


export const BINARY_BROKERS: PartnerTool[] = [
    {
        name: "EXNOVA",
        description: "Plataforma de inversión de última generación. Ofrece $10 en cuenta demo y más de 250 activos disponibles.",
        advantages: ["$10 en cuenta demo para practicar.", "Más de 250 activos para operar.", "Plataforma moderna y de última generación."],
        image: "https://static.cdnroute.io/lp/exnova/svstatic/assets/public/meta_es.jpg",
        link: "https://exnova.org/es/?aff=753088&afftrack=PaginaWeb&aff_model=revenue",
        cta: "REGÍSTRATE",
        category: "binary",
        regulation: "unregulated"
    },
    {
        name: "IQ OPTION",
        description: "Plataforma galardonada con interfaz personalizable. Inversión mínima de $1 y demostración de $10,000.",
        advantages: ["$10,000 en cuenta demo.", "Inversión mínima de solo $1.", "Interfaz personalizable y galardonada."],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR6ld5h03u9xtOcRepHnqWKgcc4G4Dpb6HSj3RHwMbux-Y4fOgpitsVY&s",
        link: "https://affiliate.iqoption.net/redir/?aff=753088&aff_model=revenue&afftrack=PaginaWeb",
        cta: "REGÍSTRATE",
        category: "binary",
        regulation: "unregulated"
    },
    {
        name: "QUOTEX",
        description: "Bróker especializado en opciones binarias. Plataforma rápida, moderna y accesible con demo de $10,000.",
        advantages: ["$10,000 en cuenta demo.", "Plataforma rápida y moderna.", "Especializado en opciones binarias."],
        image: "https://static.quotex.io/files/1_en/1280_720.jpg",
        link: "https://broker-qx.pro/sign-up/fast/?lid=1544796",
        cta: "REGÍSTRATE",
        category: "binary",
        regulation: "unregulated"
    },
    {
        name: "POCKET OPTION",
        description: "Experiencia de trading segura y profesional con funciones sociales, torneos y modos de operación únicos.",
        advantages: ["Funciones de trading social.", "Torneos con premios.", "Múltiples modos de operación."],
        image: "https://merehead.com/blog/wp-content/uploads/ii.jpg",
        link: "https://u3.shortink.io/register?utm_campaign=827454&utm_source=affiliate&utm_medium=sr&a=SyEF45DgPsTBXM&ac=paginaweb",
        cta: "REGÍSTRATE",
        category: "binary",
        regulation: "unregulated"
    },
    {
        name: "CASATRADER",
        description: "Bróker listado para opciones binarias, una alternativa confiable para tus operaciones.",
        advantages: ["Alternativa confiable en el mercado.", "Interfaz sencilla para principiantes.", "Proceso de registro rápido."],
        image: "https://static.cdnaffs.com/files/storage/public/cu/qt/svmhdlj890it0trg.png",
        link: "https://trade.casatrade.com/register?aff=791900&aff_model=revenue&afftrack=PaginaWeb",
        cta: "REGÍSTRATE",
        category: "binary",
        regulation: "unregulated"
    },
    {
        name: "Bull-Ex",
        description: "Una plataforma emergente para opciones binarias, enfocada en la simplicidad y accesibilidad para nuevos traders.",
        advantages: ["Interfaz intuitiva ideal para principiantes.", "Proceso de registro simplificado.", "Acceso a los activos más populares."],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_rgZAuL42jp7rb7yGM5swCpBkGJ99L79uw&s",
        link: "https://trade.bull-ex.com/register?aff=792710&aff_model=revenue&afftrack=PaginaWeb",
        cta: "REGÍSTRATE",
        category: "binary",
        regulation: "unregulated"
    }
];

export const FOREX_BROKERS: PartnerTool[] = [
    {
        name: "FUSION MARKETS",
        description: "Bróker de bajo coste para Forex y CFD. Spreads desde 0.0 y comisión baja. Regulado por ASIC y VFSC.",
        advantages: ["Costos operativos muy bajos (spreads desde 0.0).", "Regulado por ASIC y VFSC, alta seguridad.", "Ideal para profesionalizarse en Forex y CFD."],
        image: "https://tvblog-static.tradingview.com/uploads/2024/03/welcoming-fusion-markets-to-tradingview-preview.jpg",
        link: "https://fusionmarkets.com/?refcode=102866",
        cta: "ABRIR CUENTA",
        category: "forex",
        regulation: "regulated"
    },
    {
        name: "cTRADER",
        description: "Plataforma con múltiples herramientas para trading, ideal para Forex y análisis técnico avanzado.",
        advantages: ["Herramientas avanzadas para análisis técnico.", "Plataforma potente y personalizable.", "Ideal para traders con experiencia."],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShNJ8AUAkerZd4OECIQimbQGuK6LSiAgYoDjpNH1L7RgvZQw1-EYsVp9o&s",
        link: "https://app.ctrader.com/?u=quintanacuevas90",
        cta: "ABRIR CUENTA",
        category: "forex",
        regulation: "tool_platform"
    },
    {
        name: "FxPro",
        description: "Bróker de Forex y CFD globalmente reconocido, con múltiples plataformas de trading y una sólida regulación.",
        advantages: ["Regulado por entidades de primer nivel (FCA, CySEC).", "Acceso a plataformas MT4, MT5 y cTrader.", "Amplia gama de instrumentos financieros."],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGL1EFB_zpvOg56H_RNdPDs5zDby5P8SF2Q&s",
        link: "https://www.fxpro.es/?ib=3nJYUyH2",
        cta: "ABRIR CUENTA",
        category: "forex",
        regulation: "regulated"
    },
    {
        name: "SabioTrade",
        description: "Plataforma de trading que ofrece cuentas financiadas. Ideal para traders que buscan capital para operar en Forex y otros mercados.",
        advantages: ["Acceso a capital de trading (cuentas financiadas).", "Plan educativo y plataforma de trading completa.", "Oportunidad de crecimiento para traders rentables."],
        image: "https://s.yimg.com/ny/api/res/1.2/3H1b5frRseGzqu.zSdZM4A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03MzE-/https://media.zenfs.com/en/globenewswire.com/db3973b060c29e968b1aa40b8ac09dc2",
        link: "https://sabiotrade.com/?aff=753088&aff_model=cpa&afftrack=PaginaWeb",
        cta: "ABRIR CUENTA",
        category: "forex",
        regulation: "regulated"
    },
    {
        name: "TradingView",
        description: "La plataforma de gráficos y red social para traders e inversores más popular del mundo. Herramientas de análisis técnico de nivel superior.",
        advantages: ["Herramientas de gráficos y análisis líderes en la industria.", "Comunidad social activa para compartir ideas.", "Integración con Múltiples brokers para operar directamente."],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB-iVUCmZg26IizQoPXXsoBzx3gwLZqUiZLw&s",
        link: "https://es.tradingview.com/pricing/?share_your_love=quintanacuevas90",
        cta: "VER PLANES",
        category: "forex",
        regulation: "tool_platform"
    }
];

export const DIGITAL_WALLETS: PartnerTool[] = [
    {
        name: "VOLET (Volet.com)",
        description: "Plataforma de pago segura y regulada. Envía, recibe e intercambia dinero y criptomonedas.",
        advantages: ["Alta seguridad y regulación.", "Permite transacciones con criptomonedas.", "Facilita depósitos y retiros en brokers."],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkjssGAtY-Pz37aXBNNIi5oUHzXJkA15MSEw&s",
        link: "https://account.volet.com:443/referral/20e63c7b-1cae-4243-be78-436b5cf9d338",
        cta: "ABRE TU CUENTA AQUÍ",
        category: "wallet",
        regulation: "regulated"
    },
    {
        name: "BINANCE",
        description: "Exchange No. 1 de criptomonedas por volumen y usuarios. Ofrece trading spot/margen y P2P.",
        advantages: ["Exchange líder a nivel mundial.", "Alta liquidez y gran cantidad de criptomonedas.", "Múltiples opciones de trading (Spot, P2P, etc.)."],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVZ-8rKw8vs65xZVpmFn0R-psdg7hjrN_MA&s",
        link: "https://acortar.link/A1THUU",
        cta: "ABRE TU CUENTA AQUÍ",
        category: "wallet",
        regulation: "crypto_exchange"
    }
];

export const FEATURED_BROKERS: PartnerTool[] = [
    BINARY_BROKERS[0], // EXNOVA
    FOREX_BROKERS[0],  // FUSION MARKETS
    DIGITAL_WALLETS[1], // BINANCE
    BINARY_BROKERS[1], // IQ OPTION
    FOREX_BROKERS[2], // FxPro
    DIGITAL_WALLETS[0], // VOLET
];

export const ALL_BROKERS_AND_TOOLS = [...BINARY_BROKERS, ...FOREX_BROKERS, ...DIGITAL_WALLETS];

export const BROKER_CATEGORIES = {
    binary: "Opciones Binarias",
    forex: "Forex y Herramientas Premium",
    wallet: "Wallets (Gestión de Capital)",
};

export const BLOG_CATEGORIES = [
    "Psicotrading",
    "Estrategia de Trading",
    "Análisis de Mercado",
    "Análisis Técnico",
    "Gestión de Riesgo",
    "Mercados",
];

export const BLOG_POSTS: Post[] = [
    {
        id: 17,
        slug: "7-excusas-mentiras-enterrar-sueno-trader",
        title: "Las 7 Mentiras que te Cuentas para Enterrar tu Sueño de Ser Trader",
        excerpt: "¿Por qué no eres rentable? Amara Srisuk, experta en Psicotrading, desglosa las 7 excusas (sesgos) que te impiden tener éxito en el trading y cómo la disciplina las vence.",
        imageUrl: "https://picsum.photos/400/250?random=27",
        author: "Amara Srisuk",
        date: "15 Octubre, 2024",
        category: "Psicotrading",
        content: `
            <p>Como experta en Psicotrading de TradeVision Latam, he escuchado cientos de historias. Todos hablan de lo importante que es perseguir sus sueños, pero pocos ejecutan. El <em>trading</em> (Forex, Cripto, Binarias) puede ofrecerte un camino hacia la independencia financiera, pero cuanto más importante es el sueño, más miedo provoca.</p>
            <p>Tu mayor enemigo no es el mercado; es la lista de excusas que has perfeccionado para evitar la acción. Aquí están las 7 maneras más comunes en que entierras tu sueño de ser <em>trader</em>.</p>
            <h2 class="text-2xl font-bold text-brand-primary dark:text-white mt-6 mb-3">1. "No tengo un título (en finanzas o economía)"</h2>
            <p>En el siglo XXI, la formación es vital, pero confundes "titulación" con "educación". En TradeVision, valoramos la <strong>disciplina y la autoeducación</strong> por encima de un diploma colgado en la pared. La mayoría de los <em>traders</em> profesionales exitosos no tienen una formación financiera formal.</p>
            <p><strong>Jesse Livermore</strong> (circa 1920), el <em>trader</em> que inspiró la "Biblia del Trader", nunca obtuvo un título. Su padre lo sacó de la escuela a los 14 años. Cada centavo que ganó fue gracias a la autoeducación rigurosa. En nuestra academia, te damos el conocimiento, pero la disciplina la pones tú.</p>
            <h2 class="text-2xl font-bold text-brand-primary dark:text-white mt-6 mb-3">2. "Es demasiado tarde para cambiar (soy muy viejo/joven)"</h2>
            <p>El mercado no te pide tu fecha de nacimiento. No importa tu edad; en 10 años lamentarás no haber comenzado hoy. El <em>trading</em> no es un deporte de élite donde la edad es un factor; es un juego de <strong>paciencia y estrategia</strong>.</p>
            <p><strong>Ingeborga Mootz</strong>, la "abuela de un millón de dólares", comenzó a operar después de cumplir 75 años (en los años 90) y construyó una fortuna. La belleza del <em>trading</em> es encontrar tu estilo. El mercado siempre estará ahí; la pregunta es si tú estarás listo.</p>
            <h2 class="text-2xl font-bold text-brand-primary dark:text-white mt-6 mb-3">3. "Primero necesito alcanzar la perfección (Parálisis por Análisis)"</h2>
            <p>Esta es la trampa favorita de los procrastinadores. La perfección es una ilusión; siempre puedes mejorar, pero nunca serás perfecto. No puedes mejorar sin práctica, y la práctica es imposible sin imperfecciones (pérdidas).</p>
            <p>Los grandes <em>traders</em> tienen grandes caídas. En TradeVision, enseñamos que cada obstáculo (cada <em>stop loss</em> tocado) es una <strong>lección de datos</strong>, no una razón para renunciar. La única perfección que buscamos es la <strong>ejecución impecable de tu plan</strong>.</p>
            <h2 class="text-2xl font-bold text-brand-primary dark:text-white mt-6 mb-3">4. "No estoy seguro de que sea lo que quiero"</h2>
            <p>Nunca lo sabrás si solo lo piensas. Puedes estudiar mil libros (tenemos más de 1000 en nuestra <a href="https://t.me/tradevision90" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">comunidad gratuita</a>) y nunca abrir una sola operación. Eso no te convertirá en un <em>trader</em>.</p>
            <p>La única forma de saberlo es probando. Abre una <strong>cuenta demo gratuita</strong> (en <a href="https://affiliate.iqoption.net/redir/?aff=753088&aff_model=revenue&afftrack=PaginaWeb" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">IQ Option</a> o <a href="https://exnova.org/es/?aff=753088&afftrack=PaginaWeb&aff_model=revenue" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Exnova</a>) y aplica el conocimiento. Solo la acción te dará la respuesta.</p>
            <h2 class="text-2xl font-bold text-brand-primary dark:text-white mt-6 mb-3">5. "Es demasiado difícil (no soy lo suficientemente inteligente)"</h2>
            <p>Si el <em>trading</em> te parece demasiado complicado, es porque probablemente estás enfocado en las herramientas incorrectas (saturación de indicadores, <em>scripts</em> milagrosos, etc.).</p>
            <p>En TradeVision, creemos que el <em>trading</em> no es difícil; es <strong>exigente</strong>. Como enseña <strong>José Quintana</strong>, el precio se mueve por una razón simple: <strong>liquidez</strong>. Nuestra metodología (el <a href="#/methodology" class="text-brand-accent hover:underline">Lenguaje del Precio</a> y la Lógica Institucional) simplifica el caos y te da un enfoque claro. No necesitas ser un genio; necesitas ser <strong>disciplinado</strong>.</p>
            <h2 class="text-2xl font-bold text-brand-primary dark:text-white mt-6 mb-3">6. "Es irracional (es un casino)"</h2>
            <p>Este es el error más común. El <em>trading</em> <strong>es</strong> un casino si operas sin un plan, sin gestión de riesgo y basado en emociones. Eso es apostar.</p>
            <p>El <em>trading</em> profesional (lo que enseñamos) es lo opuesto: es un juego de <strong>estadística y probabilidad</strong>. Usamos la lógica (Lógica Institucional, SMC), los números (Gestión de Riesgo 1-2%) y la habilidad para leer el mercado. El <em>trading</em> es un negocio de <strong>alto rendimiento</strong>, no un juego de azar. Tu plan es la ventaja que inclina la balanza a tu favor.</p>
            <h2 class="text-2xl font-bold text-brand-primary dark:text-white mt-6 mb-3">7. "No tengo tiempo"</h2>
            <p>¿No tienes tiempo para tu sueño? Entonces no es una prioridad. El <em>trading</em> puede ser lento al principio, pero una vez que creas un <a href="#/blog/plan-de-trading" class="text-brand-accent hover:underline">Plan de Trading</a>, la gestión del tiempo se vuelve fácil. Puedes operar en sesiones específicas (como Londres o Nueva York) o ser un <em>swing trader</em> (revisando gráficos una vez al día).</p>
            <p>El <em>trading</em> te da la libertad de adaptar tu estilo a tu vida. La próxima vez que uses una de estas excusas, entiende que solo son <strong>sesgos psicológicos</strong> que te impiden ejecutar. En TradeVision, te damos las herramientas para romperlos.</p>
        `
    },
    {
        id: 16,
        slug: "psicotrading-sesgo-de-anclaje-aferrarse-perdidas",
        title: "Psicotrading: El Sesgo de Anclaje y Por Qué Te Aferras a las Pérdidas",
        excerpt: "Amara Srisuk, nuestra experta en Psicotrading, explica el sesgo de anclaje: la trampa psicológica que te hace aferrarte a operaciones perdedoras y cómo la disciplina de TradeVision lo combate.",
        imageUrl: "https://picsum.photos/400/250?random=26",
        author: "Amara Srisuk",
        date: "11 Noviembre, 2025",
        category: "Psicotrading",
        content: `
            <p>Como experta en Psicotrading de TradeVision Latam, he observado una de las trampas psicológicas más costosas que sabotea a los <em>traders</em> (tanto novatos como experimentados): el <strong>Sesgo de Anclaje</strong> (Anchoring Bias).</p>
            <p>El anclaje es un sesgo cognitivo que ocurre cuando le das demasiado peso a la <strong>primera pieza de información</strong> que recibes (el "ancla"), usándola como el punto de referencia principal para todas tus decisiones futuras, incluso si esa información se vuelve irrelevante o es incorrecta.</p>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">El Anclaje en el Trading: "Esperar a que Vuelva al Precio"</h2>
            <p>El ejemplo más claro en <em>trading</em> es el <strong>precio de compra</strong>. Un <em>trader</em> compra una acción o un par de divisas (EUR/USD) a $100. El mercado se mueve en su contra y el precio cae a $80.</p>
            <p>En lugar de re-analizar la nueva estructura del mercado (que quizás indica una clara tendencia bajista), el <em>trader</em> se "ancla" al precio de $100. Su nueva meta ya no es "gestionar la operación", sino "esperar a que vuelva a $100 para salir sin perder" (breakeven).</p>
            <p>Esto es un desastre. Estás tomando una decisión financiera futura basada en una <strong>emoción pasada</strong> (el orgullo de tu precio de entrada), en lugar de un <strong>análisis objetivo del presente</strong>. Estás operando con <strong>esperanza</strong>, no con <strong>disciplina</strong>.</p>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Las Causas de este Sesgo (La Indisciplina)</h2>
            <p>En nuestra academia, identificamos tres causas principales de este sesgo, todas ligadas a la falta de un sistema profesional:</p>
            <ol class="list-decimal list-inside space-y-3 pl-4">
            <li><strong>Apego Emocional (El Ego):</strong> El "ancla" de tu precio de entrada se convierte en parte de tu ego. Aceptar la pérdida (vender a $80) se siente como admitir que estabas equivocado. El <em>trader</em> indisciplinado prefiere perder más dinero que aceptar un golpe a su ego.</li>
            <li><strong>Sesgo de Confirmación:</strong> Una vez anclado a los $100, buscas activamente noticias, videos de YouTube o indicadores (ignorando 10 señales contrarias) que confirmen tu creencia original (que $100 era un buen precio).</li>
            <li><strong>Falta de Metodología (Pobre Investigación):</strong> Si entraste a una operación basándote en la opinión de un "gurú" de TikTok o una estimación promedio, tu "ancla" no tiene fundamentos reales. En TradeVision, combatimos esto con análisis riguroso de la <a href="#/methodology" class="text-brand-accent hover:underline">Lógica Institucional (SMC)</a> y el Lenguaje del Precio.</li>
            </ol>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Cómo Combatir el Anclaje (El Método TradeVision)</h2>
            <p>No puedes eliminar el sesgo de anclaje (es humano), pero puedes construir un sistema que lo neutralice. Esto es lo que enseñamos en nuestro <a href="#/methodology" class="text-brand-accent hover:underline">Ecosistema de Ejecución Profesional</a>.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">1. Tu Plan de Trading es tu ÚNICA Ancla</h3>
            <p>Esta es la herramienta de disciplina más importante. Tu <a href="#/blog/plan-de-trading" class="text-brand-accent hover:underline">Plan de Trading</a> (tu bitácora) define tus reglas de entrada, gestión y, crucialmente, <strong>salida (Stop Loss)</strong>. Si el precio toca tu Stop Loss, la operación se cierra. No hay negociación. No hay esperanza. La disciplina elimina la emoción.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">2. Enfócate en la Estructura, no en el Precio de Entrada</h3>
            <p>El <em>trader</em> profesional (como nuestro Asesor Principal, <strong>José Quintana</strong>) no se preocupa por el precio al que entró; se preocupa por si la <strong>estructura del mercado</strong> que justificó su entrada sigue siendo válida. Si la estructura se rompe, la operación se cierra, sin importar si vas ganando o perdiendo.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">3. Actualiza tu Análisis (Evita Información Obsoleta)</h3>
            <p>El mercado cambia constantemente. La información que usaste para comprar a $100 ya es obsoleta. Debes re-analizar el gráfico en tiempo real. Aferrarte a información pasada es la definición de anclaje. Mantente al día con las noticias y el análisis fundamental.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">4. Consulta Múltiples Perspectivas (Mentores)</h3>
            <p>En TradeVision, fomentamos un <a href="#/acerca-de" class="text-brand-accent hover:underline">equipo global</a>. Escucha el análisis técnico de José Quintana, la perspectiva económica de <strong>Javier Solís</strong> (CEO) y la visión operativa de <strong>Lucas Almeida</strong> (Subdirector). Evita anclarte a una sola opinión (especialmente la tuya si estás perdiendo).</p>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Conclusión</h2>
            <p>El anclaje es una falla en la <strong>gestión psicológica</strong>. Te hace basar tus decisiones en el pasado (tu precio de entrada) y en la emoción (tu ego). El <em>trading</em> profesional se basa en analizar el presente con objetividad para capitalizar el futuro.</p>
            <p>En <a href="https://t.me/tradevision90" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">nuestra comunidad</a>, no solo entrenamos tus ojos para ver el gráfico; entrenamos tu mente para ver la realidad.</p>
        `
    },
    {
        id: 15,
        slug: "como-practicar-la-disciplina-en-el-trading",
        title: "Disciplina en el Trading: El Puente entre tu Estrategia y tu Rentabilidad",
        excerpt: "La disciplina es la base del éxito. Amara Srisuk, nuestra experta en Psicotrading, desglosa por qué la falta de disciplina (operar en exceso, operaciones descuidadas) destruye cuentas y cómo construirla.",
        imageUrl: "https://picsum.photos/400/250?random=25",
        author: "Amara Srisuk",
        date: "11 Noviembre, 2025",
        category: "Psicotrading",
        content: `
            <p>Como experta en Psicotrading de TradeVision Latam, he visto a innumerables <em>traders</em> fracasar a pesar de tener estrategias brillantes. ¿La razón? El éxito no depende solo de tu conocimiento técnico, sino de tu <strong>estabilidad psicológica</strong>. Y el pilar de esa estabilidad es la <strong>disciplina</strong>.</p>
            <p>La disciplina es la base de tu éxito. Es la capacidad de repetir deliberadamente las acciones correctas para lograr un resultado, incluso (y especialmente) cuando son desagradables o van en contra de tus impulsos emocionales.</p>
            <blockquote class="border-l-4 border-brand-accent pl-4 italic text-gray-600 dark:text-gray-400 my-4">
            "La disciplina es, en primer lugar, seguir los principios de tu propia estrategia de <em>trading</em> y tu gestión de riesgos." - Amara Srisuk
            </blockquote>
            <p>Cuando el mercado se vuelve volátil, la tentación de tomar decisiones precipitadas (impulsadas por el miedo o la avaricia) es inmensa. La disciplina es la fuerza que te permite contener esos impulsos y <strong>seguir el plan predeterminado</strong>.</p>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">¿Por Qué es Vital la Disciplina en TradeVision?</h2>
            <ol class="list-decimal list-inside space-y-2 pl-4">
            <li><strong>En la Formación:</strong> La pereza o la prisa en aprender la base teórica (como nuestra metodología de <a href="#/methodology" class="text-brand-accent hover:underline">Lógica Institucional</a>) tendrá consecuencias nefastas en tu cuenta real.</li>
            <li><strong>En la Ejecución:</strong> Una vez que tienes tu estrategia (basada en el Lenguaje del Precio o SMC), la disciplina te ayuda a <strong>no desviarte del camino</strong> y a no caer en la tentación de buscar "bots milagrosos".</li>
            <li><strong>En la Mejora Continua:</strong> Solo un enfoque disciplinado para analizar tus fracasos y éxitos (usando tu <a href="#/blog/plan-de-trading" class="text-brand-accent hover:underline">Bitácora o Plan de Trading</a>) te llevará al éxito sostenible.</li>
            </ol>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">La Anatomía del Fracaso: ¿A qué conduce la Falta de Disciplina?</h2>
            <p>La falta de disciplina permite que las emociones (miedo y avaricia) tomen el control. Esto conduce a tres errores capitales que destruyen cuentas:</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">1. Operar en Exceso (Over-trading)</h3>
            <p>Este es el error más común. Realizas demasiadas operaciones que <strong>no forman parte de tu plan de <em>trading</em></strong> o que superan tu gestión de riesgo (ej. arriesgar más del 1-2%). La razón es simple: te desvías de tu estrategia por impaciencia.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">2. Operaciones Descuidadas (Apostar)</h3>
            <p>Cada operación debe basarse en un <strong>análisis riguroso</strong> (Lógica del Precio, SMC, contexto). Cuando sucumbes a la tentación de un "deseo momentáneo" o una corazonada, dejas de hacer <em>trading</em> y empiezas a <strong>apostar</strong>. Y en el largo plazo, el apostador siempre pierde.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">3. Momento Incorrecto (Avaricia)</h3>
            <p>Ves un movimiento fuerte en el gráfico (una "vela obvia") y te apresuras a entrar, aunque no cumpla con tus reglas, por miedo a "perderte la oportunidad" (FOMO). La avaricia rara vez termina bien. Debes confiar en tu análisis racional y tener paciencia.</p>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Cómo Desarrollar la Disciplina (El Método TradeVision)</h2>
            <p>Mejorar el autocontrol requiere un sistema de reglas. Aquí están los consejos clave que inculcamos en nuestra comunidad:</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">1. Ten un Plan de Trading y Úsalo</h3>
            <p>Tu <a href="#/blog/plan-de-trading" class="text-brand-accent hover:underline">Plan de Trading</a> es tu GPS. Es <strong>estrictamente individual</strong> y debe definir tus objetivos, tu riesgo máximo por operación (1-2%) y tus criterios exactos de entrada y salida. Un plan solo es efectivo si lo sigues <strong>exactamente</strong>, especialmente cuando es difícil hacerlo.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">2. Desvincúlate de la Mayoría (Piensa como Institución)</h3>
            <p>Si todos hacen una operación y parece "obvio", probablemente ya sea demasiado tarde. Como enseña <strong>José Quintana</strong>, la mayoría de los <em>traders</em> minoristas <strong>son la liquidez</strong> para el mercado. Si todos se apresuran a una oportunidad obvia, el "dinero inteligente" usará esa liquidez para mover el mercado en su contra. Piensa por tu cuenta y sigue tu plan.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">3. Mantente Atento a las Advertencias (No a la Esperanza)</h3>
            <p>Nunca ignores las señales (técnicas o de tu plan) que apuntan a pérdidas inminentes a favor de una "esperanza fantasma". El mercado no sabe cuánto deseas ganar. Si tu <em>Stop Loss</em> es tocado, la operación terminó. Acéptalo.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">4. Evita los Gurús del Mercado y el Ruido</h3>
            <p>Cualquiera que te prometa "ganancias garantizadas" o "scripts milagrosos" te está usando para aumentar sus propias ganancias. En TradeVision, **prohibimos el lenguaje de "hágase millonario"**. No confíes en grandes palabras; confía en tu <em>backtesting</em> y en tu plan.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">5. No Intentes Recuperar Pérdidas (Trading por Venganza)</h3>
            <p>Las operaciones perdedoras son inevitables; son el costo de hacer negocios. Si fallaste, **no intentes "vengarte" del mercado** duplicando tu riesgo o tomando operaciones impulsivas. Mantén la cabeza fría, acepta la pérdida (que debe ser pequeña, gracias a tu plan) y espera la próxima señal válida.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">6. Usa tus Herramientas con Inteligencia (Bots y Plataformas)</h3>
            <p>Plataformas como <a href="https://app.ctrader.com/?u=quintanacuevas90" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">cTrader</a> o <a href="https://es.tradingview.com/pricing/?share_your_love=quintanacuevas90" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">TradingView</a> ofrecen herramientas increíbles. Los <strong>Bots y Scripts</strong> son asistentes poderosos. Pero no puedes confiar ciegamente en máquinas. Eres responsable de tus decisiones; el <em>software</em> solo ejecuta tus órdenes. En TradeVision, te enseñamos a usar *bots* para **automatizar tu disciplina**, no para reemplazarla.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">7. Renuncia a la Mentalidad de Salario</h3>
            <p>El <em>trading</em> no te da un sueldo fijo cada viernes. Tu presupuesto anual dependerá de unos pocos días o semanas de alta rentabilidad. Debes tener la disciplina para esperar pacientemente esas oportunidades y no forzar operaciones cuando el mercado no ofrece nada.</p>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Resumen</h2>
            <p>El camino de un <em>trader</em> profesional es difícil. La paciencia y la disciplina en el <em>trading</em> son las únicas herramientas que te permitirán ejecutar tu estrategia sin sucumbir a decisiones emocionales impulsivas. En <a href="https://t.me/tradevision90" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">nuestra comunidad</a>, no solo fortalecemos tu estrategia, fortalecemos tu mente.</p>
        `
    },
    {
        id: 14,
        slug: "psicotrading-condiciones-mercado-rentabilidad",
        title: "Psicotrading: Cómo las Condiciones del Mercado Afectan tu Mente (Y tu Rentabilidad)",
        excerpt: "La volatilidad y los mercados laterales prueban tu mente, no solo tu estrategia. Amara Srisuk, nuestra experta en Psicotrading, explica cómo dominar tu psicología.",
        imageUrl: "https://picsum.photos/400/250?random=24",
        author: "Amara Srisuk",
        date: "11 Noviembre, 2025",
        category: "Psicotrading",
        content: `
            <p>Como Asesora y experta en Psicotrading en TradeVision Latam, he dedicado mi carrera a una verdad fundamental: la mayoría de los <em>traders</em> no fracasan por una mala estrategia, fracasan por una mala <strong>psicología</strong>.</p>
            <p>El mercado tiene dos estados principales: <strong>Volatilidad (Tendencia)</strong> y <strong>Consolidación (Rango)</strong>. Estos no son solo desafíos técnicos; son potentes disparadores emocionales. El mercado no es tu enemigo; tu reacción impulsiva a él sí lo es.</p>
            <p>Entender cómo reaccionas al caos de un mercado volátil o al aburrimiento de un mercado lateral es el primer paso para alcanzar la disciplina profesional.</p>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">El Plan de Trading: Tu Ancla Psicológica</h2>
            <p>Antes de analizar el mercado, debes tener un <strong>Plan de Trading</strong>. Este es el documento de disciplina (un pilar en nuestra <a href="#/methodology" class="text-brand-accent hover:underline">metodología en TradeVision</a>) que define tus reglas exactas de entrada, salida y gestión de riesgo. Sin un plan, estás operando con emociones, y las emociones te costarán tu cuenta.</p>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Psicología del Mercado en Tendencia (Volatilidad Alta)</h2>
            <p>Un mercado en tendencia o volátil (causado por noticias o tensiones geopolíticas) es donde la <strong>Avaricia</strong> y el <strong>Miedo</strong> toman el control.</p>
            <ul class="list-disc list-inside space-y-2 pl-4 mb-4">
                <li><strong>Avaricia (FOMO):</strong> Ves que el precio sube rápidamente y entras tarde por "miedo a perdértelo" (FOMO), usualmente comprando en el punto más caro.</li>
                <li><strong>Miedo (Pánico):</strong> El precio cae bruscamente, entras en pánico y vendes en el fondo, justo antes del rebote.</li>
            </ul>
            <p><strong>La Disciplina de TradeVision:</strong> En nuestros <a href="#/premium-courses" class="text-brand-accent hover:underline">Cursos Premium</a>, integramos mi enfoque de Psicotrading con la <strong>Lógica Institucional (SMC)</strong> que enseña José Quintana. La volatilidad es solo ruido si no entiendes la <strong>liquidez</strong>. Un <em>trader</em> disciplinado usa la volatilidad para confirmar su análisis (como el patrón AMD) y protege sus ganancias con <em>trailing stops</em>, no con esperanza.</p>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Psicología del Mercado en Rango (Consolidación)</h2>
            <p>Este es el asesino silencioso. Un mercado lateral (en rango) no produce miedo, produce <strong>Aburrimiento</strong> e <strong>Impaciencia</strong>.</p>
            <ul class="list-disc list-inside space-y-2 pl-4 mb-4">
                <li><strong>Sobre-operar (Over-trading):</strong> Empiezas a "ver" señales donde no existen y tomas operaciones de baja probabilidad solo "para hacer algo".</li>
                <li><strong>Impaciencia:</strong> Abandonas tu plan porque "no está funcionando" y buscas un nuevo "script milagroso".</li>
            </ul>
            <p><strong>La Disciplina de TradeVision:</strong> Un mercado lateral no es una "pausa"; es <strong>Acumulación</strong>. Como enseña nuestro CEO, Javier Solís, aquí es donde las instituciones preparan sus movimientos. La paciencia es tu arma. Si tu plan no te da una entrada, no operas. Punto. Usamos este tiempo para el <em>backtesting</em> y la revisión de la bitácora, no para forzar operaciones.</p>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Tu Ecosistema Afecta tu Psicología (Brokers y Herramientas)</h2>
            <p>Tu mentalidad también es afectada por las herramientas que usas. Un <em>broker</em> poco fiable o un apalancamiento excesivo aumentan el estrés y la ansiedad.</p>
            <p>En TradeVision Latam, promovemos la <strong>transparencia total</strong>:</p>
            <ol class="list-decimal list-inside space-y-3 pl-4">
                <li><strong>Brokers Regulados (Profesionalismo):</strong> Para operar Forex seriamente, recomendamos <em>brokers</em> regulados internacionalmente (como <a href="https://fusionmarkets.com/?refcode=102866" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Fusion Markets</a>), que ofrecen transparencia y seguridad de fondos.</li>
                <li><strong>Brokers No Regulados (Educación):</strong> Entendemos el atractivo de las Opciones Binarias, pero insistimos en su uso <strong>solo con fines educativos</strong>. Plataformas como <a href="https://exnova.org/es/?aff=753088&afftrack=PaginaWeb&aff_model=revenue" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Exnova</a> o <a href="https://affiliate.iqoption.net/redir/?aff=753088&aff_model=revenue&afftrack=PaginaWeb" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">IQ Option</a> son excelentes para practicar en sus <strong>cuentas demo gratuitas</strong> de $10,000, pero debes entender su alto riesgo.</li>
                <li><strong>Wallets (Seguridad):</strong> Usar <em>wallets</em> confiables como <a href="https://acortar.link/A1THUU" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Binance</a> o <a href="https://account.volet.com:443/referral/20e63c7b-1cae-4243-be78-436b5cf9d338" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Volet</a> reduce el estrés de los depósitos y retiros.</li>
            </ol>
            <h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Conclusión: Domina tu Mente, Domina el Mercado</h2>
            <p>Las condiciones del mercado son solo el lienzo. Tu psicología es el pincel. Puedes prosperar en cualquier condición si dejas de reaccionar y empiezas a ejecutar un plan disciplinado. Tu rentabilidad no la define el mercado; la define tu mente.</p>
            
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">P: ¿Cuál es la mejor estrategia para mercados volátiles?</h3>
            <p>En mercados volátiles, la mejor estrategia es la <strong>defensa</strong>. Reduce tu tamaño de lote y tu apalancamiento. Enfócate en la confirmación de la <strong>Lógica Institucional (SMC)</strong> antes de entrar, y usa <em>trailing stops</em> para proteger tus ganancias sin avaricia.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">P: ¿Qué apalancamiento debo usar?</h3>
            <p>El apalancamiento es una herramienta, no un boleto de lotería. Un apalancamiento excesivo (como 1:1000) es innecesario y es la forma más rápida de quemar una cuenta. En TradeVision, enseñamos a usarlo responsablemente, priorizando la gestión de riesgo sobre la ganancia potencial.</p>
            <h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">P: ¿Qué papel real juega la psicología en el trading?</h3>
            <p>Es el 80% del juego. Puedes tener el mejor sistema del mundo (como el nuestro), pero si no puedes controlar tu miedo o tu avaricia, sabotearás tus propias operaciones. Por eso el <strong>Psicotrading</strong> es un pilar central en todos nuestros <a href="#/premium-courses" class="text-brand-accent hover:underline">Cursos Premium</a> y en nuestra <a href="https://t.me/tradevision90" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Comunidad de Telegram</a>.</p>
        `
    },
    {
        id: 13,
        slug: "opciones-binarias-riesgo-real-analisis",
        title: "El Riesgo Real de las Opciones Binarias: Una Mirada Profesional",
        excerpt: "Nuestro Asesor Principal, José Quintana, desglosa los riesgos, las desventajas y por qué la disciplina es crucial antes de operar.",
        imageUrl: "https://picsum.photos/400/250?random=23",
        author: "José Quintana",
        date: "11 Noviembre, 2024",
        category: "Mercados",
        content: `
<p>Como Asesor Principal de TradeVision Latam, mi misión es ser directo: el <em>trading</em> de opciones binarias es un instrumento financiero de riesgo extremadamente alto. A menudo se comercializa por su simplicidad (predecir si un activo subirá o bajará en un tiempo determinado), pero esa simplicidad es precisamente su mayor peligro.</p>

<p>Si la predicción es correcta (<em>"in-the-money"</em>), el <em>trader</em> recibe un pago fijo. Si es incorrecto (<em>"out-of-money"</em>), pierde la inversión inicial. Aunque el potencial de ganancias rápidas es real, la naturaleza de este instrumento está estadísticamente sesgada a favor del corredor .</p>

<p>En muchas jurisdicciones, se considera una forma de apuesta, y en TradeVision Latam estamos claros: <strong>no recomendamos el uso de opciones binarias para construir riqueza a largo plazo.</strong></p>

<blockquote class="border-l-4 border-brand-accent pl-4 italic text-gray-600 dark:text-gray-400 my-4"> "En nuestra academia, promovemos el uso de brokers de binarias (como <a href="https://exnova.org/es/?aff=753088&afftrack=PaginaWeb&aff_model=revenue" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Exnova</a> o <a href="https://affiliate.iqoption.net/redir/?aff=753088&aff_model=revenue&afftrack=PaginaWeb" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">IQ Option</a>) con un propósito principal: usar sus cuentas demo gratuitas para practicar la disciplina y probar estrategias sin arriesgar capital real." -José Quintana</blockquote>

<h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Cómo Funcionan (La Mecánica)</h2>

<p>El término "binario" se refiere a los dos resultados: ganar o perder. Si crees que el precio subirá, elige una opción "Call" (Compra) . Si crees que bajará, seleccionas "Put" (Venta) . Cada operación tiene un vencimiento (desde 60 segundos hasta horas) y un pago fijo, normalmente entre 60% y 90%.</p>

<h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">Ejemplos de Operativa (No Recomendaciones)</h3> <ul class="list-disc list-inside space-y-2 pl-4 mb-4"> <li><strong>Divisas:</strong> Un <em>trader</em> piensa que el par EUR/USD caerá por debajo de 1.1200 en los próximos 5 minutos y compra una opción "Put".</li> <li><strong>Acciones:</strong> Un <em>trader</em> cree que el índice S&P 500 (US500) terminará por encima de 4500 al cierre de la hora y selecciona una opción "Call".</li> <li><strong>Commodities:</strong> Un <em>trader</em> espera que el precio del Oro (XAU/USD) suba por encima de $1800 en la próxima hora y compra una opción "Llamar".</li> </ul>

<h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Ventajas Reales vs. Peligros Ocultos (La Voz de la Marca)</h2>

<p>Es fácil ver por qué atraerán a los principiantes. La "simplicidad", el "riesgo fijo" y la "accesibilidad" (depósitos mínimos de $10) son ganchos de marketing muy efectivos. Sin embargo, como tu Asesor Principal, mi deber es enfocarme en los peligros que nuestra comunidad debe evitar.</p>

<h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">Los Peligros Reales (Por Qué Fallan los Traders)</h3> <ul class="list-disc list-inside space-y-2 pl-4 mb-4"> <li><strong>Falta de Regulación (El Mayor Riesgo):</strong> La mayoría de estos brokers (Exnova, Quotex, etc.) no están regulados por entidades financieras internacionales. Operan en jurisdicciones offshore . Esto crea un conflicto de interés (operas contra el broker ) y presenta dificultades reales al retirar fondos, como hemos documentado en nuestras <a href="#/faq" class="text-brand-accent hover:underline">Preguntas Frecuentes</a>.</li> <li><strong>Tiempos de Expiración Cortos:</strong> Operar a 60 segundos o 5 minutos no es trading , es jugar al azar . Fomenta decisiones impulsivas y el "trading por venganza" (<em>revenge trading</em>), destruyendo la disciplina.</li> <li><strong>Presión Psicológica (El Enemigo Interno):</strong> La naturaleza de "todo o nada" genera picos extremos de estrés, miedo y avaricia. Esto lleva a malas decisiones. En TradeVision, nuestra experta en Psicotrading, Amara Srisuk , se enfoca en ayudarte a dominar este aspecto.</li> <li><strong>Marketing Engañoso:</strong> La industria está plagada de promesas de "hágase millonario" y "bots milagrosos". En TradeVision, PROHIBIMOS este lenguaje. El éxito requiere trabajo y un sistema.</li> <li><strong>Adicción:</strong> La emoción de las ganancias rápidas puede generar comportamientos adictivos, llevando a pérdidas financieras significativas.</li> </ul>

<h2 class="text-2xl font-bold text-primary-dark dark:text-white mt-6 mb-3">Cómo convertirse en un Trader (El Método TradeVision)</h2>

<p>Si quieres empezar, debes hacerlo con disciplina profesional .</p>

<ol class="list-decimal list-inside space-y-3 pl-4"> <li><strong>Edúcate (La Base):</strong> Antes de arriesgar un dólar, debes entender el Lenguaje del Precio . Nuestro <a href="#/premium-courses" class="text-brand-accent hover:underline">Curso Intermedio de Binarias ($79)</a> se enfoca en 4 fórmulas de operación, Backtesting y Gestión de Riesgo, eliminando la improvisación.</li> <li><strong>Elija una herramienta (No un Casino):</strong> Selecciona un broker (como <a href="https://broker-qx.pro/sign-up/fast/?lid=1544796" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Quotex</a> o <a href="https://exnova.org/es/?aff=753088&afftrack=PaginaWeb&aff_model=revenue" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Exnova</a>) y utiliza la cuenta demo hasta que sea rentable en ella.</li> <li><strong>Desarrolla una Estrategia Real (No Azar):</strong> Las estrategias que enseñamos en TradeVision (como el Patrón AMD o la Lógica Institucional de nuestro <a href="#/premium-courses" class="text-brand-accent hover:underline">Curso de Forex ($349)</a>) se basan en análisis, no en suerte. Olvida la Martingala si quieres ser profesional.</li> <li><strong>Opera Responsablemente (Gestión de Riesgo):</strong> Define tu plan. Arriesga solo el 1-2% de tu capital por operación. Si buscas profesionalizarte, te recomendamos migrar a brokers regulados como <a href="https://fusionmarkets.com/?refcode=102866" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Fusion Markets</a>.</li> <li><strong>Únete a la Comunidad:</strong> No opera solo. Únete a nuestra <a href="https://t.me/tradevision90" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">Comunidad de Telegram</a> para obtener soporte y mantener la disciplina.</li> </ol>

<h3 class="text-xl font-bold text-primary-dark dark:text-white mt-4 mb-2">Consejos Finales del Asesor</h3>

<p>Como principio, tu enfoque debe ser aprender a no perder dinero , no a ganarlo. Céntrate en activos principales (como el EUR/USD) y aprende a seguir un plan. Limita tu tamaño de operación y, sobre todo, mantén tus emociones fuera de la ecuación .</p> <p>El trading es una profesión de disciplina. Si lo tratas como un juego, el resultado será el de un casino: la casa (el broker ) siempre gana.</p>
`
    },
    {
        id: 1,
        slug: "la-psicologia-del-trader-exitoso",
        title: "La Psicología del Trader Exitoso",
        excerpt: "Más allá de las gráficas, la mentalidad lo es todo. Descubre los pilares psicológicos que separan a los ganadores...",
        imageUrl: "https://picsum.photos/400/250?random=10",
        author: "José Quintana",
        date: "24 Julio, 2024",
        category: "Psicotrading",
        content: `
            <h2>La Batalla Interna: El Verdadero Campo de Juego del Trading</h2>
            <p>Muchos principiantes creen que el trading es un juego de encontrar el indicador mágico o la estrategia infalible. La realidad, sin embargo, es que el <strong>éxito sostenido en los mercados financieros se libra y se gana en el campo de batalla de la mente</strong>.</p>
            <p>La psicología del trading no es un concepto esotérico; es el conjunto de principios, disciplinas y hábitos mentales que te permiten ejecutar tu plan de manera consistente, incluso cuando enfrentas miedo, codicia o incertidumbre.</p>
            <h3>Los Tres Pilares de una Mentalidad Ganadora</h3>
            <ol>
                <li><strong>Disciplina Férrea:</strong> La capacidad de seguir tus reglas, incluso cuando tus emociones te gritan que hagas lo contrario. Esto significa respetar tu stop-loss, no sobreoperar por aburrimiento y tomar solo las operaciones que cumplen con los criterios de tu plan.</li>
                <li><strong>Paciencia de Cazador:</strong> El mercado no ofrece oportunidades de alta probabilidad a cada minuto. Un trader exitoso sabe esperar, como un francotirador, el momento preciso para actuar. La impaciencia es la principal causa de operaciones forzadas y pérdidas innecesarias.</li>
                <li><strong>Resiliencia Emocional:</strong> Las pérdidas son inevitables. Son el costo de hacer negocios en el trading. La diferencia entre un profesional y un aficionado es cómo reaccionan ante ellas. Un profesional analiza la pérdida, aprende y sigue adelante. Un aficionado se deja llevar por la frustración y entra en un ciclo de "trading de venganza".</li>
            </ol>
            <p>Desarrollar estos pilares no es fácil. Requiere autoconciencia, práctica deliberada y, sobre todo, un compromiso inquebrantable con tu crecimiento personal. Tu rentabilidad será un reflejo directo de tu fortaleza mental.</p>
        `
    },
    {
        id: 2,
        slug: "gestion-de-riesgo-tu-escudo-en-el-mercado",
        title: "Gestión de Riesgo: Tu Escudo en el Mercado",
        excerpt: "La primera regla del trading no es ganar, es no perder. Aprende a calcular el tamaño de tu posición y a usar stop-loss...",
        imageUrl: "https://picsum.photos/400/250?random=11",
        author: "José Quintana",
        date: "15 Julio, 2024",
        category: "Gestión de Riesgo",
        content: `
            <h2>Sobrevivir para Operar Otro Día</h2>
            <p>Imagina que eres un gladiador en el coliseo. Tu objetivo principal no es derrotar a todos los oponentes en un solo día, sino sobrevivir para luchar en la siguiente batalla. En el trading, tu capital es tu vida. La <strong>gestión de riesgo es tu escudo</strong>.</p>
            <p>Sin una gestión de riesgo adecuada, la mejor estrategia del mundo te llevará a la ruina. Es una certeza matemática. La gestión de riesgo te asegura que ninguna operación individual, ni siquiera una racha de pérdidas, pueda sacarte del juego.</p>
            <h3>Conceptos Fundamentales de la Gestión de Riesgo</h3>
            <ul>
                <li><strong>La Regla del 1-2%:</strong> Nunca arriesgues más del 1% o 2% de tu capital total en una sola operación. Si tienes una cuenta de $1,000, tu riesgo máximo por operación debería ser de $10 a $20. Esto te permite soportar múltiples pérdidas consecutivas sin destruir tu cuenta.</li>
                <li><strong>El Stop-Loss no es Opcional:</strong> El stop-loss es tu orden de retirada predefinida. Es el punto en el que admites que tu análisis fue incorrecto y sales de la operación para proteger tu capital. Operar sin stop-loss es como conducir un coche de carreras sin frenos.</li>
                <li><strong>Ratio Riesgo/Beneficio (R:R):</strong> Busca operaciones donde la ganancia potencial sea significativamente mayor que la pérdida potencial. Un ratio R:R mínimo saludable es de 1:2, lo que significa que arriesgas $1 para ganar $2. Esto te permite ser rentable incluso si ganas menos del 50% de tus operaciones.</li>
            </ul>
            <p>La gestión de riesgo no es emocionante. No te dará la adrenalina de una gran ganancia. Pero te dará algo mucho más valioso: <strong>longevidad en el mercado</strong>.</p>
        `
    },
    {
        id: 3,
        slug: "analisis-tecnico-vs-fundamental",
        title: "Análisis Técnico vs. Fundamental: ¿Cuál Usar?",
        excerpt: "Desmitificamos las dos grandes escuelas de análisis. Entiende sus diferencias, fortalezas y cómo combinarlas...",
        imageUrl: "https://picsum.photos/400/250?random=12",
        author: "José Quintana",
        date: "05 Julio, 2024",
        category: "Análisis de Mercado",
        content: `<h2>El Eterno Debate del Mercado</h2><p>En el mundo del trading, existen dos enfoques principales para analizar los activos financieros: el análisis técnico y el análisis fundamental. Aunque a menudo se presentan como opuestos, ambos buscan el mismo objetivo: predecir la dirección futura del precio. Comprender ambos puede darte una visión mucho más completa del mercado.</p><h3>Análisis Técnico: El Estudio del Precio</h3><p>El análisis técnico se centra en el estudio de los gráficos de precios y los datos históricos del mercado. Se basa en tres premisas clave:</p><ol><li><strong>El mercado lo descuenta todo:</strong> Toda la información relevante (noticias, datos económicos, etc.) ya está reflejada en el precio.</li><li><strong>Los precios se mueven en tendencias:</strong> Los precios no se mueven de forma aleatoria, sino que siguen tendencias que pueden ser identificadas.</li><li><strong>La historia se repite:</strong> Los patrones de precios que ocurrieron en el pasado tienden a repetirse en el futuro.</li></ol><p>Los analistas técnicos utilizan herramientas como líneas de tendencia, soportes y resistencias, patrones de velas y una amplia variedad de indicadores (RSI, MACD, Medias Móviles) para tomar sus decisiones.</p><h3>Análisis Fundamental: El Valor Intrínseco</h3><p>El análisis fundamental, por otro lado, se enfoca en evaluar el valor "real" o intrínseco de un activo. Para ello, examina factores económicos, financieros y cualitativos. En el mercado de divisas (Forex), esto incluye:</p><ul><li><strong>Datos Macroeconómicos:</strong> Tasas de interés, inflación, crecimiento del PIB, cifras de empleo.</li><li><strong>Políticas Monetarias:</strong> Decisiones y discursos de los bancos centrales (como la FED o el BCE).</li><li><strong>Eventos Geopolíticos:</strong> Elecciones, conflictos, acuerdos comerciales.</li></ul><p>El objetivo del analista fundamental es determinar si una moneda está sobrevalorada o infravalorada en relación con su economía.</p><h3>¿Cuál es Mejor? La Respuesta es... Ambos</h3><p>En lugar de verlos como enfoques excluyentes, los traders más completos suelen utilizar una combinación de ambos. El análisis fundamental puede ayudarte a entender "por qué" se mueve el mercado (el contexto macroeconómico), mientras que el análisis técnico puede ayudarte a determinar "cuándo" entrar y salir de una operación (el timing preciso).</p><p>Por ejemplo, un trader puede usar el análisis fundamental para decidir que el dólar estadounidense se fortalecerá a largo plazo, y luego usar el análisis técnico para encontrar puntos de entrada de baja riesgo en un gráfico diario o de 4 horas.</p>`
    },
    {
        id: 4,
        slug: "los-5-indicadores-tecnicos-que-debes-conocer",
        title: "Los 5 Indicadores Técnicos que Debes Conocer",
        excerpt: "Desde el RSI hasta las Medias Móviles, te explicamos los indicadores que no pueden faltar en tu arsenal de análisis técnico...",
        imageUrl: "https://picsum.photos/400/250?random=13",
        author: "Equipo TradeVision",
        date: "28 Junio, 2024",
        category: "Análisis Técnico",
        content: `<h2>Herramientas, no Oráculos</h2><p>Los indicadores técnicos son cálculos matemáticos basados en el precio, el volumen o el interés abierto de un activo. No predicen el futuro, pero pueden ayudarte a identificar tendencias, medir el impulso y detectar posibles puntos de reversión. Es crucial no sobrecargar tus gráficos. Unos pocos indicadores bien entendidos son más efectivos que una docena que solo crean confusión.</p><h3>1. Medias Móviles (MA)</h3><p>Las Medias Móviles suavizan la acción del precio para identificar la dirección de la tendencia. Las más comunes son la Media Móvil Simple (SMA) y la Media Móvil Exponencial (EMA), que da más peso a los precios recientes.</p><ul><li><strong>Uso:</strong> Identificar tendencias (precio por encima de la MA = tendencia alcista), encontrar soportes y resistencias dinámicos, y generar señales de cruce (ej. cruce dorado).</li></ul><h3>2. Índice de Fuerza Relativa (RSI)</h3><p>El RSI es un oscilador de impulso que mide la velocidad y el cambio de los movimientos de precios. Se mueve entre 0 y 100.</p><ul><li><strong>Uso:</strong> Identificar condiciones de sobrecompra (generalmente por encima de 70) y sobreventa (generalmente por debajo de 30). También es muy útil para detectar divergencias, que pueden anticipar un cambio de tendencia.</li></ul><h3>3. MACD (Convergencia/Divergencia de Medias Móviles)</h3><p>El MACD es un indicador de seguimiento de tendencias que muestra la relación entre dos medias móviles exponenciales. Consiste en la línea MACD, la línea de señal y un histograma.</p><ul><li><strong>Uso:</strong> Los cruces de la línea MACD y la línea de señal pueden indicar cambios en la tendencia. El histograma muestra la fuerza del impulso. Al igual que el RSI, es excelente para encontrar divergencias.</li></ul><h3>4. Bandas de Bollinger</h3><p>Consisten en una media móvil (banda media) y dos desviaciones estándar por encima y por debajo de ella (bandas superior e inferior). Miden la volatilidad del mercado.</p><ul><li><strong>Uso:</strong> Las bandas se ensanchan en mercados volátiles y se contraen en mercados tranquilos. Los precios que tocan las bandas superior o inferior pueden indicar condiciones de sobrecompra/sobreventa relativas.</li></ul><h3>5. Retrocesos de Fibonacci</h3><p>Esta herramienta se basa en la secuencia de Fibonacci para identificar niveles potenciales de soporte y resistencia. Los niveles clave son 23.6%, 38.2%, 50%, 61.8% y 100%.</p><ul><li><strong>Uso:</strong> Después de un movimiento de precios significativo, los retrocesos a estos niveles de Fibonacci a menudo actúan como puntos donde el precio puede rebotar y continuar la tendencia principal.</li></ul>`
    },
    {
        id: 5,
        slug: "backtesting-como-validar-tu-estrategia",
        title: "Backtesting: Cómo Validar tu Estrategia de Trading",
        excerpt: "No operes a ciegas. El backtesting es crucial para ganar confianza en tu sistema. Te enseñamos a hacerlo correctamente...",
        imageUrl: "https://picsum.photos/400/250?random=14",
        author: "José Quintana",
        date: "20 Junio, 2024",
        category: "Estrategia de Trading",
        content: `<h2>Viajar al Pasado para Ganar en el Futuro</h2><p>El backtesting es el proceso de probar una estrategia de trading en datos históricos para ver cómo se habría desempeñado en el pasado. Es uno de los pasos más importantes en el desarrollo de un trader, ya que convierte una idea abstracta en un sistema con resultados medibles.</p><h3>¿Por Qué es Tan Importante el Backtesting?</h3><p>Realizar un backtesting riguroso te proporciona dos activos invaluables:</p><ol><li><strong>Datos Estadísticos:</strong> Te permite conocer las métricas clave de tu estrategia, como el porcentaje de aciertos (win rate), el ratio riesgo/beneficio promedio, el máximo drawdown (la mayor pérdida desde un pico) y la ganancia esperada por operación. Con estos datos, sabes si tu estrategia tiene una ventaja estadística ("edge") a largo plazo.</li><li><strong>Confianza Psicológica:</strong> Una vez que has visto tu estrategia funcionar cientos de veces en datos pasados, desarrollarás una confianza inquebrantable en ella. Esta confianza es lo que te permitirá ejecutar tus operaciones sin dudar, incluso durante una racha de pérdidas, porque sabes que estadísticamente, el sistema es rentable.</li></ol><h3>Cómo Realizar un Backtesting Efectivo</h3><ul><li><strong>Define Reglas Claras:</strong> Tu estrategia debe tener reglas de entrada, salida (tanto para ganancias como para pérdidas) y gestión de riesgo 100% objetivas. No debe haber lugar para la interpretación.</li><li><strong>Usa un Período de Tiempo Relevante:</strong> Prueba tu estrategia en una cantidad significativa de datos, que incluya diferentes condiciones de mercado (tendencias alcistas, bajistas, laterales).</li><li><strong>Sé Honesto:</strong> Registra todas las operaciones que cumplan con tus reglas, no solo las que se ven bien. Incluye comisiones y deslizamientos (slippage) para que los resultados sean más realistas.</li><li><strong>Analiza los Resultados:</strong> No te fijes solo en la ganancia total. Presta atención al drawdown y a las rachas de pérdidas. ¿Puedes soportar psicológicamente una racha de 10 operaciones perdedoras, incluso si sabes que la estrategia es rentable a largo plazo?</li></ul><p>El backtesting es un trabajo arduo, pero es la única manera de pasar de ser un jugador a ser un profesional que opera un negocio basado en probabilidades.</p>`
    },
    {
        id: 6,
        slug: "el-diario-de-trading-herramienta-poderosa",
        title: "El Diario de Trading: Tu Herramienta Más Poderosa",
        excerpt: "Registrar tus operaciones es el secreto para un crecimiento exponencial. Aprende qué anotar y cómo analizarlo para mejorar...",
        imageUrl: "https://picsum.photos/400/250?random=16",
        author: "Equipo TradeVision",
        date: "12 Junio, 2024",
        category: "Estrategia de Trading",
        content: `<h2>Tu Entrenador Personal</h2><p>Si quieres mejorar en cualquier disciplina, necesitas registrar tu rendimiento y analizarlo. Un atleta revisa sus partidos, un músico graba sus ensayos. Para un trader, esa herramienta de autoevaluación es el <strong>diario de trading</strong>.</p><p>Es mucho más que un simple registro de ganancias y pérdidas. Es un espejo que refleja tus hábitos, tus fortalezas, tus debilidades y tus patrones emocionales. Ignorarlo es renunciar a la forma más rápida de mejorar.</p><h3>¿Qué Debes Registrar en tu Diario?</h3><p>Un diario de trading efectivo debe incluir tanto datos objetivos como subjetivos para cada operación:</p><ul><li><strong>Datos Técnicos:</strong> Activo, fecha y hora, dirección (compra/venta), precio de entrada, precio de stop-loss, precio de take-profit, tamaño de la posición.</li><li><strong>Contexto del Mercado:</strong> ¿Por qué tomaste la operación? ¿Qué indicaba tu análisis técnico/fundamental? Adjunta una captura de pantalla del gráfico en el momento de la entrada.</li><li><strong>Ejecución y Gestión:</strong> ¿Seguiste tu plan al 100%? ¿Moviste tu stop-loss? ¿Cerraste antes de tiempo?</li><li><strong>Resultado:</strong> Ganancia o pérdida en dinero y en porcentaje de la cuenta.</li><li><strong>Estado Emocional (La Parte Clave):</strong> ¿Cómo te sentías antes, durante y después de la operación? ¿Ansioso, confiado, eufórico, frustrado? Sé brutalmente honesto contigo mismo.</li></ul><h3>El Poder del Análisis Semanal</h3><p>No basta con registrar los datos. Cada fin de semana, dedica tiempo a revisar tu diario. Busca patrones:</p><ul><li>¿Cuáles son tus errores más comunes? (ej. "Muevo mi stop-loss cuando la operación va en mi contra").</li><li>¿Qué tipo de configuraciones te dan mejores resultados?</li><li>¿En qué estado emocional tomas las peores decisiones?</li><li>¿Estás siguiendo realmente tu plan de trading?</li></ul><p>El diario de trading te convierte de un participante pasivo en un estudiante activo del mercado y, lo que es más importante, de ti mismo. Es la herramienta que te llevará de la inconsistencia a la maestría.</p>`
    },
    {
        id: 7,
        slug: "velas-japonesas-patrones-esenciales",
        title: "Velas Japonesas: 5 Patrones que Todo Trader Debe Dominar",
        excerpt: "Las velas japonesas cuentan una historia. Aprende a leer los patrones de continuación y reversión más importantes para anticipar movimientos.",
        imageUrl: "https://picsum.photos/400/250?random=17",
        author: "José Quintana",
        date: "05 Junio, 2024",
        category: "Análisis Técnico",
        content: `<h2>El Lenguaje Visual del Precio</h2><p>Las velas japonesas son más que simples barras de colores en un gráfico; son una representación visual de la batalla entre compradores y vendedores en un período de tiempo determinado. Aprender a leer sus patrones te da una visión instantánea de la psicología del mercado.</p><h3>Patrones de Reversión Alcista</h3><p>Estos patrones suelen aparecer al final de una tendencia bajista y pueden señalar un posible cambio de dirección al alza.</p><ul><li><strong>Martillo (Hammer):</strong> Una vela con un cuerpo pequeño en la parte superior y una mecha inferior larga (al menos el doble del cuerpo). Indica que los compradores entraron con fuerza para rechazar precios más bajos.</li><li><strong>Envolvente Alcista (Bullish Engulfing):</strong> Un patrón de dos velas donde la segunda vela (alcista) envuelve completamente el cuerpo de la primera vela (bajista). Muestra un fuerte cambio de impulso a favor de los compradores.</li></ul><h3>Patrones de Reversión Bajista</h3><p>Estos patrones suelen aparecer al final de una tendencia alcista y pueden indicar un posible cambio a la baja.</p><ul><li><strong>Estrella Fugaz (Shooting Star):</strong> Lo opuesto a un martillo. Cuerpo pequeño en la parte inferior con una mecha superior larga. Muestra que los vendedores rechazaron precios más altos.</li><li><strong>Envolvente Bajista (Bearish Engulfing):</strong> La segunda vela (bajista) envuelve completamente a la primera (alcista), señalando que los vendedores han tomado el control.</li></ul><h3>Patrón de Indecisión</h3><ul><li><strong>Doji:</strong> Una vela con un cuerpo extremadamente pequeño o inexistente, lo que significa que los precios de apertura y cierre fueron casi iguales. Representa indecisión en el mercado y puede preceder a un cambio de tendencia si aparece después de un movimiento fuerte.</li></ul><p>Recuerda, ningún patrón es 100% infalible. Siempre deben usarse en conjunto con otros elementos del análisis técnico, como niveles de soporte y resistencia, para aumentar su fiabilidad.</p>`
    },
    {
        id: 8,
        slug: "plan-de-trading",
        title: "El Plan de Trading: Tu Mapa Hacia la Rentabilidad",
        excerpt: "Operar sin un plan es como navegar sin brújula. Te enseñamos a construir tu propio plan de trading paso a paso, cubriendo todos los aspectos.",
        imageUrl: "https://picsum.photos/400/250?random=18",
        author: "Equipo TradeVision",
        date: "29 Mayo, 2024",
        category: "Estrategia de Trading",
        content: `<h2>El Documento Más Importante de tu Carrera</h2><p>Un plan de trading es un conjunto de reglas escritas que definen cada aspecto de tu operativa. Su propósito es simple pero vital: eliminar la toma de decisiones emocional y discrecional en el calor del momento. Es tu guía de negocios personal.</p><h3>Componentes Esenciales de un Plan de Trading</h3><p>Tu plan debe ser detallado y no dejar lugar a dudas. Debe incluir, como mínimo, lo siguiente:</p><ol><li><strong>Tu Porqué y Tus Metas:</strong> ¿Por qué haces trading? ¿Qué quieres lograr? (ej. "Generar un 5% de rendimiento mensual con un drawdown máximo del 10%").</li><li><strong>Activos y Horarios:</strong> ¿Qué pares de divisas o activos operarás? ¿En qué sesiones de mercado (Londres, Nueva York, etc.)?</li><li><strong>Estrategia(s) de Entrada:</strong> Define con precisión milimétrica las condiciones exactas que deben cumplirse para que entres en una operación. (ej. "Entrar en compra cuando el precio rompa y vuelva a probar el nivel de resistencia anterior, con una vela de confirmación alcista").</li><li><strong>Estrategia(s) de Salida:</strong> ¿Dónde colocarás tu stop-loss inicial? ¿Dónde tomarás ganancias? ¿Usarás un trailing stop?</li><li><strong>Gestión de Riesgo:</strong> ¿Cuánto arriesgarás por operación (ej. 1% del capital)? ¿Cuál es tu riesgo máximo diario/semanal?</li><li><strong>Rutina y Revisión:</strong> ¿Cuál es tu rutina antes, durante y después de operar? ¿Cuándo revisarás tu diario de trading?</li></ol><p>Escribe tu plan, imprímelo y tenlo visible en tu escritorio. Antes de cada operación, pregúntate: "¿Está esta operación en mi plan?". Si la respuesta es no, no la tomes. Así de simple. Tu plan es tu jefe, y tu trabajo es seguir sus órdenes sin cuestionarlas.</p>`
    },
    {
        id: 9,
        slug: "forex-vs-opciones-binarias",
        title: "Forex vs. Opciones Binarias: Diferencias Clave",
        excerpt: "Dos de los mercados más populares para traders minoristas. Entiende sus diferencias fundamentales en riesgo, beneficio y estructura.",
        imageUrl: "https://picsum.photos/400/250?random=19",
        author: "José Quintana",
        date: "22 Mayo, 2024",
        category: "Mercados",
        content: `<h2>Dos Caminos, Mismo Objetivo</h2><p>Forex y Opciones Binarias son dos formas populares de especular en los mercados financieros, pero funcionan de manera muy diferente. Es crucial entender estas diferencias para elegir el camino que mejor se adapte a tu perfil.</p><h3>Opciones Binarias: Simplicidad y Riesgo/Beneficio Fijo</h3><p>En las opciones binarias, predices si el precio de un activo estará por encima o por debajo de un precio específico en un tiempo de expiración determinado. El resultado es "binario": o ganas una cantidad fija (generalmente 70-95% de tu inversión) o pierdes toda tu inversión.</p><ul><li><strong>Ventajas:</strong> Simplicidad, riesgo limitado (no puedes perder más de lo que inviertes), resultados rápidos.</li><li><strong>Desventajas:</strong> El ratio riesgo/beneficio suele ser desfavorable (arriesgas 100 para ganar 85), la regulación es a menudo escasa y no eres dueño del activo subyacente.</li></ul><h3>Forex: Flexibilidad y Potencial Ilimitado</h3><p>En Forex, compras o vendes pares de divisas con el objetivo de que su valor cambie a tu favor. No hay un tiempo de expiración fijo; tú decides cuándo cerrar la operación. El beneficio o la pérdida depende de cuánto se mueva el precio y del tamaño de tu posición (apalancamiento).</p><ul><li><strong>Ventajas:</strong> Potencial de ganancias teóricamente ilimitado, ratios riesgo/beneficio favorables (puedes arriesgar $100 para ganar $300 o más), alta liquidez y regulación estricta (con brokers de confianza).</li><li><strong>Desventajas:</strong> Más complejo de aprender, el apalancamiento puede magnificar las pérdidas (puedes perder más que tu depósito inicial si no usas stop-loss), requiere más paciencia.</li></ul><h3>¿Cuál Elegir?</h3><p>Las <strong>Opciones Binarias</strong> pueden ser atractivas para principiantes por su simplicidad, pero requieren un porcentaje de aciertos muy alto para ser rentables a largo plazo debido a su estructura de pagos. El <strong>Forex</strong> es considerado por muchos como el camino hacia la profesionalización, ya que permite una gestión de riesgo mucho más sofisticada y un potencial de ganancias superior, aunque su curva de aprendizaje es más pronunciada. En TradeVision, enseñamos ambos, pero siempre con un enfoque en la disciplina y la gestión de riesgo que son cruciais para sobrevivir en cualquiera de los dos.</p>`
    },
    {
        id: 10,
        slug: "el-mito-de-la-sobreoperacion",
        title: "El Costoso Hábito de la Sobreoperación (Overtrading)",
        excerpt: "Operar más no significa ganar más. Descubre por qué el overtrading es el enemigo silencioso de tu cuenta y cómo puedes vencerlo.",
        imageUrl: "https://picsum.photos/400/250?random=20",
        author: "José Quintana",
        date: "15 Mayo, 2024",
        category: "Psicotrading",
        content: `<h2>El Asesino Silencioso de Cuentas</h2><p>La sobreoperación, o <em>overtrading</em>, es la compulsión de realizar operaciones que no se ajustan a tu plan de trading. Es uno de los errores más comunes y destructivos, especialmente para los traders novatos. Nace de emociones como la impaciencia, el aburrimiento, la codicia o el deseo de recuperar una pérdida (trading de venganza).</p><h3>¿Por Qué Sobreoperamos?</h3><p>Las raíces del overtrading son puramente psicológicas:</p><ul><li><strong>Necesidad de Acción:</strong> Sentimos que si no estamos en una operación, no estamos "haciendo nuestro trabajo" o estamos perdiendo oportunidades.</li><li><strong>Euforia:</strong> Después de una racha ganadora, nos sentimos invencibles y empezamos a tomar operaciones de menor calidad, ignorando nuestras reglas.</li><li><strong>Trading de Venganza:</strong> Tras una pérdida, sentimos la necesidad de "recuperar" el dinero inmediatamente, lo que nos lleva a forzar operaciones sin un análisis adecuado.</li></ul><h3>Las Consecuencias del Overtrading</h3><p>Sobreoperar te daña de múltiples formas:</p><ol><li><strong>Muerte por Mil Cortes:</strong> Acumulas pequeñas pérdidas en operaciones de baja probabilidad que, sumadas, erosionan significativamente tu capital.</li><li><strong>Aumento de Costos:</strong> Cada operación tiene un costo (spreads, comisiones). Más operaciones significan más costos, lo que hace más difícil ser rentable.</li><li><strong>Agotamiento Mental:</strong> Estar constantemente en el mercado es agotador y te lleva a tomar peores decisiones.</li></ol><h3>Cómo Combatir la Sobreoperación</h3><p>La cura para el overtrading es la <strong>disciplina</strong>, reforzada por tu plan de trading:</p><ul><li><strong>Ten un Plan Escrito:</strong> Si una operación no cumple el 100% de los criterios de tu plan, no la tomes. Sin excepciones.</li><li><strong>Establece Límites:</strong> Define un número máximo de operaciones por día o una pérdida máxima diaria. Si alcanzas ese límite, apaga la plataforma y vete.</li><li><strong>La Calidad sobre la Cantidad:</strong> Recuerda que tu trabajo no es hacer clic en botones, sino esperar pacientemente las configuraciones de alta probabilidad que te ofrece el mercado. Un trader profesional puede pasar días sin operar si las condiciones no son las adecuadas.</li></ul>`
    },
    {
        id: 11,
        slug: "liquidez-el-verdadero-motor-del-mercado",
        title: "Entendiendo la Liquidez: El Verdadero Motor del Mercado",
        excerpt: "El precio no se mueve por patrones mágicos, se mueve hacia la liquidez. Aprende qué es y cómo los institucionales la utilizan a su favor.",
        imageUrl: "https://picsum.photos/400/250?random=21",
        author: "José Quintana",
        date: "08 Mayo, 2024",
        category: "Análisis de Mercado",
        content: `<h2>Donde Está el Dinero</h2><p>En los mercados financieros, la <strong>liquidez</strong> es la capacidad de un activo para ser comprado o vendido rápidamente sin afectar significativamente su precio. En términos prácticos, la liquidez representa áreas en el gráfico donde hay una gran concentración de órdenes.</p><h3>¿Dónde se Encuentra la Liquidez?</h3><p>Las grandes instituciones (bancos, fondos de cobertura) necesitan una enorme cantidad de liquidez para poder ejecutar sus grandes órdenes sin mover el precio en su contra. Por eso, el precio es diseñado algorítmicamente para moverse hacia donde se encuentra esta liquidez. Las zonas clave de liquidez son:</p><ul><li><strong>Altos y Bajos Anteriores (Highs/Lows):</strong> Por encima de un máximo anterior hay una acumulación de órdenes de stop-loss de vendedores y órdenes de buy-stop de compradores que quieren entrar en una ruptura. Lo contrario ocurre por debajo de un mínimo.</li><li><strong>Niveles de Soporte y Resistencia Clave:</strong> Estas áreas psicológicas también acumulan una gran cantidad de órdenes.</li><li><strong>Líneas de Tendencia:</strong> Muchos traders colocan sus stops justo al otro lado de una línea de tendencia, creando una piscina de liquidez.</li></ul><h3>La Caza de Stops (Stop Hunt)</h3><p>Una "caza de stops" o "barrido de liquidez" es una manipulación común del mercado. El precio se mueve agresivamente hacia una zona de alta liquidez (por ejemplo, por encima de un máximo claro) para activar todas esas órdenes de stop. Esto proporciona la liquidez necesaria para que las grandes instituciones entren en sus posiciones en la dirección opuesta. Una vez que la liquidez es capturada, el precio a menudo se revierte bruscamente.</p><h3>Cómo Operar con la Liquidez</h3><p>En lugar de colocar tus stops donde lo hace todo el mundo, empieza a ver estas zonas de liquidez como objetivos. Un trader institucional no compra en una ruptura alcista; espera a que el precio rompa el máximo (barriendo la liquidez), y luego busca entrar en corto cuando el precio muestra signos de reversión. Pensar en términos de liquidez te permite:</p><ul><li><strong>Evitar ser la Víctima:</strong> Entenderás por qué el precio a menudo llega a tu stop-loss y luego se da la vuelta.</li><li><strong>Identificar Zonas de Alta Probabilidad:</strong> Las áreas justo después de un barrido de liquidez son a menudo puntos de entrada de muy alta probabilidad para operaciones en la dirección opuesta.</li></ul><p>Dejar de pensar en patrones y empezar a pensar en liquidez es uno de los pasos más importantes para pasar de un trader minorista a pensar como un profesional.</p>`
    },
    {
        id: 12,
        slug: "psicotrading-avanzado-sesgos-cognitivos",
        title: "Psicotrading Avanzado: Venciendo tus Sesgos Cognitivos",
        excerpt: "Tu cerebro no está diseñado para el trading. Conoce los sesgos cognitivos más comunes que sabotean tus decisiones y cómo contrarrestarlos.",
        imageUrl: "https://picsum.photos/400/250?random=22",
        author: "Equipo TradeVision",
        date: "01 Mayo, 2024",
        category: "Psicotrading",
        content: `<h2>Tu Peor Enemigo Eres Tú</h2><p>Incluso con la mejor estrategia y gestión de riesgo, tu mente puede ser tu mayor obstáculo. Nuestro cerebro ha evolucionado con atajos mentales (heurísticas) que son útiles para la vida diaria, pero que pueden ser desastrosos en el trading. Estos se conocen como <strong>sesgos cognitivos</strong>.</p><h3>Los 4 Jinetes del Apocalipsis del Trading</h3><ol><li><strong>Sesgo de Confirmación:</strong> Es la tendencia a buscar, interpretar y recordar información que confirma nuestras creencias preexistentes. Si crees que el EUR/USD va a subir, inconscientemente darás más peso a las noticias alcistas e ignorarás las señales bajistas, incluso si son más fuertes.</li><li><strong>Aversión a la Périda:</strong> El dolor de perder es psicológicamente dos veces más poderoso que el placer de ganar una cantidad equivalente. Esto nos lleva a cortar nuestras ganancias demasiado pronto (por miedo a que se devuelvan) y a dejar correr nuestras pérdidas (con la esperanza de que "se recuperen"), lo cual es la receta para el desastre.</li><li><strong>Sesgo de Recencia:</strong> Damos más importancia a los eventos recientes. Si acabas de tener tres operaciones perdedoras, es más probable que dudes en tomar la siguiente señal válida, aunque tu sistema te diga que lo hagas. Si vienes de una racha ganadora, puedes volverte demasiado confiado y tomar riesgos excesivos.</li><li><strong>Falacia del Costo Hundido:</strong> Es la tendencia a seguir invirtiendo en una posición perdedora porque ya hemos "invertido" mucho en ella (tiempo, energía, capital). En lugar de aceptar una pequeña pérdida, la mantenemos, esperando que se dé la vuelta, y a menudo se convierte en una pérdida mucho mayor.</li></ol><h3>La Solución: Un Proceso Basado en Reglas</h3><p>La única forma de combatir estos sesgos es tener un <strong>proceso de trading mecánico y basado en reglas</strong>, es decir, tu plan de trading. Tu plan no tiene emociones ni sesgos. Al comprometerte a seguirlo al pie de la letra, externalizas la toma de decisiones, protegiéndote de los impulsos irracionales de tu propio cerebro. La autoconciencia para reconocer estos sesgos y la disciplina para adherirte a tu plan es la verdadera marca de un trader profesional.</p>`
    }
];

export const MENTORS: Mentor[] = [
    {
        name: "Javier Solís",
        role: "CEO y Fundador",
        country: "España",
        specialty: "Economía Financiera, Mercados Europeos, Regulación.",
        bio: "Javier es el arquitecto de la visión de TradeVision, fundada en 2018. Como economista financiero con sede en Madrid, su misión es profesionalizar el trading en LATAM, enfocándose en la ética, el cumplimiento regulatorio (Forex) y la creación de un ecosistema educativo sostenible.",
        imageUrl: "https://i.pinimg.com/1200x/d5/34/f9/d534f97a587e3d136e88c397ae9842e7.jpg"
    },
    {
        name: "José Quintana",
        role: "Asesor Principal (Voz de la Marca)",
        country: "Venezuela",
        specialty: "Forex, Opciones Binarias, Criptomonedas (Más de 6 años exp).",
        bio: "Con más de 6 años de experiencia intensiva en los mercados más volátiles (Forex, Binarias y Cripto), José es la voz de la disciplina y la estrategia en TradeVision. Su enfoque no es vender sueños, sino forjar traders rentables a través de la gestión de riesgo y una ejecución impecable.",
        imageUrl: "https://i.pinimg.com/736x/ce/8a/1f/ce8a1f55c4a8419a3a0ecf7de10c821b.jpg"
    },
    {
        name: "Lucas Almeida",
        role: "Subdirector de Operaciones (LATAM)",
        country: "Brasil",
        specialty: "Bolsa de Valores (B3), Crecimiento de Comunidades.",
        bio: "Lucas lidera la expansión y las operaciones en el mercado de habla portuguesa. Experto en la Bolsa de Valores y estratega de crecimiento, asegura que la infraestructura de TradeVision (comunidades, soporte) funcione con la eficiencia máxima y profesionalismo.",
        imageUrl: "https://i.pinimg.com/1200x/c5/97/6e/c5976e12c4cd99db68098ecc8d614563.jpg"
    },
    {
        name: "Amara Srisuk",
        role: "Asesora y Analista de Mercados (Asia)",
        country: "Tailandia",
        specialty: "Análisis Técnico Avanzado, Psicología del Trading (Psicotrading).",
        bio: "Amara es nuestra experta en análisis técnico avanzado y psicotrading. Desde Bangkok, proporciona una perspectiva global vital sobre los mercados asiáticos. Su enfoque en la disciplina mental y el control emocional es clave para el éxito de nuestros alumnos Élite.",
        imageUrl: "https://i.pinimg.com/736x/59/cd/d3/59cdd34fe1a767695f3b65ae92c729ab.jpg"
    }
];

export const LEGAL_TEXT = "Advertencia de Riesgo: El trading de divisas, criptomonedas y otros instrumentos financieros en margen conlleva un alto nivel de riesgo y puede no ser adecuado para todos los inversores. El alto grado de apalancamiento puede funcionar tanto a favor como en contra de usted. Antes de decidir invertir, debe considerar cuidadosamente sus objetivos de inversión, nivel de experiencia y apetito por el riesgo. Existe la posibilidad de que pueda sufrir la pérdida de parte o la totalidad de su inversión inicial y, por lo tanto, no debe invertir dinero que no pueda permitirse perder. Debe ser consciente de todos los riesgos asociados con el trading y buscar el asesoramiento de un asesor financiero independiente si tiene alguna duda. TradeVision Latam no se hace responsable de las pérdidas o ganancias. Todo el contenido es de carácter educativo.";

export const IP_LEGAL_TEXT = `Todo el contenido de TradeVision Latam, incluyendo, pero no limitándose a, cursos de pago (Intermedio, Avanzado, Forex), videos, guías, Ebooks, metodologías (como el "Lenguaje del Precio" o el patrón "AMD") y scripts , es propiedad intelectual de la academia.

Cualquier copia, reproducción, reventa, distribución o republicación no autorizada de este material en Internet o cualquier otro medio está estrictamente prohibida y será sancionada legalmente. El acceso a los cursos de pago es personal e intransferible.`;

export const SOCIAL_LINKS = [
    { name: 'Comunidad Telegram', icon: FaTelegram, href: 'https://t.me/tradevision90' },
    { name: 'Canal WhatsApp', icon: FaWhatsapp, href: 'https://whatsapp.com/channel/0029Vb6gcptJZg49w13b0L1H' },
    { name: 'Instagram', icon: FaInstagram, href: '#' },
    { name: 'YouTube', icon: FaYoutube, href: '#' },
    { name: 'TikTok', icon: FaTiktok, href: '#' },
];


export const COMPREHENSIVE_FAQ_CATEGORIES = [
    "Metodología y Cursos",
    "Costos y Métodos de Pago",
    "Mentores y Academia",
    "Ética de Afiliados (La Verdad)",
    "Tecnología (Bots/Scripts)",
    "Comunidad y Soporte",
    "Brokers Recomendados",
    "Detalles Específicos del Broker",
];

export const COMPREHENSIVE_FAQS: ComprehensiveFAQ[] = [
    {
        category: "Metodología y Cursos",
        question: "¿Quién imparte la enseñanza y cuál es el enfoque principal de TradeVision Latam?",
        answer: "La enseñanza es impulsada por José Quintana. El enfoque principal es enseñar la herramienta universal: el Lenguaje del Precio. Este conocimiento es aplicable a cualquier mercado, activo y temporalidad."
    },
    {
        category: "Metodología y Cursos",
        question: "¿Qué programas avanzados ofrece TradeVision Latam?",
        answer: "Ofrecemos varios programas:\n\n- **Binarias Pro Avanzado C90trade:** Enfocado 100% en Lógica del Precio, Disciplina y Consistencia.\n- **Lógica Institucional (Smart Money Concept):** Enfocado en dominar la lógica institucional para dejar de ser la carnada.\n- **Curso Intermedio Binarias:** Diseñado para traders inconsistentes. Incluye 4 Fórmulas de Operación, Backtesting y Psicotrading."
    },
    {
        category: "Metodología y Cursos",
        question: "¿Qué mueve realmente el precio en el mercado según su estrategia?",
        answer: "El precio se mueve por una sola razón: liquidez. Los grandes jugadores (instituciones, fondos) necesitan encontrar liquidez (donde los minoristas ponen sus stop loss) para ejecutar sus órdenes."
    },
    {
        category: "Metodología y Cursos",
        question: "¿Qué es el patrón AMD?",
        answer: "Es Acumulación (precio lateral), Manipulación (el precio rompe extremos para liquidar stop loss) y Distribución (el movimiento real). Nuestro trabajo es operar en la Distribución, después de la Manipulación."
    },
    {
        category: "Metodología y Cursos",
        question: "¿Qué es un Bloque de Orden (OB)?",
        answer: "Es una zona donde las instituciones colocaron órdenes significativas, generando desequilibrios. Buscamos entradas de alta probabilidad en estos bloques después de una toma de liquidez."
    },
    {
        category: "Metodología y Cursos",
        question: "¿Qué es un Plan de Trading y por qué es importante?",
        answer: "Es una hoja de ruta clara diseñada para operar con disciplina y evitar decisiones impulsivas. Debe definir: horarios, condiciones de entrada, riesgo por operación (ej. 1%), pérdida máxima diaria y toma de beneficios (ej. 2:1). Un comerciante sin plan está improvisando."
    },
    {
        category: "Metodología y Cursos",
        question: "¿Cómo miden el progreso de un trader?",
        answer: "Medimos el progreso por el número de errores evitados, más que por el dinero ganado. Si se rompe el plan, se debe pausar al menos un día para revisar y ajustar."
    },
    {
        category: "Costos y Métodos de Pago",
        question: "¿Cuál es el costo de los cursos principales?",
        answer: "Los costos (Pago único) son:\n\n- **Curso Intermedio Binarias:** $79 USD.\n- **Binarias Pro Avanzado C90trade:** $149 USD.\n- **Programa Avanzado de Lógica Institucional (Forex):** $349 USD."
    },
    {
        category: "Costos y Métodos de Pago",
        question: "¿Qué métodos de pago se aceptan?",
        answer: "Aceptamos Múltiples Métodos de Pago:\n\n- **Criptomonedas (USDT):** Vía BINANCE (la forma más rápida).\n- **Dólares Digitales:** PayPal, Zelle, Zinli, Volet.\n- **Transferencias Bancarias:** Banesco Panamá, Soles (BCP), y Bolívares (BS VENEZUELA)."
    },
    {
        category: "Mentores y Academia",
        question: "¿Quiénes son los mentores de TradeVision Latam?",
        answer: "Somos un equipo global de profesionales. Javier Solís (España) es nuestro CEO y Fundador, enfocado en la regulación y la economía financiera. Lucas Almeida (Brasil) es el Subdirector de Operaciones, experto en Bolsa de Valores (B3). Amara Srisuk (Tailandia) es nuestra Asesora de Mercados Asiáticos y experta en Psicotrading. Y José Quintana (Venezuela) es el Asesor Principal y Voz de la Marca para LATAM."
    },
    {
        category: "Mentores y Academia",
        question: "¿José Quintana es el dueño de la academia?",
        answer: "No. Javier Solís es el CEO y Fundador, responsable de la visión global. José Quintana es el Asesor Principal para Latinoamérica; su rol es liderar la estrategia educativa, la creación de contenido y ser la voz experta de la marca en la región, enfocándose 100% en la disciplina y la rentabilidad de los alumnos."
    },
    {
        category: "Mentores y Academia",
        question: "¿Por qué hay una mentora de Tailandia (Amara Srisuk)?",
        answer: "El trading es 80% psicología. Amara Srisuk es nuestra experta líder en Psicotrading y disciplina mental. Su perspectiva global de los mercados asiáticos y su enfoque en el control emocional son claves para el éxito de nuestros alumnos Élite."
    },
    {
        category: "Ética de Afiliados (La Verdad)",
        question: "¿Es verdad que si yo pierdo, el mentor (afiliado) gana?",
        answer: "FALSO. Esa afirmación es una falacia total y demuestra ignorancia sobre el modelo de negocio. La comisión de afiliación (RevShare) se calcula sobre el ingreso del broker (el spread o la comisión por operación), no sobre la pérdida del cliente. En TradeVision, nuestra prioridad es su rentabilidad a largo plazo."
    },
    {
        category: "Ética de Afiliados (La Verdad)",
        question: "¿Es malo ser referido o usar un enlace de afiliado?",
        answer: "No. En TradeVision Latam, es una ventaja estratégica. Ser referido bajo nuestra estructura no tiene costo adicional para ti. Al contrario, es la única forma de validar tu cuenta y darte acceso a nuestro soporte directo, asesoría de José Quintana y comunidades privadas."
    },
    {
        category: "Ética de Afiliados (La Verdad)",
        question: "¿Por qué el marketing de afiliados tiene tan mala reputación?",
        answer: "La mala reputación se debe a malas prácticas, falta de ética y mentores sin formación real. Hoy en día, cualquier persona solitaria en TikTok con carisma dice ser \"profesional\", pero la mayoría no cuenta con formación universitaria en gestión o economía. Esto da paso a engaños y falta de compromiso."
    },
    {
        category: "Ética de Afiliados (La Verdad)",
        question: "¿El programa de afiliados de TradeVision es legal y transparente?",
        answer: "Sí. El programa de afiliados es 100% legal y promovido activamente por las plataformas de brokerage. El problema no es el programa, sino la falta de lectura de los términos y condiciones. En esta academia no escondemos nada, no engañamos ni manipulamos. Toda la información, buena y mala, está publicada."
    },
    {
        category: "Ética de Afiliados (La Verdad)",
        question: "¿Por qué otros grupos \"oficiales\" de Telegram prohíben hablar de otras academias?",
        answer: "Muchos de esos grupos son fachadas para captar clientes (usando sus propios enlaces ocultos) sin dar formación real. Utilizan la burla y el señalamiento, acusando a otras academias de 'estafas' sin base ni pruebas. Estos grupos no son profesionales; el soporte no es oficial y cualquiera da consejos, lo que termina confundiendo al usuario nuevo, quien se ve enredado en peleas y razonamientos de personas sin identidad (perfiles anónimos) que solo defienden sus egos y su supuesta experiencia ficticia. En TradeVision, creemos en la transparencia, el debate profesional y la identidad verificada de nuestros mentores."
    },
    {
        category: "Tecnología (Bots/Scripts)",
        question: "¿TradeVision Latam usa o enseña sobre Bots y Scripts de trading?",
        answer: "Sí. A diferencia de academias que solo enseñan teoría básica, nuestro Ecosistema Premium de Tecnología (Pilar II) integra el uso profesional de Bots y Scripts."
    },
    {
        category: "Tecnología (Bots/Scripts)",
        question: "¿Recibiré un 'script milagroso' en el curso de Binarias?",
        answer: "No. No vendemos \"milagros\". Recibirás algo más valioso: un sistema de ejecución completo (el Lenguaje del Precio). El script premium que se ofrece como bono (con el contador de urgencia) es una herramienta de asistencia para ayudarte a ejecutar la estrategia que ya dominas, no una \"caja mágica\"."
    },
    {
        category: "Tecnología (Bots/Scripts)",
        question: "¿Qué mitos debo evitar sobre los Bots y Scripts?",
        answer: "El mito es que un Bot reemplaza al trader. La verdad es que un Bot es una herramienta que ejecuta la disciplina que el trader (usted) define. Te enseñamos a usar Bots para Backtesting Riguroso y para Ejecución Precisa, eliminando el error humano, pero siempre basados en nuestra metodología de Lógica Institucional (SMC)."
    },
    {
        category: "Comunidad y Soporte",
        question: "¿Cuál es la diferencia entre la comunidad de Telegram y la de Discord?",
        answer: "Telegram es nuestra comunidad gratuita y principal: es donde José Quintana comparte análisis, donde obtienes el Ebook gratuito y donde resolvemos dudas generales. Discord es nuestro \"campus privado\", segmentado por roles, exclusivo para alumnos de los Cursos Premium, donde acceden a canales específicos de sus cursos y soporte directo de los mentores."
    },
    {
        category: "Comunidad y Soporte",
        question: "¿Cómo funciona la función 'Leer más Tarde' del blog?",
        answer: "Es una herramienta de productividad. Al hacer clic en el icono de marcador (FiBookmark) en un artículo, este se guarda en el localStorage de su navegador. Luego, en la página del blog, puede filtrar por \"Leer más Tarde\" para ver solo los artículos que ha guardado."
    },
    {
        category: "Brokers Recomendados",
        question: "¿Qué brokers de Opciones Binarias recomienda TradeVision Latam?",
        answer: "Mencionamos varios brokers como EXNOVA, IQ OPTION, QUOTEX, POCKET OPTION y CASATRADER."
    },
    {
        category: "Brokers Recomendados",
        question: "¿Son seguras las Opciones Binarias?",
        answer: "ADVERTENCIA DE RIESGO: Las plataformas de opciones binarias no están reguladas por entidades financieras internacionales y son consideradas altamente riesgosas. En TradeVision, promovemos su uso principalmente con fines educativos y siempre bajo una estricta gestión del riesgo."
    },
    {
        category: "Brokers Recomendados",
        question: "¿Qué brokers regulados se recomiendan para operaciones reales (Forex y CFD)?",
        answer: "Para profesionalizarse, recomendamos priorizar plataformas reguladas por ser más transparentes y seguras. Los corredores que sugerimos son:\n\n- **FUSION MARKETS** (Regulado por VFSC y ASIC, comisiones bajas).\n- **CTRADER** (Plataforma de trading y analítica avanzada)."
    },
    {
        category: "Brokers Recomendados",
        question: "¿Qué plataformas se sugieren para la gestión de capital (wallets)?",
        answer: "Sugerimos VOLET y BINANCE. BINANCE es el exchange líder y se recomienda para gestionar depósitos y retiros de forma segura con USDT."
    },
    {
        category: "Detalles Específicos del Broker",
        question: "¿Exnova ofrece asesoramiento o consejo de inversión?",
        answer: "No. La Compañía opera bajo una base de \"solo ejecución\". No ofrece asesoramiento de inversión. El Cliente es el único responsable de sus operaciones."
    },
    {
        category: "Detalles Específicos del Broker",
        question: "¿Exnova está regulada?",
        answer: "No. Exnova (operada por Digital Smart LLC) no cuenta con supervisión de ningún organismo regulador reconocido, lo que incrementa el riesgo."
    },
    {
        category: "Detalles Específicos del Broker",
        question: "¿Puedo tener más de una cuenta de trading en Exnova?",
        answer: "No. El Cliente solo debe registrar una (1) cuenta. Si se detectan cuentas múltiples, la Compañía puede cancelar transacciones y bloquear todas esas cuentas."
    },
    {
        category: "Detalles Específicos del Broker",
        question: "¿Cuánto tarda un retiro en Exnova?",
        answer: "Las solicitudes se procesan en un tiempo estándar de 3 días hábiles. Sin embargo, la Compañía puede cancelar solicitudes sin aviso previo durante una evaluación de riesgo interna si hay indicios de fraude o incumplimiento del Acuerdo."
    },
    {
        category: "Detalles Específicos del Broker",
        question: "¿Cómo afectan los bonos a mis retiros?",
        answer: "Tras activar un Bono, no podrá realizar retiros (ni de depósitos ni de ganancias) hasta que alcance el Volumen de Trading requerido o cancelar el esquema de bonos (perdiendo ganancias asociadas)."
    },
    {
        category: "Detalles Específicos del Broker",
        question: "¿El uso de VPN o diferentes IP puede bloquear mi cuenta?",
        answer: "Sí. El acceso frecuente a través de diferentes IPs de distintos países y/o el uso de VPN/VPS es una indicación de incumplimiento del acuerdo y puede llevar al bloqueo inmediato de la cuenta."
    },
    {
        category: "Detalles Específicos del Broker",
        question: "¿Cuál es el correo de soporte de Exnova?",
        answer: "Soporte general: support@exnova.com. Quejas formales: complaints@exnova.com."
    }
];