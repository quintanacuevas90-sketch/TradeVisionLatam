import React from 'react';

interface NewsTickerProps {
    newsItems: string[];
    isLoading: boolean;
}

const NewsTicker: React.FC<NewsTickerProps> = ({ newsItems, isLoading }) => {
    const duplicatedItems = newsItems.length > 0 ? [...newsItems, ...newsItems] : [];

    if (isLoading) {
        return (
            <div className="bg-black bg-opacity-50 text-white text-sm overflow-hidden whitespace-nowrap py-2 relative">
                <div className="flex justify-center items-center h-[20px]">
                     <span className="w-2 h-2 bg-brand-accent rounded-full mr-3 animate-pulse"></span>
                     <span>Cargando noticias del mercado...</span>
                </div>
            </div>
        );
    }
    
    if (newsItems.length === 0) {
        return null; // Don't render if no news and not loading
    }

    return (
        <a 
            href="https://www.binance.com/referral/earn-together/refer2earn-usdc/claim?hl=en&ref=GRO_28502_L45XF&utm_source=default"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-black bg-opacity-50 text-white text-sm overflow-hidden whitespace-nowrap py-2 relative group cursor-pointer"
        >
            <div className="flex animate-ticker-scroll">
                {duplicatedItems.map((item, index) => (
                    <div key={index} className="flex items-center mx-6">
                        <span className="w-2 h-2 bg-brand-accent rounded-full mr-3"></span>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </a>
    );
};

export default NewsTicker;