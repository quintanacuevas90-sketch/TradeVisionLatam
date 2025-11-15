import React, { useState } from 'react';
import { FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const patterns = [
    // Patrones Bajistas
    {
        name: 'Envolvente Bajista',
        category: 'Bajista 📉',
        description: 'Indica un posible cambio de dirección. Una vela alcista es envuelta completamente por una vela bajista.',
        effectiveness: 'Alta',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <rect x="25" y="50" width="20" height="30" fill="#10B981" />
                <rect x="55" y="20" width="25" height="80" fill="#EF4444" />
            </svg>
        )
    },
    {
        name: 'Lápida (Bearish DOJI)',
        category: 'Bajista 📉',
        description: 'Posible reversión en un impulso alcista o continuidad en uno bajista. Marca agotamiento comprador.',
        effectiveness: 'Media-Alta',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <line x1="50" y1="10" x2="50" y2="108" stroke="#EF4444" strokeWidth="4" />
                <line x1="35" y1="110" x2="65" y2="110" stroke="#EF4444" strokeWidth="4" />
            </svg>
        )
    },
    {
        name: 'Hombre Colgado (Hanging Man)',
        category: 'Bajista 📉',
        description: 'Aparece en una tendencia alcista. Su larga mecha inferior indica un rechazo de los precios bajos, pero la falta de continuación alcista sugiere debilidad.',
        effectiveness: 'Alta',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <line x1="50" y1="30" x2="50" y2="110" stroke="#EF4444" strokeWidth="4" />
                <rect x="40" y="10" width="20" height="20" fill="#EF4444" />
            </svg>
        )
    },
    {
        name: 'Estrella Fugaz (Shooting Star)',
        category: 'Bajista 📉',
        description: 'Aparece en una tendencia alcista. Su larga mecha superior indica un fuerte rechazo de los precios altos por parte de los vendedores.',
        effectiveness: 'Baja-Media',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <line x1="50" y1="10" x2="50" y2="90" stroke="#EF4444" strokeWidth="4" />
                <rect x="40" y="90" width="20" height="20" fill="#EF4444" />
            </svg>
        )
    },
    {
        name: 'Estrella del Atardecer (Evening Star)',
        category: 'Bajista 📉',
        description: 'Patrón de tres velas de reversión. Una vela alcista grande, una pequeña vela de indecisión y una vela bajista que cierra por debajo del 50% de la primera.',
        effectiveness: 'Alta',
        svg: (
            <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                <rect x="10" y="40" width="25" height="70" fill="#10B981" />
                <rect x="50" y="10" width="15" height="15" fill="currentColor" />
                <rect x="80" y="30" width="25" height="70" fill="#EF4444" />
            </svg>
        )
    },
    {
        name: 'Cubierta de Nube Oscura',
        category: 'Bajista 📉',
        description: 'Tras una vela alcista, una vela bajista abre por encima pero cierra por debajo del 50% del cuerpo de la primera, mostrando un cambio de poder a los vendedores.',
        effectiveness: 'Alta',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <rect x="20" y="30" width="25" height="80" fill="#10B981" />
                <rect x="55" y="10" width="25" height="80" fill="#EF4444" />
            </svg>
        )
    },
    {
        name: 'Harami Bajista',
        category: 'Bajista 📉',
        description: 'Una pequeña vela bajista aparece contenida dentro del cuerpo de la gran vela alcista anterior, indicando una pérdida de impulso alcista.',
        effectiveness: 'Baja',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <rect x="20" y="20" width="30" height="80" fill="#10B981" />
                <rect x="60" y="50" width="15" height="20" fill="#EF4444" />
            </svg>
        )
    },
    {
        name: 'Tres Cuervos Negros',
        category: 'Bajista 📉',
        description: 'Tres velas bajistas largas y consecutivas que cierran cada vez más bajo. Un fuerte indicador de reversión bajista.',
        effectiveness: 'Alta',
        svg: (
            <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                <rect x="10" y="10" width="20" height="50" fill="#EF4444" />
                <rect x="45" y="30" width="20" height="50" fill="#EF4444" />
                <rect x="80" y="50" width="20" height="50" fill="#EF4444" />
            </svg>
        )
    },
    // Patrones Alcistas
    {
        name: 'Envolvente Alcista',
        category: 'Alcista 📈',
        description: 'Indica un posible cambio de dirección. Una vela bajista es envuelta completamente por una vela alcista.',
        effectiveness: 'Alta',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <rect x="25" y="50" width="20" height="30" fill="#EF4444" />
                <rect x="55" y="20" width="25" height="80" fill="#10B981" />
            </svg>
        )
    },
    {
        name: 'Libélula (Bullish DOJI)',
        category: 'Alcista 📈',
        description: 'Probable reversión en un impulso bajista o continuidad en uno alcista. Marca un fuerte rechazo de precios bajos.',
        effectiveness: 'Media-Alta',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <line x1="50" y1="12" x2="50" y2="110" stroke="#10B981" strokeWidth="4" />
                <line x1="35" y1="10" x2="65" y2="10" stroke="#10B981" strokeWidth="4" />
            </svg>
        )
    },
    {
        name: 'Martillo (Hammer)',
        category: 'Alcista 📈',
        description: 'Aparece en una tendencia bajista. Su larga mecha inferior indica un rechazo de los precios bajos por parte de los compradores.',
        effectiveness: 'Alta',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <line x1="50" y1="30" x2="50" y2="110" stroke="#10B981" strokeWidth="4" />
                <rect x="40" y="10" width="20" height="20" fill="#10B981" />
            </svg>
        )
    },
    {
        name: 'Martillo Invertido',
        category: 'Alcista 📈',
        description: 'Aparece en una tendencia bajista. Aunque los vendedores empujaron el precio hacia abajo, la incapacidad de mantener los mínimos sugiere agotamiento vendedor.',
        effectiveness: 'Baja-Media',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <line x1="50" y1="10" x2="50" y2="90" stroke="#10B981" strokeWidth="4" />
                <rect x="40" y="90" width="20" height="20" fill="#10B981" />
            </svg>
        )
    },
    {
        name: 'Estrella del Amanecer (Morning Star)',
        category: 'Alcista 📈',
        description: 'Patrón de tres velas de reversión. Una vela bajista grande, una pequeña vela de indecisión y una vela alcista que cierra por encima del 50% de la primera.',
        effectiveness: 'Alta',
        svg: (
            <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                <rect x="10" y="10" width="25" height="70" fill="#EF4444" />
                <rect x="50" y="95" width="15" height="15" fill="currentColor" />
                <rect x="80" y="20" width="25" height="70" fill="#10B981" />
            </svg>
        )
    },
    {
        name: 'Perforación (Piercing Pattern)',
        category: 'Alcista 📈',
        description: 'Tras una vela bajista, una vela alcista abre por debajo pero cierra por encima del 50% del cuerpo de la primera, mostrando un fuerte cambio de poder a los compradores.',
        effectiveness: 'Alta',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <rect x="20" y="10" width="25" height="80" fill="#EF4444" />
                <rect x="55" y="30" width="25" height="80" fill="#10B981" />
            </svg>
        )
    },
    {
        name: 'Harami Alcista',
        category: 'Alcista 📈',
        description: 'Una pequeña vela alcista aparece contenida dentro del cuerpo de la gran vela bajista anterior, indicando una pérdida de impulso bajista.',
        effectiveness: 'Baja',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <rect x="20" y="20" width="30" height="80" fill="#EF4444" />
                <rect x="60" y="50" width="15" height="20" fill="#10B981" />
            </svg>
        )
    },
    {
        name: 'Tres Soldados Blancos',
        category: 'Alcista 📈',
        description: 'Tres velas alcistas largas y consecutivas que cierran cada vez más alto. Un fuerte indicador de reversión alcista.',
        effectiveness: 'Alta',
        svg: (
            <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                <rect x="10" y="50" width="20" height="50" fill="#10B981" />
                <rect x="45" y="30" width="20" height="50" fill="#10B981" />
                <rect x="80" y="10" width="20" height="50" fill="#10B981" />
            </svg>
        )
    },
    // Patrones Neutrales
    {
        name: 'DOJI',
        category: 'Neutral 🔄',
        description: 'Indica indecisión y equilibrio entre compradores y vendedores. El precio de apertura y cierre son casi idénticos. No se recomienda operar sin experiencia.',
        effectiveness: 'Alta',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <line x1="50" y1="20" x2="50" y2="100" stroke="currentColor" strokeWidth="4" />
                <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="4" />
            </svg>
        )
    },
    {
        name: 'DOJI de Piernas Largas',
        category: 'Neutral 🔄',
        description: 'Similar al DOJI, pero con mechas de gran tamaño que indican una gran volatilidad además de indecisión. Máxima alerta en el mercado.',
        effectiveness: 'Alta',
        svg: (
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto">
                <line x1="50" y1="5" x2="50" y2="115" stroke="currentColor" strokeWidth="4" />
                <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="4" />
            </svg>
        )
    }
];

