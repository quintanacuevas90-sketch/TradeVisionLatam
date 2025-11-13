import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
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
    };
    isFeatured?: boolean;
    onClose?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isFeatured = false, onClose }) => {
    const { navigate } = useRouter();
    const isInternalLink = course.link.startsWith('#/');

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isInternalLink) {
            e.preventDefault();
            const path = course.link.substring(1);
            navigate(path);
            onClose?.(); // Close modal if function is provided
        }
    };

    const linkProps = isInternalLink 
        ? { href: course.link, onClick: handleClick } 
        : { href: course.link, target: "_blank", rel: "noopener noreferrer" };

    return (
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
                {course.content.map((item, index) => {
                    const isImportant = item.includes('<strong>');
                    return (
                        <li key={index} className="flex items-start">
                            <FaCheckCircle
                                size={16}
                                className={`${isImportant ? 'text-brand-accent' : 'text-green-500'} mr-3 mt-0.5 flex-shrink-0`}
                            />
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                    );
                })}
            </ul>

            <a {...linkProps} className="mt-auto w-full bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition duration-300 flex items-center justify-center gap-2">
                {course.cta} <FiArrowRight />
            </a>
        </div>
    );
};

export default CourseCard;
