import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from '../hooks/useRouter';

interface PageBackButtonProps {
    variant?: 'default' | 'on-dark';
}

const PageBackButton: React.FC<PageBackButtonProps> = ({ variant = 'default' }) => {
    const { path, navigate } = useRouter();

    const goBack = () => {
        const pathname = path.split('?')[0];

        // If on a blog post, go to blog list
        if (pathname.startsWith('/blog/') && pathname.split('/').length > 2) {
            navigate('/blog');
            return;
        }

        // If on a course page or AI manual page, go to courses list
        if (pathname.startsWith('/cursos/') || pathname === '/manual/ia-prompts') {
            navigate('/premium-courses');
            return;
        }

        // If on any other sub-page that is not the homepage, go to homepage
        if (pathname !== '/') {
            navigate('/');
            return;
        }

        // As a last resort, if on the homepage, use history.back() to leave the site
        // This is standard browser behavior for a back button on the root page with no prior history in the app.
        window.history.back();
    };

    const colorClasses = variant === 'on-dark'
        ? 'text-gray-300 hover:text-white'
        : 'text-gray-600 dark:text-gray-400 hover:text-brand-accent';

    return (
        <button
            onClick={goBack}
            className={`flex items-center gap-2 ${colorClasses} transition-colors font-semibold`}
            aria-label="Volver"
        >
            <FiArrowLeft size={20} />
            Volver
        </button>
    );
};

export default PageBackButton;