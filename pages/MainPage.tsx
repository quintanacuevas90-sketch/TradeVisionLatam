
import React from 'react';
import Header from '../components/Header';
import NewsTicker from '../components/NewsTicker';
import HeroSection from '../sections/HeroSection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import EducationSection from '../sections/EducationSection';
import PremiumCoursesCtaSection from '../sections/PremiumCoursesCtaSection';
import BrokersSection from '../sections/BrokersSection';
import GiftSection from '../sections/GiftSection';
import CommunitySection from '../sections/CommunitySection';
import TestimonialsSection from '../sections/TestimonialsSection';
import AboutSection from '../sections/AboutSection';
import BlogSection from '../sections/BlogSection';
import FaqSection from '../sections/FaqSection';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';

interface MainPageProps {
    onOpenModal: (modal: ModalType) => void;
}

const MainPage: React.FC<MainPageProps> = ({ onOpenModal }) => {
    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <NewsTicker />
            <main>
                <HeroSection onOpenModal={onOpenModal} />
                <WhyChooseUsSection />
                <EducationSection onOpenModal={onOpenModal} />
                <PremiumCoursesCtaSection onOpenModal={onOpenModal} />
                <BrokersSection />
                <GiftSection />
                <CommunitySection onOpenModal={onOpenModal} />
                <TestimonialsSection />
                <AboutSection onOpenModal={onOpenModal} />
                <BlogSection />
                <FaqSection />
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default MainPage;
