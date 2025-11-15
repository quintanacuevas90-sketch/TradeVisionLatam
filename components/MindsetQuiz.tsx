import React, { useState } from 'react';
import { FaBrain } from 'react-icons/fa';
import { FiChevronRight, FiRefreshCw } from 'react-icons/fi';

const quizzes = [
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
                    { text: "No, un buen análisis garantiza el éxito.", isCorrect: false },
                    { text: "Solo si hay una manipulación inesperada del mercado.", isCorrect: false }
                ],
                feedback: "El mercado es un entorno de probabilidades, no de certezas. Ningún análisis garantiza un resultado. Aceptar esto es el núcleo de la mentalidad de un trader."
            },
            {
                question: "¿Cuál es la única cosa que puedes controlar?",
                options: [
                    { text: "Los movimientos y la dirección del mercado.", isCorrect: false },
                    { text: "Mis propias acciones y mi ejecución.", isCorrect: true },
                    { text: "El riesgo, a través de un stop loss perfecto.", isCorrect: false }
                ],
                feedback: "No puedes controlar el mercado. Tu único poder reside en controlar tus propias acciones: cuándo entras, cuándo sales y cuánto arriesgas."
            },
            {
                question: "¿Qué sucede con tu percepción cuando sientes miedo?",
                options: [
                    { text: "Mi mente se enfoca solo en lo que temo o deseo, y se distorsiona.", isCorrect: true },
                    { text: "Me vuelvo más cauteloso y mi percepción mejora.", isCorrect: false },
                    { text: "Me ayuda a reaccionar más rápido a los peligros.", isCorrect: false }
                ],
                feedback: "El miedo restringe tu percepción a la información que confirma tu temor, haciéndote perder de vista la información objetiva del mercado."
            },
            {
                question: "Cuando pierdes dinero, ¿la siguiente operación es más riesgosa?",
                options: [
                    { text: "No, cada momento y operación es único e independiente.", isCorrect: true },
                    { text: "Sí, tengo que recuperar lo que perdí.", isCorrect: false },
                    { text: "Depende, si la tendencia sigue siendo la misma, no.", isCorrect: false }
                ],
                feedback: "El resultado de la última operación no tiene ninguna influencia sobre la siguiente. Cada operación es un evento estadísticamente independiente."
            },
            {
                question: "¿Qué significa 'aceptar el riesgo'?",
                options: [
                    { text: "Estar tranquilo cuando la operación va en mi contra.", isCorrect: true },
                    { text: "Saber que puedo permitirme perder el dinero.", isCorrect: false },
                    { text: "Poner un stop loss en cada operación.", isCorrect: false }
                ],
                feedback: "Aceptar el riesgo de verdad significa neutralizar la carga emocional de una pérdida antes de entrar a la operación. Es un estado mental, no solo una acción mecánica."
            },
            {
                question: "¿Cuándo tomas la decisión de abrir o cerrar una operación?",
                options: [
                    { text: "Cuando mi sistema me da una señal definida.", isCorrect: true },
                    { text: "Cuando siento que el mercado está a punto de moverse.", isCorrect: false },
                    { text: "Después de confirmar con las noticias económicas.", isCorrect: false }
                ],
                feedback: "Las decisiones deben basarse en un sistema predefinido y probado, no en impulsos, sentimientos o eventos externos no planificados."
            },
            {
                question: "¿Cómo debes ver el dinero en tu cuenta?",
                options: [
                    { text: "Como una métrica de mi habilidad para ejecutar mi plan.", isCorrect: true },
                    { text: "Como un reflejo directo de mi valor como persona.", isCorrect: false },
                    { text: "Como la munición que necesito para seguir operando.", isCorrect: false }
                ],
                feedback: "Desvincula tu autoestima de tu capital. El dinero es solo una herramienta y una forma de medir tu disciplina, nada más."
            },
            {
                question: "Si estás ganando mucho, ¿deberías aumentar el tamaño del lote?",
                options: [
                    { text: "Solo si está dentro de mis reglas de gestión de riesgo.", isCorrect: true },
                    { text: "Sí, para aprovechar la racha de suerte.", isCorrect: false },
                    { text: "No, es mejor ser conservador y mantener el mismo lote.", isCorrect: false }
                ],
                feedback: "Las reglas de gestión de riesgo son absolutas y te protegen tanto de la euforia como del miedo. No te desvíes de tu plan."
            },
            {
                question: "La libertad extrema del trading requiere...",
                options: [
                    { text: "Una autodisciplina extrema y reglas estrictas.", isCorrect: true },
                    { text: "Confianza en mi instinto y flexibilidad total.", isCorrect: false },
                    { text: "Un capital muy grande para absorber errores.", isCorrect: false }
                ],
                feedback: "La paradoja del trading: la falta de estructura del mercado te obliga a crear una estructura mental interna a través de la disciplina y las reglas."
            },
            {
                question: "¿Cómo puedes ser objetivo en el mercado?",
                options: [
                    { text: "Operando sin miedo y sin buscar tener la razón.", isCorrect: true },
                    { text: "Evitando leer noticias que contradigan mi análisis.", isCorrect: false },
                    { text: "Usando indicadores puramente matemáticos como el RSI.", isCorrect: false }
                ],
                feedback: "La objetividad nace de desapegarse del resultado. La necesidad de 'tener razón' crea un sesgo emocional que te impide ver el mercado como realmente es."
            }
        ]
    },
    {
        title: "Cuadro 3: Creencias y Probabilidad",
        description: "Analiza tu sistema de creencias y si has internalizado el pensamiento probabilístico esencial para la consistencia.",
        questions: [
            {
                question: "El trader superior es aquel que...",
                options: [
                    { text: "Actúa con independencia, sin la influencia de la manada o el miedo colectivo.", isCorrect: true },
                    { text: "Es capaz de predecir el 70% de los movimientos del mercado.", isCorrect: false },
                    { text: "Tiene acceso a información privilegiada.", isCorrect: false }
                ],
                feedback: "Los mejores traders no son adivinos, son maestros de la ejecución y la psicología. Siguen su sistema, independientemente de lo que haga la multitud."
            },
            {
                question: "Tu trabajo principal no es predecir, sino...",
                options: [
                    { text: "Analizar el mayor número de variables para ser infalible.", isCorrect: false },
                    { text: "Gestionar tu percepción del mercado y la ejecución de tu sistema.", isCorrect: true },
                    { text: "Encontrar la estrategia con el mayor porcentaje de aciertos.", isCorrect: false }
                ],
                feedback: "Tu rol es ser un gestor de riesgos y un ejecutor de sistemas. La predicción es una tarea inútil que solo genera ansiedad."
            },
            {
                question: "La única forma de ser objetivo es...",
                options: [
                    { text: "Dejar ir la necesidad de saber qué sucederá a continuación.", isCorrect: true },
                    { text: "Confiar plenamente en el análisis técnico que conozco.", isCorrect: false },
                    { text: "Operar solo con robots automáticos.", isCorrect: false }
                ],
                feedback: "La objetividad se logra al aceptar la incertidumbre. Creer que 'sabes' lo que va a pasar es la receta para el sesgo y el desastre."
            },
            {
                question: "Si no aceptas la posibilidad de una pérdida...",
                options: [
                    { text: "La pérdida te causará un daño emocional desproporcionado.", isCorrect: true },
                    { text: "Tu mente se protegerá y tomará mejores decisiones.", isCorrect: false },
                    { text: "Nunca te convertirás en un trader rentable.", isCorrect: false }
                ],
                feedback: "No pre-aceptar el riesgo hace que cada movimiento en tu contra sea doloroso, lo que conduce a decisiones emocionales. Aceptar el riesgo neutraliza su poder."
            },
            {
                question: "¿Por qué los patrones de mercado a veces fallan?",
                options: [
                    { text: "Porque cada momento es único e independiente, y cualquier cosa puede suceder.", isCorrect: true },
                    { text: "Porque el mercado está manipulado por grandes instituciones.", isCorrect: false },
                    { text: "Porque mi indicador estaba mal configurado.", isCorrect: false }
                ],
                feedback: "Culpar a la manipulación es evitar la responsabilidad. La realidad es que los patrones son probabilísticos, no deterministas. Cada momento es único."
            },
            {
                question: "Si una operación va en tu contra, ¿qué te enseña?",
                options: [
                    { text: "Nada sobre el potencial del mercado, pero sí sobre mi gestión emocional.", isCorrect: true },
                    { text: "Que debo cambiar mi sistema inmediatamente.", isCorrect: false },
                    { text: "Que mi análisis inicial fue completamente erróneo.", isCorrect: false }
                ],
                feedback: "Una sola pérdida es solo un dato en un juego de probabilidades. No invalida tu sistema. Es una oportunidad para evaluar tu propia reacción emocional."
            },
            {
                question: "La clave de la consistencia es...",
                options: [
                    { text: "Una mente libre de conflicto y enfocada en el proceso.", isCorrect: true },
                    { text: "Encontrar el bróker o la señal que funciona.", isCorrect: false },
                    { text: "Ganar más dinero del que se pierde cada semana.", isCorrect: false }
                ],
                feedback: "La consistencia es un estado interno. Se trata de tu mentalidad y tu disciplina, no de herramientas o resultados externos."
            },
            {
                question: "Si no respetas tus propias reglas, estás...",
                options: [
                    { text: "Enseñando a tu mente que el peligro no existe, erosionando tu disciplina.", isCorrect: true },
                    { text: "Adaptándote a la volatilidad cambiante del mercado.", isCorrect: false },
                    { text: "Bien, siempre que la operación termine siendo ganadora.", isCorrect: false }
                ],
                feedback: "Romper una regla, incluso si ganas, es una pérdida neta porque destruye la disciplina y refuerza los malos hábitos que te llevarán a la ruina."
            },
            {
                question: "El trading exitoso consiste en...",
                options: [
                    { text: "Predecir correctamente el mayor número de operaciones posibles.", isCorrect: false },
                    { text: "Ejecutar tu plan sin importar los resultados individuales.", isCorrect: true },
                    { text: "Tener un ratio de aciertos superior al 80%.", isCorrect: false }
                ],
                feedback: "La ejecución perfecta es seguir tus reglas. Una operación perdedora puede ser una operación perfectamente ejecutada. Una operación ganadora que rompió tus reglas es un fracaso."
            },
            {
                question: "Si no defines tu riesgo antes de una operación, estás...",
                options: [
                    { text: "Operando con una esperanza que no tiene cabida en las probabilidades.", isCorrect: true },
                    { text: "Dándote la oportunidad de un 'home run' (gran ganancia).", isCorrect: false },
                    { text: "Siendo flexible y adaptándote al mercado.", isCorrect: false }
                ],
                feedback: "Operar sin un riesgo predefinido (stop loss) no es trading, es apostar. Estás esperando que el mercado te dé la razón, en lugar de gestionar la probabilidad."
            }
        ]
    }
];

