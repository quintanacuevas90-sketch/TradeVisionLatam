
import React from 'react';
import { TESTIMONIALS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';

const TestimonialsSection: React.FC = () => {
    const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

    return (
        <AnimatedSection className="py-20 bg-white/5 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Lo que dicen nuestros <span className="text-brand-accent">miembros</span></h2>
            </div>
            <div className="relative w-full overflow-hidden">
                <div className="flex animate-scroll">
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <div key={index} className="flex-shrink-0 w-80 md:w-96 mx-4 bg-brand-primary p-6 rounded-lg border border-white/10">
                            <div className="flex items-center mb-4">
                                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                            </div>
                            <p className="text-gray-400 italic">"{testimonial.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default TestimonialsSection;
