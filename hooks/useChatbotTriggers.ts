import { useState, useEffect } from 'react';
import { useRouter } from './useRouter';
import { ModalType } from '../types';

export const useChatbotTriggers = (activeModal: ModalType | null, isChatOpen: boolean) => {
    const { path } = useRouter();
    const [triggerText, setTriggerText] = useState<string | null>(null);

    // This effect handles page-based and timed triggers
    useEffect(() => {
        const triggerClosedThisSession = sessionStorage.getItem('chatbotTriggerClosed');
        if (triggerClosedThisSession || isChatOpen) {
            setTriggerText(null);
            return;
        }

        let timerId: ReturnType<typeof setTimeout>;

        // Function to set trigger only once per page view
        const setTrigger = (text: string, delay: number) => {
            timerId = setTimeout(() => {
                // Check again in case the user opened the chat while waiting
                if (!sessionStorage.getItem('chatbotTriggerClosed')) {
                    setTriggerText(text);
                }
            }, delay);
        };
        
        // Reset on path change
        setTriggerText(null);
        
        const pathname = path.split('?')[0];

        if (pathname.startsWith('/cursos/')) {
            setTrigger("¿Dudas sobre este curso? Pregúntame el precio, los métodos de pago o el contenido. Tengo la respuesta inmediata.", 8000);
        } else if (pathname === '/brokers' || activeModal === 'affiliate') {
            setTrigger("¿Buscas el enlace de registro correcto? ¿Quieres saber los beneficios de nuestro soporte de afiliados? Te doy la info certera aquí.", 8000);
        } else if (pathname.startsWith('/blog') || pathname === '/faq' || pathname === '/colabora') {
            setTrigger("¿Necesitas una definición rápida de 'Psicotrading' o 'Lógica Institucional'? Pídeme un resumen. Estoy aquí para ayudarte.", 15000);
        } else if (pathname === '/') {
            setTrigger("¡Hola! ¿Buscas información precisa? He sido entrenado por el equipo TradeVision. Pregúntame cualquier cosa sobre la academia.", 20000);
        }

        return () => clearTimeout(timerId);

    }, [path, activeModal, isChatOpen]);

    // This effect handles exit intent
    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            const triggerClosedThisSession = sessionStorage.getItem('chatbotTriggerClosed');
            // Check if clientY is at the top of the viewport, no trigger is active, and no trigger has been closed, and chat is not open
            if (e.clientY <= 0 && !triggerText && !triggerClosedThisSession && !isChatOpen) {
                setTriggerText("¡Espera! ¿No encontraste lo que buscabas? Dame 10 segundos y te daré la respuesta precisa.");
            }
        };

        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [triggerText, isChatOpen]);

    const closeTrigger = () => {
        setTriggerText(null);
        sessionStorage.setItem('chatbotTriggerClosed', 'true');
    };
    
    return { triggerText, closeTrigger };
};