
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


interface MainPageProps {
    onOpenModal: (modal: ModalType) => void;
    newsItems: string[];
    isLoadingNews: boolean;
}

const MainPage: React.FC<MainPageProps> = ({ onOpenModal, newsItems, isLoadingNews }) => {
    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <div className="pt-20">
                <NewsTicker newsItems={newsItems} isLoading={isLoadingNews} />
            </div>
            <main>
                <HeroSection onOpenModal={onOpenModal} />
                <FreeCommunityCtaSection />
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