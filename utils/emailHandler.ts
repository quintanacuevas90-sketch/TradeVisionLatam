import React from 'react';

export const EMAIL_ADDRESS = "tradevision2026@gmail.com";
export const EMAIL_TOOLTIP = "tradevision2026@gmail.com - Clic para ver opciones";

export const handleEmailClick = (e?: React.MouseEvent) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Dispatch a custom event that App.tsx will listen to
    window.dispatchEvent(new CustomEvent('open-email-modal'));
};