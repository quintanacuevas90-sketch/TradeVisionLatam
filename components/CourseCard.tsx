
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight, FiDownload, FiCreditCard } from 'react-icons/fi';
import { useRouter } from '../hooks/useRouter';

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
        isFree?: boolean;
    };
    isFeatured?: boolean;
    onClose?: () => void;
    onCustomClick?: () => void; // Nueva prop para acciones como Whop
}

const CEREBRO_PDF_URL = 'https://www.tradevision.me/cerebro-digital-tradevision.pdf';
const CEREBRO_PDF_FILENAME = 'Manual_IA_TradeVision.pdf';

const CourseCard: React.FC<CourseCardProps> = ({ course, isFeatured = false, onClose, onCustomClick }) => {
    const { navigate } = useRouter();

    const isManual =
        course.price === 'BECA' ||
        (typeof course.title === 'string' && course.title.toLowerCase().includes('cerebro'));

    const isWhopCheckout = course.link.includes('plan_');

    let finalHref = course.link;
    let finalTarget: string | undefined = undefined;
    let finalRel: string | undefined = undefined;
    let finalDownload: string | undefined = undefined;
    let finalOnClick: ((e: React.MouseEvent<HTMLAnchorElement>) => void) | undefined = undefined;
    
    if (onCustomClick) {
        finalOnClick = (e) => {
            e.preventDefault();
            onCustomClick();
        };
    } else if (isManual) {
        finalHref = CEREBRO_PDF_URL;
        finalTarget = '_blank';
        finalRel = 'noopener noreferrer';
        finalDownload = CEREBRO_PDF_FILENAME;
    } else if (course.link.startsWith('#/')) {
        finalHref = course.link;
        finalOnClick = (e) => {
            e.preventDefault();
            const path = course.link.substring(1);
            navigate(path);
            onClose?.();
        };
    } else {
        finalHref = course.link;
        finalTarget = '_blank';
        finalRel = 'noopener noreferrer';
    }
    
    return (
        <div className={`
            relative flex-shrink-0 w-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm 
            border dark:border-white/20 rounded-xl p-6 flex flex-col text-center 
            shadow-lg transition-all duration-300
            ${isFeatured 
                ? 'border-brand-accent md:scale-105 shadow-2xl shadow-brand-accent/20 z-10' 
                : 'hover:scale-105 hover:border-brand-accent hover:shadow-xl'
            }
            ${isManual ? 'border-brand-accent/40 bg-gradient-to-b from-[#0A1931]/80 to-gray-800/50' : ''}
        `}>
            {isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg select-none z-10">
                    DESTACADO
                </div>
            )}
            
            <h3 className="text-lg font-extrabold text-brand-primary dark:text-white uppercase tracking-wide min-h-[40px] flex items-center justify-center">
                {course.title}
            </h3>
            
            <div className="my-4 min-h-[80px] flex flex-col justify-center">
                {isManual ? (
                    <div className="py-2">
                        <span className="inline-block bg-brand-accent/20 text-brand-accent border border-brand-accent/40 px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] shadow-sm">
                            BECA DE ACCESO: 100% BONIFICADO
                        </span>
                    </div>
                ) : (
                    <>
                        <span className="text-5xl font-black text-gray-800 dark:text-white">${course.price}</span>
                        <p className="text-gray-500 text-sm mt-1"><del>{course.anchor}</del></p>
                    </>
                )}
            </div>

            <p className={`text-xs font-bold py-1.5 px-4 rounded-full my-2 self-center ${isManual ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20' : 'bg-red-600 text-white'}`}>
                {course.urgency}
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 font-bold tracking-tight">{course.description}</p>
            
            <ul className="text-left space-y-2 mb-6 text-sm text-gray-700 dark:text-gray-300 flex-grow">
                {course.content.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <FaCheckCircle
                            size={14}
                            className={`${item.includes('<strong>') ? 'text-brand-accent' : 'text-green-500'} mr-3 mt-1 flex-shrink-0`}
                        />
                        <span className="leading-tight" dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                ))}
            </ul>

            <a
                href={finalHref}
                target={finalTarget}
                rel={finalRel}
                download={finalDownload}
                onClick={finalOnClick}
                className={`mt-auto w-full font-black py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                    isManual 
                        ? 'bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-primary' 
                        : isWhopCheckout
                        ? 'bg-gradient-to-r from-brand-accent to-blue-600 text-brand-primary hover:scale-[1.02]'
                        : 'bg-brand-accent text-brand-primary hover:bg-opacity-90'
                }`}
            >
                {isWhopCheckout && <FiCreditCard />}
                {course.cta} 
                {isManual ? <FiDownload /> : <FiArrowRight />}
            </a>
        </div>
    );
};

export default CourseCard;
