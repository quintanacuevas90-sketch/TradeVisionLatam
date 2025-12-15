import React, { useMemo } from 'react';
import { FaFire, FaGem, FaChartLine, FaRocket } from 'react-icons/fa';

export type SocialProofVariant = 'manual' | 'forex' | 'binarias-premium' | 'binarias-pro';

interface SocialProofWidgetProps {
    variant: SocialProofVariant;
    className?: string;
}

// Helper para generar un número pseudo-aleatorio determinista basado en el tiempo
// Esto asegura que el número sea el mismo para todos los usuarios durante el ciclo de 2 días,
// pero cambie automáticamente cuando pase ese tiempo.
const getDynamicCount = (baseSeed: string, min: number, max: number): number => {
    const now = Date.now();
    // 48 horas en milisegundos (2 días)
    const TIME_BLOCK = 48 * 60 * 60 * 1000; 
    const timeIndex = Math.floor(now / TIME_BLOCK);

    // Combinamos la variante y el bloque de tiempo para crear una semilla única
    const seedString = `${baseSeed}-${timeIndex}-v1`;
    
    // Algoritmo simple de hash (djb2 modificado) para generar caos numérico
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        const char = seedString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convertir a entero de 32 bits
    }

    // Normalizar a un flotante entre 0 y 1 usando Math.sin para dispersión
    const random = (Math.abs(Math.sin(hash) * 10000)) % 1;

    // Escalar al rango deseado
    return Math.floor(random * (max - min + 1)) + min;
};

const SocialProofWidget: React.FC<SocialProofWidgetProps> = ({ variant, className = '' }) => {
    
    // Calculamos el número dinámico
    const count = useMemo(() => {
        switch (variant) {
            case 'manual': 
                // Producto Low Ticket ($19.99): Alto volumen (24 a 48 usuarios)
                return getDynamicCount('manual', 24, 48); 
            case 'forex': 
                // Producto High Ticket ($499): Bajo volumen, alta exclusividad (2 a 7 usuarios)
                return getDynamicCount('forex', 2, 7); 
            case 'binarias-premium': 
                // Producto Mid Ticket ($99): Volumen medio (18 a 32 usuarios)
                return getDynamicCount('binarias-premium', 18, 32);
            case 'binarias-pro': 
                // Producto Mid-High ($199): Volumen selecto (7 a 15 usuarios)
                return getDynamicCount('binarias-pro', 7, 15);
            default: 
                return 10;
        }
    }, [variant]);

    // Configuración de datos según la variante solicitada
    const config = {
        'manual': {
            textPrefix: "Tendencia:",
            count: count.toString(),
            textSuffix: "usuarios han asegurado su documento recientemente.",
            icon: <FaFire />,
            colorClass: "text-amber-400", // Dorado/Naranja
            borderClass: "border-amber-500/30",
            bgClass: "bg-amber-500/10",
            glowClass: "shadow-[0_0_15px_rgba(245,158,11,0.2)]"
        },
        'forex': {
            textPrefix: "Grupo Selecto:",
            count: count.toString(),
            textSuffix: "nuevos usuarios han accedido al entrenamiento de Forex.",
            icon: <FaGem />,
            colorClass: "text-blue-400", // Azul Rey/Cielo
            borderClass: "border-blue-500/30",
            bgClass: "bg-blue-600/10",
            glowClass: "shadow-[0_0_15px_rgba(37,99,235,0.2)]"
        },
        'binarias-premium': {
            textPrefix: "Alta Demanda:",
            count: count.toString(),
            textSuffix: "usuarios han adquirido el Pack Premium de Binarias.",
            icon: <FaChartLine />,
            colorClass: "text-green-400", // Verde Neón
            borderClass: "border-green-500/30",
            bgClass: "bg-green-500/10",
            glowClass: "shadow-[0_0_15px_rgba(74,222,128,0.2)]"
        },
        'binarias-pro': {
            textPrefix: "Círculo Interno:",
            count: count.toString(),
            textSuffix: "traders han desbloqueado el nivel C90Trade Avanzado.",
            icon: <FaRocket />,
            colorClass: "text-purple-400", // Púrpura
            borderClass: "border-purple-500/30",
            bgClass: "bg-purple-600/10",
            glowClass: "shadow-[0_0_15px_rgba(147,51,234,0.2)]"
        }
    };

    const data = config[variant];

    return (
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${data.bgClass} ${data.borderClass} ${data.glowClass} ${className}`}>
            <span className={`text-lg animate-pulse ${data.colorClass}`}>
                {data.icon}
            </span>
            <p className="text-sm text-gray-200 font-medium tracking-wide">
                <span className={`font-bold uppercase mr-1 ${data.colorClass}`}>{data.textPrefix}</span>
                <span className="font-extrabold text-white text-base mx-1">{data.count}</span>
                <span className="opacity-90">{data.textSuffix}</span>
            </p>
        </div>
    );
};

export default SocialProofWidget;