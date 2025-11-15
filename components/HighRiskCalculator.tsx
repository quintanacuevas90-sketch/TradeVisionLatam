import React, { useState, useMemo } from 'react';
import { FiAlertTriangle, FiChevronsUp, FiList, FiRefreshCw } from 'react-icons/fi';
import { FaCalculator } from 'react-icons/fa';
import Accordion from './Accordion';

const initialPanelAState = {
    capital: 100,
    payout: 85,
    wins: 5,
    lossLimit: 3,
};
const initialPanelBState = {
    startAmount: 10,
    increment: 20,
    trades: 5,
};

const HighRiskCalculator: React.FC = () => {
    // --- State Management ---
    const [panelA, setPanelA] = useState(initialPanelAState);
    const [panelB, setPanelB] = useState(initialPanelBState);

    // --- Panel A Calculations (Compounding) ---
    const compoundingProgression = useMemo(() => {
        const results = [];
        let currentInvestment = panelA.capital;
        let totalGain = 0;
        let limitReached = false;

        for (let i = 1; i <= panelA.wins; i++) {
            if (i > panelA.lossLimit) {
                limitReached = true;
            }
            const gain = currentInvestment * (panelA.payout / 100);
            const nextInvestment = currentInvestment + gain;
            results.push({
                step: i,
                investment: currentInvestment,
                gain: gain,
                newCapital: nextInvestment,
            });
            totalGain += gain;
            currentInvestment = nextInvestment;
        }
        return { steps: results, totalGain, finalInvestment: currentInvestment, limitReached };
    }, [panelA]);

    // --- Panel B Calculations (Percentage) ---
    const percentageProgression = useMemo(() => {
        const results = [];
        let currentInvestment = panelB.startAmount;
        let totalInvested = 0;
        let limitReached = false;

        for (let i = 1; i <= panelB.trades; i++) {
            if (i > panelA.lossLimit) { // Uses loss limit from Panel A
                limitReached = true;
            }
            results.push({
                step: i,
                investment: currentInvestment,
            });
            totalInvested += currentInvestment;
            currentInvestment = currentInvestment * (1 + panelB.increment / 100);
        }
        return { steps: results, totalInvested, limitReached };
    }, [panelB, panelA.lossLimit]);


    // --- Handlers ---
    const handleReset = () => {
        setPanelA(initialPanelAState);
        setPanelB(initialPanelBState);
    };
    
    const handlePanelAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

            if (finalCapital !== panelA.capital) {
                setPanelA(prev => ({ ...prev, capital: finalCapital }));
            }
        } else {
            setPanelA(prev => ({ ...prev, [name]: Number(rawValue) }));
        }
    };


    const handlePanelBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPanelB({ ...panelB, [e.target.name]: Number(e.target.value) });
    };

    const getResultClasses = (limitReached: boolean) => {
        return limitReached
            ? 'bg-red-500/30 dark:bg-red-500/40 border-red-600'
            : 'bg-green-500/10 dark:bg-green-500/20 border-green-500';
    };

    // --- Render Logic ---
    return (
        <div className="bg-white dark:bg-brand-primary p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 relative">
            
            {/* Main Content */}
            <div>
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-bold mb-2">NIVEL 5</div>
                    <h2 className="text-4xl font-extrabold text-brand-primary dark:text-white flex items-center justify-center gap-3">
                        <FaCalculator /> Calculadora de Alto Riesgo
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Sistema de Ganancias Dobles y Porcentajes</p>
                    <button onClick={handleReset} className="mt-4 inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm">
                        <FiRefreshCw /> Reiniciar Cálculo
                    </button>
                </div>

                {/* HIGH RISK WARNING */}
                <div className="mt-8 p-4 bg-red-800 text-white rounded-lg border-2 border-red-600">
                    <h3 className="font-extrabold text-lg flex items-center gap-2"><FiAlertTriangle /> ADVERTENCIA DE ALTO RIESGO: PROPÓSITO EXCLUSIVAMENTE EDUCATIVO Y DE SIMULACIÓN.</h3>
                    <p className="mt-2 text-red-100 text-sm">Este programa utiliza estrategias de <strong>progresión de capital agresiva</strong> (Compounding, Martingala progresiva), las cuales conllevan un <strong>riesgo extremo de pérdida total</strong>. <strong>TRADEVISION</strong> desaconseja categóricamente el uso de estas estrategias para usuarios nuevos o para cualquier operación en vivo. Si usted no es un usuario avanzado que entiende la gestión de riesgo exponencial, le recomendamos <strong>no utilizar ni probar</strong> esta calculadora. Esto es solo una herramienta de simulación para ilustrar el riesgo.</p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Panel A */}
                    <div className="space-y-4 p-6 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                        <h3 className="text-2xl font-bold flex items-center gap-2"><FiChevronsUp/> Sistema de Ganancias Dobles</h3>
                        {/* Inputs A */}
                        <div>
                            <label className="block text-sm font-bold">Capital de Inicio: <span className="text-brand-accent">${panelA.capital.toLocaleString('en-US')}</span></label>
                            <input type="range" name="capital" min="1" max="1000000" step="1" value={panelA.capital} onChange={handlePanelAChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold">Porcentaje de Pago: <span className="text-brand-accent">{panelA.payout}%</span></label>
                            <input type="range" name="payout" min="60" max="95" step="1" value={panelA.payout} onChange={handlePanelAChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold">Operaciones Ganadas Consecutivas: <span className="text-brand-accent">{panelA.wins}</span></label>
                            <input type="range" name="wins" min="2" max="50" step="1" value={panelA.wins} onChange={handlePanelAChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold">Límite Máximo de Pérdidas por Sesión: <span className="text-brand-accent">{panelA.lossLimit}</span></label>
                            <input type="range" name="lossLimit" min="1" max={panelA.wins} step="1" value={panelA.lossLimit} onChange={handlePanelAChange} />
                        </div>
                        {/* Results A */}
                        <div className={`p-4 mt-4 rounded-lg border transition-colors duration-300 ${getResultClasses(compoundingProgression.limitReached)}`}>
                            {compoundingProgression.limitReached ? (
                                <div className="text-center text-red-700 dark:text-red-200 mb-4">
                                    <p className="font-extrabold text-base">ALERTA: RIESGO MÁXIMO ALCANZADO.</p>
                                    <p className="text-xs mt-1">Su simulación ha superado el límite de pérdidas. El riesgo es exponencialmente alto. Proceda con extrema cautela.</p>
                                </div>
                            ) : (
                                <p className="font-bold text-center text-green-800 dark:text-green-300 mb-2">Exploración de riesgo responsable.</p>
                            )}
                            <div className="space-y-2 text-gray-800 dark:text-white">
                                <p><strong>Capital Necesario en Op. N°{compoundingProgression.steps.length}:</strong> <span className="font-mono text-lg">${(compoundingProgression.steps[compoundingProgression.steps.length - 1]?.investment || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                                <p><strong>Ganancia Total Acumulada:</strong> <span className="font-mono text-lg text-green-600 dark:text-green-400">${(compoundingProgression.totalGain).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                                <div className="max-h-48 overflow-y-auto text-xs font-mono pr-2 text-gray-700 dark:text-gray-300">
                                    <table className="w-full text-left">
                                        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700"><tr><th className="p-1">#</th><th className="p-1">Inversión</th><th className="p-1">Ganancia</th><th className="p-1">Nuevo Cap.</th></tr></thead>
                                        <tbody>{compoundingProgression.steps.map(s => <tr key={s.step} className="border-b dark:border-white/10"><td className="p-1">{s.step}</td><td className="p-1">${s.investment.toFixed(2)}</td><td className="p-1">${s.gain.toFixed(2)}</td><td className="p-1">${s.newCapital.toFixed(2)}</td></tr>)}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Panel B */}
                    <div className="space-y-4 p-6 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                        <h3 className="text-2xl font-bold flex items-center gap-2"><FiList/> Sistema de Progresión por Porcentaje</h3>
                        {/* Inputs B */}
                        <div>
                            <label className="block text-sm font-bold">Monto de Inicio: <span className="text-brand-accent">${panelB.startAmount}</span></label>
                            <input type="range" name="startAmount" min="1" max="100" step="1" value={panelB.startAmount} onChange={handlePanelBChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold">Incremento por Operación: <span className="text-brand-accent">{panelB.increment}%</span></label>
                            <input type="range" name="increment" min="1" max="100" step="0.01" value={panelB.increment} onChange={handlePanelBChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold">Número Total de Operaciones: <span className="text-brand-accent">{panelB.trades}</span></label>
                            <input type="range" name="trades" min="2" max="50" step="1" value={panelB.trades} onChange={handlePanelBChange} />
                        </div>
                        {/* Results B */}
                        <div className={`p-4 mt-4 rounded-lg border transition-colors duration-300 ${getResultClasses(percentageProgression.limitReached)}`}>
                            {percentageProgression.limitReached ? (
                                <div className="text-center text-red-700 dark:text-red-200 mb-4">
                                    <p className="font-extrabold text-base">ALERTA: RIESGO MÁXIMO ALCANZADO.</p>
                                     <p className="text-xs mt-1">Su simulación ha superado el límite de pérdidas. El riesgo es exponencialmente alto. Proceda con extrema cautela.</p>
                                </div>
                            ) : (
                                <p className="font-bold text-center text-green-800 dark:text-green-300 mb-2">Exploración de riesgo responsable.</p>
                            )}
                             <div className="space-y-2 text-gray-800 dark:text-white">
                                <p><strong>Inversión Total Acumulada:</strong> <span className="font-mono text-lg">${percentageProgression.totalInvested.toFixed(2)}</span></p>
                                <div className="max-h-48 overflow-y-auto text-xs font-mono pr-2 text-gray-700 dark:text-gray-300">
                                    <table className="w-full text-left">
                                        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700"><tr><th className="p-1">Operación #</th><th className="p-1">Monto a Invertir</th></tr></thead>
                                        <tbody>{percentageProgression.steps.map(s => <tr key={s.step} className="border-b dark:border-white/10"><td className="p-1">{s.step}</td><td className="p-1">${s.investment.toFixed(2)}</td></tr>)}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-xl font-bold text-center">Manual de Uso y Advertencias</h3>
                    <Accordion title="1. Sistema de Ganancias Dobles (Compounding Agresivo)">
                        <div className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none">
                            <h4>Propósito:</h4>
                            <p>Simular el crecimiento exponencial del capital reinvirtiendo la ganancia total de cada operación ganadora consecutiva.</p>
                            <p>⚠️ <strong>ADVERTENCIA:</strong> Esta estrategia conlleva un riesgo extremo de pérdida total. Utilice esta herramienta únicamente para comprender el riesgo exponencial, no para operar en mercados reales.</p>
                            <h4>Funcionamiento:</h4>
                            <ul>
                                <li>Ingrese su <strong>Capital de Inicio</strong> (pasos de $1 a $100,000; luego pasos de $50 hasta $1,000,000).</li>
                                <li>Establezca el <strong>Porcentaje de Pago</strong> del Broker (ej. 85%).</li>
                                <li>Defina la cantidad de <strong>Operaciones Ganadas Consecutivas</strong> que desea simular.</li>
                            </ul>
                            <p><strong>Alerta Visual:</strong> Si el riesgo simulado excede el límite de pérdidas estimadas, la tabla se pondrá <strong>ROJO NEÓN</strong>. Esta es una advertencia, pero el programa no se detendrá.</p>
                            <p>Utilice el botón <strong>Reiniciar Simulación</strong> para limpiar el panel después de cada análisis y evitar la fatiga mental.</p>
                        </div>
                    </Accordion>
                    <Accordion title="2. Sistema de Progresión por Porcentaje">
                        <div className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none">
                            <h4>Propósito:</h4>
                            <p>Calcular el monto de inversión total que se requiere al aumentar la apuesta en un porcentaje fijo con cada operación, sin considerar el resultado (simulando estrategias Martingala progresivas o de alto riesgo).</p>
                            <p>⚠️ <strong>ADVERTENCIA:</strong> Esta estrategia es inherentemente peligrosa y puede agotar rápidamente su cuenta. Es una herramienta solo educativa.</p>
                            <h4>Funcionamiento:</h4>
                            <ul>
                                <li>Ingrese el <strong>Monto de Inicio</strong> de la primera operación.</li>
                                <li>Defina el <strong>Porcentaje de Incremento</strong> por Operación (cuánto aumenta la apuesta en cada paso).</li>
                                <li>Defina el <strong>Número Total de Operaciones</strong> a calcular.</li>
                            </ul>
                            <p>El programa le mostrará cuánto capital total se requiere para completar la secuencia.</p>
                            <p>Utilice el botón <strong>Reiniciar Progresión</strong> para analizar diferentes escenarios de riesgo sin mezclar simulaciones.</p>
                        </div>
                    </Accordion>
                </div>

            </div>
        </div>
    );
};

export default HighRiskCalculator;