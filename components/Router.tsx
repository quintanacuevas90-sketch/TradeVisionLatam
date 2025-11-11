

import React from 'react';
import { useRouter } from '../hooks/useRouter';

interface RouterProps {
    routes: {
        [key: string]: React.ReactNode | ((params: any) => React.ReactNode);
    };
}

const Router: React.FC<RouterProps> = ({ routes }) => {
    const { path } = useRouter();
    const pathname = path.split('?')[0];

    // Try to find a direct match first
    if (routes[pathname]) {
        const component = routes[pathname];
        return typeof component === 'function' ? component({}) : component;
    }

    // Check for dynamic routes (e.g., /blog/:slug)
    for (const route in routes) {
        if (route.includes(':')) {
            const routeParts = route.split('/').filter(p => p);
            const pathParts = pathname.split('/').filter(p => p);

            if (routeParts.length === pathParts.length) {
                const params: { [key: string]: string } = {};
                const isMatch = routeParts.every((part, i) => {
                    if (part.startsWith(':')) {
                        params[part.slice(1)] = pathParts[i];
                        return true;
                    }
                    return part === pathParts[i];
                });

                if (isMatch) {
                    const component = routes[route];
                     return typeof component === 'function' ? component(params) : component;
                }
            }
        }
    }

    // Fallback to a 404 or default route if desired
    return routes['/'] || <div>Page Not Found</div>;
};

export default Router;