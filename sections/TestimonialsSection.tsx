import React from 'react';
import { TESTIMONIALS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';
import { FaRocket, FaTelegram } from 'react-icons/fa';

const TestimonialsSection: React.FC = () => {
    // Duplicate testimonials for a seamless, infinite loop
    const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

    return (
        <AnimatedSection
            id="testimonials"
            className="py-20 bg-gray-50 dark:bg-gray-800"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center mb-6">
                    <FaRocket className="text-6xl text-brand-accent" />
                </div>
                <h2 className="text-4xl font-extrabold text-brand-primary dark:text-white mb-4">
                    La Voz de la Comunidad
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                    Más de 2500 estudiantes activos ya están cambiando su futuro. Esto es lo que dicen sobre su experiencia. ¿Estás listo para nivelar tu juego financiero? ¡No te quedes fuera!
                </p>
            </div>

            <div className="w-full overflow-hidden group">
                <div className="flex animate-infinite-scroll">
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <div key={index} className="flex-shrink-0 w-72 mx-4">
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border-l-4 border-brand-accent shadow-lg flex flex-col justify-between h-[280px]">
                                <p className="text-gray-600 dark:text-gray-300 italic mb-6 text-base overflow-y-auto">"{testimonial.quote}"</p>
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
            </div>

            <div className="text-center mt-16">
                 <a
                    href="https://t.me/tradevision90"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-brand-accent text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-brand-primary transition duration-300 transform hover:scale-105"
                >
                    <FaTelegram size={24} />
                    Unirse a la Comunidad
                </a>
            </div>
        </AnimatedSection>
    );
};

export default TestimonialsSection;