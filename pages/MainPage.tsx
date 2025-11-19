
import React from 'react';
import Header from '../components/Header';
import NewsTicker from '../components/NewsTicker';
import HeroSection from '../sections/HeroSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import BlogSection from '../sections/BlogSection';
import FaqSection from '../sections/FaqSection';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import MentorsSection from '../sections/MentorsSection';
import MethodologySection from '../sections/MethodologySection';
import BrokersSection from '../sections/BrokersSection';
import CommunityBenefitsSection from '../sections/CommunityBenefitsSection';
import FreeCommunityCtaSection from '../sections/FreeCommunityCtaSection';
import AnimatedSection from '../components/AnimatedSection';


interface MainPageProps {
    onOpenModal: (modal: ModalType) => void;
    tickerItems: string[];
}

const DisciplineCtaSection: React.FC = () => {
    return (
        <AnimatedSection className="bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="p-8 rounded-lg bg-white dark:bg-brand-primary border-t-4 border-brand-accent shadow-2xl text-center max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-brand-primary dark:text-white">Una Declaración de Principios</h2>
                    <blockquote className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 italic">
                        "En <span translate="no">TRADEVISION</span>, el éxito no se compra con bots ni se basa en señales. Se construye con disciplina, consistencia y gestión de riesgo. Si busca el camino fácil, esta no es su academia."
                    </blockquote>
                    <p className="mt-4 font-bold text-gray-600 dark:text-gray-400">- José Quintana, Asesor Principal</p>
                </div>
            </div>
        </AnimatedSection>
    );
};


const MainPage: React.FC<MainPageProps> = ({ onOpenModal, tickerItems }) => {
    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <div className="pt-20">
                <NewsTicker items={tickerItems} />
            </div>
            <main>
                <HeroSection onOpenModal={onOpenModal} />
                <FreeCommunityCtaSection />
                <DisciplineCtaSection />
                <MentorsSection />
                <MethodologySection />
                <BrokersSection />
                <CommunityBenefitsSection onOpenModal={onOpenModal} />
                <TestimonialsSection />
                <BlogSection />
                <FaqSection />
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default MainPage;