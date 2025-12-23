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
import Logo from './components/Logo';
import AffiliateProgramModal from './components/AffiliateProgramModal';

import { ModalType, PageType } from './types';
import { TICKER_MESSAGES } from './constants';
import { fetchFinancialNews } from './services/geminiService';
import { generateContextualSummary } from './utils/contextHelper';
import { useChatbotTriggers } from './hooks/useChatbotTriggers';

const App: React.FC = () => {
    const { path, navigate } = useRouter();
    
    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [isAffiliateLocked, setIsAffiliateLocked] = useState(false);
    const [showAgeGate, setShowAgeGate] = useState(() => !localStorage.getItem('age_gate_accepted'));
    const [showCookieConsent, setShowCookieConsent] = useState(() => !localStorage.getItem('cookie_consent'));
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [newsItems, setNewsItems] = useState<string[]>([]);

    const verifySession = () => {
        const access = localStorage.getItem('member_access');
        const start = localStorage.getItem('session_start');
        const now = Date.now();
        const SESSION_TTL = 172800000;

        if (access === 'true' && start) {
            const elapsed = now - parseInt(start, 10);
            return elapsed < SESSION_TTL;
        }
        return false;
    };

    useEffect(() => {
        const hasAccess = verifySession();
        setIsAuthenticated(hasAccess);
        // Pequeño delay para asegurar que el DOM esté listo antes de remover el Shield
        const shieldTimer = setTimeout(() => setIsAuthChecking(false), 800);
        return () => clearTimeout(shieldTimer);
    }, []);

    useEffect(() => {
        if (isAuthenticated) return;
        const authInterval = setInterval(() => {
            if (verifySession()) {
                setIsAuthenticated(true);
                clearInterval(authInterval);
            }
        }, 500);
        return () => clearInterval(authInterval);
    }, [isAuthenticated]);

    useEffect(() => {
        const handleOpenAffiliate = () => setIsAffiliateLocked(true);
        window.addEventListener('open-affiliate-modal', handleOpenAffiliate);
        return () => window.removeEventListener('open-affiliate-modal', handleOpenAffiliate);
    }, []);

    const pathname = path.split('?')[0];
    const slug = pathname.startsWith('/blog/') ? pathname.split('/')[2] : undefined;

    const getPageType = (pathname: string): PageType => {
        if (pathname === '/') return 'main';
        if (pathname.startsWith('/blog/')) return 'post';
        if (pathname === '/blog') return 'blog';
        if (pathname === '/faq') return 'faq';
        if (pathname === '/brokers') return 'brokers';
        if (pathname === '/premium-courses') return 'premium-courses';
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

    const handleCookieConsent = (decision: { analysis: boolean; advertising: boolean; }) => {
        localStorage.setItem('cookie_consent', JSON.stringify(decision));
        setShowCookieConsent(false);
    };

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

    useEffect(() => {
        const getNews = async () => {
            const news = await fetchFinancialNews();
            setNewsItems(news);
        };
        getNews();
    }, []);

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

    const renderModal = () => {
        switch (activeModal) {
            case 'premium-courses': return <PremiumCoursesModal onClose={closeModal} />;
            case 'affiliate': return <AffiliateModal onClose={closeModal} onOpenModal={openModal} />;
            case 'brokers': return <BrokersModal onClose={closeModal} />;
            case 'community': return <CommunityModal onClose={closeModal} />;
            case 'support': return <SupportModal onClose={closeModal} />;
            case 'mentors': return <MentorsModal onClose={closeModal} />;
            case 'consultancy': return <ConsultancyModal onClose={closeModal} />;
            case 'education': return <EducationModal onClose={closeModal} />;
            default: return null;
        }
    };

    return (
        <>
            {/* Auth Shield - shown during initial session verification */}
            {isAuthChecking && (
                <div className="fixed inset-0 bg-[#050b14] flex flex-col items-center justify-center z-[10000]">
                    <Logo className="w-24 h-24 animate-pulse drop-shadow-[0_0_25px_rgba(64,224,208,0.5)]" />
                    <div className="mt-10 w-64 h-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/10">
                        <div className="h-full bg-brand-accent animate-[shield-progress_2s_infinite] w-1/4 absolute left-0 rounded-full shadow-[0_0_15px_rgba(64,224,208,0.8)]"></div>
                    </div>
                    <style>{`
                        @keyframes shield-progress {
                            0% { left: -30%; width: 20%; }
                            50% { width: 40%; }
                            100% { left: 110%; width: 20%; }
                        }
                    `}</style>
                </div>
            )}

            {/* LoginWall Overlay - only unmounted when authenticated */}
            {!isAuthenticated && !isAuthChecking && <LoginWall />}

            {/* Main App Content - ALWAYS rendered in DOM */}
            <div className="bg-gray-50 dark:bg-brand-primary text-gray-800 dark:text-brand-white min-h-screen">
                <WelcomeBanner />
                {showAgeGate && <AgeGateModal onAccept={handleAcceptAgeGate} onViewPolicy={() => navigate('/aviso-legal-riesgo')} />}
                {!showAgeGate && showCookieConsent && <CookieConsentModal onConsent={handleCookieConsent} />}
                {isEmailModalOpen && <EmailCopyModal onClose={() => setIsEmailModalOpen(false)} />}
                
                <Router routes={routes} />
                {renderModal()}
                
                <AffiliateProgramModal 
                    isOpen={isAffiliateLocked} 
                    onClose={() => setIsAffiliateLocked(false)} 
                />

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
        </>
    );
};

export default App;