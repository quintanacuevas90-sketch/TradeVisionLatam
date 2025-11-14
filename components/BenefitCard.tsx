import React from 'react';

interface BenefitCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    variant?: 'default' | 'community';
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, variant = 'default' }) => {
    if (variant === 'community') {
         return (
            <div className="relative group bg-white dark:bg-white/5 p-6 rounded-lg border border-gray-200 dark:border-white/10 hover:border-brand-accent transition duration-300 transform hover:-translate-y-2 shadow-sm hover:shadow-lg h-full overflow-hidden">
                <div className="relative z-10 flex items-start gap-4 h-full">
                    <div className="flex-shrink-0 mt-1">{icon}</div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white text-left">{title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-left">{description}</p>
                    </div>
                </div>
            </div>
         );
    }
    
    // 'default' variant from ForexElitePage
    return (
        <div className="flex items-start gap-4 p-4 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
            <div className="flex-shrink-0 text-brand-accent text-2xl mt-1">{icon}</div>
            <div>
                <h4 className="font-bold text-lg text-brand-primary dark:text-white">{title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
        </div>
    );
};

export default BenefitCard;