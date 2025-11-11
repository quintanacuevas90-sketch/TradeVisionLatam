import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import CountdownTimer from '../components/CountdownTimer';
import { FaWhatsapp, FaTelegram, FaCheckCircle } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { PREMIUM_TESTIMONIALS } from '../constants';
import { Testimonial } from '../types';

// --- SUB-COMPONENTS MOVED TO TOP LEVEL TO PREVENT RE-DEFINITION ON RENDER ---

// Course Card Component
interface CourseCardProps {
    course: {
        title: string;
        price: string;
        anchor: string;
        urgency: string;
        description: string;
        content: string[];
        cta: string;
        link: string;
    };
    isFeatured?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isFeatured = false }) => (
    <div className={`
        relative flex-shrink-0 w-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm 
        border dark:border-white/20 rounded-xl p-6 flex flex-col text-center 
        shadow-lg transition-all duration-300
        ${isFeatured 
            ? 'border-brand-accent md:scale-105 shadow-2xl shadow-brand-accent/20 z-10' 
            : 'hover:scale-105 hover:border-brand-accent hover:shadow-xl'
        }
    `}>
        {isFeatured && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Más Popular</div>}
        
        <h3 className="text-lg font-extrabold text-brand-primary dark:text-white uppercase tracking-wide min-h-[40px] flex items-center justify-center">{course.title}</h3>
        
        <div className="my-4">
            <span className="text-5xl font-black text-gray-800 dark:text-white">${course.price}</span>
            <p className="text-gray-500 text-sm mt-1"><del>{course.anchor}</del></p>
        </div>

        <p className="bg-red-600 text-white text-xs font-bold py-1.5 px-4 rounded-full my-4 self-center">{course.urgency}</p>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow min-h-[80px]">{course.description}</p>
        
        <ul className="text-left space-y-2 mb-8 text-sm text-gray-700 dark:text-gray-300 flex-grow">
            {course.content.map((item, index) => (
                <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
            ))}
        </ul>

        <a href={course.link} target="_blank" rel="noopener noreferrer" className="mt-auto w-full bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition duration-300 flex items-center justify-center gap-2">
            {course.cta} <FiArrowRight />
        </a>
    </div>
);


// Testimonial Carousel Component
const TestimonialCarousel: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1)),
            5000
        );
        return () => resetTimeout();
    }, [currentIndex, testimonials.length]);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === testimonials.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto h-64">
            <div className="overflow-hidden relative h-full">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-brand-accent shadow-lg flex flex-col justify-center h-full">
                             <p className="text-gray-600 dark:text-gray-300 italic mb-4 text-base">"{testimonial.quote}"</p>
                            <div className="flex items-center mt-auto">
                                <img src={testimonial.flagUrl} alt={`Bandera de ${testimonial.location}`} className="w-8 h-auto mr-3 rounded" />
                                <div>
                                    <h4 className="font-bold text-brand-primary dark:text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="absolute top-1/2 -left-4 md:-left-10 transform -translate-y-1/2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 rounded-full p-2 z-10">
                <FiChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 -right-4 md:-right-10 transform -translate-y-1/2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 rounded-full p-2 z-10">
                <FiChevronRight size={24} />
            </button>
        </div>
    );
};


// --- MAIN MODAL COMPONENT ---

const PremiumCoursesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [offerEndTime, setOfferEndTime] = useState<number | null>(null);

    useEffect(() => {
        const storedEndTime = localStorage.getItem('tradevisionOfferEndTime');
        const now = new Date().getTime();

        if (storedEndTime && parseInt(storedEndTime) > now) {
            setOfferEndTime(parseInt(storedEndTime));
        } else {
            const newEndTime = now + 8 * 60 * 60 * 1000; // 8 hours from now
            localStorage.setItem('tradevisionOfferEndTime', newEndTime.toString());
            setOfferEndTime(newEndTime);
        }
    }, []);

    const courses = [
        {
            title: "SISTEMA DE EJECUCIÓN: BINARIAS INTERMEDIO",
            price: "79",
            anchor: "Valor Real: $150 USD",
            urgency: "¡SOLO 20 CUPOS DISPONIBLES ESTE MES!",
            description: "Diseñado para el trader estancado. Elimina la improvisación y opera con un sistema basado en probabilidad y gestión de riesgo.",
            content: ["4 Fórmulas de Operación de Alta Efectividad.", "<strong>Backtesting al Extremo</strong> para confirmar validez.", "<strong>Psicotrading y Gestión de Riesgo</strong> (La Clave Maestra)."],
            cta: "ASEGURAR MI CUPO",
            link: "https://wa.me/message/T6UFHN3SSTIEJ1"
        },
        {
            title: "VISIÓN AVANZADA: EL LENGUAJE DEL PRECIO (BINARIAS PRO)",
            price: "149",
            anchor: "Valor Real: $299 USD",
            urgency: "¡Oferta válida solo por 48 horas!",
            description: "Un reseteo mental completo. Olvida los indicadores y los mitos. Aprende a leer el verdadero motor del mercado: el lenguaje del precio.",
            content: ["<strong>ROMPIENDO MITOS:</strong> Olvídate de Bots y Scripts.", "Aprende el verdadero motor del mercado: <strong>Lenguaje del Precio</strong>.", "Aplicación universal para cualquier activo y temporalidad."],
            cta: "DOMINAR EL MERCADO",
            link: "https://wa.me/message/T6UFHN3SSTIEJ1"
        },
        {
            title: "ÉLITE INSTITUCIONAL: LÓGICA Y EJECUCIÓN (FOREX Y CFD)",
            price: "349",
            anchor: "Valor del Programa: $750 USD",
            urgency: "¡ÚLTIMOS 8 CUPOS PARA ESTA GENERACIÓN!",
            description: "El programa definitivo para la profesionalización. Deja de ser la liquidez y aprende a operar junto al dinero inteligente.",
            content: ["El precio se mueve por <strong>LIQUIDEZ</strong>, no por noticias.", "El Patrón <strong>AMD Revelado</strong> (Acumulación, Manipulación, Distribución).", "Busca entradas con riesgo mínimo y beneficio <strong>5:1 o más</strong>."],
            cta: "TRANSFORMAR MI TRADING",
            link: "https://t.me/trainfxbot"
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
                    <h3 className="text-xl font-bold text-brand-accent">¡Oferta por Tiempo Limitado!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Si antes de que termine el contador compras uno de nuestros cursos de Binarias, ¡recibirás un <strong>script premium de regalo</strong>!</p>
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
                    <div className="p-4 bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 text-left rounded-r-lg mb-6">
                        <p><strong>⚠️ ALTO:</strong> Si buscas atajos o crees que el éxito llega sin inversión, este no es tu lugar. El conocimiento de élite tiene un precio porque su valor es incalculable. La ignorancia, en cambio, te costará toda tu cuenta.</p>
                    </div>
                    <p className="text-lg font-bold">Elige tu nivel de compromiso. La decisión es tuya. El momento es ahora. 👇</p>
                </section>
                
                {/* 3. Course Offers */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                        {courses.map((course, index) => (
                            <CourseCard key={course.title} course={course} isFeatured={index === 1} />
                        ))}
                    </div>
                </section>

                {/* 4. Social Proof */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold mb-6">La Voz de Nuestros Alumnos Élite</h2>
                    <TestimonialCarousel testimonials={PREMIUM_TESTIMONIALS} />
                </section>

                {/* 5. Recommended Tools */}
                <section className="text-center p-6 bg-gray-100 dark:bg-white/5 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">🛠️ Herramientas de Ejecución Profesional</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">(Recomendadas por José Quintana)</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {recommendedTools.map(tool => (
                            <a key={tool.name} href={tool.link} target="_blank" rel="noopener noreferrer" className={`font-bold py-2 px-6 rounded-lg text-white transition-opacity ${tool.color}`}>
                                {tool.name}
                            </a>
                        ))}
                    </div>
                </section>

                {/* 6. Conversion Close */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-red-500 mb-2">💳 ACCESO Y SOPORTE INMEDIATO</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Es momento de tomar la decisión que transformará tu cuenta.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                        <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition">SOPORTE DIRECTO</a>
                        <a href="https://t.me/tradevision90" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-600 transition">ÚNETE A LA COMUNIDAD</a>
                        <a href="https://linktr.ee/TradeVisionLatam" target="_blank" rel="noopener noreferrer" className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-700 transition">Todas Nuestras Redes</a>
                    </div>
                    <p className="text-xl font-extrabold text-red-500">¡NO HAY ATAJOS. HAY UN SISTEMA. ES HORA DE UNIRTE!</p>
                </section>
                
                {/* 7. Payment Methods */}
                <section className="border-t border-gray-200 dark:border-white/20 pt-6">
                    <h4 className="text-xl font-bold text-center mb-4 text-brand-primary dark:text-white">💳 Formas de Pago Aceptadas</h4>
                    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center text-sm text-gray-700 dark:text-gray-300">
                        <li>🪙 <strong>Criptomonedas (USDT):</strong> BINANCE (la forma más rápida).</li>
                        <li>💵 <strong>Dólares Digitales:</strong> PayPal, Zelle, Zinli, Volet.</li>
                        <li>🏦 <strong>Transferencias Bancarias:</strong> Banesco Panamá, Soles (BCP), y Bolívares (BS VENEZUELA).</li>
                    </ul>
                </section>

                {/* 8. Cross-sell free content */}
                 <div className="text-center border-t border-gray-200 dark:border-white/20 pt-6">
                    <h4 className="text-xl font-bold">¿Buscas Cursos y Libros Gratis?</h4>
                    <p className="text-gray-600 dark:text-gray-400 my-2">Únete a nuestra comunidad principal y accede a una vasta biblioteca de recursos sin costo.</p>
                    <a href="https://t.me/tradevision90" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition">
                        <FaTelegram />
                        ¡Accede Aquí!
                    </a>
                </div>

                 <div className="text-center pt-6">
                    <button onClick={onClose} className="bg-brand-primary text-white font-bold py-2 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300">
                       Cerrar
                    </button>
                 </div>
            </div>
        </Modal>
    );
};

export default PremiumCoursesModal;