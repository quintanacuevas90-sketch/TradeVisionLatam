
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import MentorCard from '../components/MentorCard';
import { MENTORS } from '../constants';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const MentorsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevMentor = () => {
        const isFirstMentor = currentIndex === 0;
        const newIndex = isFirstMentor ? MENTORS.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextMentor = () => {
        const isLastMentor = currentIndex === MENTORS.length - 1;
        const newIndex = isLastMentor ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <AnimatedSection id="mentores" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary dark:text-white">
                        Conoce a Nuestros <span className="text-brand-accent">Mentores</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Un equipo global de traders profesionales dedicados a tu éxito, liderados por la disciplina y la experiencia real.
                    </p>
                </div>

                <div className="relative max-w-md mx-auto">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {MENTORS.map((mentor) => (
                                <div key={mentor.name} className="w-full flex-shrink-0 p-2">
                                    <MentorCard
                                        mentor={mentor}
                                        isFeatured={mentor.name === 'José Quintana'}
                                        isCEO={mentor.name === 'Javier Solís'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prevMentor}
                        className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 p-2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-md transition z-10"
                        aria-label="Mentor anterior"
                    >
                        <FiChevronLeft size={28} />
                    </button>
                    <button
                        onClick={nextMentor}
                        className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 p-2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-md transition z-10"
                        aria-label="Siguiente mentor"
                    >
                        <FiChevronRight size={28} />
                    </button>
                    
                    <div className="flex justify-center mt-6 space-x-3">
                        {MENTORS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    currentIndex === index ? 'bg-brand-accent' : 'bg-gray-300 dark:bg-gray-600 hover:bg-brand-accent/50'
                                }`}
                                aria-label={`Ir al mentor ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default MentorsSection;
