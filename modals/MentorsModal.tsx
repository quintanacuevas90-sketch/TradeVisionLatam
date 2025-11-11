import React from 'react';
import Modal from './Modal';
import MentorCard from '../components/MentorCard';
import { MENTORS } from '../constants';

const MentorsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Conoce a Nuestros Mentores">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mb-8">
                    Un equipo global de traders profesionales dedicados a tu éxito, liderados por la disciplina y la experiencia real.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {MENTORS.map((mentor) => (
                        <MentorCard 
                            key={mentor.name} 
                            mentor={mentor}
                            isFeatured={mentor.name === 'José Quintana'}
                            isCEO={mentor.name === 'Javier Solís'}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default MentorsModal;
