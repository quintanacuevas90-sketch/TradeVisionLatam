
import React from 'react';
import { NEWS_TICKER_ITEMS } from '../constants';

const NewsTicker: React.FC = () => {
    const duplicatedItems = [...NEWS_TICKER_ITEMS, ...NEWS_TICKER_ITEMS];

    return (
        <div className="bg-black bg-opacity-50 text-white text-sm overflow-hidden whitespace-nowrap py-2 relative">
            <div className="flex animate-scroll">
                {duplicatedItems.map((item, index) => (
                    <div key={index} className="flex items-center mx-6">
                        <span className="w-2 h-2 bg-brand-accent rounded-full mr-3"></span>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsTicker;
