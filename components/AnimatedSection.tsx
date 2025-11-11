
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', ...props }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section
            ref={ref}
            className={`transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } ${className}`}
            {...props}
        >
            {children}
        </section>
    );
};

export default AnimatedSection;