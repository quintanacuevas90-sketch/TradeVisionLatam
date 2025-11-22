
import React, { useState, useMemo } from 'react';
import { FiTrendingUp, FiTrendingDown, FiAlertCircle } from 'react-icons/fi';
import { FaCalculator } from 'react-icons/fa';

const RiskCalculator: React.FC = () => {
    const [balance, setBalance] = useState(1000);
    const [risk, setRisk] = useState(1);
    const [payout, setPayout] = useState(85);

    const investment = useMemo(() => balance * (risk / 100), [balance, risk]);
    const profit = useMemo(() => investment * (payout / 100), [investment, payout]);

    const riskStatus = useMemo(() => {
        if (risk <= 3) return { label: 'DISCIPLINADO', color: 'text-green-400' };
        if (risk <= 5) return { label: 'ALERTA', color: 'text-yellow-400' };
        return { label: 'AGRESIVO', color: 'text-red-500' };
    }, [risk]);

    return (
        <div className="bg-gray-800/50 text-white p-6 rounded-xl border border-brand-accent/30 shadow-lg">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
                <FaCalculator className="text-brand-accent"/>
                Calculadora de Riesgo Disciplinado
            </h3>

            <div className="space-y-6">
                {/* Inputs */}
                <div>
                    <label htmlFor="balance" className="block text-sm font-bold mb-2">Capital Total: <span className="text-brand-accent font-mono">${balance.toLocaleString()}</span></label>
                    <input id="balance" type="range" min="100" max="10000" step="100" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="risk" className="block text-sm font-bold mb-2">Riesgo por Operación: <span className="text-brand-accent font-mono">{risk.toFixed(2)}%</span></label>
                    <input id="risk" type="range" min="0.5" max="10" step="0.25" value={risk} onChange={(e) => setRisk(Number(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="payout" className="block text-sm font-bold mb-2">Pago del Broker: <span className="text-brand-accent font-mono">{payout}%</span></label>
                    <input id="payout" type="range" min="60" max="95" step="1" value={payout} onChange={(e) => setPayout(Number(e.target.value))} />
                </div>
            </div>
            
            {/* Outputs */}
            <div className="mt-8 pt-6 border-t border-brand-accent/20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-xs uppercase text-gray-400 tracking-wider">Inversión</p>
                        <p className="text-2xl font-bold font-mono text-white">${investment.toFixed(2)}</p>
                    </div>
                    <div className="text-green-400">
                        <p className="text-xs uppercase text-gray-400 tracking-wider">Ganancia Potencial</p>
                        <p className="text-2xl font-bold font-mono flex items-center justify-center gap-2">
                            <FiTrendingUp/> ${profit.toFixed(2)}
                        </p>
                    </div>
                    <div className="text-red-500">
                        <p className="text-xs uppercase text-gray-400 tracking-wider">Pérdida Potencial</p>
                        <p className="text-2xl font-bold font-mono flex items-center justify-center gap-2">
                            <FiTrendingDown/> ${investment.toFixed(2)}
                        </p>
                    </div>
                </div>
                
                <div className={`mt-6 p-3 rounded-lg border flex items-center justify-center gap-2 transition-colors duration-300
                    ${riskStatus.color === 'text-green-400' ? 'bg-green-500/10 border-green-500/30' : 
                     riskStatus.color === 'text-yellow-400' ? 'bg-yellow-500/10 border-yellow-500/30' :
                     'bg-red-500/10 border-red-500/30'}`}>
                    <FiAlertCircle className={riskStatus.color} />
                    <p className={`text-sm font-bold ${riskStatus.color}`}>Nivel de Riesgo: {riskStatus.label}</p>
                </div>
            </div>
        </div>
    );
};

export default RiskCalculator;
