
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';

const GiftSection: React.FC = () => {
    return (
        <AnimatedSection className="py-20 bg-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="md:w-1/2 text-center md:text-left">
                        <span className="text-brand-accent font-bold">REGALO EXCLUSIVO</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Domina los Patrones de Velas Japonesas</h2>
                        <p className="text-gray-300 mb-6">
                            Descarga nuestra guía gratuita en PDF y aprende a interpretar las señales más importantes del mercado. Un recurso esencial para cualquier trader.
                        </p>
                        <a
                            href="https://wa.me/TUNUMERO?text=Hola,%20quisiera%20recibir%20la%20guía%20gratuita%20de%20Patrones%20de%20Velas."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition duration-300"
                        >
                            <FaWhatsapp size={24} />
                            Solicitar Guía por WhatsApp
                        </a>
                    </div>
                     <div className="md:w-1/2">
                        <img src="https://picsum.photos/500/350?random=15" alt="Ebook cover" className="rounded-lg shadow-2xl shadow-brand-accent/10 w-full" />
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default GiftSection;