const ExecutionPatterns: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevPattern = () => {
        const isFirst = currentIndex === 0;
        const newIndex = isFirst ? patterns.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextPattern = () => {
        const isLast = currentIndex === patterns.length - 1;
        const newIndex = isLast ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const currentPattern = patterns[currentIndex];

    const getEffectivenessClass = (effectiveness: string) => {
        switch (effectiveness.toLowerCase()) {
            case 'alta': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'media-alta': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'baja-media': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            case 'baja': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    return (
        <div className="bg-white dark:bg-brand-primary p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10">
            <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-bold mb-2">NIVEL 2</div>
                <h2 className="text-4xl font-extrabold text-brand-primary dark:text-white flex items-center justify-center gap-3">
                    <FiEye /> Entrenamiento de Patrones de Ejecución
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Refuerza tu visión con el entrenamiento repetitivo. Como un atleta de élite, la maestría se logra a través de la práctica constante.</p>
            </div>

            <div className="relative mt-8 h-[420px] flex items-center justify-center">
                {/* Carousel content */}
                <div className="w-full max-w-md text-center">
                    <div className="h-40 flex items-center justify-center text-gray-700 dark:text-gray-300">
                        {currentPattern.svg}
                    </div>
                    <h3 className="mt-4 text-3xl font-bold text-brand-accent">{currentPattern.name}</h3>
                    <div className="flex justify-center items-center gap-4 my-2">
                        <span className="text-xs font-bold uppercase px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">{currentPattern.category}</span>
                        <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${getEffectivenessClass(currentPattern.effectiveness)}`}>
                            Efectividad: {currentPattern.effectiveness}
                        </span>
                    </div>
                    <p className="mt-2 text-base text-gray-600 dark:text-gray-400 h-28">{currentPattern.description}</p>
                </div>

                {/* Navigation */}
                <button onClick={prevPattern} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition">
                    <FiChevronLeft size={24} />
                </button>
                <button onClick={nextPattern} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition">
                    <FiChevronRight size={24} />
                </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                {patterns.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentIndex === index ? 'w-4 bg-brand-accent' : 'bg-gray-300 dark:bg-gray-600 hover:bg-brand-accent/50'
                        }`}
                        aria-label={`Ir al patrón ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExecutionPatterns;