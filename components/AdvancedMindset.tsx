import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiCpu } from 'react-icons/fi';

const quotes = [
    // I. Aceptación del Riesgo y la Probabilidad
    { text: "Aprender a operar es una simple cuestión de entrenar la mente para pensar en términos de probabilidades." },
    { text: "La forma más efectiva de asumir la responsabilidad es dejar de intentar determinar qué hará el mercado a continuación." },
    { text: "Cualquier cosa puede suceder. No importa cuán bien establecido se vea una pausa, siempre hay una posibilidad de que falle." },
    { text: "Cada borde tiene una probabilidad de éxito y una de fracaso, y es irrelevante para el resultado de cualquier operación individual." },
    { text: "Usted no tiene que saber lo que el mercado hará a continuación para ganar dinero." },
    { text: "Si usted no cree que 'cualquier cosa puede suceder', siempre operará con una expectativa irreal." },
    { text: "Las pérdidas no son más que los costos de operación de su negocio. Acepte este costo de forma objetiva." },
    { text: "Debe neutralizar la presión de tener la razón. Usted no tiene que tener la razón para ganar dinero." },
    { text: "Las pérdidas le enseñarán algo sobre usted, pero no le dirán nada sobre el potencial del mercado para moverse en su dirección." },
    { text: "Usted debe creer que el trading exitoso es un juego de números en el que no es necesario predecir." },
    { text: "El riesgo siempre es inherente al mercado y no puede ser eliminado, solo gestionado." },
    { text: "El objetivo principal es convertirse en un pensador de probabilidades, no en un adivinador de resultados." },
    { text: "En el entorno del trading, la certeza es una ilusión y el miedo es la consecuencia de buscarla." },
    { text: "El mercado ofrece una oportunidad sin fin. Su mente, sin embargo, debe establecer los límites a esa oportunidad." },
    { text: "Deje de buscar la 'señal mágica'. La señal mágica es su disciplina interior.." },
    // II. Gestión de la Creencia y el Control
    { text: "El trader que opera sin miedo ha aceptado el riesgo de forma completa y profunda." },
    { text: "El mercado no le debe nada. El mercado no es responsable de su felicidad financiera." },
    { text: "Si no acepta la posibilidad de una pérdida, esa pérdida le causará más daño emocional del que debería." },
    { text: "Usted es el único responsable de lo que hace y lo que no hace." },
    { text: "No intente forzar al mercado a hacer lo que usted quiere. El mercado le hará lo que el mercado quiera." },
    { text: "Para ser constante, debe crear una creencia de que necesita reglas que le definan qué hacer y qué no hacer.." },
    { text: "El trader se convierte en su propio peor enemigo cuando confía en el miedo y la euforia para tomar decisiones." },
    { text: "La mayoría de los comerciantes operan con la esperanza de que el mercado les dé el dinero que necesitan." },
    { text: "El problema real no es la falta de conocimiento, sino la falta de control sobre el miedo." },
    { text: "Usted debe dejar ir la necesidad de saber qué sucederá a continuación. Esto es la única forma de ser objetivo.." },
    { text: "Cuando el miedo existe, la percepción se distorsiona. Solo verá aquello que confirma su miedo o su deseo." },
    { text: "La mente no puede estar abierta a recibir información si está defendiendo una posición." },
    { text: "Su consistencia proviene de la habilidad de ejecutar sistemáticamente su borde sin reservas." },
    { text: "La disciplina es simplemente la capacidad de ejecutar un plan sin distracción emocional." },
    { text: "Las pautas de mercado solo se manifiestan si usted cree plenamente en ellas." },
    // III. El Pensamiento Probabilístico y la Independencia
    { text: "El mejor trader es aquel que actúa con independencia, sin la influencia de la manada o el miedo colectivo." },
    { text: "Su trabajo no es predecir, sino gestionar su percepción del mercado y la ejecución de su sistema." },
    { text: "El pensamiento probabilístico: (1) Cualquier cosa puede suceder. (2) No se necesita saber qué sucederá para ganar." },
    { text: "(3) El borde no es más que una indicación de probabilidad. (4) El borde es un juego de números." },
    { text: "(5) Cada momento en el mercado es único e independiente de cualquier otro momento." },
    { text: "La independencia significa que cada pérdida no le afecta; usted solo sigue la disciplina del siguiente comercio.." },
    { text: "Si usted no puede aceptar el riesgo incontrolable, usted no puede operar." },
    { text: "El trader superior actúa sin presión, porque su bienestar no depende del resultado de la siguiente operación." },
    { text: "El problema del trading es que permite una libertad extrema, lo que requiere una autodisciplina extrema." },
    { text: "El objetivo es desarrollar una estructura mental que le permita operar con objetividad, sin miedo y sin culpas." },
    { text: "Si no respeta sus reglas, está enseñando a su mente que el peligro no existe." },
    { text: "El trading no es una actividad de análisis, sino de ejecución fría." },
    { text: "Una vez que la operación comienza, ya no es controlable; solo es gestionable." },
    { text: "Usted debe crear un estado mental donde el miedo y la euforia no tengan el poder de alterar su percepción." },
    { text: "La clave de la consistencia es una mente libre de conflicto y enfocada en el proceso." },
    { text: "Las cinco verdades fundamentales para el trader consistente son: [Mencionadas en 33-35]." },
    { text: "El dinero no es más que una métrica de su habilidad para ejecutar su plan de forma disciplinada." },
    { text: "Deje de intentar ganar cada trade. Concéntrese en la ejecución perfecta de su sistema." },
    { text: "La ejecución perfecta: operar su plan y dejar que el mercado determine el resultado." },
    { text: "Si su entorno interno es caótico, su comercio será caótico. La consistencia comienza dentro de usted." }
];


