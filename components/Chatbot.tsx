import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiSend, FiExternalLink } from 'react-icons/fi';
import { FaRobot, FaRocket, FaGem, FaKey } from 'react-icons/fa';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useRouter } from '../hooks/useRouter';
import Logo from './Logo';

const WELCOME_MESSAGE: ChatMessage = {
    id: 'initial-welcome',
    role: 'model',
    text: `Hola, soy Vision Concierge de TradeVision Latam. Estoy aquí para guiarte en tu camino hacia la disciplina profesional. 
    
    ¿Qué te gustaría dominar hoy?
    - ¿Cómo funcionan los **Brokers**?
    - ¿Qué es la **Lógica Institucional**?
    - ¿Cuál es el mejor **Curso** para empezar?`,
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
    const DAILY_LIMIT = 10;

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
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        if (messageCount >= DAILY_LIMIT) {
            alert("Has alcanzado el límite de 10 mensajes gratuitos por hoy. ¡Regístrate en TradeVision Premium para acceso ilimitado!");
            return;
        }

        const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        incrementMessageCount();

        const modelMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '', timestamp: Date.now() }]);

        await sendMessageToGemini(input, (chunk) => {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === modelMessageId ? { ...msg, text: msg.text + chunk } : msg
                )
            );
        }, pageContext);

        setIsLoading(false);
    };

    // Función para abrir el modal de afiliados desde el chat
    const openAffiliateWall = () => {
        window.dispatchEvent(new CustomEvent('open-affiliate-modal'));
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={onOpenChat}
                className="fixed bottom-[160px] right-6 bg-brand-accent text-brand-primary w-16 h-16 rounded-full shadow-[0_0_30px_rgba(64,224,208,0.5)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-[52] animate-pulse"
                aria-label="Abrir Asistente IA"
            >
                <FaRobot size={28} />
            </button>

            {isOpen && (
                <div className="fixed bottom-4 md:bottom-24 right-0 md:right-5 w-full md:max-w-[380px] h-[85vh] md:h-[600px] bg-[#050b14]/95 backdrop-blur-xl border border-white/10 rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col z-[100] overflow-hidden animate-fade-in-up">
                    
                    {/* HEADER DINÁMICO */}
                    <header className="sticky top-0 z-20 p-4 bg-[#0A1931] border-b border-white/10 flex items-center justify-between min-h-[70px] shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-brand-accent/10 rounded-lg">
                                <Logo className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-black text-white text-xs uppercase tracking-widest leading-none">Vision Concierge</h3>
                                <p className="text-[9px] text-brand-accent font-bold mt-1 animate-pulse">SISTEMA ACTIVO</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="p-3 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-xl transition-all active:scale-90"
                            title="Cerrar Chat"
                        >
                            <FiX size={24} />
                        </button>
                    </header>

                    {/* MENSAJES */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-grid-pattern bg-[length:30px_30px] bg-opacity-[0.03]">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    msg.role === 'user' 
                                    ? 'bg-brand-accent text-brand-primary font-bold rounded-tr-none' 
                                    : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
                                }`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                                    <div className="flex gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* BOTONES DE CONVERSIÓN */}
                    <div className="px-4 py-3 flex flex-wrap gap-2 bg-[#0A1931]/50 border-t border-white/5">
                        <button onClick={() => navigate('/premium-courses')} className="flex items-center gap-1.5 px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 rounded-xl text-[10px] font-black uppercase hover:bg-yellow-500 hover:text-black transition-all">
                            <FaGem /> Cursos Premium
                        </button>
                        <button onClick={() => navigate('/brokers')} className="flex items-center gap-1.5 px-3 py-2 bg-brand-accent/10 border border-brand-accent/30 text-brand-accent rounded-xl text-[10px] font-black uppercase hover:bg-brand-accent hover:text-brand-primary transition-all">
                            <FaRocket /> Brokers (Bono)
                        </button>
                        <button onClick={openAffiliateWall} className="flex items-center gap-1.5 px-3 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl text-[10px] font-black uppercase hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <FaKey /> Info Privilegiada 🔒
                        </button>
                    </div>

                    {/* FOOTER INPUT */}
                    <footer className="p-4 border-t border-white/10 bg-[#050b14]">
                        <div className="flex items-center gap-2 mb-3">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSend()}
                                placeholder={messageCount >= DAILY_LIMIT ? "Límite diario alcanzado" : "Escribe tu consulta..."}
                                className="flex-1 bg-white/5 border border-white/10 text-white text-sm p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all placeholder:text-gray-600"
                                disabled={isLoading || messageCount >= DAILY_LIMIT}
                            />
                            <button 
                                onClick={handleSend}
                                className="p-3.5 bg-brand-accent text-brand-primary rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale shadow-[0_0_15px_rgba(64,224,208,0.3)]"
                                disabled={isLoading || messageCount >= DAILY_LIMIT}
                            >
                                <FiSend size={20} />
                            </button>
                        </div>
                        <div className="text-center space-y-1.5">
                            <p className="text-[9px] text-gray-500 leading-tight px-4 italic">
                                TradeVision Concierge v2.0: Usamos enlaces de afiliación para financiar el soporte gratuito de la comunidad.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <span className="text-[8px] text-brand-accent font-bold uppercase tracking-widest bg-brand-accent/5 px-2 py-0.5 rounded border border-brand-accent/20">
                                    Consultas: {messageCount}/{DAILY_LIMIT}
                                </span>
                                <span className="text-[8px] text-gray-500 uppercase font-black">SSL SECURE</span>
                            </div>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Chatbot;