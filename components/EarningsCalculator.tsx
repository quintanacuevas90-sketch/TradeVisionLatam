import React, { useState, useMemo, useEffect } from 'react';
import { FiTrendingUp, FiLayers, FiShield, FiUsers } from 'react-icons/fi';

const EarningsCalculator: React.FC = () => {
    const [sales, setSales] = useState(10);
    const [level, setLevel] = useState(0.30); // Default Global 30%
    const [animatedValues, setAnimatedValues] = useState({ p99: 0, p199: 0, p499: 0 });

    const rates = [
        { label: "Global (30%)", value: 0.30 },
        { label: "Socio Pro (38%)", value: 0.38 },
        { label: "Socio Élite (45%)", value: 0.45 },
    ];

    const calculations = useMemo(() => {
        return {
            p99: sales * 99 * level,
            p199: sales * 199 * level,
            p499: sales * 499 * level
        };
    }, [sales, level]);

    // Simple "Counting" effect when values change
    useEffect(() => {
        setAnimatedValues(calculations);
    }, [calculations]);

    const formatCurrency = (val: number) => 
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="w-full bg-[#050b14]/80 backdrop-blur-xl border border-brand-accent/20 rounded-[2.5rem] p-6 md:p-10 shadow-[0_0_50px_rgba(0,255,255,0.1)]">
            <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2">
                    SIMULADOR DE <span className="text-[#00FFFF] text-shadow-cyan">PROYECCIÓN DE INGRESOS</span>
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-medium">Calcula tu potencial de negocio según tu nivel de compromiso.</p>
            </div>

            {/* LEVEL SELECTOR */}
            <div className="mb-12">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-center">Selecciona tu Nivel de Partner</p>
                <div className="flex flex-wrap justify-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                    {rates.map((r) => (
                        <button
                            key={r.label}
                            onClick={() => setLevel(r.value)}
                            className={`px-4 md:px-8 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                                level === r.value 
                                ? "bg-[#00FFFF] text-brand-primary shadow-[0_0_20px_rgba(0,255,255,0.4)] scale-105" 
                                : "text-gray-500 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* SALES SLIDER */}
            <div className="mb-16 relative px-2">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-300 text-xs md:text-sm font-bold uppercase tracking-widest">Unidades vendidas mensualmente:</p>
                    <span className="text-2xl md:text-4xl font-black text-[#00FFFF] font-mono animate-pulse">
                        {sales}
                    </span>
                </div>
                <div className="relative group">
                    <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={sales} 
                        onChange={(e) => setSales(parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer accent-[#00FFFF] hover:accent-white transition-all"
                        style={{
                            background: `linear-gradient(to right, #00FFFF 0%, #00FFFF ${(sales - 1) / 0.99}%, #1f2937 ${(sales - 1) / 0.99}%, #1f2937 100%)`
                        }}
                    />
                    <div className="absolute -top-8 left-0 w-full flex justify-between text-[10px] font-mono text-gray-600 px-1 pointer-events-none">
                        <span>1</span>
                        <span>25</span>
                        <span>50</span>
                        <span>75</span>
                        <span>100</span>
                    </div>
                </div>
            </div>

            {/* RESULTS DASHBOARD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00FFFF]/30 transition-all text-center group">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Sistema de Ejecución</p>
                    <p className="text-gray-400 text-[9px] mb-4">Producto $99</p>
                    <p className="text-3xl font-black text-[#00FFFF] group-hover:scale-110 transition-transform">
                        {formatCurrency(animatedValues.p99)}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-2">Comisión estimada</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00FFFF]/30 transition-all text-center group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF]/40 to-transparent"></div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Visión Avanzada</p>
                    <p className="text-gray-400 text-[9px] mb-4">Producto $199</p>
                    <p className="text-3xl font-black text-[#00FFFF] group-hover:scale-110 transition-transform">
                        {formatCurrency(animatedValues.p199)}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-2">Comisión estimada</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00FFFF]/30 transition-all text-center group">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Élite Institucional</p>
                    <p className="text-gray-400 text-[9px] mb-4">Producto $499</p>
                    <p className="text-3xl font-black text-[#00FFFF] group-hover:scale-110 transition-transform">
                        {formatCurrency(animatedValues.p499)}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-2">Comisión estimada</p>
                </div>
            </div>

            {/* TRUST NOTICE */}
            <div className="text-center">
                <p className="text-[10px] text-gray-500 leading-relaxed max-w-2xl mx-auto italic">
                    Nota: La gestión de ventas, el rastreo de referidos y el procesamiento de tus pagos son ejecutados al 100% por la plataforma <strong>Whop</strong>, garantizando transparencia y puntualidad en tus depósitos.
                </p>
            </div>

            <style>{`
                .text-shadow-cyan {
                    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
                }
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    background: #00FFFF;
                    cursor: pointer;
                    border-radius: 50%;
                    border: 4px solid #050b14;
                    box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
                    margin-top: -6px; /* Ajuste para centrar */
                }
                input[type='range']::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    background: #00FFFF;
                    cursor: pointer;
                    border-radius: 50%;
                    border: 4px solid #050b14;
                    box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
                }
            `}</style>
        </div>
    );
};

export default EarningsCalculator;