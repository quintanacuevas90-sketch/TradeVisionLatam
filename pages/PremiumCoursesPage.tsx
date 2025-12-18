import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import CountdownTimer from '../components/CountdownTimer';
import { FaTelegram } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { PREMIUM_TESTIMONIALS } from '../constants';
import CourseCard from '../components/CourseCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import PageBackButton from '../components/PageBackButton';
import ManualSalesModal from '../components/ManualSalesModal';

// --- MAIN PAGE COMPONENT ---
const PremiumCoursesPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);
    const [isManualModalOpen, setIsManualModalOpen] = useState(false);

    useEffect(() => {
        document.title = "Cursos Premium | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Accede a nuestra formación élite en trading. Cursos de Binarias (Intermedio y Pro) y Forex (Lógica Institucional) para llevar tu operativa al siguiente nivel.");
        }
    }, []);

    const [offerEndTime, setOfferEndTime] = useState<number | null>(null);
    useEffect(() => {
        const storedEndTime = localStorage.getItem('tradevisionOfferEndTime');
        const now = new Date().getTime();
        if (storedEndTime && parseInt(storedEndTime) > now) {
            setOfferEndTime(parseInt(storedEndTime));
        } else {
            const newEndTime = now + 8 * 60 * 60 * 1000; // 8 hours
            localStorage.setItem('tradevisionOfferEndTime', newEndTime.toString());
            setOfferEndTime(newEndTime);
        }
    }, []);

    const courses = [
        {
            title: "MANUAL PRO: INGENIERÍA DE PROMPTS CON IA",
            price: "19.99",
            anchor: "Valor Real: $50 USD",
            urgency: "OFERTA DE LANZAMIENTO",
            description: "Aprende los 6 Prompts maestros para entrenar a la IA como tu asesor experto en gestión de riesgo, Order Flow y Smart Money.",
            content: [
                "Ahorra $30 USD hoy mismo.",
                "Arquitectura de <strong>Prompts Dinámicos</strong> V2.0.",
                "Protocolo de entrega personalizada (2 días)."
            ],
            cta: "ASEGURAR MI COPIA",
            link: "OPEN_MANUAL_MODAL" 
        },
        { title: "SISTEMA DE EJECUCIÓN: BINARIAS INTERMEDIO", price: "99", anchor: "Valor Real: $150 USD", urgency: "¡SOLO 20 CUPOS DISPONIBLES ESTE MES!", description: "Diseñado para el trader estancado. Elimina la improvisación y opera con un sistema basado en probabilidad y gestión de riesgo.", content: ["4 Fórmulas de Operación de Alta Efectividad.", "<strong>Backtesting al Extremo</strong> para confirmar validez.", "<strong>Psicotrading y Gestión de Riesgo</strong> (La Clave Maestra)."], cta: "Explorar Módulos del Programa", link: "#/cursos/binarias-intermedio" },
        { title: "VISIÓN AVANZADA: EL LENGUAJE DEL PRECIO (BINARIAS PRO)", price: "199", anchor: "Valor Real: $299 USD", urgency: "¡Oferta válida solo por 48 horas!", description: "Un reseteo mental completo. Olvida los indicadores y los mitos. Aprende a leer el verdadero motor del mercado: el lenguaje del precio.", content: ["<strong>ROMPIENDO MITOS:</strong> Olvídate de Bots y Scripts.", "Aprende el verdadero motor del mercado: <strong>Lenguaje del Precio</strong>.", "Aplicación universal para cualquier activo y temporalidad."], cta: "Asegure su Cupo Exclusivo", link: "#/cursos/binarias-pro-c90" },
        { title: "ÉLITE INSTITUCIONAL: CURSO FOREX (LÓGICA Y EJECUCIÓN)", price: "499", anchor: "Valor del Programa: $750 USD", urgency: "¡ÚLTIMOS 8 CUPOS PARA ESTA GENERACIÓN!", description: "El programa definitivo para la profesionalización. Deja de ser la liquidez y aprende a operar junto al dinero inteligente.", content: ["El precio se mueve por <strong>LIQUIDEZ</strong>, no por noticias.", "El Patrón <strong>AMD Revelado</strong> (Acumulación, Manipulación, Distribución).", "Busca entradas con riesgo mínimo y beneficio <strong>5:1 o más</strong>."], cta: "Explorar Módulos del Programa", link: "#/cursos/forex-elite" },
    ];
    const recommendedTools = [
        { name: "FUSION MARKETS (Bróker)", link: "https://fusionmarkets.com/?refcode=102866", color: "bg-blue-600 hover:bg-blue-700" },
        { name: "CTRADER (Plataforma)", link: "https://app.ctrader.com/?u=quintanacuevas90", color: "bg-gray-700 hover:bg-gray-800" },
        { name: "BINANCE (Wallet/Capital)", link: "https://acortar.link/A1THUU", color: "bg-yellow-400 hover:bg-yellow-500 text-black" }
    ];

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            
            {/* Modal de Ventas del Manual */}
            <ManualSalesModal isOpen={isManualModalOpen} onClose={() => setIsManualModalOpen(false)} />

            <main className="pt-20 bg-gray-50 dark:bg-gray-800">
                <AnimatedSection className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                        <div className="mb-8">
                            <PageBackButton />
                        </div>
                        
                        {/* Header with Mascot */}
                        <section className="flex flex-col md:flex-row items-center justify-center gap-8 bg-gray-100 dark:bg-white/5 p-8 rounded-lg border border-gray-200 dark:border-white/10">
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary dark:text-white">ACCESO A LA ZONA DE DISCIPLINA</h1>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 mt-4">Si has llegado hasta aquí, es porque entiendes que la suerte se acabó. La rentabilidad sostenida no es un golpe de fortuna; es el resultado de un <strong>sistema, disciplina y una ejecución impecable</strong>.</p>
                                <p className="text-gray-700 dark:text-gray-300 mb-6">Hemos dedicado años de experiencia en estos programas. No son simples cursos, son <strong>sistemas de transformación</strong>...</p>
                                <div className="p-4 bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 text-left rounded-r-lg mb-6"><p><strong>⚠️ ALTO:</strong> Si buscas atajos o crees que el éxito llega sin inversión, este no es tu lugar. El conocimiento de élite tiene un precio porque su valor es incalculable. La ignorancia, en cambio, te costará toda tu cuenta.</p></div>
                                <p className="text-lg font-bold">Elige tu nivel de compromiso. La decisión es tuya. El momento es ahora. 👇</p>
                            </div>
                            <div className="flex-shrink-0">
                                <img 
                                    src="https://i.pinimg.com/736x/33/1d/7e/331d7ee5c20f61edc6704019d192accd.jpg" 
                                    alt="Mascota TradeVision Enseñando" 
                                    className="w-48 md:w-64 rounded-full border-4 border-brand-accent shadow-2xl hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </section>

                        <section className="text-center">
                            <h3 className="text-xl font-bold text-brand-accent">¡Oportunidad por Tiempo Limitado!</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">La disponibilidad de la Tutoría Estratégica de Onboarding con nuestro equipo de mentores es limitada a los cupos prioritarios de esta semana. Asegure su acceso antes de que el grupo se cierre.</p>
                            {offerEndTime && <CountdownTimer expiryTimestamp={offerEndTime} />}
                        </section>

                        <section>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                {courses.map((course) => (
                                    <div 
                                        key={course.title}
                                        onClick={() => course.link === "OPEN_MANUAL_MODAL" ? setIsManualModalOpen(true) : null}
                                        className={course.link === "OPEN_MANUAL_MODAL" ? "cursor-pointer" : ""}
                                    >
                                        <CourseCard 
                                            course={course} 
                                            isFeatured={course.title.toLowerCase().includes('forex')} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="text-center"><h2 className="text-3xl font-bold mb-6">La Voz de Nuestros Alumnos Élite</h2><TestimonialCarousel testimonials={PREMIUM_TESTIMONIALS} /></section>
                        <section className="text-center p-6 bg-gray-100 dark:bg-white/5 rounded-lg"><h2 className="text-2xl font-bold mb-4">🛠️ Herramientas de Ejecución Profesional</h2><p className="text-gray-600 dark:text-gray-400 mb-6">(Recomendadas por José Quintana)</p><div className="flex flex-wrap justify-center gap-4">{recommendedTools.map(tool => (<a key={tool.name} href={tool.link} target="_blank" rel="noopener noreferrer" className={`font-bold py-2 px-6 rounded-lg text-white transition-opacity ${tool.color}`}>{tool.name}</a>))}</div></section>
                        <section className="text-center"><h2 className="text-3xl font-bold text-red-500 mb-2">💳 ACCESO Y SOPORTE INMEDIATO</h2><p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Es momento de tomar la decisión que transformará tu cuenta.</p><div className="flex flex-col sm:flex-row justify-center gap-4 mb-6"><a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition">SOPORTE DIRECTO</a><a href="https://t.me/tradevision90" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-600 transition">ÚNETE A LA COMUNIDAD</a><a href="https://linktr.ee/TradeVisionLatam" target="_blank" rel="noopener noreferrer" className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition">Todas Nuestras Redes</a></div><p className="text-xl font-extrabold text-red-500">¡NO HAY ATAJOS. HAY UN SISTEMA. ES HORA DE UNIRTE!</p></section>
                        <section className="border-t border-gray-200 dark:border-white/20 pt-6"><h4 className="text-xl font-bold text-center mb-4 text-brand-primary dark:text-white">💳 Formas de Pago Aceptadas</h4><ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center text-sm text-gray-700 dark:text-gray-300"><li>🪙 <strong>Criptomonedas (USDT):</strong> BINANCE (la forma más rápida).</li><li>💵 <strong>Dólares Digitales:</strong> PayPal, Zelle, Zinli, Volet.</li><li>🏦 <strong>Transferencias Bancarias:</strong> Banesco Panamá, Soles (BCP), y Bolívares (BS VENEZUELA).</li></ul></section>
                        <div className="text-center border-t border-gray-200 dark:border-white/20 pt-6"><h4 className="text-xl font-bold">¿Buscas Cursos y Libros Gratis?</h4><p className="text-gray-600 dark:text-gray-400 my-2">Únete a nuestra comunidad principal y accede a una vasta biblioteca de recursos sin costo.</p><a href="https://t.me/tradevision90" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition"><FaTelegram />¡Accede Aquí!</a></div>
                        <div className="text-center mt-12"><button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300"><FiArrowLeft /> Volver a la Página Principal</button></div>
                    </div>
                </AnimatedSection>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default PremiumCoursesPage;