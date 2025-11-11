
import React from 'react';
import { Mentor } from '../types';

interface MentorProfileCardProps {
    mentor: Mentor;
}

const MentorProfileCard: React.FC<MentorProfileCardProps> = ({ mentor }) => {
    return (
        <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden border-2 border-brand-accent h-full flex flex-col">
            <div className="h-56">
                <img src={mentor.imageUrl} alt={`Foto de ${mentor.name}`} className="w-full h-full object-cover object-top" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-brand-primary dark:text-white">{mentor.name} <span className="text-base font-normal text-gray-500">({mentor.country})</span></h3>
                <p className="text-brand-accent font-semibold text-sm mb-2">{mentor.role}</p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">{mentor.specialty}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">{mentor.bio}</p>
            </div>
        </div>
    );
};

export default MentorProfileCard;
