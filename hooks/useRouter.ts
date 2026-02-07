
import { useState, useEffect } from 'react';

const getCurrentPath = () => window.location.pathname || '/';

export const useRouter = () => {
    const [path, setPath] = useState(getCurrentPath());

    useEffect(() => {
        const onPopState = () => {
            setPath(getCurrentPath());
            window.scrollTo(0, 0);
        };

        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const navigate = (newPath: string) => {
        if (window.location.pathname !== newPath) {
            window.history.pushState({}, '', newPath);
            setPath(newPath);
            window.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 0);
        }
    };

    return { path, navigate };
};
