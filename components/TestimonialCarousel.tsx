import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Testimonial } from '../types';

const TestimonialCarousel: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1)),
            5000
        );
        return () => resetTimeout();
    }, [currentIndex, testimonials.length]);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === testimonials.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto h-64">
            <div className="overflow-hidden relative h-full">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-brand-accent shadow-lg flex flex-col justify-center h-full">
                             <p className="text-gray-600 dark:text-gray-300 italic mb-4 text-base">"{testimonial.quote}"</p>
                            <div className="flex items-center mt-auto">
                                <img src={testimonial.flagUrl} alt={`Bandera de ${testimonial.location}`} className="w-8 h-auto mr-3 rounded" />
                                <div>
                                    <h4 className="font-bold text-brand-primary dark:text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="absolute top-1/2 -left-4 md:-left-10 transform -translate-y-1/2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 rounded-full p-2 z-10">
                <FiChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 -right-4 md:-right-10 transform -translate-y-1/2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 rounded-full p-2 z-10">
                <FiChevronRight size={24} />
            </button>
        </div>
    );
};

export default TestimonialCarousel;