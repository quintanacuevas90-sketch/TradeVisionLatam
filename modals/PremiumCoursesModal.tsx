import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import CountdownTimer from '../components/CountdownTimer';
import { FaTelegram } from 'react-icons/fa';
import { PREMIUM_TESTIMONIALS } from '../constants';
import CourseCard from '../components/CourseCard';
import TestimonialCarousel from '../components/TestimonialCarousel';

// --- MAIN MODAL COMPONENT ---

export const PremiumCoursesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [offerEndTime, setOfferEndTime] = useState<number | null>(null);

    useEffect(() => {
        const storedEndTime = localStorage.getItem('tradevisionLatamOfferEndTime');
        const now = new Date().getTime();

        if (storedEndTime && parseInt(storedEndTime) > now) {
            setOfferEndTime(parseInt(storedEndTime));
        } else {
            const newEndTime = now + 8 * 60 * 60 * 1000; // 8 hours from now
            localStorage.setItem('tradevisionLatamOfferEndTime', newEndTime.toString());
            setOfferEndTime(newEndTime);
        }
    }, []);

    const courses = [
        {
            title: "MANUAL PRO: INGENIERÍA DE PROMPTS CON IA",
            price: "15",
            anchor: "Valor Real: $50 USD",
            urgency: "Precio de Lanzamiento",
            description: "La IA de TradeVision Latam ha revolucionado nuestro Day Trading desde 2022, reduciendo el aprendizaje de una década a solo un año de automatización.",
            content: [
                "Aprende los <strong>6 Prompts maestros</strong> para entrenar a 10 asesores expertos.",
                "Automatiza gestión de riesgo, Order Flow, Smart Money y Análisis Fundamental.",
                "Incluye el prompt para <strong>crear tus propios prompts</strong> de cualquier estrategia."
            ],
            cta: "Acceder al Manual de IA",
            link: "#/manual/ia-prompts"
        },
        {
            title: "SISTEMA DE EJECUCIÓN: BINARIAS INTERMEDIO",
            price: "79",
            anchor: "Valor Real: $150 USD",
            urgency: "¡SOLO 20 CUPOS DISPONIBLES ESTE MES!",
            description: "Diseñado para el trader estancado. Elimina la improvisación y opera con un sistema basado en probabilidad y gestión de riesgo.",
            content: ["4 Fórmulas de Operación de Alta Efectividad.", "<strong>Backtesting al Extremo</strong> para confirmar validez.", "<strong>Psicotrading y Gestión de Riesgo</strong> (La Clave Maestra)."],
            cta: "Explorar Módulos del Programa",
            link: "#/cursos/binarias-intermedio"
        },
        {
            title: "VISIÓN AVANZADA: EL LENGUAJE DEL PRECIO (BINARIAS PRO)",
            price: "149",
            anchor: "Valor Real: $299 USD",
            urgency: "¡Oferta válida solo por 48 horas!",
            description: "Un reseteo mental completo. Olvida los indicadores y los mitos. Aprende a leer el verdadero motor del mercado: el lenguaje del precio.",
            content: ["<strong>ROMPIENDO MITOS:</strong> Olvídate de Bots y Scripts.", "Aprende el verdadero motor del mercado: <strong>Lenguaje del Precio</strong>.", "Aplicación universal para cualquier activo y temporalidad."],
            cta: "Asegure su Cupo Exclusivo",
            link: "#/cursos/binarias-pro-c90"
        },
        {
            title: "ÉLITE INSTITUCIONAL: CURSO FOREX (LÓGICA Y EJECUCIÓN)",
            price: "349",
            anchor: "Valor del Programa: $750 USD",
            urgency: "¡ÚLTIMOS 8 CUPOS PARA ESTA GENERACIÓN!",
            description: "El programa definitivo para la profesionalización. Deja de ser la liquidez y aprende a operar junto al dinero inteligente.",
            content: ["El precio se mueve por <strong>LIQUIDEZ</strong>, no por noticias.", "El Patrón <strong>AMD Revelado</strong> (Acumulación, Manipulación, Distribución).", "Busca entradas con riesgo mínimo y beneficio <strong>5:1 o más</strong>."],
            cta: "Explorar Módulos del Programa",
            link: "#/cursos/forex-elite"
        },
    ];

    const recommendedTools = [
        { name: "FUSION MARKETS (Bróker)", link: "https://fusionmarkets.com/?refcode=102866", color: "bg-blue-600 hover:bg-blue-700" },
        { name: "CTRADER (Plataforma)", link: "https://app.ctrader.com/?u=quintanacuevas90", color: "bg-gray-700 hover:bg-gray-800" },
        { name: "BINANCE (Wallet/Capital)", link: "https://acortar.link/A1THUU", color: "bg-yellow-400 hover:bg-yellow-500 text-black" }
    ];

    return (
        <Modal onClose={onClose} title="ACCESO A LA ZONA DE DISCIPLINA">
            <div className="space-y-12">
                
                {/* 1. Urgency Hook */}
                <section className="text-center">
                    <h3 className="text-xl font-bold text-brand-accent">¡Oportunidad por Tiempo Limitado!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">La disponibilidad de la Tutoría Estratégica de Onboarding con nuestro equipo de mentores es limitada a los cupos prioritarios de esta semana. Asegure su acceso antes de que el grupo se cierre.</p>
                    {offerEndTime && <CountdownTimer expiryTimestamp={offerEndTime} />}
                </section>

                {/* 2. Authority Message */}
                <section className="text-center p-6 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Si has llegado hasta aquí, es porque entiendes que la suerte se acabó. La rentabilidad sostenida no es un golpe de fortuna; es el resultado de un <strong>sistema, disciplina y una ejecución impecable</strong>.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        Hemos dedicado años de experiencia en estos programas. No son simples cursos, son <strong>sistemas de transformación</strong>...
                    </p>
                    <div className="p-4 bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300">
