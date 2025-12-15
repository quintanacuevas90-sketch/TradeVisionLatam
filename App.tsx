// FIX: Corrected import statement for React and its hooks.
import React, { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import SitemapPage from './pages/SitemapPage';
import { ModalType, PageType } from './types';
// FIX: The default import for PremiumCoursesModal was causing an error. It has been changed to a named import to resolve the issue.
import { PremiumCoursesModal } from './modals/PremiumCoursesModal';
import AffiliateModal from './modals/AffiliateModal';
import BrokersModal from './modals/BrokersModal';
import CommunityModal from './modals/CommunityModal';
import EducationModal from './modals/EducationModal';
import SupportModal from './modals/SupportModal';
import ConsultancyModal from './modals/ConsultancyModal';
import Chatbot from './components/Chatbot';
import WhatsAppButton from './components/WhatsAppButton';
import { fetchFinancialNews } from './services/geminiService';
import { generateContextualSummary } from './utils/contextHelper';
import Router from './components/Router';
import { useRouter } from './hooks/useRouter';
import MentorsModal from './modals/MentorsModal';
import FaqPage from './pages/FaqPage';
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
import { useChatbotTriggers } from './hooks/useChatbotTriggers';
import AiManualPage from './pages/AiManualPage';
import LegalVerificationPage from './pages/LegalVerificationPage';
import AvisoLegalRiesgoPage from './pages/LegalPage';
import TerminosAcademiaPage from './pages/TerminosAcademiaPage';
import PoliticaPrivacidadPage from './pages/PoliticaPrivacidadPage';
import TransparenciaLegalPage from './pages/TransparenciaLegalPage';
import ExecutionZonePage from './pages/ExecutionZonePage';
import BattlegroundsPage from './pages/BattlegroundsPage';
import HallOfFamePage from './pages/HallOfFamePage'; // Import Hall of Fame
import AgeGateModal from './components/AgeGateModal';
import CookieConsentModal from './components/CookieConsentModal';
import FaqTrustPage from './pages/FaqTrustPage';
import EmailCopyModal from './modals/EmailCopyModal';
import { TICKER_MESSAGES } from './constants';
import LoginWall from './components/LoginWall'; // IMPORTACIÓN DEL MURO DE ACCESO

const App: React.FC = () => {
    const { path, navigate } = useRouter();
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [newsItems, setNewsItems] = useState<string[]>([]);
    const [isLoadingNews, setIsLoadingNews] = useState(true);
    const [chatbotContext, setChatbotContext] = useState<string>('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { triggerText, closeTrigger } = useChatbotTriggers(activeModal, isChatOpen);
    const [showAgeGate, setShowAgeGate] = useState(false);
    const [showCookieConsent, setShowCookieConsent] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    // Age Gate & Cookie Consent logic
    useEffect(() => {
        const isAgeGateAccepted = localStorage.getItem('ageGateAccepted') === 'true';
        const isCookieConsentSet = localStorage.getItem('cookieConsent') !== null;

        if (!isAgeGateAccepted) {
            setShowAgeGate(true);
        } else if (!isCookieConsentSet) {
            setShowCookieConsent(true);
        }
    }, []);

    // Effect to manage body scroll for all modals
    useEffect(() => {
        const isModalOpen = showAgeGate || showCookieConsent || isEmailModalOpen;
        // Solo aplicar hidden si el LoginWall NO está activo (el LoginWall maneja su propio scroll)
        // Pero como el LoginWall se monta al principio, su lógica tiene prioridad.
        // Aquí manejamos los otros modales.
        const isLoginWallPassed = localStorage.getItem('member_access') === 'true';
        if (isLoginWallPassed) {
             document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
        }
    }, [showAgeGate, showCookieConsent, isEmailModalOpen]);

    const handleAcceptAgeGate = () => {
        localStorage.setItem('ageGateAccepted', 'true');
        setShowAgeGate(false);
        if (localStorage.getItem('cookieConsent') === null) {
            setShowCookieConsent(true);
        }
    };

    const handleViewPolicy = () => {
        navigate('/terminos-academia');
        handleAcceptAgeGate();
    };
    
    const handleCookieConsent = (decision: { analysis: boolean; advertising: boolean; }) => {
        const consentData = {
            timestamp: new Date().toISOString(),
            ...decision
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        setShowCookieConsent(false);
    };

    // Logic to open/close modals based on URL hash query params.
    useEffect(() => {
        const params = new URLSearchParams(path.split('?')[1] || '');
        const modalToOpen = params.get('open') as ModalType | null;
        const validModals: ModalType[] = ['premium-courses', 'affiliate', 'brokers', 'community', 'support', 'mentors'];

        if (modalToOpen && validModals.includes(modalToOpen)) {
            setActiveModal(modalToOpen);
        } else {
            setActiveModal(null);
        }
    }, [path]);

    // Listener for custom event to open chatbot from anywhere
    useEffect(() => {
        const handleOpenChat = () => {
            setTimeout(() => setIsChatOpen(true), 50);
        };
        window.addEventListener('open-chatbot', handleOpenChat);
        return () => window.removeEventListener('open-chatbot', handleOpenChat);
    }, []);

    // Listener for custom event to open Email Modal
    useEffect(() => {
        const handleOpenEmail = () => setIsEmailModalOpen(true);
        window.addEventListener('open-email-modal', handleOpenEmail);
        return () => window.removeEventListener('open-email-modal', handleOpenEmail);
    }, []);

    useEffect(() => {
        const getNews = async () => {
            setIsLoadingNews(true);
            const items = await fetchFinancialNews();
            setNewsItems(items);
            setIsLoadingNews(false);
        };
        getNews();
    }, []);

    useEffect(() => {
        let currentPage: PageType = 'main';
        let pageSlug: string | undefined = undefined;
        const pathname = path.split('?')[0];

        if (pathname === '/blog') currentPage = 'blog';
        else if (pathname.startsWith('/blog/')) { currentPage = 'post'; pageSlug = pathname.split('/')[2]; }
        else if (pathname === '/sitemap') currentPage = 'sitemap';
        else if (pathname === '/faq') currentPage = 'faq';
        else if (pathname === '/brokers') currentPage = 'brokers';
        else if (pathname === '/premium-courses') currentPage = 'premium-courses';
        else if (pathname === '/consultancy') currentPage = 'consultancy';
        else if (pathname === '/methodology') currentPage = 'methodology';
        else if (pathname === '/acerca-de') currentPage = 'acerca-de';
        else if (pathname === '/responsabilidad') currentPage = 'responsabilidad';
        else if (pathname === '/impacto-social') currentPage = 'impacto-social';
        else if (pathname === '/colabora') currentPage = 'colabora';
        else if (pathname === '/cursos/forex-elite') currentPage = 'forex-elite';
        else if (pathname === '/cursos/binarias-pro-c90') currentPage = 'binarias-pro-c90';
        else if (pathname === '/cursos/binarias-intermedio') currentPage = 'binarias-intermedio';
        else if (pathname === '/comunidad') currentPage = 'comunidad';
        else if (pathname === '/manual/ia-prompts') currentPage = 'ia-manual';
        else if (pathname === '/verificacion-legal') currentPage = 'legal-verification';
        else if (pathname === '/aviso-legal-riesgo') currentPage = 'aviso-legal-riesgo';
        else if (pathname === '/terminos-academia') currentPage = 'terminos-academia';
        else if (pathname === '/politica-privacidad') currentPage = 'politica-privacidad';
        else if (pathname === '/transparencia-legal') currentPage = 'transparencia-legal';
        else if (pathname === '/zona-de-ejecucion') currentPage = 'execution-zone';
        else if (pathname === '/protocolo-confianza') currentPage = 'protocolo-confianza';

        const summary = generateContextualSummary(activeModal, currentPage, pageSlug);
        setChatbotContext(summary);
    }, [activeModal, path]);

    const handleOpenModal = (modal: ModalType) => {
        const basePath = path.split('?')[0];
        navigate(`${basePath}?open=${modal}`);
    };
    
    const handleCloseModal = () => {
        const basePath = path.split('?')[0];
        navigate(basePath);
    };

    const renderModal = () => {
        switch (activeModal) {
            case 'premium-courses': return <PremiumCoursesModal onClose={handleCloseModal} />;
            case 'affiliate': return <AffiliateModal onClose={handleCloseModal} onOpenModal={() => navigate('/consultancy')} />;
            case 'brokers': return <BrokersModal onClose={handleCloseModal} />;
            case 'community': return <CommunityModal onClose={handleCloseModal} />;
            case 'support': return <SupportModal onClose={handleCloseModal} />;
            case 'mentors': return <MentorsModal onClose={handleCloseModal} />;
            default: return null;
        }
    };

    const routes = {
        '/': <MainPage onOpenModal={handleOpenModal} tickerItems={TICKER_MESSAGES} />,
        '/blog': <BlogListPage />,
        '/blog/:slug': (params: { slug: string }) => <BlogPostPage slug={params.slug} />,
        '/sitemap': <SitemapPage onOpenModal={handleOpenModal} />,
        '/faq': <FaqPage onOpenModal={handleOpenModal} />,
        '/brokers': <BrokersPage onOpenModal={handleOpenModal} />,
        '/premium-courses': <PremiumCoursesPage />,
        '/consultancy': <ConsultancyPage />,
        '/methodology': <MethodologyPage />,
        '/acerca-de': <AboutPage onOpenModal={handleOpenModal} />,
        '/responsabilidad': <ResponsibilityPage onOpenModal={handleOpenModal} />,
        '/impacto-social': <SocialImpactPage />,
        '/colabora': <CollaboratePage onOpenModal={handleOpenModal} />,
        '/cursos/forex-elite': <ForexElitePage />,
        '/cursos/binarias-pro-c90': <BinariasProPage />,
        '/cursos/binarias-intermedio': <BinariasIntermedioPage />,
        '/comunidad': <CommunityPage onOpenModal={handleOpenModal} />,
        '/manual/ia-prompts': <AiManualPage />,
        '/verificacion-legal': <LegalVerificationPage onOpenModal={handleOpenModal} />,
        '/aviso-legal-riesgo': <AvisoLegalRiesgoPage />,
        '/terminos-academia': <TerminosAcademiaPage />,
        '/politica-privacidad': <PoliticaPrivacidadPage />,
        '/transparencia-legal': <TransparenciaLegalPage />,
        '/zona-de-ejecucion': <ExecutionZonePage />,
        '/protocolo-confianza': <FaqTrustPage onOpenModal={handleOpenModal} />,
        '/battlegrounds': <BattlegroundsPage />,
        '/hall-of-fame': <HallOfFamePage />, // Add Hall of Fame route
    };

    return (
        <div className="bg-gray-50 dark:bg-brand-primary text-gray-800 dark:text-brand-white min-h-screen">
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
                onCloseTrigger={closeTrigger}
            />
            <WhatsAppButton />
        </div>
    );
};

export default App;