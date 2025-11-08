
import React from 'react';
import { FAQS } from '../constants';
import Accordion from '../components/Accordion';
import AnimatedSection from '../components/AnimatedSection';

const FaqSection: React.FC = () => {
    return (
        <AnimatedSection className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Preguntas Frecuentes</h2>
                </div>
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {FAQS.map((faq, index) => (
                            <Accordion key={index} title={faq.question}>
                                <p className="text-gray-300">{faq.answer}</p>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default FaqSection;
