
import React from 'react';
import { useRouter } from '../hooks/useRouter';

interface NewsTickerProps {
    items: string[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ items }) => {
    const { navigate } = useRouter();
    const duplicatedItems = items.length > 0 ? [...items, ...items] : [];

    if (items.length === 0) return null;

    return (
        <button 
            onClick={() => navigate('/premium-courses')}
            className="block w-full text-left bg-black/60 backdrop-blur-sm border-b border-white/10 text-white text-sm overflow-hidden whitespace-nowrap py-3 relative group cursor-pointer z-30"
        >
            <div className="flex animate-ticker-scroll w-max [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                {duplicatedItems.map((item, index) => (
                    <div key={index} className="flex items-center mx-8 font-medium tracking-wide">
                        <span className="text-brand-accent mr-2 text-[10px]">●</span>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </button>
    );
};

export default NewsTicker;
