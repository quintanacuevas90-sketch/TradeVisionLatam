
import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
    const [isIntersecting, setIntersecting] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
                ...options,
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]);

    const refCallback = (element: HTMLElement | null) => {
        elementRef.current = element;
    };

    return [refCallback, isIntersecting] as const;
};
