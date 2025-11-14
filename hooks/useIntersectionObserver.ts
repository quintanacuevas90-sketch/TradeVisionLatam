
import { useState, useCallback, useRef } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
    const [isIntersecting, setIntersecting] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    // Using useCallback to create a stable ref callback function.
    // This function will be the ref itself. When React attaches the ref to
    // the DOM node, this callback runs with the node.
    const refCallback = useCallback((node: HTMLElement | null) => {
        if (observer.current) {
            observer.current.disconnect(); // Clean up the old observer
        }

        observer.current = new IntersectionObserver(
            ([entry]) => {
                // We only want to trigger this once.
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    // Unobserve after it becomes visible to save resources
                    if (observer.current) {
                        observer.current.unobserve(entry.target);
                    }
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
                ...options,
            }
        );
        
        if (node) {
            observer.current.observe(node);
        }
    }, [options]); // The callback is recreated only if options change.

    return [refCallback, isIntersecting] as const;
};