const AdvancedMindset: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevQuote = () => {
        setCurrentIndex(prev => (prev === 0 ? quotes.length - 1 : prev - 1));
    };

    const nextQuote = () => {
        setCurrentIndex(prev => (prev === quotes.length - 1 ? 0 : prev + 1));
    };

    const currentQuote = quotes[currentIndex];
    
    let categoryName = "Aceptación del Riesgo y la Probabilidad";
    if (currentIndex >= 15 && currentIndex < 30) {
        categoryName = "Gestión de la Creencia y el Control";
    } else if (currentIndex >= 30) {
        categoryName = "Pensamiento Probabilístico e Independencia";
    }

    return (
        <div className="bg-brand-primary text-white p-8 rounded-xl shadow-2xl border border-brand-accent/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            <div className="relative z-10">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-brand-accent text-brand-primary px-3 py-1 rounded-full text-sm font-bold mb-2">NIVEL 4</div>
                    <h2 className="text-4xl font-extrabold flex items-center justify-center gap-3">
                        <FiCpu /> Mentalidad Avanzada: Reprogramación
                    </h2>
                    <p className="mt-2 text-gray-400">50 diapositivas de disciplina para eliminar el pensamiento de "apuesta" y forjar la mente de un ejecutor profesional.</p>
                </div>

                <div className="relative mt-8 h-80 flex flex-col items-center justify-center bg-black/20 rounded-lg p-6">
                    <p className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider text-brand-accent">{categoryName}</p>
                    <blockquote className="text-3xl font-semibold text-center italic">
                        "{currentQuote.text}"
                    </blockquote>
                    
                    <div className="absolute bottom-4 text-center w-full px-4">
                        <p className="text-gray-400 text-sm">Diapositiva {currentIndex + 1} / {quotes.length}</p>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2 max-w-xs mx-auto">
                            <div className="bg-brand-accent h-1.5 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / quotes.length) * 100}%` }}></div>
                        </div>
                    </div>

                    <button onClick={prevQuote} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition -ml-4 md:-ml-6" aria-label="Anterior">
                        <FiChevronLeft size={24} />
                    </button>
                    <button onClick={nextQuote} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition -mr-4 md:-mr-6" aria-label="Siguiente">
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedMindset;