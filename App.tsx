
import React, { useState, useEffect, useMemo } from 'react';
import Router from './components/Router';
import { useRouter } from './hooks/useRouter';
import MainPage from './pages/MainPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import SitemapPage from './pages/SitemapPage';
import FaqPage from './pages/FaqPage';
import FaqTrustPage from './pages/FaqTrustPage';
import BrokersPage from './pages/BrokersPage';
import PremiumCoursesPage from './pages/PremiumCoursesPage';
import ConsultancyPage from './pages/ConsultancyPage';
import MethodologyPage from './pages/MethodologyPage';
import AboutPage from './pages/AboutPage';
import ResponsibilityPage from './pages/ResponsibilityPage';
import SocialImpactPage from './pages/SocialImpactPage';
import CollaboratePage from './pages/CollaboratePage';
import ForexElitePage from './pages/ForexElitePage';
import BinariasProPage from './pages/BinariasProPage';
import BinariasIntermedioPage from './pages/BinariasIntermedioPage';
import CommunityPage from './pages/CommunityPage';
import AiManualPage from './pages/AiManualPage';
import LegalVerificationPage from './pages/LegalVerificationPage';
import LegalPage from './pages/LegalPage';
import TerminosAcademiaPage from './pages/TerminosAcademiaPage';
import PoliticaPrivacidadPage from './pages/PoliticaPrivacidadPage';
import TransparenciaLegalPage from './pages/TransparenciaLegalPage';
import ExecutionZonePage from './pages/ExecutionZonePage';
import HallOfFamePage from './pages/HallOfFamePage';
import BattlegroundsPage from './pages/BattlegroundsPage';

import { PremiumCoursesModal } from './modals/PremiumCoursesModal';
import AffiliateModal from './modals/AffiliateModal';
import BrokersModal from './modals/BrokersModal';
import CommunityModal from './modals/CommunityModal';
import EducationModal from './modals/EducationModal';
import SupportModal from './modals/SupportModal';
import MentorsModal from './modals/MentorsModal';
import ConsultancyModal from './modals/ConsultancyModal';

import LoginWall from './components/LoginWall';
import WelcomeBanner from './components/WelcomeBanner';
import AgeGateModal from './components/AgeGateModal';
import CookieConsentModal from './components/CookieConsentModal';
import EmailCopyModal from './modals/EmailCopyModal';
import Chatbot from './components/Chatbot';
import WhatsAppButton from './components/WhatsAppButton';

import { ModalType, PageType } from './types';
import { TICKER_MESSAGES } from './constants';
import { fetchFinancialNews } from './services/geminiService';
import { generateContextualSummary } from './utils/contextHelper';
import { useChatbotTriggers } from './hooks/useChatbotTriggers';

const App: React.FC = () => {
    // Correct usage of React hooks and state management to resolve missing name errors.
    const { path, navigate } = useRouter();
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [showAgeGate, setShowAgeGate] = useState(() => !localStorage.getItem('age_gate_accepted'));
    const [showCookieConsent, setShowCookieConsent] = useState(() => !localStorage.getItem('cookie_consent'));
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [newsItems, setNewsItems] = useState<string[]>([]);

    // Derive current page type and slug for dynamic context summary generation.
    const pathname = path.split('?')[0];
    const slug = pathname.startsWith('/blog/') ? pathname.split('/')[2] : undefined;

    const getPageType = (pathname: string): PageType => {
        if (pathname === '/') return 'main';
        if (pathname.startsWith('/blog/')) return 'post';
        if (pathname === '/blog') return 'blog';
        if (pathname === '/sitemap') return 'sitemap';
        if (pathname === '/faq') return 'faq';
        if (pathname === '/protocolo-confianza') return 'protocolo-confianza';
        if (pathname === '/brokers') return 'brokers';
        if (pathname === '/premium-courses') return 'premium-courses';
        if (pathname === '/consultancy') return 'consultancy';
        if (pathname === '/methodology') return 'methodology';
        if (pathname === '/acerca-de') return 'acerca-de';
        if (pathname === '/responsabilidad') return 'responsabilidad';
        if (pathname === '/impacto-social') return 'impacto-social';
        if (pathname === '/colabora') return 'colabora';
        if (pathname === '/cursos/forex-elite') return 'forex-elite';
        if (pathname === '/cursos/binarias-pro-c90') return 'binarias-pro-c90';
        if (pathname === '/cursos/binarias-intermedio') return 'binarias-intermedio';
        if (pathname === '/comunidad') return 'comunidad';
        if (pathname === '/manual/ia-prompts') return 'ia-manual';
        if (pathname === '/verificacion-legal') return 'legal-verification';
        if (pathname === '/aviso-legal-riesgo') return 'aviso-legal-riesgo';
        if (pathname === '/terminos-academia') return 'terminos-academia';
        if (pathname === '/politica-privacidad') return 'politica-privacidad';
        if (pathname === '/transparencia-legal') return 'transparencia-legal';
        if (pathname === '/zona-de-ejecucion') return 'execution-zone';
        return 'main';
    };

    const pageType = getPageType(pathname);
    const chatbotContext = useMemo(() => generateContextualSummary(activeModal, pageType, slug), [activeModal, pageType, slug]);
    const { triggerText, closeTrigger } = useChatbotTriggers(activeModal, isChatOpen);

    const openModal = (type: ModalType) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    const handleAcceptAgeGate = () => {
        localStorage.setItem('age_gate_accepted', 'true');
        setShowAgeGate(false);
    };

    const handleViewPolicy = () => {
        navigate('/aviso-legal-riesgo');
    };

    const handleCookieConsent = (decision: { analysis: boolean; advertising: boolean; }) => {
        localStorage.setItem('cookie_consent', JSON.stringify(decision));
        setShowCookieConsent(false);
    };

    // Synchronization of URL parameters with modal state.
    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const openParam = params.get('open') as ModalType | null;
        if (openParam) {
            setActiveModal(openParam);
        }
    }, [path]);

    // Setup global listeners for UI triggers like chatbot or email copy modal.
    useEffect(() => {
        const handleOpenChat = () => setIsChatOpen(true);
        const handleOpenEmail = () => setIsEmailModalOpen(true);

        window.addEventListener('open-chatbot', handleOpenChat);
        window.addEventListener('open-email-modal', handleOpenEmail);

        return () => {
            window.removeEventListener('open-chatbot', handleOpenChat);
            window.removeEventListener('open-email-modal', handleOpenEmail);
        };
    }, []);

    // Initial data fetching for real-time financial news headlines.
    useEffect(() => {
        const getNews = async () => {
            const news = await fetchFinancialNews();
            setNewsItems(news);
        };
        getNews();
    }, []);

    // Define standard and dynamic routes for the custom Router component.
    const routes = {
        '/': <MainPage onOpenModal={openModal} tickerItems={TICKER_MESSAGES} />,
        '/blog': <BlogListPage />,
        '/blog/:slug': ({ slug }: { slug: string }) => <BlogPostPage slug={slug} />,
        '/sitemap': <SitemapPage onOpenModal={openModal} />,
        '/faq': <FaqPage onOpenModal={openModal} />,
        '/protocolo-confianza': <FaqTrustPage onOpenModal={openModal} />,
        '/brokers': <BrokersPage onOpenModal={openModal} />,
        '/premium-courses': <PremiumCoursesPage />,
        '/consultancy': <ConsultancyPage />,
        '/methodology': <MethodologyPage />,
        '/acerca-de': <AboutPage onOpenModal={openModal} />,
        '/responsabilidad': <ResponsibilityPage onOpenModal={openModal} />,
        '/impacto-social': <SocialImpactPage />,
        '/colabora': <CollaboratePage onOpenModal={openModal} />,
        '/cursos/forex-elite': <ForexElitePage />,
        '/cursos/binarias-pro-c90': <BinariasProPage />,
        '/cursos/binarias-intermedio': <BinariasIntermedioPage />,
        '/comunidad': <CommunityPage onOpenModal={openModal} />,
        '/manual/ia-prompts': <AiManualPage />,
        '/verificacion-legal': <LegalVerificationPage onOpenModal={openModal} />,
        '/aviso-legal-riesgo': <LegalPage />,
        '/terminos-academia': <TerminosAcademiaPage />,
        '/politica-privacidad': <PoliticaPrivacidadPage />,
        '/transparencia-legal': <TransparenciaLegalPage />,
        '/zona-de-ejecucion': <ExecutionZonePage />,
        '/hall-of-fame': <HallOfFamePage />,
        '/battlegrounds': <BattlegroundsPage />,
    };

    // Centralized modal rendering logic based on active state.
    const renderModal = () => {
        switch (activeModal) {
            case 'premium-courses':
                return <PremiumCoursesModal onClose={closeModal} />;
            case 'affiliate':
                return <AffiliateModal onClose={closeModal} onOpenModal={openModal} />;
            case 'brokers':
                return <BrokersModal onClose={closeModal} />;
            case 'community':
                return <CommunityModal onClose={closeModal} />;
            case 'support':
                return <SupportModal onClose={closeModal} />;
            case 'mentors':
                return <MentorsModal onClose={closeModal} />;
            case 'consultancy':
                return <ConsultancyModal onClose={closeModal} />;
            case 'education':
                return <EducationModal onClose={closeModal} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-brand-primary text-gray-800 dark:text-brand-white min-h-screen">
            {/* WELCOME BANNER: Solo visible para miembros */}
            <WelcomeBanner />

            {/* LOGIN WALL: Primera capa de seguridad */}
            <LoginWall />

            {showAgeGate && <AgeGateModal onAccept={handleAcceptAgeGate} onViewPolicy={handleViewPolicy} />}
            {!showAgeGate && showCookieConsent && <CookieConsentModal onConsent={handleCookieConsent} />}
            {isEmailModalOpen && <EmailCopyModal onClose={() => setIsEmailModalOpen(false)} />}
            
            <Router routes={routes} />
            {renderModal()}
            <Chatbot
                isOpen={isChatOpen}
                setIsOpen={setIsChatOpen}
                newsItems={newsItems}
                pageContext={chatbotContext}
                triggerText={triggerText}
                onOpenChat={() => setIsChatOpen(true)}
                onCloseTrigger={closeTrigger}
            />
            <WhatsAppButton />
        </div>
    );
};

export default App;
