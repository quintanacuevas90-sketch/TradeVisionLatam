import React, { useEffect } from 'react';
import { useRouter } from '../hooks/useRouter';

/**
 * This is a placeholder component.
 * The main blog logic is handled by BlogListPage.tsx and BlogPostPage.tsx.
 * This file was likely an artifact and was empty, causing a build failure.
 * It now redirects to the correct blog index page to ensure stability.
 */
const BlogPage: React.FC = () => {
    const { navigate } = useRouter();
    
    useEffect(() => {
        // Automatically redirect to the main blog list page
        navigate('/blog');
    }, [navigate]);
    
    // Render nothing, as the redirect will happen immediately
    return null;
};

export default BlogPage;
