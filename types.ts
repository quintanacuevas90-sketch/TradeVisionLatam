
export type ModalType = 'premium-courses' | 'affiliate' | 'legal' | 'brokers' | 'community' | 'education' | 'about' | 'support' | 'consultancy';

export interface Testimonial {
    name: string;
    text: string;
    image: string;
}

export interface Broker {
    name: string;
    logo: string;
    type: 'Binarias' | 'Forex' | 'Wallets';
    description: string;
}

export interface Post {
    id: number;
    title: string;
    excerpt: string;
    imageUrl: string;
    author: string;
    date: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    sources?: GroundingSource[];
}

export interface GroundingSource {
    uri: string;
    title: string;
}

export enum ChatMode {
    Standard = 'Standard',
    Thinking = 'Thinking',
    Grounded = 'Grounded'
}
