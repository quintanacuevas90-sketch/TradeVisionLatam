
import React from 'react';
import { Mentor } from '../types';

interface MentorCardProps {
    mentor: Mentor;
    isFeatured?: boolean;
    isCEO?: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, isFeatured = false, isCEO = false }) => {
    
    const baseClasses = "bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 flex flex-col";
    
    let specialClasses = '';
    if (isCEO) {
        specialClasses = 'ring-2 ring-offset-4 ring-offset-gray-50 dark:ring-offset-gray-800 ring-yellow-400 shadow-2xl shadow-yellow-400/20';
    } else if (isFeatured) {
        specialClasses = 'ring-2 ring-offset-4 ring-offset-gray-50 dark:ring-offset-gray-800 ring-brand-accent shadow-2xl shadow-brand-accent/20';
    }

    const cardClasses = `${baseClasses} ${specialClasses}`;

    return (
        <div className={cardClasses}>
            <div className="h-80 relative">
                 {isCEO && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
                        CEO & Fundador
                    </div>
                )}
                 {isFeatured && !isCEO && (
                    <div className="absolute top-2 right-2 bg-brand-accent text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
                        Voz de la Marca
                    </div>
                )}
                <img src={mentor.imageUrl} alt={`Foto de ${mentor.name}`} className="w-full h-full object-cover object-top" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-brand-primary dark:text-white font-sans">{mentor.name}</h3>
                <p className="text-brand-accent font-semibold text-sm">{mentor.role}</p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-2 mb-4 uppercase tracking-wider">{mentor.country} • {mentor.specialty}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">{mentor.bio}</p>
            </div>
        </div>
    );
};

export default MentorCard;
