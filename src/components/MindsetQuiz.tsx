import React, { useState } from 'react';
import { FaBrain } from 'react-icons/fa';
import { FiChevronRight, FiRefreshCw } from 'react-icons/fi';

interface Option {
    text: string;
    isCorrect: boolean;
}

interface Question {
    question: string;
    options: Option[];
    feedback: string;
}

interface Quiz {
    title: string;
    description: string;
    questions: Question[];
}

const quizzes: Quiz[] = [
    {
        title: "Cuadro 1: Riesgo y Responsabilidad",
        description: "Evalúa tu base psicológica: cómo aceptas el riesgo y asumes la responsabilidad de tus acciones.",
        questions: [
            {
                question: "Cuando tienes una pérdida, ¿a quién culpas?",
                options: [
                    { text: "Me culpo a mí mismo por no seguir mi plan.", isCorrect: true },
                    { text: "Culpo al mercado por ser manipulador.", isCorrect: false },
                    { text: "Culpo a mi bróker por la mala ejecución.", isCorrect: false }
                ],
                feedback: "Un profesional asume el 100% de la responsabilidad. Culpar a factores externos te impide aprender de tus errores y mejorar."
            },
            {
                question: "¿Cuál es tu objetivo principal al entrar en una operación?",
                options: [
                    { text: "Ganar dinero rápidamente.", isCorrect: false },
                    { text: "Ejecutar perfectamente mi plan.", isCorrect: true },
                    { text: "Probar una nueva estrategia que vi en redes.", isCorrect: false }
                ],
                feedback: "El objetivo no es ganar dinero, sino ejecutar tu sistema sin errores. La rentabilidad es el resultado de una ejecución disciplinada, no el objetivo en sí."
            },
            {
                question: "¿Qué tan seguro estás de que tu próxima operación será ganadora?",
                options: [
                    { text: "Estoy 100% seguro si el patrón es claro.", isCorrect: false },
                    { text: "Acepto que cualquier cosa puede suceder.", isCorrect: true },
                    { text: "Tengo un 70% de seguridad por mi backtesting.", isCorrect: false }
                ],
                feedback: "El mercado es un entorno de probabilidades, no de certezas. Creer que 'sabes' lo que va a pasar es una trampa del ego. Un profesional acepta la incertidumbre."
            },
            {
                question: "Una pérdida en el trading representa...",
                options: [
                    { text: "Un error personal y un castigo.", isCorrect: false },
                    { text: "El costo de hacer negocios (costo de operar).", isCorrect: true },
                    { text: "Una señal de que mi estrategia no funciona.", isCorrect: false }
                ],
                feedback: "Las pérdidas son inevitables y forman parte del negocio. Verlas como un costo operativo, en lugar de un fracaso personal, neutraliza su impacto emocional."
            },
            {
                question: "¿Qué significa la disciplina en el trading?",
                options: [
                    { text: "La capacidad de obligarme a analizar más.", isCorrect: false },
                    { text: "Ejecutar el plan sin distracción emocional.", isCorrect: true },
                    { text: "La fuerza de voluntad para no rendirme.", isCorrect: false }
                ],
                feedback: "La disciplina no es 'intentar más duro', es la habilidad de seguir tus propias reglas, especialmente cuando tus emociones te dicen lo contrario."
            },
            {
                question: "Cuando estás en medio de una operación, ¿cuál es tu enfoque?",
                options: [
                    { text: "Intentar forzar que el precio se mueva a mi favor.", isCorrect: false },
                    { text: "Gestionar mi riesgo y dejar que el mercado determine el resultado.", isCorrect: true },
                    { text: "Buscar noticias que confirmen mi análisis.", isCorrect: false }
                ],
                feedback: "Tu único trabajo durante una operación es gestionar el riesgo según tu plan. El resultado está fuera de tu control. No intentes controlarlo."
            },
            {
                question: "¿Qué es lo que más temes en el trading?",
                options: [
                    { text: "Temo tener una gran pérdida y equivocarme.", isCorrect: false },
                    { text: "Temo no poder seguir mis propias reglas.", isCorrect: true },
                    { text: "Temo perderme una gran oportunidad (FOMO).", isCorrect: false }
                ],
                feedback: "El verdadero miedo de un profesional no es perder dinero (es un costo aceptado), sino perder el control sobre sí mismo y violar su propia disciplina."
            },
            {
                question: "La verdad fundamental del trading es que...",
                options: [
                    { text: "Debes ser un excelente predictor de mercado.", isCorrect: false },
                    { text: "No necesitas saber qué hará el mercado a continuación para ganar dinero.", isCorrect: true },
                    { text: "El análisis fundamental es más importante que el técnico.", isCorrect: false }
                ],
                feedback: "El trading es un juego de probabilidades, no de predicción. Si tienes una ventaja (un 'edge'), solo necesitas ejecutarla consistentemente para ser rentable."
            },
            {
                question: "Si una operación va mal, ¿cuál es tu reacción?",
                options: [
                    { text: "Me aferro a ella con la esperanza de que se recupere.", isCorrect: false },
                    { text: "Cierro la operación de acuerdo con mi plan de salida y acepto la pérdida.", isCorrect: true },
                    { text: "Añado más capital a la posición (promedio a la baja).", isCorrect: false }
                ],
                feedback: "La esperanza no es una estrategia. La ejecución disciplinada de tu stop loss es tu única defensa contra una pérdida catastrófica."
            },
            {
                question: "¿De dónde viene la consistencia en el trading?",
                options: [
                    { text: "De encontrar el sistema de señales perfecto.", isCorrect: false },
                    { text: "De ejecutar mi ventaja sistemáticamente sin reservas.", isCorrect: true },
                    { text: "De tener muchas operaciones ganadoras seguidas.", isCorrect: false }
                ],
                feedback: "La consistencia no está en el mercado, está en ti. Nace de ejecutar tu plan una y otra vez, sin dudar, independientemente del resultado de la última operación."
            }
        ]
    },
    {
        title: "Cuadro 2: Ejecución y Objetividad",
        description: "Mide tu capacidad para ejecutar tu plan con objetividad, libre de distorsiones emocionales.",
        questions: [
            {
                question: "Si tu análisis es perfecto, ¿puede fallar la operación?",
                options: [
                    { text: "Sí, porque cualquier cosa puede suceder.", isCorrect: true },
                    { text: "No, si el análisis es realmente perfecto.", isCorrect: false },
                    { text: "Solo si hay manipulación del mercado.", isCorrect: false }
                ],
                feedback: "Incluso con un análisis perfecto, variables desconocidas pueden afectar el precio. Aceptar esto elimina la frustración."
            },
            {
                question: "¿Qué haces después de tres pérdidas consecutivas?",
                options: [
                    { text: "Intento recuperar las pérdidas inmediatamente.", isCorrect: false },
                    { text: "Dejo de operar por el día para proteger mi capital mental.", isCorrect: true },
                    { text: "Cambio de estrategia para ver si funciona mejor.", isCorrect: false }
                ],
                feedback: "Detenerse después de una racha perdedora es una regla de oro de la disciplina. Protege tu cuenta de la 'venganza' emocional."
            },
            {
                question: "¿El mercado es tu enemigo?",
                options: [
                    { text: "Sí, siempre trata de quitarme mi dinero.", isCorrect: false },
                    { text: "No, el mercado es neutral y solo ofrece información.", isCorrect: true },
                    { text: "A veces, cuando hay mucha volatilidad.", isCorrect: false }
                ],
                feedback: "El mercado no sabe que existes. No está a favor ni en contra de ti. Es un flujo neutral de información. Tú creas tus propios resultados."
            },
            {
                question: "¿Cómo defines una operación 'buena'?",
                options: [
                    { text: "Una operación que gana dinero.", isCorrect: false },
                    { text: "Una operación que siguió mi plan al 100%.", isCorrect: true },
                    { text: "Una operación donde entré en el punto más bajo.", isCorrect: false }
                ],
                feedback: "Una buena operación es aquella que sigue tu plan, independientemente del resultado financiero. Una operación ganadora que rompió tus reglas es una 'mala' operación a largo plazo."
            },
            {
                question: "¿Por qué usas un Diario de Trading?",
                options: [
                    { text: "Para llevar la cuenta de mis ganancias.", isCorrect: false },
                    { text: "Para identificar patrones en mi comportamiento y mejorar.", isCorrect: true },
                    { text: "Porque me dijeron que debía hacerlo.", isCorrect: false }
                ],
                feedback: "El diario es tu herramienta de automejora. Te permite ver tus errores recurrentes y corregir tu psicología."
            }
        ]
    }
];

const MindsetQuiz: React.FC = () => {
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const activeQuiz = quizzes[currentQuizIndex];
    const activeQuestion = activeQuiz.questions[currentQuestionIndex];

    const handleOptionClick = (index: number) => {
        if (showFeedback) return;
        setSelectedOption(index);
        setShowFeedback(true);
        if (activeQuestion.options[index].isCorrect) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        setSelectedOption(null);
        setShowFeedback(false);

        if (currentQuestionIndex < activeQuiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
            setCurrentQuestionIndex(0);
        } else {
            setIsFinished(true);
        }
    };

    const handleReset = () => {
        setCurrentQuizIndex(0);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowFeedback(false);
        setScore(0);
        setIsFinished(false);
    };

    const totalQuestions = quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0);
    const progress = ((currentQuizIndex * quizzes[0].questions.length + currentQuestionIndex) / totalQuestions) * 100;

    if (isFinished) {
        const percentage = (score / totalQuestions) * 100;
        let message = "";
        let color = "";

        if (percentage >= 90) {
            message = "¡Mentalidad de Élite! Tienes la disciplina de un profesional.";
            color = "text-green-500";
        } else if (percentage >= 70) {
            message = "Buen trabajo. Tienes una base sólida, pero aún hay sesgos que corregir.";
            color = "text-yellow-500";
        } else {
            message = "Peligro. Tu mentalidad actual pone en riesgo tu capital. Necesitas trabajar en tu psicología.";
            color = "text-red-500";
        }

        return (
            <div className="bg-white dark:bg-brand-primary/50 p-8 rounded-xl text-center shadow-lg">
                <FaBrain className={`text-6xl mx-auto mb-4 ${color}`} />
                <h2 className="text-2xl font-bold mb-2 text-brand-primary dark:text-white">Resultados del Diagnóstico</h2>
                <p className="text-4xl font-extrabold mb-4 text-brand-accent">{score} / {totalQuestions}</p>
                <p className={`text-lg font-semibold mb-6 ${color}`}>{message}</p>
                <button 
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition"
                >
                    <FiRefreshCw /> Reiniciar Evaluación
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-brand-primary/50 rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">{activeQuiz.title}</span>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{currentQuestionIndex + 1}/{activeQuiz.questions.length}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                        className="bg-brand-accent h-1.5 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{activeQuiz.description}</p>
            </div>

            {/* Question Body */}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold text-brand-primary dark:text-white mb-6 text-center">
                    {activeQuestion.question}
                </h3>

                <div className="space-y-3">
                    {activeQuestion.options.map((option, index) => {
                        let optionClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-medium flex items-center justify-between group ";
                        
                        if (showFeedback) {
                            if (option.isCorrect) {
                                optionClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                            } else if (selectedOption === index) {
                                optionClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                            } else {
                                optionClass += "border-gray-200 dark:border-gray-700 opacity-50";
                            }
                        } else {
                            optionClass += "border-gray-200 dark:border-gray-700 hover:border-brand-accent hover:bg-brand-accent/5 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={showFeedback}
                                className={optionClass}
                            >
                                <span>{option.text}</span>
                                {showFeedback && option.isCorrect && <span className="text-green-500 font-bold">✓</span>}
                                {showFeedback && !option.isCorrect && selectedOption === index && <span className="text-red-500 font-bold">✕</span>}
                            </button>
                        );
                    })}
                </div>

                {/* Feedback Panel */}
                {showFeedback && (
                    <div className={`mt-6 p-4 rounded-lg animate-fade-in-up ${activeQuestion.options[selectedOption!].isCorrect ? 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500' : 'bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500'}`}>
                        <p className={`text-sm font-semibold ${activeQuestion.options[selectedOption!].isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                            {activeQuestion.feedback}
                        </p>
                        <button 
                            onClick={handleNext}
                            className="mt-4 w-full md:w-auto flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors shadow-lg"
                        >
                            Siguiente Pregunta <FiChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MindsetQuiz;