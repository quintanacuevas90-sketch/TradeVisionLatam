
import React, { useEffect } from 'react';
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
import { FiShield } from 'react-icons/fi';


interface MainPageProps {
    onOpenModal: (modal: ModalType) => void;
    tickerItems: string[];
}

const DisciplineCtaSection: React.FC = () => {
    return (
        <AnimatedSection className="bg-[#020617] py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative p-10 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-[#0A1931] to-[#020617] border border-white/5 shadow-2xl overflow-hidden max-w-6xl mx-auto">
                    {/* Decorative elements */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-accent/5 blur-[100px] rounded-full"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyber-violet/5 blur-[100px] rounded-full"></div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-8 border border-brand-accent/20">
                            <FiShield size={32} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                            Una Declaración de <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">Principios Innegociables</span>
                        </h2>
                        <blockquote className="text-xl md:text-2xl text-gray-300 italic font-medium leading-relaxed max-w-4xl mb-8">
                            "En <span translate="no" className="text-white font-bold">TradeVision Latam</span>, el éxito no se compra con bots de imitación ni se basa en el azar de las señales de Telegram. Se forja con el rigor de la <span className="text-brand-accent not-italic font-black underline decoration-brand-accent/30 underline-offset-8">disciplina</span>, la constancia operativa y una gestión de riesgo profesional. Si busca el camino fácil o riqueza sin esfuerzo, esta no es su academia."
                        </blockquote>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-1 bg-brand-accent rounded-full mb-4"></div>
                            <p className="text-brand-accent font-black text-xs uppercase tracking-[0.3em]">TradeVision Latam</p>
                            <p className="text-gray-500 text-[10px] font-bold uppercase mt-1 tracking-widest">Infraestructura Líder en Formación Financiera</p>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};


const MainPage: React.FC<MainPageProps> = ({ onOpenModal, tickerItems }) => {
    useEffect(() => {
        document.title = "TradeVision Latam | Academia de Trading Profesional y Estrategia C90";
    }, []);

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <div className="pt-20 bg-[#020617]">
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
