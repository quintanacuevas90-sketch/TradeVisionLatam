
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import CountdownTimer from '../components/CountdownTimer';
// Fixed: Added missing FaWhatsapp import
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { PREMIUM_TESTIMONIALS } from '../constants';
import CourseCard from '../components/CourseCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ManualSalesModal from '../components/ManualSalesModal';
import WhopCheckoutHandler from '../components/WhopCheckoutHandler';

export const PremiumCoursesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [offerEndTime, setOfferEndTime] = useState<number | null>(null);
    const [isManualModalOpen, setIsManualModalOpen] = useState(false);

    useEffect(() => {
        const storedEndTime = localStorage.getItem('tradevisionLatamOfferEndTime');
        const now = new Date().getTime();

        if (storedEndTime && parseInt(storedEndTime) > now) {
            setOfferEndTime(parseInt(storedEndTime));
        } else {
            const newEndTime = now + 8 * 60 * 60 * 1000;
            localStorage.setItem('tradevisionLatamOfferEndTime', newEndTime.toString());
            setOfferEndTime(newEndTime);
        }
    }, []);

    const courses = [
        {
            title: "El Cerebro Digital: Ingeniería de Prompts para Traders",
            price: "BECA",
            anchor: "RECURSO VIP",
            urgency: "100% BONIFICADO HOY",
            description: "No necesitas saber programar. Necesitas saber preguntar.",
            content: [
                "<strong>Crear Scripts:</strong> Genera indicadores personalizados en Pine Script en segundos.",
                "<strong>Auditoría de Estrategia:</strong> Haz que la IA destroce tu operativa y encuentre las fallas.",
                "Un trader educado es un cliente para toda la vida. Por eso te lo regalamos hoy."
            ],
            cta: "DESCARGAR ARSENAL IA (PDF)",
            link: "/cerebro-digital-tradevision.pdf" 
        },
        {
            title: "SISTEMA DE EJECUCIÓN: BINARIAS INTERMEDIO",
            price: "99",
            anchor: "Valor Real: $150 USD",
            urgency: "¡SOLO 20 CUPOS DISPONIBLES ESTE MES!",
            description: "Diseñado para el trader estancado. Elimina la improvisación y opera con un sistema basado en probabilidad y gestión de riesgo.",
            content: ["4 Fórmulas de Operación de Alta Efectividad.", "<strong>Backtesting al Extremo</strong> para confirmar validez.", "<strong>Psicotrading y Gestión de Riesgo</strong> (La Clave Maestra)."],
            cta: "Comprar Acceso Directo",
            link: "plan_ojropXjBUERKG" // Plan ID para detección en CourseCard
        },
        {
            title: "VISIÓN AVANZADA: EL LENGUAJE DEL PRECIO (BINARIAS PRO)",
            price: "199",
            anchor: "Valor Real: $299 USD",
            urgency: "¡Oferta válida solo por 48 horas!",
            description: "Un reseteo mental completo. Olvida los indicadores y los mitos. Aprende a leer el verdadero motor del mercado.",
            content: ["<strong>ROMPIENDO MITOS:</strong> Olvídate de Bots y Scripts.", "Aprende el verdadero motor del mercado: <strong>Lenguaje del Precio</strong>.", "Aplicación universal para cualquier activo y temporalidad."],
            cta: "Explorar Programa Pro",
            link: "#/cursos/binarias-pro-c90"
        },
        {
            title: "ÉLITE INSTITUCIONAL: CURSO FOREX (LÓGICA Y EJECUCIÓN)",
            price: "499",
            anchor: "Valor del Programa: $750 USD",
            urgency: "¡ÚLTIMOS 8 CUPOS PARA ESTA GENERACIÓN!",
            description: "El programa definitivo para la profesionalización. Deja de ser la liquidez y aprende a operar junto al dinero inteligente.",
            content: ["El precio se mueve por <strong>LIQUIDEZ</strong>, no por noticias.", "El Patrón <strong>AMD Revelado</strong> (Acumulación, Manipulación, Distribución).", "Busca entradas con riesgo mínimo y beneficio <strong>5:1 o más</strong>."],
            cta: "Ver Módulos Élite",
            link: "#/cursos/forex-elite"
        },
    ];

    return (
        <Modal onClose={onClose} title="ACCESO A LA ZONA DE DISCIPLINA">
            <ManualSalesModal isOpen={isManualModalOpen} onClose={() => setIsManualModalOpen(false)} />

            <div className="space-y-12">
                <section className="text-center">
                    <h3 className="text-xl font-bold text-brand-accent">¡Oportunidad por Tiempo Limitado!</h3>
                    {offerEndTime && <CountdownTimer expiryTimestamp={offerEndTime} />}
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {courses.map((course) => (
                        course.link === "plan_ojropXjBUERKG" ? (
                            <WhopCheckoutHandler 
                                key={course.title}
                                planId={course.link}
                                trigger={(open) => (
                                    <CourseCard 
                                        course={course} 
                                        onCustomClick={open}
                                    />
                                )}
                            />
                        ) : (
                            <CourseCard 
                                key={course.title}
                                course={course} 
                                isFeatured={course.title.includes('FOREX')}
                                onClose={onClose}
                            />
                        )
                    ))}
                </section>

                <section className="text-center">
                    <h2 className="text-3xl font-bold mb-6 text-brand-primary dark:text-white uppercase">La Voz de Nuestros Alumnos Élite</h2>
                    <TestimonialCarousel testimonials={PREMIUM_TESTIMONIALS} />
                </section>

                <section className="text-center">
                    <h2 className="text-3xl font-bold text-red-500 mb-2 uppercase tracking-tighter">💳 Soporte e Inscripción Directa</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                        <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-black py-4 px-10 rounded-xl text-lg hover:bg-green-500 transition shadow-lg flex items-center justify-center gap-3">
                            <FaWhatsapp size={24} /> PAGO MÓVIL / ASESORÍA
                        </a>
                    </div>
                </section>
            </div>
        </Modal>
    );
};
