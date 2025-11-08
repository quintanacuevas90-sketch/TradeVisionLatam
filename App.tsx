
import React, { useState } from 'react';
import MainPage from './pages/MainPage';
import { ModalType } from './types';
import PremiumCoursesModal from './modals/PremiumCoursesModal';
import AffiliateModal from './modals/AffiliateModal';
import LegalModal from './modals/LegalModal';
import BrokersModal from './modals/BrokersModal';
import CommunityModal from './modals/CommunityModal';
import EducationModal from './modals/EducationModal';
import AboutModal from './modals/AboutModal';
import SupportModal from './modals/SupportModal';
import ConsultancyModal from './modals/ConsultancyModal';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);

    const handleOpenModal = (modal: ModalType) => setActiveModal(modal);
    const handleCloseModal = () => setActiveModal(null);

    const renderModal = () => {
        switch (activeModal) {
            case 'premium-courses':
                return <PremiumCoursesModal onClose={handleCloseModal} />;
            case 'affiliate':
                return <AffiliateModal onClose={handleCloseModal} />;
            case 'legal':
                return <LegalModal onClose={handleCloseModal} />;
            case 'brokers':
                return <BrokersModal onClose={handleCloseModal} />;
            case 'community':
                return <CommunityModal onClose={handleCloseModal} />;
            case 'education':
                return <EducationModal onClose={handleCloseModal} />;
            case 'about':
                return <AboutModal onClose={handleCloseModal} />;
            case 'support':
                return <SupportModal onClose={handleCloseModal} />;
            case 'consultancy':
                return <ConsultancyModal onClose={handleCloseModal} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-brand-primary text-brand-white min-h-screen">
            <MainPage onOpenModal={handleOpenModal} />
            {renderModal()}
            <Chatbot />
        </div>
    );
};

export default App;
