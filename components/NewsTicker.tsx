import React from 'react';

interface NewsTickerProps {
    items: string[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ items }) => {
    const duplicatedItems = items.length > 0 ? [...items, ...items] : [];

    if (items.length === 0) {
        return null; // Don't render if no news
    }

    return (
        <a 
            href="/#/premium-courses"
            className="block bg-black bg-opacity-50 text-white text-sm overflow-hidden whitespace-nowrap py-2 relative group cursor-pointer"
        >
            <div className="flex animate-ticker-scroll">
                {duplicatedItems.map((item, index) => (
                    <div key={index} className="flex items-center mx-8">
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </a>
    );
};

export default NewsTicker;