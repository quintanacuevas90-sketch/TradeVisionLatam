
import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiSend, FiExternalLink, FiInfo, FiActivity } from 'react-icons/fi';
import { FaRobot, FaRocket, FaGem, FaKey, FaShieldAlt } from 'react-icons/fa';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, GroundingSource } from '../types';
import { useRouter } from '../hooks/useRouter';
import Logo from './Logo';

const WELCOME_MESSAGE: ChatMessage = {
    id: 'initial-welcome',
    role: 'model',
    text: `Bienvenido a la Terminal Strategist. Soy tu conexión directa con la disciplina de TradeVision Latam. 
    
¿En qué fase de tu carrera te encuentras hoy?
• Busco **Brokers** regulados.
• Quiero dominar la **Lógica Institucional**.
• Necesito el **Manual de Prompts** para IA.`,
    timestamp: Date.now(),
};

interface ChatbotProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    newsItems: string[];
    pageContext: string;
    triggerText: string | null;
    onOpenChat: () => void;
    onCloseTrigger: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen, pageContext, onOpenChat }) => {
    const { navigate } = useRouter();
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messageCount, setMessageCount] = useState(0);
    const DAILY_LIMIT = 15; // Increased for better UX

    useEffect(() => {
        const stats = JSON.parse(localStorage.getItem('tv_chat_stats') || '{}');
        const today = new Date().toLocaleDateString();
        if (stats.date !== today) {
            localStorage.setItem('tv_chat_stats', JSON.stringify({ date: today, count: 0 }));
            setMessageCount(0);
        } else {
            setMessageCount(stats.count);
        }
    }, []);

    const incrementMessageCount = () => {
        const stats = JSON.parse(localStorage.getItem('tv_chat_stats') || '{}');
        const newCount = stats.count + 1;
        localStorage.setItem('tv_chat_stats', JSON.stringify({ ...stats, count: newCount }));
        setMessageCount(newCount);
    };

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        if (messageCount >= DAILY_LIMIT) {
            alert("Límite de terminal alcanzado. Únete a TradeVision Premium para consultas ilimitadas.");
            return;
        }

        const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        incrementMessageCount();

        const modelMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '', timestamp: Date.now(), sources: [] }]);

        await sendMessageToGemini(input, (chunk, sources) => {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === modelMessageId ? { ...msg, text: msg.text + chunk, sources: sources } : msg
                )
            );
        }, pageContext);

        setIsLoading(false);
    };

    const openAffiliateWall = () => {
        window.dispatchEvent(new CustomEvent('open-affiliate-modal'));
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={onOpenChat}
                className="fixed bottom-[160px] right-6 bg-brand-accent text-brand-primary w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_0_30px_rgba(64,224,208,0.4)] flex items-center justify-center transition-all duration-500 transform hover:scale-110 z-[52] hover:rotate-12 group"
                aria-label="Terminal Strategist"
            >
                <FiActivity className="animate-pulse text-2xl md:text-3xl group-hover:scale-125" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-5 md:w-[420px] h-full md:h-[650px] bg-[#020617] border border-white/10 md:rounded-3xl shadow-2xl flex flex-col z-[100] overflow-hidden animate-fade-in-up">
                    
                    <header className="p-5 bg-[#0f172a] border-b border-white/5 flex items-center justify-between shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center border border-brand-accent/20">
                                    <Logo className="w-6 h-6" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f172a] animate-pulse"></div>
                            </div>
                            <div>
                                <h3 className="font-black text-white text-xs uppercase tracking-widest flex items-center gap-2">
                                    Strategist V3 <span className="bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded text-[8px]">PRO</span>
                                </h3>
                                <p className="text-[10px] text-gray-500 font-mono flex items-center gap-1 uppercase">
                                    <span className="w-1 h-1 bg-brand-accent rounded-full animate-ping"></span>
                                    Enlace Estable
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-full transition-all"
                        >
                            <FiX size={24} />
                        </button>
                    </header>

                    <div className="flex-1 p-5 overflow-y-auto space-y-6 bg-grid-pattern bg-[length:40px_40px] bg-opacity-[0.03]">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-brand-accent text-brand-primary font-bold shadow-lg rounded-tr-none' 
                                    : 'bg-[#1e293b] text-gray-200 border border-white/5 shadow-inner rounded-tl-none'
                                }`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                    
                                    {/* Grounding Sources */}
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 flex items-center gap-1">
                                                <FiInfo /> Fuentes Verificadas
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.from(new Set(msg.sources.map(s => s.uri))).map(uri => {
                                                    const source = msg.sources!.find(s => s.uri === uri);
                                                    return (
                                                        <a 
                                                            key={uri} 
                                                            href={uri} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-[10px] bg-black/40 hover:bg-brand-accent/20 hover:text-brand-accent px-2 py-1 rounded border border-white/10 flex items-center gap-1 transition-all max-w-[150px] truncate"
                                                        >
                                                            <FiExternalLink size={10} /> {source?.title || 'Ver más'}
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <span className="text-[9px] text-gray-600 mt-1 uppercase font-mono tracking-tighter">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex flex-col items-start">
                                <div className="bg-[#1e293b] p-4 rounded-2xl rounded-tl-none flex gap-2">
                                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="px-5 py-3 flex flex-wrap gap-2 bg-[#0f172a]/50 border-t border-white/5">
                        <button onClick={() => navigate('/premium-courses')} className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-lg text-[9px] font-black uppercase hover:bg-yellow-500 hover:text-black transition-all">
                            <FaGem /> Cursos
                        </button>
                        <button onClick={() => navigate('/brokers')} className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 py-2 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent rounded-lg text-[9px] font-black uppercase hover:bg-brand-accent hover:text-brand-primary transition-all">
                            <FaRocket /> Brokers
                        </button>
                        <button onClick={openAffiliateWall} className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-[9px] font-black uppercase hover:bg-blue-500 hover:text-white transition-all">
                            <FaKey /> Auditoría
                        </button>
                    </div>

                    <footer className="p-5 bg-[#020617] border-t border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSend()}
                                placeholder={messageCount >= DAILY_LIMIT ? "Sesión Bloqueada" : "Haz una consulta estratégica..."}
                                className="flex-1 bg-white/5 border border-white/10 text-white text-sm p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all placeholder:text-gray-600 font-medium"
                                disabled={isLoading || messageCount >= DAILY_LIMIT}
                            />
                            <button 
                                onClick={handleSend}
                                className="w-12 h-12 bg-brand-accent text-brand-primary rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center shadow-[0_0_20px_rgba(64,224,208,0.3)]"
                                disabled={isLoading || messageCount >= DAILY_LIMIT}
                            >
                                <FiSend size={20} />
                            </button>
                        </div>
                        <div className="flex justify-between items-center px-1">
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">
                                <FaShieldAlt className="text-brand-accent" /> Seguridad SSL Activa
                            </p>
                            <p className="text-[9px] text-brand-accent font-black uppercase tracking-widest">
                                Créditos: {DAILY_LIMIT - messageCount}/{DAILY_LIMIT}
                            </p>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Chatbot;
