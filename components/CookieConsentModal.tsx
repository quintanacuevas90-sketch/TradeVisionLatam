import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useRouter } from '../hooks/useRouter';

interface CookieConsentModalProps {
    onConsent: (decision: { analysis: boolean; advertising: boolean; }) => void;
}

const CookieConsentModal: React.FC<CookieConsentModalProps> = ({ onConsent }) => {
    const { navigate } = useRouter();
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState({
        analysis: true,
        advertising: false // Default advertising to off as per privacy best practices
    });

    const handleAcceptAll = () => {
        onConsent({ analysis: true, advertising: true });
    };
    
    const handleRejectAll = () => {
        onConsent({ analysis: false, advertising: false });
    };

    const handleSavePreferences = () => {
        onConsent(preferences);
    };

    const handleToggle = (key: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleViewPolicy = () => {
        navigate('/politica-privacidad');
        // We don't close the modal here, user must still make a choice.
    };

    const ToggleSwitch = ({ id, label, description, enabled, onChange }: { id: string, label: string, description: string, enabled: boolean, onChange: () => void }) => (
        <div className="flex justify-between items-start p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <div className="pr-4">
                <label htmlFor={id} className="font-bold text-brand-primary dark:text-white cursor-pointer">{label}</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            <div className="flex-shrink-0">
                <input
                    id={id}
                    type="checkbox"
                    checked={enabled}
                    onChange={onChange}
                    className="sr-only"
                />
                <label
                    htmlFor={id}
                    className={`relative inline-block w-12 h-6 rounded-full transition-colors cursor-pointer ${enabled ? 'bg-brand-accent' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                    <span
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'transform translate-x-6' : ''}`}
                    ></span>
                </label>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-brand-primary border-2 border-brand-accent rounded-lg shadow-2xl max-w-2xl w-full p-8 animate-fade-in-up text-white">
                <h1 className="text-xl md:text-2xl font-extrabold mb-4 text-center" translate="no">
                    Gestionar su consentimiento de cookies | TRADEVISION Latam
                </h1>

                {!showPreferences ? (
                    <>
                        <div className="text-gray-300 space-y-4 text-left text-sm">
                            <p>En <strong className="text-white" translate="no">TRADEVISION</strong>, valoramos su privacidad y compromiso con la disciplina. Utilizamos cookies propias y de terceros para:</p>
                            <ul className="list-disc list-inside pl-4 space-y-2">
                                <li><strong>Funcionalidad:</strong> Asegurar el correcto funcionamiento de la plataforma (ej. guardar su progreso en la "Zona de Ejecución").</li>
                                <li><strong>Análisis (Necesario):</strong> Medir la interacción de los usuarios y el rendimiento de nuestra web (ej. Google Analytics, para mejorar la experiencia).</li>
                                <li><strong>Publicidad (Opcional):</strong> Optimizar la publicidad en plataformas externas (ej. Meta Ads) para ofrecerle contenido relevante.</li>
                            </ul>
                            <p>Usted tiene el control total sobre su consentimiento. Al hacer clic en 'Aceptar todas', acepta la finalidad de estos tratamientos. Para más detalles, consulta nuestra <button onClick={handleViewPolicy} className="text-brand-accent hover:underline font-semibold">Política de Privacidad</button>.</p>
                        </div>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button onClick={handleAcceptAll} className="w-full bg-brand-accent text-brand-primary font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 transition transform hover:scale-105">
                                Aceptar Todas
                            </button>
                            <button onClick={handleRejectAll} className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition">
                                Rechazar todos
                            </button>
                            <button onClick={() => setShowPreferences(true)} className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2">
                                <FiSettings /> Configurar
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-gray-300 space-y-4 text-left text-sm">
                            <p>Configure sus preferencias de cookies. Las cookies funcionales son necesarias y no se pueden desactivar.</p>
                            <div className="space-y-4 mt-4">
                                <div className="p-4 bg-gray-700/50 rounded-lg">
                                    <p className="font-bold text-white">Cookies Funcionales</p>
                                    <p className="text-sm text-gray-400">Siempre activas. Son esenciales para la navegación y funcionalidades básicas como el guardado de sesiones.</p>
                                </div>
                                <ToggleSwitch 
                                    id="analysis-toggle"
                                    label="Cookies de Análisis"
                                    description="Nos permiten entender cómo interactúa con el sitio para mejorar la experiencia. Son anónimas."
                                    enabled={preferences.analysis}
                                    onChange={() => handleToggle('analysis')}
                                />
                                <ToggleSwitch 
                                    id="advertising-toggle"
                                    label="Cookies de Publicidad"
                                    description="Nos ayudan a mostrar anuncios más relevantes para usted en otras plataformas. Puede desactivarlas."
                                    enabled={preferences.advertising}
                                    onChange={() => handleToggle('advertising')}
                                />
                            </div>
                        </div>
                         <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <button onClick={handleSavePreferences} className="w-full sm:w-auto bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition transform hover:scale-105">
                                Guardar Preferencias
                            </button>
                            <button onClick={() => setShowPreferences(false)} className="w-full sm:w-auto bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition">
                                Volver
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CookieConsentModal;