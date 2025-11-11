
import { useState, useEffect } from 'react';

const getCurrentPath = () => window.location.hash.slice(1) || '/';

export const useRouter = () => {
    const [path, setPath] = useState(getCurrentPath());

    useEffect(() => {
        const onHashChange = () => {
            setPath(getCurrentPath());
            window.scrollTo(0, 0); // Scroll to top on navigation
        };

        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const navigate = (newPath: string) => {
        if (window.location.hash.slice(1) !== newPath) {
             window.location.hash = newPath;
        } else {
            // If navigating to the same path, still trigger a scroll to top
            window.scrollTo(0,0);
        }
    };

    return { path, navigate };
};
