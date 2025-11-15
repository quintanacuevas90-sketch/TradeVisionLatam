import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FiAlertTriangle, FiTrendingUp, FiTrendingDown, FiRefreshCw, FiPauseCircle } from 'react-icons/fi';
import { FaShieldAlt, FaThumbsUp } from 'react-icons/fa';
import { useRouter } from '../hooks/useRouter';
import Accordion from './Accordion';

interface Trade {
    id: number;
    result: 'win' | 'loss';
    amount: number;
    balanceAfter: number;
}

const BinaryExecutionControl: React.FC = () => {
    const { navigate } = useRouter();
    const [config, setConfig] = useState({
        capital: 100,
        risk: 2,
        payout: 85,
    });
    const [session, setSession] = useState({
        tradeCount: 0,
        winCount: 0,
        lossCount: 0,
        consecutiveLosses: 0,
        history: [] as Trade[],
    });
    const historyRef = useRef<HTMLDivElement>(null);
    const [alert, setAlert] = useState<{ type: 'none' | 'yellow' | 'red-low' | 'red-high' | 'near_wiped_out'; message: string | null }>({ type: 'none', message: null });
    const [sessionStatus, setSessionStatus] = useState<'active' | 'wiped_out' | 'winning'>('active');
    const initialCapitalRef = useRef(config.capital);

    const handleReset = () => {
        setSession({ tradeCount: 0, winCount: 0, lossCount: 0, consecutiveLosses: 0, history: [] });
        setSessionStatus('active');
        initialCapitalRef.current = config.capital;
    };

    useEffect(() => {
        handleReset();
    }, [config.capital]);
    
    const currentBalance = useMemo(() => {
        return session.history.length > 0 ? session.history[0].balanceAfter : config.capital;
    }, [session.history, config.capital]);

    const investmentAmount = useMemo(() => currentBalance * (config.risk / 100), [currentBalance, config.risk]);
    const profitAmount = useMemo(() => investmentAmount * (config.payout / 100), [investmentAmount, config.payout]);

    useEffect(() => {
        const loss = initialCapitalRef.current - currentBalance;
        const lossPercentage = (loss / initialCapitalRef.current) * 100;
        const lowBalanceThreshold = initialCapitalRef.current * 0.1;

        if (currentBalance <= 0) {
            setSessionStatus('wiped_out');
            setAlert({ type: 'none', message: null });
            return;
        }

        // Reset winning status if capital is doubled then drops
        if (sessionStatus === 'winning' && currentBalance < initialCapitalRef.current * 2) {
             setSessionStatus('active');
        } else if (currentBalance >= initialCapitalRef.current * 2 && sessionStatus !== 'winning') {
            setSessionStatus('winning');
        }

        if (currentBalance > 0 && currentBalance <= lowBalanceThreshold) {
            setAlert({ type: 'near_wiped_out', message: '¡RIESGO CRÍTICO! Tu capital está a punto de agotarse.' });
            return;
        }

        if (loss <= 0) {
            setAlert({ type: 'none', message: null });
            return;
        }

        if (initialCapitalRef.current <= 100) { // Low Capital
            if (lossPercentage >= 5) {
                setAlert({ type: 'red-low', message: 'ALERTA ROJA: Ha superado el límite de pérdida. Evite seguir operando ahora.' });
            } else {
                setAlert({ type: 'none', message: null });
            }
        } else { // High Capital
            if (lossPercentage > 50) {
                setAlert({ type: 'red-high', message: 'ALERTA ROJA INTENSA: El riesgo de ruina es inminente.' });
            } else if (lossPercentage >= 20) {
                setAlert({ type: 'red-low', message: 'ALERTA ROJA: Ha superado el límite de pérdida. Evite seguir operando ahora.' });
            } else {
                setAlert({ type: 'none', message: null });
            }
        }
    }, [currentBalance, config.capital, sessionStatus]);
    
    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = 0;
        }
    }, [session.history]);


    const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value: rawValue } = e.target;
    
        if (name === 'capital') {
            const newCapital = Number(rawValue);
            let finalCapital = newCapital;
    
            if (newCapital > 100000) {
                finalCapital = 100000 + Math.round((newCapital - 100000) / 50) * 50;
            } else {
                finalCapital = Math.round(newCapital);
            }
    
            if (finalCapital > 1000000) {
                finalCapital = 1000000;
            }
            
            if (finalCapital !== config.capital) {
                 setConfig(prev => ({ ...prev, capital: finalCapital }));
            }
        } else {
            const numericValue = name === 'risk' ? parseFloat(rawValue) : parseInt(rawValue, 10);
            setConfig(prev => ({ ...prev, [name]: numericValue }));
        }
    };

    const handleTradeResult = (result: 'win' | 'loss') => {
        if (session.tradeCount >= 100 || sessionStatus === 'wiped_out') return;
        const newTrade: Trade = {
            id: session.tradeCount + 1,
            result,
            amount: result === 'win' ? profitAmount : -investmentAmount,
            balanceAfter: result === 'win' ? currentBalance + profitAmount : currentBalance - investmentAmount,
        };
        setSession(prev => ({
            tradeCount: prev.tradeCount + 1,
            winCount: result === 'win' ? prev.winCount + 1 : prev.winCount,
            lossCount: result === 'loss' ? prev.lossCount + 1 : prev.lossCount,
            consecutiveLosses: result === 'loss' ? prev.consecutiveLosses + 1 : 0,
            history: [newTrade, ...prev.history],
        }));
    };
    
    const showConsecutiveLossAlert = session.consecutiveLosses >= 3;
    const isWipedOut = sessionStatus === 'wiped_out';

    const getBalanceIndicatorClasses = () => {
        if (isWipedOut) {
            return 'bg-black animate-flash-red-fast';
        }
        if (alert.type === 'near_wiped_out') {
            return 'bg-red-500/20 dark:bg-red-900/40 animate-flash-red-slow';
        }
        switch (alert.type) {
            case 'red-low':
            case 'red-high':
                return 'bg-red-500/20 dark:bg-red-900/40';
            case 'yellow':
                return 'bg-yellow-500/20 dark:bg-yellow-900/40';
            default:
                return 'bg-white dark:bg-gray-800';
        }
    };

    const getRiskIndicator = () => {
        if (config.risk <= 4) {
            return {
                className: 'bg-green-500/10 dark:bg-green-900/20 text-green-800 dark:text-green-300',
                textColor: 'text-gray-500 dark:text-gray-400',
                message: 'RIESGO PROFESIONAL: Ejecución disciplinada y sostenible.'
            };
        }
        if (config.risk <= 20) {
            return {
                className: 'bg-yellow-500/20 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
                textColor: 'text-yellow-700 dark:text-yellow-400',
                message: 'RIESGO MEDIO: Está excediendo el umbral estándar de riesgo.'
            };
        }
        return {
            className: 'bg-red-500/20 dark:bg-red-900/40 text-red-800 dark:text-red-300',
            textColor: 'text-red-700 dark:text-red-400',
            message: '¡RIESGO EXTREMO! El monto invertido es insostenible.'
        };
    };
    const riskIndicator = getRiskIndicator();


    return (
        <div className="relative p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 transition-colors duration-300 overflow-hidden">
            {isWipedOut && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-10 p-4 text-center">
                    <h3 className="text-4xl font-extrabold text-red-500 animate-pulse">HAS QUEMADO TU CUENTA</h3>
                    <p className="mt-4 text-lg text-white">Trabaja en tus impulsos y mentalidad. Nuestro <button onClick={() => navigate('/cursos/binarias-intermedio')} className="underline font-bold text-brand-accent hover:text-brand-accent/80">curso intermedio de binarias</button> te ayudará.</p>
                </div>
            )}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-bold mb-2">NIVEL 3</div>
                <h2 className="text-4xl font-extrabold text-brand-primary dark:text-white flex items-center justify-center gap-3">
                    <FaShieldAlt /> Control de Ejecución Binaria
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Alerta de Riesgo Extremo</p>
            </div>

            <div className="mt-6 p-4 bg-red-800 text-white rounded-lg border-2 border-red-600 text-sm">
                <h3 className="font-extrabold flex items-center gap-2"><FiAlertTriangle /> ADVERTENCIA DE RIESGO EXTREMO.</h3>
                <p className="mt-1 text-red-100">Esta herramienta simula operaciones de alto riesgo (simulando Martingala u otras progresiones peligrosas) y está diseñada solo con fines educativos para usuarios avanzados. Si usted es un usuario nuevo, TRADEVISION le recomienda no probar ni replicar estas estrategias.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 items-start">
                <div className="space-y-4">
                    <h3 className="font-bold text-xl border-b-2 border-brand-accent pb-2">I. Configuración de Entrada</h3>
                    <div>
                        <label className="block text-sm font-bold mb-1">Capital de Inicio: <span className="text-brand-accent font-mono">${config.capital.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></label>
                        <input type="range" name="capital" min="1" max="1000000" step="1" value={config.capital} onChange={handleConfigChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Riesgo por Operación: <span className={`font-mono text-brand-accent`}>{config.risk.toFixed(2)}%</span></label>
                        <input type="range" name="risk" min="1" max="100" step="0.01" value={config.risk} onChange={handleConfigChange} />
                    </div>
                    <div>
                        <label className={`block text-sm font-bold mb-1 ${config.payout < 80 ? 'text-red-500' : ''}`}>Pago del Broker: <span className="text-brand-accent font-mono">{config.payout}%</span></label>
                        <input type="range" name="payout" min="60" max="97" step="1" value={config.payout} onChange={handleConfigChange} />
                        {config.payout < 80 && <p className="text-red-500 text-xs font-bold mt-1 text-center">NO OPERAR EN ESTA SITUACIÓN</p>}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-lg space-y-3">
                    <h3 className="font-bold text-xl text-center">II. Monitor de Sesión</h3>
                    <div className={`p-3 rounded-lg text-center transition-colors ${riskIndicator.className}`}>
                        <p className={`text-sm ${riskIndicator.textColor}`}>Monto de Inversión Fijo</p>
                        <p className={`font-mono text-4xl font-bold text-brand-primary dark:text-white`}>${investmentAmount.toFixed(2)}</p>
                        <p className="text-xs font-semibold mt-1">{riskIndicator.message}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg"><p className="text-xs text-gray-500">Ganancia Potencial</p><p className="font-bold text-green-500 font-mono">${profitAmount.toFixed(2)}</p></div>
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg"><p className="text-xs text-gray-500">Pérdida Potencial</p><p className="font-bold text-red-500 font-mono">${investmentAmount.toFixed(2)}</p></div>
                    </div>
                    <div className={`p-3 rounded-lg transition-colors duration-300 ${getBalanceIndicatorClasses()}`}>
                        <p className="text-sm font-bold text-center mb-2 text-brand-primary dark:text-white">Balance Actual: <span className="text-brand-accent font-mono text-lg">${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                        <div ref={historyRef} className="max-h-24 overflow-y-auto text-xs space-y-1 pr-2">
                            {session.history.map(t => (
                                <div key={t.id} className={`flex justify-between p-1 rounded ${t.result === 'win' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                    <span className="text-gray-800 dark:text-gray-200">#{t.id} ({t.result})</span>
                                    <span className={t.result === 'win' ? 'text-green-500' : 'text-red-500'}>{t.amount > 0 ? '+' : ''}${t.amount.toFixed(2)}</span>
                                    <span className="text-gray-800 dark:text-gray-200">${t.balanceAfter.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {(session.tradeCount < 100) && (
                        <div className="flex gap-4 pt-2">
                            <button onClick={() => handleTradeResult('win')} disabled={isWipedOut} className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 rounded-lg transition hover:bg-green-600 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"><FiTrendingUp/> Ganó</button>
                            <button onClick={() => handleTradeResult('loss')} disabled={isWipedOut} className="w-full flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-3 rounded-lg transition hover:bg-red-600 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"><FiTrendingDown/> Perdió</button>
                        </div>
                    )}
                    <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 bg-gray-500 text-white font-bold py-2 rounded-lg transition hover:bg-gray-600 text-sm">
                        <FiRefreshCw/> Reiniciar Sesión
                    </button>
                </div>
            </div>
            <div className="mt-6 min-h-[5rem] space-y-2">
                 {sessionStatus === 'winning' && (
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 border-l-4 border-green-500 text-green-800 dark:text-green-300 rounded-r-lg">
                        <div className="flex items-start gap-3"><FaThumbsUp className="h-6 w-6 flex-shrink-0" /><div className="flex-grow"><h4 className="font-extrabold text-lg">¡FELICITACIONES! Has duplicado tu capital inicial.</h4><p className="text-sm mt-1">Has demostrado disciplina y una ejecución consistente. Sin embargo, recuerda que esto es una simulación. En el trading real, la autocomplacencia es peligrosa. Mentirte a ti mismo sobre tus resultados es el peor error que puedes cometer. Mantén la humildad y sigue tu plan.</p></div></div>
                    </div>
                )}
                {showConsecutiveLossAlert && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 rounded-r-lg">
                        <div className="flex items-start gap-3"><FiPauseCircle className="h-6 w-6 flex-shrink-0" /><div className="flex-grow"><h4 className="font-extrabold text-lg">¡ALTO! 3 Pérdidas seguidas. Su mentalidad está en riesgo.</h4><p>Le recomendamos retirarse de inmediato y tomar un descanso.</p></div></div>
                    </div>
                )}
                {alert.message && (
                     <div className={`p-4 border-l-4 rounded-r-lg font-semibold ${alert.type.includes('red') || alert.type.includes('near_wiped_out') ? 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300' : 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-300'}`}>
                        {alert.message}
                    </div>
                )}
                 {config.capital <= 100 && <div className="p-2 text-center text-sm rounded-md bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"><strong>ALERTA DE FATIGA:</strong> No exceder 2 a 3 operaciones diarias.</div>}
                 <div className="p-2 text-center text-sm rounded-md bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"><strong>Límite Estándar:</strong> No se recomienda operar más de 10-15 veces al día.</div>
            </div>

            <div className="mt-8">
                <Accordion title="MANUAL DE USO: Control de Ejecución Binaria | Alerta de Riesgo Extremo (Nivel 3)">
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                        <h4>⚠️ ADVERTENCIA CRÍTICA Y PROPÓSITO</h4>
                        <p>Esta es una herramienta de <strong>SIMULACIÓN</strong> educativa avanzada diseñada para entrenar sus impulsos y el control de riesgo. El propósito de las alertas rojas y los límites es simular las consecuencias psicológicas de la indisciplina.</p>
                        <p>🛑 <strong>INTEGRIDAD:</strong> NO UTILICE estas estadísticas simuladas (ganancias, felicitaciones, etc.) para demostrar éxito o validez en operativas reales. <span translate="no">TRADEVISION</span> desaconseja el uso de estos datos para fines de promoción. <strong>Mentirse a sí mismo es el peor error en el trading.</strong></p>

                        <h4>1. Configuración Inicial y Precisión de Capital</h4>
                        <p>La herramienta le exige una configuración necesaria para iniciar la simulación.</p>
                        
                        <h4>2. Ejecución y Alertas de Riesgo por Comercio</h4>
                        <p>Utilice los botones "Ganó" y "Perdió" para registrar sus operativas y observe cómo el sistema responde a su gestión de riesgo.</p>

                        <h4>3. Monitoreo de Disciplina y Pérdida Acumulada</h4>
                        <p>El sistema monitorea sus impulsos y el estado general del capital, alertando sobre la fatiga y el riesgo de ruina.</p>

                        <h4>4. Alerta de Quema de Cuenta y Reinicio</h4>
                        <p>Este es el punto más crítico de la simulación, diseñado para impactar su psicología.</p>
                        
                        <h5>Condición final: CUENTA A PUNTO DE QUEMARSE (Capital &lt; 10% restante)</h5>
                        <p><strong>Alerta Visual:</strong> El Balance Neto <strong>TITILA lentamente en ROJO NEÓN</strong>. <strong>Mensaje:</strong> ALERTA CRÍTICA: RIESGO DE PÉRDIDA TOTAL. La disciplina exige un alto inmediato.</p>

                        <h5>Condición final: CAPITAL LLEGA A $0.00</h5>
                        <p><strong>Alerta Visual:</strong> El fondo de la calculadora <strong>TITILA RÁPIDAMENTE en NEGRO y ROJO</strong>. <strong>Mensaje:</strong> ¡CUENTA QUEMADA! <span translate="no">TRADEVISION</span> le recuerda: El problema no es el mercado, sino sus impulsos. Nuestro Curso Intermedio de Binarias le ayudará a trabajar su mentalidad.</p>

                        <h5>Botón REINICIAR</h5>
                        <p>Botón independiente y funcional. Restablece todos los contadores (Ganadas, Pérdidas, Balance Neto) al estado inicial, permitiéndole comenzar una nueva simulación con una mente limpia.</p>
                    </div>
                </Accordion>
            </div>
        </div>
    );
};

export default BinaryExecutionControl;