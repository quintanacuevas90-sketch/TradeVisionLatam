
import React from 'react';
import Modal from './Modal';
import Accordion from '../components/Accordion';
import { LEGAL_TEXT } from '../constants';

const AffiliateModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Programa de Afiliados">
            <div className="space-y-4">
                <Accordion title="Cláusula 1: Elegibilidad">
                    <p className="text-gray-600">Para ser elegible en el programa de afiliados, debe ser un miembro activo de la comunidad y haber completado al menos nuestro curso intermedio.</p>
                </Accordion>
                <Accordion title="Cláusula 2: Comisiones">
                    <p className="text-gray-600">Se pagará una comisión del 20% sobre el precio de venta neto de cualquier curso premium referido a través de su enlace de afiliado único. Los pagos se realizan mensualmente.</p>
                </Accordion>
                <Accordion title="Cláusula 3: Marketing y Promoción">
                    <p className="text-gray-600">Está prohibido el uso de spam, publicidad engañosa o la representación de ganancias garantizadas. Todas las promociones deben cumplir con nuestra política de marca y la advertencia de riesgo.</p>
                </Accordion>
                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-800">
                    <h4 className="font-bold">Advertencia de Riesgo Obligatoria</h4>
                    <p className="text-sm mt-2">{LEGAL_TEXT}</p>
                </div>
            </div>
        </Modal>
    );
};

export default AffiliateModal;