const QuizContent: React.FC<{
    quiz: typeof quizzes[0],
    progress: any,
    onAnswer: (optionIndex: number, isCorrect: boolean) => void,
    onNext: () => void,
    onRestart: () => void,
}> = ({ quiz, progress, onAnswer, onNext, onRestart }) => {
    
    if (progress.quizCompleted) {
        const consistencyLevel = (progress.score / quiz.questions.length) * 100;
        const isDisciplineHigh = progress.score >= 8; // 80% for 10 questions
        const recommendationText = isDisciplineHigh 
            ? "Tu mentalidad muestra una base sólida de disciplina. Sigue reforzando estos hábitos para alcanzar la maestría."
            : "Tu adicción a las recompensas aleatorias es alta. Tu próximo paso es asumir la responsabilidad y fortalecer tu disciplina. La rentabilidad está en el proceso, no en el resultado de una sola operación.";

        return (
            <div className="text-center animate-fade-in-up">
                <h3 className="text-2xl font-bold text-brand-primary dark:text-white">Resultado de la Evaluación</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Tu nivel de consistencia en <strong>"{quiz.title}"</strong> es:</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-10 my-4 overflow-hidden border border-gray-300 dark:border-gray-600">
                    <div
                        className="bg-brand-accent h-full flex items-center justify-center text-brand-primary font-bold text-lg transition-all duration-500"
                        style={{ width: `${consistencyLevel}%` }}
                    >
                        {progress.score}/{quiz.questions.length}
                    </div>
                </div>
                <div className={`p-4 rounded-lg mt-6 ${isDisciplineHigh ? 'bg-green-100 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300'} border-l-4`}>
                    <p className="font-semibold text-lg">{recommendationText}</p>
                </div>
                <button onClick={onRestart} className="mt-8 inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition text-lg">
                    <FiRefreshCw /> Repetir Evaluación
                </button>
            </div>
        );
    }
    
    const currentQuestion = quiz.questions[progress.currentQuestionIndex];

    return (
        <div>
            <p className="text-sm text-gray-500 text-center">Pregunta {progress.currentQuestionIndex + 1} de {quiz.questions.length}</p>
            <h3 className="text-xl font-semibold text-center mt-2">{currentQuestion.question}</h3>
            <div className="space-y-4 mt-6">
                {currentQuestion.options.map((option, index) => {
                    const isSelected = progress.selectedAnswer === index;
                    let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all font-semibold text-base ';
                    if (progress.isAnswered) {
                        if (option.isCorrect) {
                            buttonClass += 'bg-green-100 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-300';
                        } else if (isSelected) {
                            buttonClass += 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300';
                        } else {
                            buttonClass += 'bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 opacity-60';
                        }
                    } else {
                        buttonClass += 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-brand-accent hover:bg-brand-accent/10';
                    }
                    return (
                        <button key={index} onClick={() => onAnswer(index, option.isCorrect)} disabled={progress.isAnswered} className={buttonClass}>
                            {option.text}
                        </button>
                    );
                })}
            </div>
            {progress.isAnswered && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 rounded-r-lg animate-fade-in-up">
                    <p className="font-bold text-lg">Análisis del Mentor:</p>
                    <p>{currentQuestion.feedback}</p>
                    <button onClick={onNext} className="mt-4 w-full bg-brand-accent text-brand-primary font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-lg">
                        {progress.currentQuestionIndex < quiz.questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultado'} <FiChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
};

const MindsetQuiz: React.FC = () => {
    const [activeQuizIndex, setActiveQuizIndex] = useState(0);
    const [quizProgress, setQuizProgress] = useState(
        quizzes.map(() => ({
            currentQuestionIndex: 0,
            score: 0,
            selectedAnswer: null as number | null,
            isAnswered: false,
            quizCompleted: false,
        }))
    );
    
    const updateProgress = (index: number, newProgress: Partial<typeof quizProgress[0]>) => {
        setQuizProgress(prev => {
            const newTotalProgress = [...prev];
            newTotalProgress[index] = { ...newTotalProgress[index], ...newProgress };
            return newTotalProgress;
        });
    };

    const handleAnswer = (optionIndex: number, isCorrect: boolean) => {
        if (quizProgress[activeQuizIndex].isAnswered) return;
        const newScore = isCorrect ? quizProgress[activeQuizIndex].score + 1 : quizProgress[activeQuizIndex].score;
        updateProgress(activeQuizIndex, {
            selectedAnswer: optionIndex,
            score: newScore,
            isAnswered: true
        });
    };

    const handleNext = () => {
        const currentProgress = quizProgress[activeQuizIndex];
        const currentQuiz = quizzes[activeQuizIndex];
        if (currentProgress.currentQuestionIndex < currentQuiz.questions.length - 1) {
            updateProgress(activeQuizIndex, {
                currentQuestionIndex: currentProgress.currentQuestionIndex + 1,
                selectedAnswer: null,
                isAnswered: false
            });
        } else {
            updateProgress(activeQuizIndex, { quizCompleted: true });
        }
    };
    
    const handleRestart = () => {
        updateProgress(activeQuizIndex, {
            currentQuestionIndex: 0,
            score: 0,
            selectedAnswer: null,
            isAnswered: false,
            quizCompleted: false,
        });
    };

    return (
        <div className="bg-white dark:bg-brand-primary p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10">
            <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-bold mb-2">NIVEL 1</div>
                <h2 className="text-4xl font-extrabold text-brand-primary dark:text-white flex items-center justify-center gap-3">
                    <FaBrain /> Evalúa tu Psicología
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">El 80% del éxito en el trading es mental. Responde con honestidad para medir tu disciplina en cada pilar fundamental.</p>
            </div>
            
            <div className="my-8 border-b border-gray-200 dark:border-white/10 flex justify-center">
                {quizzes.map((quiz, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveQuizIndex(index)}
                        className={`px-4 py-3 text-sm font-bold transition-colors ${
                            activeQuizIndex === index
                                ? 'border-b-2 border-brand-accent text-brand-accent'
                                : 'text-gray-500 hover:text-brand-accent/80'
                        }`}
                    >
                        {quiz.title.split(':')[0]}
                    </button>
                ))}
            </div>
            
            <div className="mt-8">
                 <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-brand-primary dark:text-white">{quizzes[activeQuizIndex].title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{quizzes[activeQuizIndex].description}</p>
                </div>
                <QuizContent 
                    quiz={quizzes[activeQuizIndex]}
                    progress={quizProgress[activeQuizIndex]}
                    onAnswer={handleAnswer}
                    onNext={handleNext}
                    onRestart={handleRestart}
                />
            </div>
        </div>
    );
};

export default MindsetQuiz;