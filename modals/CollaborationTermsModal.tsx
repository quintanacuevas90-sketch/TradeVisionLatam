import React from 'react';
import Modal from './Modal';

const CollaborationTermsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title={<>Acuerdo de Colaboración y Ética (<span translate="no">TradeVision Latam</span>)</>}>
            <div className="text-gray-700 dark:text-gray-300 space-y-4 text-sm">
                <p className="font-bold">PREÁMBULO:</p>
                <p>Al enviar esta solicitud, usted (en adelante, "El Colaborador") busca unirse al ecosistema profesional de <span translate="no">TradeVision Latam</span> (en adelante, "La Academia"). Esta no es una oferta de empleo, sino una alianza estratégica basada en el rendimiento, la disciplina y el cumplimiento estricto de nuestra cultura de marca.</p>
                
                <h4 className="font-bold text-md text-brand-primary dark:text-white pt-2">1. COMPROMISO DE DISCIPLINA Y METAS CLARAS</h4>
                <p>El Colaborador entiende que el trading es una profesión que requiere trabajo, estudio y aplicación. Al aceptar la formación gratuita de La Academia, El Colaborador se compromete a aplicar la metodología enseñada, mantener metas claras y trabajar activamente para construir una comunidad profesional.</p>
                
                <h4 className="font-bold text-md text-brand-primary dark:text-white pt-2">2. ACEPTACIÓN DE RIESGOS Y TRANSPARENCIA</h4>
                <p>El Colaborador acepta y entiende los altos riesgos asociados al trading (Forex, Criptomonedas, Opciones Binarias). El Colaborador se compromete a comunicar estos riesgos de forma clara y transparente a su propia comunidad, adhiriéndose a la Advertencia de Riesgo oficial de La Academia.</p>

                <h4 className="font-bold text-md text-brand-primary dark:text-white pt-2">3. CLÁUSULA DE CUMPLIMIENTO ÉTICO (ANTIFRAUDE)</h4>
                <p>La cultura de <span translate="no">TradeVision Latam</span> se basa en la transparencia y la honestidad. Por lo tanto, queda ESTRICTAMENTE PROHIBIDO que El Colaborador:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Mienta sobre su rentabilidad o experiencia.</li>
                    <li>Estafe o engañe a su comunidad (o a la nuestra) con promesas falsas.</li>
                    <li>Utilice marketing engañoso, incluyendo (pero no limitándose a) frases como "Hágase Millonario", "Ganancias Garantizadas" o el uso de imágenes de lujos (dinero, yates, autos deportivos) para implicar resultados irreales.</li>
                    <li>Oculte su relación de afiliado con los brokers recomendados.</li>
                </ul>

                <h4 className="font-bold text-md text-brand-primary dark:text-white pt-2">4. CONSECUENCIAS POR INCUMPLIMIENTO (ELIMINACIÓN PERMANENTE)</h4>
                <p>Si La Academia detecta (mediante auditoría interna o queja de la comunidad) que El Colaborador no se alinea con nuestra cultura, miente, estafa o utiliza tácticas de marketing no éticas:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>La Academia procederá a cortar toda relación profesional de forma inmediata y unilateral.</li>
                    <li>Esto incluye la eliminación permanente del programa de afiliados (cancelando comisiones pendientes), la revocación de toda formación gratuita (Cursos Premium) y la expulsión de todas las comunidades privadas de <span translate="no">TradeVision</span> (Telegram y Discord).</li>
                </ul>
                
                <h4 className="font-bold text-md text-brand-primary dark:text-white pt-2">5. ACUERDO LEGAL</h4>
                <p>Al marcar la casilla "Acepto los Términos...", El Colaborador acepta que esta solicitud, si es aprobada, servirá como un acuerdo vinculante preliminar. La Academia se reserva el derecho de solicitar la firma de documentos legales adicionales para formalizar la alianza estratégica.</p>
            </div>
        </Modal>
    );
};

export default CollaborationTermsModal;