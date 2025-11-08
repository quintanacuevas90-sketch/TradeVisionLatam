
import React from 'react';
import Modal from './Modal';
import { LEGAL_TEXT } from '../constants';

const LegalModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Información Legal y Advertencia de Riesgo">
            <div className="text-gray-700 space-y-4">
                <p>{LEGAL_TEXT}</p>
                <p>Al utilizar este sitio web y nuestros servicios, usted reconoce y acepta que ha leído, entendido y está de acuerdo con los términos de esta advertencia. Usted es el único responsable de sus decisiones de inversión y de cualquier pérdida que pueda resultar.</p>
            </div>
        </Modal>
    );
};

export default LegalModal;
