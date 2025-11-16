import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FiAlertTriangle, FiTrendingUp, FiTrendingDown, FiRefreshCw, FiPauseCircle, FiBookOpen } from 'react-icons/fi';
import { FaShieldAlt, FaThumbsUp, FaCopy } from 'react-icons/fa';
import Accordion from './Accordion';

interface Trade {
    id: number;
    result: 'win' | 'loss';
    amount: number;
    balanceAfter: number;
    riskTaken: number;
}

const BinaryExecutionControl: React.FC = () => {
    const [config, setConfig] = useState({ capital: 100, risk: 1, payout: 85 });
    const [session, setSession] = useState({
        tradeCount: 0,
        winCount: 0,
        lossCount: 0,
        consecutiveLosses: 0,
        maxConsecutiveLosses: 0,
        consecutiveWins: 0,
        adherenceCount: 0,
        history: [] as Trade[],
    });
    const [copyStatus, setCopyStatus] = useState(false);
    const [alert, setAlert] = useState<{ type: 'none' | 'red-low' | 'red-high'; message: string | null }>({ type: 'none', message: null });
    const [sessionStatus, setSessionStatus] = useState<'active' | 'wiped_out'>('active');
    const [cooldown, setCooldown] = useState(0);
    const [showPatternPopup, setShowPatternPopup] = useState(false);
    const [winFlash, setWinFlash] = useState(false);
    const initialCapitalRef = useRef(config.capital);
    const audioCtxRef = useRef<AudioContext | null>(null);

    const playSound = (type: 'win' | 'loss' | 'alert' | 'copy') => {
        if (!audioCtxRef.current) {
            try {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch (e) {
                console.error("Web Audio API is not supported in this browser.");
                return;
            }
        }
        const audioCtx = audioCtxRef.current;

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

        switch (type) {
            case 'win':
                oscillator.type = 'sine';
                gainNode.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.01);
                oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
                oscillator.frequency.linearRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
                break;
            case 'loss':
                oscillator.type = 'sawtooth';
                gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.01);
                oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
                break;
            case 'alert':
                oscillator.type = 'square';
                gainNode.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.01);
                oscillator.frequency.setValueAtTime(160, audioCtx.currentTime);
                gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
                break;
            case 'copy':
                oscillator.type = 'triangle';
                gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.01);
                oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
                break;
        }

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.5);
    };


    const currentBalance = useMemo(() => {
        return session.history.length > 0 ? session.history[0].balanceAfter : config.capital;
    }, [session.history, config.capital]);

    const investmentAmount = useMemo(() => currentBalance * (config.risk / 100), [currentBalance, config.risk]);
    const profitAmount = useMemo(() => investmentAmount * (config.payout / 100), [investmentAmount, config.payout]);

    const handleReset = (fullReset: boolean = true) => {
        setSession({ tradeCount: 0, winCount: 0, lossCount: 0, consecutiveLosses: 0, maxConsecutiveLosses: 0, consecutiveWins: 0, adherenceCount: 0, history: [] });
        setSessionStatus('active');
        setCooldown(0);
        setShowPatternPopup(false);
        if (fullReset) {
            initialCapitalRef.current = config.capital;
        }
    };
    
    useEffect(() => {
        handleReset(true);
    }, [config.capital]);

    useEffect(() => {
        const loss = initialCapitalRef.current - currentBalance;
        const lossPercentage = (loss / initialCapitalRef.current) * 100;

        if (currentBalance <= 0) {
            if (sessionStatus !== 'wiped_out') {
                setSessionStatus('wiped_out');
                setCooldown(10);
                playSound('alert');
            }
            return;
        }

        if (loss <= 0) {
            setAlert({ type: 'none', message: null });
            return;
        }

        if (lossPercentage > 50) setAlert({ type: 'red-high', message: 'ALERTA ROJA INTENSA: El riesgo de ruina es inminente.' });
        else if (lossPercentage >= 20) setAlert({ type: 'red-low', message: 'ALERTA ROJA: Ha superado el límite de pérdida. Evite seguir operando ahora.' });
        else setAlert({ type: 'none', message: null });
        
    }, [currentBalance, sessionStatus]);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value: rawValue } = e.target;
        const numericValue = name === 'risk' ? parseFloat(rawValue) : parseInt(rawValue, 10);
        setConfig(prev => ({ ...prev, [name]: numericValue }));
    };

    const handleTradeResult = (result: 'win' | 'loss') => {
        if (session.tradeCount >= 100 || sessionStatus === 'wiped_out' || cooldown > 0) return;

        const newTrade: Trade = {
            id: session.tradeCount + 1,
            result,
            amount: result === 'win' ? profitAmount : -investmentAmount,
            balanceAfter: result === 'win' ? currentBalance + profitAmount : currentBalance - investmentAmount,
            riskTaken: config.risk,
        };
        const newConsecutiveLosses = result === 'loss' ? session.consecutiveLosses + 1 : 0;
        const newConsecutiveWins = result === 'win' ? session.consecutiveWins + 1 : 0;
        const newAdherenceCount = config.risk <= 3 ? session.adherenceCount + 1 : session.adherenceCount;

        if (newConsecutiveLosses >= 3) {
            setCooldown(10);
            playSound('alert');
        }
        
        const newTotalLosses = result === 'loss' ? session.lossCount + 1 : session.lossCount;

        if (result === 'loss') {
            // Check if it's the 4th, 8th, 12th, etc. loss
            if (newTotalLosses > 0 && newTotalLosses % 4 === 0) {
                setShowPatternPopup(true);
            }
            playSound('loss');
        }

        if (result === 'win') {
            setWinFlash(true);
            setTimeout(() => setWinFlash(false), 500);
            playSound('win');
        }
        
        setSession(prev => ({
            tradeCount: prev.tradeCount + 1,
            winCount: result === 'win' ? prev.winCount + 1 : prev.winCount,
            lossCount: newTotalLosses,
            consecutiveLosses: newConsecutiveLosses,
            maxConsecutiveLosses: Math.max(prev.maxConsecutiveLosses, newConsecutiveLosses),
            consecutiveWins: newConsecutiveWins,
            adherenceCount: newAdherenceCount,
            history: [newTrade, ...prev.history],
        }));
    };
    
    const handleCopyLog = () => {
        const now = new Date();
        const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        const lossAmount = initialCapitalRef.current - currentBalance;
        const lossPercentage = lossAmount > 0 ? (lossAmount / initialCapitalRef.current) * 100 : 0;
        const adherenceScore = session.tradeCount > 0 ? ((session.adherenceCount / session.tradeCount) * 10).toFixed(1) : 'N/A';
        let disciplineStatus = 'Activa';
        let psychologicalFeedback = 'Sin alertas significativas.';
        if (sessionStatus === 'wiped_out') {
            disciplineStatus = 'CUENTA QUEMADA';
            psychologicalFeedback = 'El capital se agotó. La sesión ha terminado. Es crucial analizar las causas de esta pérdida total.';
        } else if (session.consecutiveLosses >= 3) {
            disciplineStatus = 'CERRADA POR DISCIPLINA (3 PÉRDIDAS)';
            psychologicalFeedback = 'Se violó la regla de 3 pérdidas consecutivas. Retirada requerida.';
        } else if (alert.message) {
            disciplineStatus = 'ALERTA DE RIESGO ALTO';
            psychologicalFeedback = alert.message;
        }
        
        const logText = `
Identificador de Sesión: [TRADEVISION | SESIÓN BINARIA | ${formattedDate}]
Balance Inicial: Capital de Inicio: $${initialCapitalRef.current.toFixed(2)}
Pérdida Acumulada Total: Pérdida Neta Total: $${lossAmount > 0 ? lossAmount.toFixed(2) : '0.00'} (${lossPercentage.toFixed(2)}%)
Resultado de Ejecución: Total de Operaciones Realizadas: ${session.tradeCount}
Resultados (G/P): Ganadas (W): ${session.winCount} | Perdidas (L): ${session.lossCount} | Pérdidas Consecutivas Máx: ${session.maxConsecutiveLosses}
Estado de Disciplina: Estado de la Cuenta: ${disciplineStatus}
Alerta de la Sesión: Feedback Psicológico: ${psychologicalFeedback}
Adhesión al Plan: ${adherenceScore}/10`.trim().replace(/^\s+/gm, '');
    
        navigator.clipboard.writeText(logText).then(() => {
            setCopyStatus(true);
            playSound('copy');
            setTimeout(() => setCopyStatus(false), 2000);
        });
    };

    const getRiskSliderTrackClass = () => {
        if (config.risk <= 3) return 'risk-safe-track';
        if (config.risk > 20) return 'risk-extreme-track';
        return 'risk-medium-track';
    };

    const winStreakClass = session.consecutiveWins > 0 && session.consecutiveWins % 1 === 0 ? 'animate-glow-up' : '';
    const lossStreakClass = session.consecutiveLosses >= 3 ? 'animate-system-error' : '';
    const isWipedOut = sessionStatus === 'wiped_out';

    return (
        <div className="bg-brand-primary text-white p-8 rounded-xl shadow-2xl border-2 border-brand-accent/30 relative overflow-hidden bg-grid-pattern">
            {(cooldown > 0 || isWipedOut) && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 p-4 text-center backdrop-blur-sm">
                    {isWipedOut ? (
                        <>
                            <h3 className="text-4xl font-extrabold text-red-500 animate-pulse">CUENTA QUEMADA</h3>
                            <p className="mt-4 text-lg">Protocolo de Retirada Activo. Trabaja en tus impulsos y mentalidad.</p>
                        </>
                    ) : (
                         <>
                            <FiPauseCircle className="text-6xl text-yellow-400 mb-4" />
                            <h3 className="text-3xl font-extrabold text-yellow-400">PROTOCOLO DE RETIRADA ACTIVO</h3>
                            <p className="mt-2 text-lg">Enfriamiento Mental Obligatorio.</p>
                            <p className="text-6xl font-mono font-bold my-4">{cooldown}</p>
                            <p>Reinicia tu mente. La disciplina exige un alto.</p>
                        </>
                    )}
                    <button onClick={() => handleReset(false)} className="mt-8 flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition">
                        <FiRefreshCw/> Reiniciar Simulación
                    </button>
                </div>
            )}
             {showPatternPopup && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 p-4 text-center backdrop-blur-sm">
                    <FiAlertTriangle className="text-5xl text-red-500 mb-4" />
                    <h3 className="text-3xl font-extrabold text-red-500">ERROR DE EJECUCIÓN DETECTADO</h3>
                    <p className="mt-2 text-lg">Una pérdida es una oportunidad de aprendizaje. Revisa tu análisis y la estructura del mercado.</p>
                    <button
                        onClick={() => {
                            document.getElementById('module-2')?.scrollIntoView({ behavior: 'smooth' });
                            setShowPatternPopup(false);
                        }}
                        className="mt-6 inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition"
                    >
                        <FiBookOpen /> Revisar Patrones Clave (Nivel 2)
                    </button>
                     <button onClick={() => setShowPatternPopup(false)} className="mt-4 text-gray-400 hover:text-white underline">Cerrar</button>
                </div>
            )}
            <div className="relative z-10">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-brand-accent text-brand-primary px-3 py-1 rounded-full text-sm font-bold mb-2">NIVEL 3</div>
                    <h2 className="text-4xl font-extrabold flex items-center justify-center gap-3 text-glow-turq">
                        <FaShieldAlt /> Simulador Ejecutor 2.0
                    </h2>
                    <p className="mt-2 text-gray-400">Consola de Entrenamiento: Cyber-Discipline</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 items-start">
                    {/* LEFT PANEL */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-xl border-b-2 border-brand-accent/50 pb-2 text-glow-turq">I. PARÁMETROS DE SESIÓN</h3>
                        <div>
                            <label className="block text-sm font-bold mb-1">Capital de Inicio: <span className="text-brand-accent font-mono">${config.capital.toLocaleString('en-US')}</span></label>
                            <input type="range" name="capital" min="10" max="10000" step="10" value={config.capital} onChange={handleConfigChange} className="risk-slider" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Riesgo por Operación: <span className={`font-mono text-brand-accent`}>{config.risk.toFixed(2)}%</span></label>
                            <input type="range" name="risk" min="1" max="100" step="0.01" value={config.risk} onChange={handleConfigChange} className={`risk-slider ${getRiskSliderTrackClass()}`} />
                        </div>
                        <div>
                            <label className={`block text-sm font-bold mb-1 ${config.payout < 80 ? 'text-red-500' : ''}`}>Pago del Broker: <span className="text-brand-accent font-mono">{config.payout}%</span></label>
                            <input type="range" name="payout" min="60" max="97" step="1" value={config.payout} onChange={handleConfigChange} className="risk-slider" />
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl border-b-2 border-brand-accent/50 pb-2 text-glow-turq">II. MONITOR DE EJECUCIÓN</h3>
                        {/* Balance HUD */}
                        <div className="p-4 rounded-lg hud-border text-center">
                            <p className="text-sm text-brand-accent uppercase tracking-widest">Balance Neto</p>
                            <p className="font-mono text-5xl font-bold text-white text-glow-turq">${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                                <span>Trades: {session.tradeCount}</span>
                                <span>W: {session.winCount} / L: {session.lossCount}</span>
                                <span className={lossStreakClass}>P. Cons: {session.consecutiveLosses}</span>
                            </div>
                        </div>

                        {/* Streak Counter */}
                        {session.consecutiveWins > 0 && (
                            <div className={`text-center font-bold text-2xl text-brand-accent ${winStreakClass}`}>
                                🔥 RACHA DE {session.consecutiveWins} VICTORIAS
                            </div>
                        )}
                        
                        {/* Trade Buttons */}
                        <div className="flex gap-4 pt-2">
                             <button onClick={() => handleTradeResult('win')} disabled={isWipedOut || cooldown > 0} className={`w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-4 rounded-lg transition hover:bg-green-500 text-lg disabled:bg-gray-600 disabled:cursor-not-allowed border-2 border-green-400 shadow-[0_0_15px_rgba(52,211,153,0.5)] ${winFlash ? 'animate-flash-turq-bg' : ''}`}>
                                <FiTrendingUp/> Ganó Operación
                            </button>
                             <button onClick={() => handleTradeResult('loss')} disabled={isWipedOut || cooldown > 0} className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-4 rounded-lg transition hover:bg-red-500 text-lg disabled:bg-gray-600 disabled:cursor-not-allowed border-2 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                                <FiTrendingDown/> Perdió Operación
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleReset(true)} className="w-1/2 flex items-center justify-center gap-2 bg-gray-700 text-white font-bold py-2 rounded-lg transition hover:bg-gray-600 text-sm">
                                <FiRefreshCw/> Reiniciar Sesión
                            </button>
                            <button onClick={handleCopyLog} className="w-1/2 flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-2 rounded-lg transition hover:bg-opacity-80 text-sm" disabled={session.tradeCount === 0}>
                                {copyStatus ? '¡Resumen Copiado!' : <><FaCopy /> Copiar Bitácora</>}
                            </button>
                        </div>
                    </div>
                </div>
                
                {alert.message && (
                    <div className="mt-6 p-4 bg-red-900/40 border-l-4 border-red-500 text-red-300 rounded-r-lg font-semibold">
                       {alert.message}
                   </div>
                )}
            </div>

            <div className="mt-12 pt-8 border-t border-brand-accent/20">
                <h3 className="text-2xl font-bold text-center mb-6 text-glow-turq">Manual de Uso: Consola Cyber-Discipline</h3>
                <div className="space-y-4">
                    <Accordion title="I. Propósito y Misión">
                        <p className="text-gray-300 text-sm">Esta no es una simple calculadora. Es un gimnasio mental. Su única misión es forjar la <strong>disciplina de un trader de élite</strong> simulando la presión de una sesión de trading real. El objetivo no es predecir, sino <strong>ejecutar impecablemente</strong> tu plan de riesgo.</p>
                    </Accordion>
                    <Accordion title="II. Parámetros de Sesión">
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li><strong>Capital de Inicio:</strong> El balance virtual con el que comienzas tu simulación.</li>
                            <li><strong>Riesgo por Operación:</strong> El porcentaje de tu <strong>balance actual</strong> que arriesgas en la siguiente operación. El color del medidor te da feedback instantáneo sobre tu disciplina:
                                <ul className="list-disc list-inside pl-4 mt-2">
                                    <li><span className="font-bold text-green-400">Zona Profesional (1-3%):</span> Estás operando con disciplina. El medidor brilla en verde.</li>
                                    <li><span className="font-bold text-yellow-400">Zona de Alerta (3.1-20%):</span> Estás asumiendo un riesgo elevado.</li>
                                    <li><span className="font-bold text-red-500">Zona de Juego/Gambling (>20%):</span> Estás apostando. El medidor pulsa en rojo como una advertencia crítica.</li>
                                </ul>
                            </li>
                            <li><strong>Pago del Broker:</strong> El porcentaje de retorno que ofrece el broker en una operación ganadora.</li>
                        </ul>
                    </Accordion>
                    <Accordion title="III. Monitor de Ejecución">
                         <ul className="space-y-3 text-gray-300 text-sm">
                            <li><strong>Balance Neto (HUD):</strong> Tu capital virtual en tiempo real. Es el marcador de tu rendimiento.</li>
                            <li><strong>Contadores (Trades, W/L, P. Cons):</strong> Miden tu actividad total, tu ratio de victorias/pérdidas y tus pérdidas consecutivas, un indicador clave del estado emocional.</li>
                             <li><strong>Racha de Victorias:</strong> Al lograr victorias consecutivas, el contador celebra tu consistencia con una animación de 'glow-up'.</li>
                             <li><strong>Botones de Ejecución:</strong> Son tu única interacción. Cada clic registra el resultado de una operación y actualiza la simulación, reforzando la consecuencia de cada decisión.</li>
                        </ul>
                    </Accordion>
                    <Accordion title="IV. Protocolos de Disciplina">
                         <ul className="space-y-3 text-gray-300 text-sm">
                            <li><strong>Enfriamiento Mental Obligatorio:</strong> Al registrar <strong>3 pérdidas consecutivas</strong>, el sistema se bloquea por 10 segundos. Esto te obliga a hacer una pausa, romper el ciclo de "trading por venganza" y reiniciar tu enfoque mental.</li>
                             <li><strong>Alerta de Cuenta Quemada:</strong> Si tu balance llega a cero, la sesión termina. Es la consecuencia final de una mala gestión y te fuerza a reiniciar desde cero.</li>
                             <li><strong>Feedback Educativo Instantáneo:</strong> Cada vez que registras una pérdida, aparece una alerta que te recomienda revisar los patrones de velas (Nivel 2). Es un recordatorio constante de que cada error es una lección.</li>
                        </ul>
                    </Accordion>
                    <Accordion title="V. Análisis de Sesión">
                         <ul className="space-y-3 text-gray-300 text-sm">
                            <li><strong>Copiar Bitácora:</strong> Esta función genera un resumen de texto de tu sesión (resultados, pérdidas, estado de disciplina) que puedes pegar en tu diario de trading personal para un análisis posterior.</li>
                             <li><strong>Métrica "Adhesión al Plan" (Puntuación /10):</strong> Esta es la métrica más importante. Mide cuántas de tus operaciones se realizaron dentro de la 'Zona Profesional' de riesgo (1-3%). Una puntuación alta (ej. 9/10) indica una disciplina de ejecución excelente, sin importar el resultado final de ganancias/pérdidas.</li>
                        </ul>
                    </Accordion>
                    <Accordion title="VI. Feedback Sensorial (Sonido y Visuales)">
                         <ul className="space-y-3 text-gray-300 text-sm">
                            <li><strong>Sonido de Victoria ('Level-Up'):</strong> Un tono ascendente y positivo que refuerza neurológicamente la sensación de una ejecución correcta.</li>
                             <li><strong>Sonido de Pérdida ('Error'):</strong> Un tono corto y descendente para una retroalimentación inmediata y subconsciente de un resultado negativo.</li>
                             <li><strong>Sonido de Alerta ('Cooldown'):</strong> Un sonido distintivo que subraya la activación del protocolo de disciplina, asociando la racha de pérdidas con una consecuencia audible.</li>
                             <li><strong>Efectos Visuales (Destellos, Glitch):</strong> El destello turquesa en una victoria, el 'error de sistema' en una racha de 3 pérdidas y el medidor de riesgo pulsante están diseñados para darte feedback constante y mantenerte en un estado de alerta y conciencia sobre tus acciones.</li>
                        </ul>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default BinaryExecutionControl;