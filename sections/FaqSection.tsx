

import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { useRouter } from '../hooks/useRouter';
import { FiArrowRight } from 'react-icons/fi';
import { COMPREHENSIVE_FAQS } from '../constants';
import Accordion from '../components/Accordion';

const FaqSection: React.FC = () => {
    const { navigate } = useRouter();
    
    // Select key FAQs, especially from "Ética de Afiliados"
    const featuredFaqs = [
        COMPREHENSIVE_FAQS.find(f => f.question.includes("si yo pierdo, el mentor (afiliado) gana")),
        COMPREHENSIVE_FAQS.find(f => f.question.includes("malo ser referido")),
        COMPREHENSIVE_FAQS.find(f => f.question.includes("Bots y Scripts")),
        COMPREHENSIVE_FAQS.find(f => f.question.includes("Plan de Trading")),
    ].filter(Boolean) as typeof COMPREHENSIVE_FAQS; // Filter out undefined if not found

    return (
        <AnimatedSection className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary dark:text-white">Preguntas Clave</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
                        Respuestas directas a las dudas más importantes. Transparencia total, siempre.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {featuredFaqs.map((faq, index) => (
                         <Accordion key={index} title={faq.question}>
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{faq.answer}</p>
                        </Accordion>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/faq')}
                        className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-primary transition-colors duration-300"
                    >
                        Explorar Todas las Preguntas
                        <FiArrowRight />
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default FaqSection;
