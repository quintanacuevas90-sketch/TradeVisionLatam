import React, { useState, useEffect } from 'react';
import { FiEye, FiThumbsUp, FiThumbsDown, FiShare2, FiX } from 'react-icons/fi';
import { FaTelegram, FaWhatsapp, FaTwitter } from 'react-icons/fa';

interface EngagementBarProps {
    articleId: string;
    articleTitle: string;
}

interface UserInteractionProfile {
    article_id: string;
    timestamp: string;
    action: 'like' | 'dislike' | 'share';
    platform?: string;
    user_status: 'anonymous' | 'registered'; // Ready for future auth integration
}

const EngagementBar: React.FC<EngagementBarProps> = ({ articleId, articleTitle }) => {
    // --- STATE ---
    const [liveReaders, setLiveReaders] = useState(0);
    const [likes, setLikes] = useState(0);
    const [shares, setShares] = useState(0);
    const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [isStickyVisible, setIsStickyVisible] = useState(true);

    // --- LIVE READERS SIMULATION ---
    useEffect(() => {
        // Initial random count between 5 and 15
        setLiveReaders(Math.floor(Math.random() * (15 - 5 + 1)) + 5);

        const interval = setInterval(() => {
            setLiveReaders(prev => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const newValue = prev + change;
                // Keep within realistic bounds for "exclusive" alpha content
                if (newValue < 4) return 4;
                if (newValue > 18) return 18;
                return newValue;
            });
        }, 5000); // Oscillation every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // --- LOCAL STORAGE INIT ---
    useEffect(() => {
        // Load stored metrics (simulated persistence for demo purposes)
        // In a real app, this would fetch from backend.
        // Here we just persist the user's vote locally.
        const storedVote = localStorage.getItem(`tv_vote_${articleId}`);
        if (storedVote) setUserVote(storedVote as 'up' | 'down');

        // Randomized initial social proof for shares/likes if not set
        const storedLikes = localStorage.getItem(`tv_likes_count_${articleId}`);
        setLikes(storedLikes ? parseInt(storedLikes) : Math.floor(Math.random() * 20) + 10);

        const storedShares = localStorage.getItem(`tv_shares_count_${articleId}`);
        setShares(storedShares ? parseInt(storedShares) : Math.floor(Math.random() * 5) + 1);
    }, [articleId]);

    // --- DATA CAPTURE LOGIC ---
    const logInteraction = (action: 'like' | 'dislike' | 'share', platform?: string) => {
        const payload: UserInteractionProfile = {
            article_id: articleId,
            timestamp: new Date().toISOString(),
            action: action,
            platform: platform,
            user_status: 'anonymous' // Placeholder for Phase 2 (User ID)
        };

        // 1. Save to LocalStorage (Immediate persistence)
        const historyKey = 'tv_user_interaction_history';
        const currentHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        currentHistory.push(payload);
        localStorage.setItem(historyKey, JSON.stringify(currentHistory));

        console.log("📊 Data Captured for CRM:", payload);

        // 2. API CALL PLACEHOLDER (PHASE 2)
        /*
        fetch('https://api.tradevision.latam/v1/analytics/engagement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(err => console.error("Analytics Error:", err));
        */
    };

    const handleVote = (type: 'up' | 'down') => {
        if (userVote === type) return; // Prevent double voting same type

        setUserVote(type);
        localStorage.setItem(`tv_vote_${articleId}`, type);

        if (type === 'up') {
            const newLikes = likes + 1;
            setLikes(newLikes);
            localStorage.setItem(`tv_likes_count_${articleId}`, newLikes.toString());
            logInteraction('like');
        } else {
            logInteraction('dislike');
            // We don't decrement visible likes publicly to maintain positive social proof,
            // but we record the negative feedback internally.
        }
    };

    const handleShare = (platform: string, url: string) => {
        window.open(url, '_blank');
        const newShares = shares + 1;
        setShares(newShares);
        localStorage.setItem(`tv_shares_count_${articleId}`, newShares.toString());
        logInteraction('share', platform);
        setShowShareMenu(false);
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = encodeURIComponent(`He estado analizando este informe de TradeVision Latam: "${articleTitle}". Disciplina y Lógica Institucional pura. 👇`);

    return (
        <>
            {/* 1. STICKY LIVE READER (Bottom Left Floating) */}
            {isStickyVisible && (
                <div className="fixed bottom-4 left-4 z-40 animate-fade-in-up hidden md:flex items-center gap-3">
                    <div className="bg-black/80 backdrop-blur-md border border-brand-accent/30 text-white px-4 py-2 rounded-full shadow-[0_0_15px_rgba(64,224,208,0.2)] flex items-center gap-2 text-xs font-mono">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-gray-300">
                            <strong className="text-white">{liveReaders} Traders</strong> analizando esto.
                        </span>
                    </div>
                    <button 
                        onClick={() => setIsStickyVisible(false)}
                        className="bg-black/50 text-gray-400 hover:text-white rounded-full p-1 transition-colors"
                        aria-label="Cerrar indicador"
                    >
                        <FiX size={12} />
                    </button>
                </div>
            )}

            {/* 2. MAIN ENGAGEMENT BAR (End of Article) */}
            <div className="mt-12 mb-8 p-6 bg-gray-100 dark:bg-[#0B1120] border-t-2 border-brand-accent/20 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Rating System */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            ¿Este análisis fue útil para tu operativa?
                        </span>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => handleVote('up')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform active:scale-95 ${
                                    userVote === 'up' 
                                    ? 'bg-green-500/20 text-green-500 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-green-500/10 hover:text-green-500'
                                }`}
                            >
                                <FiThumbsUp className={userVote === 'up' ? 'fill-current' : ''} />
                                <span className="font-mono font-bold">{likes}</span>
                            </button>
                            
                            <button 
                                onClick={() => handleVote('down')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform active:scale-95 ${
                                    userVote === 'down' 
                                    ? 'bg-red-500/20 text-red-500 border border-red-500/50' 
                                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-red-500/10 hover:text-red-500'
                                }`}
                            >
                                <FiThumbsDown className={userVote === 'down' ? 'fill-current' : ''} />
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-700"></div>

                    {/* Share System */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            📢 <strong className="text-brand-primary dark:text-white">{shares} Usuarios</strong> han compartido este alpha.
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-brand-primary dark:text-white mr-2">Compartir Alpha:</span>
                            
                            <button 
                                onClick={() => handleShare('telegram', `https://t.me/share/url?url=${shareUrl}&text=${shareText}`)}
                                className="p-2 bg-[#0088cc]/10 text-[#0088cc] rounded-lg hover:bg-[#0088cc] hover:text-white transition-all duration-300"
                                aria-label="Compartir en Telegram"
                            >
                                <FaTelegram size={20} />
                            </button>
                            
                            <button 
                                onClick={() => handleShare('whatsapp', `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`)}
                                className="p-2 bg-[#25D366]/10 text-[#25D366] rounded-lg hover:bg-[#25D366] hover:text-white transition-all duration-300"
                                aria-label="Compartir en WhatsApp"
                            >
                                <FaWhatsapp size={20} />
                            </button>
                            
                            <button 
                                onClick={() => handleShare('twitter', `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`)}
                                className="p-2 bg-black/10 dark:bg-white/10 text-gray-800 dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                                aria-label="Compartir en X"
                            >
                                <FaTwitter size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default EngagementBar;