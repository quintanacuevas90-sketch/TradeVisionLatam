
import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend, FiCpu, FiGlobe, FiZap } from 'react-icons/fi';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, ChatMode } from '../types';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<ChatMode>(ChatMode.Standard);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const modelMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);

        await sendMessageToGemini(input, mode, (chunk, sources) => {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === modelMessageId
                        ? { ...msg, text: msg.text + chunk, sources: sources.length > 0 ? sources : undefined }
                        : msg
                )
            );
        });

        setIsLoading(false);
    };
    
    const ModeButton = ({ buttonMode, icon, label }: { buttonMode: ChatMode; icon: React.ReactNode; label: string }) => (
        <button
            onClick={() => setMode(buttonMode)}
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-colors text-xs
                ${mode === buttonMode ? 'bg-brand-accent text-brand-primary' : 'bg-white/10 hover:bg-white/20'}`}
        >
            {icon} {label}
        </button>
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-20 bg-brand-accent text-brand-primary p-3 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-300 z-50 transform hover:scale-110"
                aria-label="Open Chat"
            >
                {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-5 w-full max-w-sm h-[70vh] max-h-[600px] bg-brand-primary border border-white/20 rounded-lg shadow-2xl flex flex-col z-50 text-white">
                    <header className="p-4 border-b border-white/20">
                        <h3 className="font-bold text-lg text-center">Asistente TradeVision</h3>
                        <div className="flex gap-2 mt-2">
                           <ModeButton buttonMode={ChatMode.Standard} icon={<FiZap />} label="Rápido" />
                           <ModeButton buttonMode={ChatMode.Grounded} icon={<FiGlobe />} label="Preciso" />
                           <ModeButton buttonMode={ChatMode.Thinking} icon={<FiCpu />} label="Avanzado" />
                        </div>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${msg.role === 'user' ? 'bg-brand-accent text-brand-primary' : 'bg-white/10'}`}>
                                    <p className="whitespace-pre-wrap">{msg.text}{msg.role === 'model' && isLoading && msg.text.length === 0 && <span className="animate-pulse">...</span>}</p>
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-2 border-t border-brand-primary/20 pt-2">
                                            <h4 className="text-xs font-bold mb-1">Fuentes:</h4>
                                            <ul className="space-y-1">
                                                {msg.sources.map(source => (
                                                    <li key={source.uri}>
                                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-300 hover:underline truncate block">
                                                           {source.title || source.uri}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <footer className="p-4 border-t border-white/20">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && !isLoading && handleSend()}
                                placeholder="Haz una pregunta..."
                                className="flex-1 bg-white/10 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading} className="bg-brand-accent text-brand-primary p-2 rounded-lg disabled:opacity-50">
                                <FiSend />
                            </button>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Chatbot;
