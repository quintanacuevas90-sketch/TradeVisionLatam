
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
        <div className="bg-white dark:bg-brand-primary/50 p-4 sm:p-8 rounded-xl relative">
            
            {/* Main Content */}
            <div>
                {/* Header */}
                <div className="text-center">
                    <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">Sistema de Ganancias Dobles y Porcentajes</p>
                    <button onClick={handleReset} className="mt-4 inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition text-xs md:text-sm">
                        <FiRefreshCw /> Reiniciar Cálculo
                    </button>
                </div>

                {/* HIGH RISK WARNING WITH MASCOT */}
                <div className="mt-8 flex flex-col md:flex-row items-center gap-6 p-4 bg-red-900/50 text-white rounded-lg border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                    <div className="flex-1">
                        <h3 className="font-extrabold text-base md:text-lg flex items-center gap-2 text-glow-red"><FiAlertTriangle /> ADVERTENCIA DE ALTO RIESGO</h3>
                        <p className="mt-2 text-red-100 text-xs md:text-sm">Este programa utiliza estrategias de <strong>progresión de capital agresiva</strong> (Compounding, Martingala progresiva), las cuales conllevan un <strong>riesgo extremo de pérdida total</strong>. <strong>TRADEVISION</strong> desaconseja categóricamente el uso de estas estrategias para usuarios nuevos. Esto es solo una herramienta de simulación.</p>
                    </div>
                    <div className="flex-shrink-0">
                        <img 
                            src="https://i.pinimg.com/736x/db/31/b4/db31b46235afd233c0372a0c5eaeb931.jpg" 
                            alt="Mascota TradeVision Señalando" 
                            className="w-24 md:w-32 rounded-full border-2 border-red-500"
                        />
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Panel A */}
                    <div className="space-y-4 p-4 md:p-6 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                        <h3 className="text-lg md:text-2xl font-bold flex items-center gap-2 text-brand-primary dark:text-white"><FiChevronsUp/> Sistema de Ganancias Dobles</h3>
                        {/* Inputs A */}
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-gray-800 dark:text-white">Capital de Inicio: <span className="text-brand-accent">${panelA.capital.toLocaleString('en-US')}</span></label>
                            <input type="range" name="capital" min="1" max="1000000" step="1" value={panelA.capital} onChange={handlePanelAChange} />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-gray-800 dark:text-white">Porcentaje de Pago: <span className="text-brand-accent">{panelA.payout}%</span></label>
                            <input type="range" name="payout" min="60" max="95" step="1" value={panelA.payout} onChange={handlePanelAChange} />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-gray-800 dark:text-white">Operaciones Ganadas Consecutivas: <span className="text-brand-accent">{panelA.wins}</span></label>
                            <input type="range" name="wins" min="2" max="50" step="1" value={panelA.wins} onChange={handlePanelAChange} />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-gray-800 dark:text-white">Límite Máximo de Pérdidas: <span className="text-brand-accent">{panelA.lossLimit}</span></label>
                            <input type="range" name="lossLimit" min="1" max={panelA.wins} step="1" value={panelA.lossLimit} onChange={handlePanelAChange} />
                        </div>
                        {/* Results A */}
                        <div className={`p-4 mt-4 rounded-lg border transition-colors duration-300 ${getResultClasses(compoundingProgression.limitReached)}`}>
                            {compoundingProgression.limitReached ? (
                                <div className="text-center text-red-700 dark:text-red-200 mb-4">
                                    <p className="font-extrabold text-sm md:text-base text-glow-red">ALERTA: RIESGO MÁXIMO ALCANZADO.</p>
                                </div>
                            ) : (
                                <p className="font-bold text-center text-green-800 dark:text-green-300 mb-2 text-sm">Exploración de riesgo responsable.</p>
                            )}
                            <div className="space-y-2 text-gray-800 dark:text-white text-sm">
                                <p><strong>Capital Necesario en Op. N°{compoundingProgression.steps.length}:</strong> <span className="font-mono text-base md:text-lg">${(compoundingProgression.steps[compoundingProgression.steps.length - 1]?.investment || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                                <p><strong>Ganancia Total:</strong> <span className="font-mono text-base md:text-lg text-green-600 dark:text-green-400 text-glow-green">${(compoundingProgression.totalGain).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                                <div className="max-h-48 overflow-y-auto text-[10px] md:text-xs font-mono pr-2 text-gray-700 dark:text-gray-300">
                                    <table className="w-full text-left">
                                        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700"><tr><th className="p-1">#</th><th className="p-1">Inversión</th><th className="p-1">Ganancia</th><th className="p-1">Nuevo Cap.</th></tr></thead>
                                        <tbody>{compoundingProgression.steps.map(s => <tr key={s.step} className="border-b dark:border-white/10"><td className="p-1">{s.step}</td><td className="p-1">${s.investment.toFixed(2)}</td><td className="p-1">${s.gain.toFixed(2)}</td><td className="p-1">${s.newCapital.toFixed(2)}</td></tr>)}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Panel B */}
                    <div className="space-y-4 p-4 md:p-6 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                        <h3 className="text-lg md:text-2xl font-bold flex items-center gap-2 text-brand-primary dark:text-white"><FiList/> Sistema de Progresión por Porcentaje</h3>
                        {/* Inputs B */}
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-gray-800 dark:text-white">Monto de Inicio: <span className="text-brand-accent">${panelB.startAmount}</span></label>
                            <input type="range" name="startAmount" min="1" max="100" step="1" value={panelB.startAmount} onChange={handlePanelBChange} />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-gray-800 dark:text-white">Incremento por Operación: <span className="text-brand-accent">{panelB.increment}%</span></label>
                            <input type="range" name="increment" min="1" max="100" step="0.01" value={panelB.increment} onChange={handlePanelBChange} />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-gray-800 dark:text-white">Número Total de Operaciones: <span className="text-brand-accent">{panelB.trades}</span></label>
                            <input type="range" name="trades" min="2" max="50" step="1" value={panelB.trades} onChange={handlePanelBChange} />
                        </div>
                        {/* Results B */}
                        <div className={`p-4 mt-4 rounded-lg border transition-colors duration-300 ${getResultClasses(percentageProgression.limitReached)}`}>
                            {percentageProgression.limitReached ? (
                                <div className="text-center text-red-700 dark:text-red-200 mb-4">
                                    <p className="font-extrabold text-sm md:text-base text-glow-red">ALERTA: RIESGO MÁXIMO ALCANZADO.</p>
                                </div>
                            ) : (
                                <p className="font-bold text-center text-green-800 dark:text-green-300 mb-2 text-sm">Exploración de riesgo responsable.</p>
                            )}
                             <div className="space-y-2 text-gray-800 dark:text-white text-sm">
                                <p><strong>Inversión Total Acumulada:</strong> <span className="font-mono text-base md:text-lg">${percentageProgression.totalInvested.toFixed(2)}</span></p>
                                <div className="max-h-48 overflow-y-auto text-[10px] md:text-xs font-mono pr-2 text-gray-700 dark:text-gray-300">
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
                    <h3 className="text-lg md:text-xl font-bold text-center text-white">Manual de Uso y Advertencias</h3>
                    <Accordion title="1. Sistema de Ganancias Dobles">
                        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none">
                            <p>Simular el crecimiento exponencial del capital reinvirtiendo la ganancia total.</p>
                            <p>⚠️ <strong>ADVERTENCIA:</strong> Riesgo extremo de pérdida total.</p>
                        </div>
                    </Accordion>
                    <Accordion title="2. Sistema de Progresión por Porcentaje">
                        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none">
                            <p>Calcular el monto de inversión total al aumentar la apuesta en un porcentaje fijo.</p>
                            <p>⚠️ <strong>ADVERTENCIA:</strong> Esta estrategia puede agotar rápidamente su cuenta.</p>
                        </div>
                    </Accordion>
                </div>

            </div>
        </div>
    );
};

export default HighRiskCalculator;
