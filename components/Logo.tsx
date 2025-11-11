import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <svg
            className={`w-9 h-9 ${className}`}
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect width="52" height="52" rx="12" fill="#0A1931"/>
            <path d="M11 38.5V29.5" stroke="#001F3F" strokeWidth="8" strokeLinecap="round"/>
            <path d="M22 38.5V22.5" stroke="#001F3F" strokeWidth="8" strokeLinecap="round"/>
            <path d="M33 38.5V15.5" stroke="#001F3F" strokeWidth="8" strokeLinecap="round"/>
            <path d="M9 25L21 16L32 23L45 12" stroke="#40E0D0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M40 7L45 12L40 17" stroke="#40E0D0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default Logo;
