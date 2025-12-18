



export type ModalType = 'premium-courses' | 'affiliate' | 'brokers' | 'community' | 'support' | 'mentors' | 'consultancy' | 'education';

export type PageType = 'main' | 'blog' | 'post' | 'sitemap' | 'faq' | 'brokers' | 'premium-courses' | 'consultancy' | 'methodology' | 'acerca-de' | 'responsabilidad' | 'impacto-social' | 'colabora' | 'forex-elite' | 'binarias-pro-c90' | 'binarias-intermedio' | 'comunidad' | 'ia-manual' | 'legal-verification' | 'aviso-legal-riesgo' | 'terminos-academia' | 'politica-privacidad' | 'transparencia-legal' | 'execution-zone' | 'protocolo-confianza';

export interface Testimonial {
    name: string;
    quote: string;
    location: string;
    flagUrl: string;
}

export interface PartnerTool {
  name: string;
  description: string;
  advantages: string[];
  image: string;
  link: string;
  cta: string;
  category: 'binary' | 'forex' | 'wallet';
  regulation: 'regulated' | 'unregulated' | 'tool_platform' | 'crypto_exchange';
}

export interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    author: string;
    date: string;
    content: string; // Full HTML content of the post
    category: string;
}

export interface ComprehensiveFAQ {
    question: string;
    answer: string;

    category: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
    sources?: GroundingSource[];
    feedback?: 'up' | 'down';
}

export interface GroundingSource {
    uri: string;
    title: string;
}

export type SearchResultItem =
    | { type: 'blog'; data: Post }
    | { type: 'faq'; data: ComprehensiveFAQ };

export interface Mentor {
    name: string;
    role: string;
    country: string;
    specialty: string;
    bio: string;
    imageUrl: string;
}