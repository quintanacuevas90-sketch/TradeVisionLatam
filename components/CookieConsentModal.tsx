
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
        <div className="flex justify-between items-center p-2.5 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <div className="pr-2">
                <label htmlFor={id} className="font-bold text-brand-primary dark:text-white cursor-pointer text-xs md:text-base">{label}</label>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight mt-0.5">{description}</p>
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
                    className={`relative inline-block w-9 h-5 md:w-12 md:h-6 rounded-full transition-colors cursor-pointer ${enabled ? 'bg-brand-accent' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                    <span
                        className={`absolute left-1 top-1 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full transition-transform ${enabled ? 'transform translate-x-4 md:translate-x-6' : ''}`}
                    ></span>
                </label>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-brand-primary border-2 border-brand-accent rounded-xl shadow-2xl max-w-2xl w-full p-4 md:p-8 animate-fade-in-up text-white max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-brand-accent scrollbar-track-gray-800">
                <h1 className="text-base md:text-2xl font-extrabold mb-3 text-center" translate="no">
                    Consentimiento de Cookies
                </h1>

                {!showPreferences ? (
                    <>
                        <div className="text-gray-300 space-y-2 text-left text-xs md:text-sm leading-relaxed">
                            <p>En <strong className="text-white" translate="no">TRADEVISION</strong>, valoramos su privacidad. Usamos cookies para:</p>
                            <ul className="list-disc list-inside pl-2 space-y-0.5">
                                <li><strong>Funcionalidad:</strong> Guardar progreso en "Zona de Ejecución".</li>
                                <li><strong>Análisis:</strong> Mejorar experiencia de usuario.</li>
                                <li><strong>Publicidad (Opcional):</strong> Contenido relevante.</li>
                            </ul>
                            <p>Más detalles en nuestra <button onClick={handleViewPolicy} className="text-brand-accent hover:underline font-semibold">Política de Privacidad</button>.</p>
                        </div>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <button onClick={handleAcceptAll} className="w-full bg-brand-accent text-brand-primary font-bold py-2 px-3 rounded-lg hover:bg-opacity-80 transition transform hover:scale-105 text-sm md:text-base">
                                Aceptar Todas
                            </button>
                            <button onClick={handleRejectAll} className="w-full bg-gray-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-gray-700 transition text-sm md:text-base">
                                Rechazar
                            </button>
                            <button onClick={() => setShowPreferences(true)} className="w-full bg-transparent border border-gray-500 text-white font-bold py-2 px-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 text-sm md:text-base">
                                <FiSettings /> Configurar
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-gray-300 space-y-3 text-left text-xs md:text-sm">
                            <p>Configure sus preferencias. Las cookies funcionales son obligatorias.</p>
                            <div className="space-y-2 mt-2">
                                <div className="p-2.5 bg-gray-700/50 rounded-lg">
                                    <p className="font-bold text-white text-xs md:text-base">Cookies Funcionales</p>
                                    <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">Siempre activas. Esenciales.</p>
                                </div>
                                <ToggleSwitch 
                                    id="analysis-toggle"
                                    label="Cookies de Análisis"
                                    description="Estadísticas anónimas."
                                    enabled={preferences.analysis}
                                    onChange={() => handleToggle('analysis')}
                                />
                                <ToggleSwitch 
                                    id="advertising-toggle"
                                    label="Cookies de Publicidad"
                                    description="Anuncios personalizados."
                                    enabled={preferences.advertising}
                                    onChange={() => handleToggle('advertising')}
                                />
                            </div>
                        </div>
                         <div className="mt-5 flex flex-col sm:flex-row justify-center gap-2">
                            <button onClick={handleSavePreferences} className="w-full sm:w-auto bg-brand-accent text-brand-primary font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition transform hover:scale-105 text-sm md:text-base">
                                Guardar
                            </button>
                            <button onClick={() => setShowPreferences(false)} className="w-full sm:w-auto bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition text-sm md:text-base">
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
