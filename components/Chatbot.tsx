

import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiSend, FiCpu, FiGlobe, FiZap, FiThumbsUp, FiThumbsDown, FiCopy, FiSearch, FiMoreVertical, FiDownload, FiTrash2 } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, ChatMode } from '../types';

const WELCOME_MESSAGE: ChatMessage = {
    id: 'initial-welcome',
    role: 'model',
    text: `Asistente de IA de TradeVision Latam.

Estoy entrenado con nuestra base de conocimiento para resolver tus consultas.

Puedes preguntarme sobre:
- Nuestros Cursos (Precios, contenido, diferencias).
- Brokers y Afiliados (Enlaces, requisitos).
- Consultas de Trading (Definiciones, guías).
- Información de la página web.

Escribe tu pregunta para comenzar.`,
    timestamp: Date.now(),
};

interface ChatbotProps {
    newsItems: string[];
    pageContext: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ newsItems, pageContext }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        try {
            const savedMessages = localStorage.getItem('tradevision-chat-history');
            return savedMessages ? JSON.parse(savedMessages) : [WELCOME_MESSAGE];
        } catch (error) {
            console.error('Failed to parse chat history from localStorage', error);
            return [WELCOME_MESSAGE];
        }
    });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<ChatMode>(ChatMode.Standard);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    useEffect(() => {
        if (messages.length > 1 || (messages.length === 1 && messages[0].id !== 'initial-welcome')) {
             localStorage.setItem('tradevision-chat-history', JSON.stringify(messages));
        }
    }, [messages]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const modelMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '', timestamp: Date.now() }]);
        
        const newsContext = newsItems.length > 0 && !newsItems[0].includes("Error") 
            ? `Noticias financieras recientes para contexto:\n- ${newsItems.join('\n- ')}` 
            : '';
            
        const fullContext = `${pageContext}\n\n${newsContext}`.trim();

        await sendMessageToGemini(input, mode, (chunk, sources) => {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === modelMessageId
                        ? { ...msg, text: msg.text + chunk, sources: sources.length > 0 ? sources : undefined }
                        : msg
                )
            );
        }, fullContext);

        setIsLoading(false);
    };

    const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
        const feedbackMessage = messages.find(msg => msg.id === messageId);
        if (feedbackMessage) {
            console.log("Feedback logged for analysis:", {
                messageId: feedbackMessage.id,
                feedback: feedback,
                responseText: feedbackMessage.text,
                chatMode: mode
            });
        }
        setMessages(prevMessages =>
            prevMessages.map(msg =>
                msg.id === messageId ? { ...msg, feedback } : msg
            )
        );
    };

    const handleExportChat = () => {
        const formattedHistory = messages.map(msg => {
            const timestamp = new Date(msg.timestamp).toLocaleString();
            return `[${timestamp}] ${msg.role.toUpperCase()}:\n${msg.text}\n\n`;
        }).join('');
    
        const blob = new Blob([formattedHistory], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tradevision-chat-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsMenuOpen(false);
    };
    
    const handleClearHistory = () => {
        if (window.confirm('¿Estás seguro de que quieres borrar todo el historial de este chat? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('tradevision-chat-history');
            setMessages([WELCOME_MESSAGE]);
            setIsMenuOpen(false);
        }
    };
    
    const ModeButton = ({ buttonMode, icon, label, tooltip }: { buttonMode: ChatMode; icon: React.ReactNode; label: string; tooltip: string; }) => (
        <div className="relative flex-1 group">
            <button
                onClick={() => setMode(buttonMode)}
                className={`w-full flex items-center justify-center gap-2 p-2 rounded-lg transition-colors text-xs
                    ${mode === buttonMode ? 'bg-brand-accent text-brand-primary' : 'bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20'}`}
            >
                {icon} {label}
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-[200px] bg-gray-800 text-white text-center text-xs rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                {tooltip}
            </span>
        </div>
    );

    const filteredMessages = messages.filter(msg =>
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-[88px] right-6 bg-brand-accent text-brand-primary p-3 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-300 z-[52] transform hover:scale-110 group flex items-center justify-center"
                aria-label="Abrir Chat"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
            >
                <FaRobot size={24} />
                 <span className="absolute right-full mr-3 w-max bg-gray-800 text-white text-sm rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Bot TradeVision
                </span>
            </button>

            {isOpen && (
                <div 
                    className="fixed bottom-24 right-5 w-full max-w-sm h-[70vh] max-h-[600px] bg-white dark:bg-brand-primary border border-gray-200 dark:border-white/20 rounded-lg shadow-2xl flex flex-col z-[52] text-gray-800 dark:text-white overflow-hidden bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="chatbot-title"
                >
                    <div className="absolute inset-0 bg-white/80 dark:bg-brand-primary/90 backdrop-blur-sm"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <header className="p-4 border-b border-gray-200 dark:border-white/10 flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <h3 id="chatbot-title" className="font-bold text-lg">Asistente TradeVision</h3>
                                <div className="flex items-center gap-1">
                                    <div ref={menuRef} className="relative">
                                        <button
                                            onClick={() => setIsMenuOpen(prev => !prev)}
                                            className="p-1 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-500/20 transition-colors"
                                            aria-label="Opciones del chat"
                                        >
                                            <FiMoreVertical size={20} />
                                        </button>
                                        {isMenuOpen && (
                                            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                                                <button onClick={handleExportChat} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <FiDownload size={16} /> Exportar Chat
                                                </button>
                                                <button onClick={handleClearHistory} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    <FiTrash2 size={16} /> Limpiar Historial
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-500/20 transition-colors" aria-label="Cerrar chat">
                                        <FiX size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="relative mt-3">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar en la conversación..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-gray-800 p-2 pl-9 rounded-lg text-sm border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors"
                                    aria-label="Buscar en la conversación"
                                />
                            </div>
                            <div className="flex gap-2 mt-3">
                               <ModeButton buttonMode={ChatMode.Standard} icon={<FiZap />} label="Rápido" tooltip="Respuestas rápidas y concisas. Ideal para preguntas generales." />
                               <ModeButton buttonMode={ChatMode.Grounded} icon={<FiGlobe />} label="Preciso" tooltip="Respuestas basadas en búsquedas web recientes. Ideal para información actualizada." />
                               <ModeButton buttonMode={ChatMode.Thinking} icon={<FiCpu />} label="Avanzado" tooltip="Respuestas más elaboradas y con razonamiento profundo. Ideal para tareas complejas." />
                            </div>
                        </header>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {filteredMessages.map((msg, index) => {
                                 const isLastMessage = index === filteredMessages.length - 1;
                                 const showFeedback = msg.role === 'model' && msg.text && (!isLoading || !isLastMessage) && msg.id !== 'initial-welcome';

                                 return (
                                    <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} ${msg.id === 'initial-welcome' ? 'animate-fade-in-up' : ''}`}>
                                        <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg relative group ${msg.role === 'user' ? 'bg-brand-accent text-brand-primary' : 'bg-gray-100/90 dark:bg-gray-900/70'}`}>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(msg.text)}
                                                className="absolute -top-2 -right-2 p-1.5 rounded-full text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-accent"
                                                aria-label="Copiar mensaje"
                                            >
                                                <FiCopy size={12} />
                                            </button>
                                            <p className="whitespace-pre-wrap text-sm">
                                                {msg.text}
                                                {msg.role === 'model' && isLoading && isLastMessage && msg.text.length === 0 && (
                                                    <span className="animate-pulse">
                                                        {mode === ChatMode.Thinking ? ' Pensando...' : '...'}
                                                    </span>
                                                )}
                                            </p>
                                            {msg.sources && msg.sources.length > 0 && (
                                                <div className="mt-2 border-t border-brand-primary/20 dark:border-white/20 pt-2">
                                                    <h4 className="text-xs font-bold mb-1">Fuentes:</h4>
                                                    <ul className="space-y-1">
                                                        {msg.sources.map(source => (
                                                            <li key={source.uri}>
                                                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 dark:text-blue-300 hover:underline truncate block">
                                                                {source.title || source.uri}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            <div className="text-right text-xs mt-2 opacity-60">
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        {showFeedback && (
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => handleFeedback(msg.id, 'up')}
                                                    disabled={!!msg.feedback}
                                                    className={`p-1 rounded-full transition ${
                                                        msg.feedback === 'up' 
                                                        ? 'bg-green-500 text-white' 
                                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 hover:text-gray-800 dark:hover:text-white disabled:opacity-50 disabled:hover:bg-transparent'
                                                    }`}
                                                    aria-label="Buena respuesta"
                                                >
                                                    <FiThumbsUp size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleFeedback(msg.id, 'down')}
                                                    disabled={!!msg.feedback}
                                                    className={`p-1 rounded-full transition ${
                                                        msg.feedback === 'down' 
                                                        ? 'bg-red-500 text-white' 
                                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 hover:text-gray-800 dark:hover:text-white disabled:opacity-50 disabled:hover:bg-transparent'
                                                    }`}
                                                    aria-label="Mala respuesta"
                                                >
                                                    <FiThumbsDown size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                 )
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        <footer className="p-4 border-t border-gray-200/50 dark:border-white/20 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyPress={e => e.key === 'Enter' && !isLoading && handleSend()}
                                    placeholder="Haz una pregunta..."
                                    className="flex-1 bg-gray-200 dark:bg-gray-800 text-sm py-3 px-5 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-300"
                                    disabled={isLoading}
                                    aria-label="Escribe tu pregunta"
                                />
                                <button 
                                    onClick={handleSend} 
                                    disabled={isLoading} 
                                    className="bg-brand-accent text-brand-primary p-3 rounded-full disabled:opacity-50 disabled:scale-100 hover:scale-110 active:scale-100 transition-transform duration-200"
                                    aria-label="Enviar mensaje"
                                >
                                    <FiSend />
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;