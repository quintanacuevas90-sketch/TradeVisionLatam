
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../hooks/useRouter';
import { FiArrowLeft } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

// --- DATA: Question Banks ---
const RISK_QUESTIONS = [
    { q: "¿Cuál es el porcentaje máximo de capital recomendado arriesgar por operación?", a: "1% a 3%", dist: ["10% a 15%", "50% para recuperar rápido"] },
    { q: "¿Qué es el Plan de Trading?", a: "Un conjunto de reglas estrictas y predefinidas", dist: ["Operar según lo que siento", "Seguir señales de Telegram"] },
    { q: "¿Qué debes hacer tras una racha de 3 pérdidas consecutivas?", a: "Detener la operativa y analizar mañana", dist: ["Doblar la apuesta", "Cambiar de estrategia inmediatamente"] },
    { q: "¿Qué significa operar por venganza?", a: "Intentar recuperar pérdidas impulsivamente", dist: ["Operar contra la tendencia", "Seguir operando al ganar"] },
    { q: "¿Qué es el FOMO?", a: "Miedo a perderse una oportunidad", dist: ["La alegría de ganar", "Análisis fundamental"] },
    { q: "¿Por qué NO debes operar con dinero destinado al alquiler?", a: "Porque la presión emocional te hará perder", dist: ["Porque el broker no lo permite", "Porque da mala suerte"] },
    { q: "¿Qué es el Drawdown?", a: "La caída máxima del capital desde un punto alto", dist: ["El beneficio neto", "El bono del broker"] },
    { q: "¿La disciplina en el trading es?", a: "Seguir tu plan incluso cuando es difícil", dist: ["Operar todos los días", "Ganar siempre"] },
    { q: "¿Qué es el Overtrading?", a: "Operar excesivamente fuera de tu plan", dist: ["Operar con mucho volumen", "Operar en varios mercados"] },
    { q: "¿El mercado siempre tiene la razón?", a: "Sí, el precio es la realidad final", dist: ["No, a veces se equivoca", "Solo cuando gano"] },
    { q: "¿Qué papel juega la suerte en el trading profesional?", a: "Ninguno, nos basamos en probabilidades", dist: ["Es fundamental", "50% suerte y 50% técnica"] },
    { q: "¿Qué es la Esperanza Matemática Positiva?", a: "Que tu sistema gane más de lo que pierde a largo plazo", dist: ["Tener fe", "Calcular ganancias antes"] },
    { q: "¿Cuándo aumentar el importe de tus operaciones?", a: "Cuando tu cuenta haya crecido y tu plan lo dicte", dist: ["Cuando te sientas con suerte", "Tras perder una operación"] },
    { q: "¿Qué es aceptar el riesgo?", a: "Entender que cada operación puede ser perdedora", dist: ["Poner stop loss mental", "Rezar para que suba"] },
    { q: "¿Qué es el interés compuesto?", a: "Reinvertir ganancias para crecimiento exponencial", dist: ["Interés del banco", "Sumar depósitos"] },
    { q: "¿Por qué es peligroso el sistema Martingala?", a: "Puede quemar la cuenta en una mala racha", dist: ["Ganas poco dinero", "Es ilegal"] },
    { q: "¿Objetivo principal de un novato?", a: "Preservar el capital y aprender", dist: ["Hacerse millonario", "Comprar un Ferrari"] },
    { q: "¿Qué es un Stop Loss?", a: "Orden para limitar pérdidas", dist: ["Orden de ganancia", "Pausa del mercado"] },
    { q: "¿Qué es la gestión de capital?", a: "Administración eficiente de fondos", dist: ["Saber depositar", "Retirar a diario"] },
    { q: "¿Qué hacer si el mercado está muy volátil?", a: "Reducir riesgo o no operar", dist: ["Aumentar apalancamiento", "Operar más rápido"] }
];

const TECH_QUESTIONS = [
    { q: "¿Qué es una opción binaria?", a: "Contrato con rentabilidad fija y tiempo definido", dist: ["Compra de acciones", "Criptomoneda nueva"] },
    { q: "¿Qué significa CALL?", a: "Predicción de subida (Compra)", dist: ["Predicción de bajada", "Cerrar operación"] },
    { q: "¿Qué significa PUT?", a: "Predicción de bajada (Venta)", dist: ["Predicción de subida", "Poner dinero"] },
    { q: "¿Qué representa una vela verde?", a: "Cierre mayor que apertura", dist: ["Precio bajó", "Mercado cerrado"] },
    { q: "¿Qué es una vela Doji?", a: "Apertura y cierre casi iguales", dist: ["Cuerpo grande", "Fuerza alcista"] },
    { q: "¿Qué indica mecha larga superior en resistencia?", a: "Rechazo del precio (fuerza vendedora)", dist: ["Fuerza compradora", "Ruptura inminente"] },
    { q: "¿Qué es un Soporte?", a: "Nivel inferior donde el precio rebota", dist: ["Techo imprompible", "Línea diagonal"] },
    { q: "¿Qué es una Resistencia?", a: "Nivel superior donde el precio rebota", dist: ["Piso de descanso", "Indicador de volumen"] },
    { q: "¿Qué es un Pullback?", a: "Retroceso a zona rota para seguir tendencia", dist: ["Cambio de tendencia", "Precio quieto"] },
    { q: "¿Qué significa OTC?", a: "Mercado fuera de bolsa (Algoritmo)", dist: ["Operaciones Técnicas", "Organización de Traders"] },
    { q: "¿Qué es Tendencia Alcista?", a: "Máximos y mínimos cada vez más altos", dist: ["Precio baja rápido", "Mercado lateral"] },
    { q: "¿Qué es un patrón envolvente alcista?", a: "Vela verde cubre totalmente a la roja anterior", dist: ["Vela roja pequeña", "Dos velas iguales"] },
    { q: "¿Qué es el RSI?", a: "Oscilador de fuerza y velocidad", dist: ["Indicador de noticias", "Resumen de Saldo"] },
    { q: "¿Qué es Mercado Lateral?", a: "Movimiento en rango sin tendencia clara", dist: ["Precio sube fuerte", "Broker cerrado"] },
    { q: "¿Qué es un Martillo (Hammer)?", a: "Reversión alcista, mecha inferior larga", dist: ["Herramienta", "Vela roja gigante"] },
    { q: "¿Qué es Acción del Precio?", a: "Analizar movimiento sin indicadores", dist: ["Operar con noticias", "Usar robots"] },
    { q: "¿Qué es un Broker?", a: "Intermediario financiero", dist: ["Dueño del banco", "Amigo que presta dinero"] },
    { q: "¿Qué significa ITM?", a: "In The Money (Ganada)", dist: ["En el mercado", "Marca registrada"] },
    { q: "¿Qué significa OTM?", a: "Out of The Money (Perdida)", dist: ["Precio muy alto", "Operación Mañana"] },
    { q: "¿Qué es Liquidez?", a: "Facilidad para comprar/vender", dist: ["Dinero líquido", "Agua"] }
];

// --- STYLES ---
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap');

    .battle-wrapper {
        --dark-navy: #050b14;
        --neon-blue: #00E5FF;
        --gold: #FFD700;
        --danger: #ff3333;
        --whatsapp: #25D366;
        
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: var(--dark-navy);
        background-image: radial-gradient(circle at 50% 50%, #112240 0%, #020c1b 100%);
        min-height: 100vh;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        padding-top: 80px; 
        overflow-y: auto; 
        position: fixed; 
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
    }

    .game-card {
        background: rgba(10, 25, 47, 0.9);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(0, 229, 255, 0.1);
        border-radius: 20px;
        padding: 2rem;
        width: 100%;
        max-width: 800px;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
        text-align: center;
        animation: fadeIn 0.5s ease-out;
        margin-bottom: 40px; 
    }

    .owl-icon { font-size: 60px; text-shadow: 0 0 20px var(--neon-blue); transition: transform 0.2s; cursor: pointer; user-select: none; }
    .owl-icon:active { transform: scale(0.9); }

    h1.game-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 2rem;
        margin: 10px 0;
        text-transform: uppercase;
        letter-spacing: 2px;
        line-height: 1.2;
    }
    .highlight { color: var(--neon-blue); }

    .status-panel {
        display: flex;
        justify-content: space-around;
        margin: 20px 0;
        padding: 15px 0;
        border-top: 1px solid rgba(255,255,255,0.1);
        border-bottom: 1px solid rgba(255,255,255,0.1);
        flex-wrap: wrap;
        gap: 10px;
    }
    .stat-box h3 { margin: 0; color: var(--gold); font-size: 1.2rem; font-family: 'Orbitron'; }
    .stat-box p { margin: 0; color: #a8b2d1; font-size: 0.8rem; }

    .btn-action {
        background: transparent;
        color: var(--neon-blue);
        border: 2px solid var(--neon-blue);
        padding: 12px 30px;
        font-size: 1.1rem;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s;
        text-transform: uppercase;
        font-weight: bold;
        font-family: 'Orbitron';
        margin-top: 20px;
        white-space: normal;
        line-height: 1.2;
        display: inline-block;
        max-width: 100%;
    }
    .btn-action:hover {
        background: var(--neon-blue);
        color: var(--dark-navy);
        box-shadow: 0 0 20px var(--neon-blue);
    }

    .option-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--neon-blue);
        padding: 15px;
        margin: 10px 0;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.2s;
        text-align: left;
        width: 100%;
        font-size: 1rem;
        color: white;
        white-space: normal;
        line-height: 1.4;
    }
    .option-btn:hover { background: var(--neon-blue); color: var(--dark-navy); }

    .victory-modal {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.98); z-index: 2000;
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        padding: 20px; overflow-y: auto; text-align: center;
    }
    
    .trophy-emoji { font-size: 100px; animation: float 4s infinite ease-in-out; filter: drop-shadow(0 0 30px var(--gold)); }
    
    .victory-title {
        font-family: 'Orbitron'; font-size: 2.5rem; 
        background: linear-gradient(to right, #FFF, var(--gold), #FFF);
        -webkit-background-clip: text; color: transparent;
        margin-bottom: 10px; font-weight: 900;
        line-height: 1.1;
    }

    .whatsapp-btn {
        background: transparent; color: var(--whatsapp); border: 2px solid var(--whatsapp);
        padding: 15px 30px; font-size: 1.1rem; border-radius: 50px; cursor: pointer;
        transition: 0.3s; text-transform: uppercase; font-weight: bold;
        display: inline-flex; align-items: center; gap: 10px; text-decoration: none;
        max-width: 100%;
        justify-content: center;
    }
    .whatsapp-btn:hover { background: var(--whatsapp); color: black; box-shadow: 0 0 20px var(--whatsapp); }

    .sim-chart-container {
        background: #000; 
        border: 1px solid #333; 
        h-40: 160px;
        display: flex; 
        align-items: center; 
        justify-content: center; 
        margin-bottom: 1.5rem; 
        position: relative; 
        overflow: hidden;
        min-height: 150px;
    }

    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* Mobile Adjustments */
    @media (max-width: 600px) {
        .game-title { font-size: 1.5rem !important; }
        .stat-box h3 { font-size: 1rem; }
        .btn-action { padding: 10px 20px; font-size: 0.9rem; width: 100%; }
        .owl-icon { font-size: 40px; }
        .victory-title { font-size: 1.8rem; }
        .trophy-emoji { font-size: 70px; }
        .game-card { padding: 1.5rem; }
    }
`;

const BattlegroundsPage: React.FC = () => {
    const { navigate } = useRouter();
    
    // --- STATE ---
    const [phase, setPhase] = useState<'lobby' | 'p1' | 'p2' | 'p3' | 'victory' | 'defeat'>('lobby');
    const [score, setScore] = useState(0);
    const [qIndex, setQIndex] = useState(0);
    const [timer, setTimer] = useState(20);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [currentOptions, setCurrentOptions] = useState<any[]>([]);
    const [securityHash, setSecurityHash] = useState('');
    const [godClicks, setGodClicks] = useState(0);
    const [retries, setRetries] = useState(0); // Track retries for Perfect Run
    
    // --- REFS ---
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // --- GAME LOGIC ---

    const startGame = () => {
        setPhase('p1');
        setScore(0);
        setQIndex(0);
        loadQuestion(1);
    };

    const loadQuestion = (phaseNum: 1 | 2) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimer(20);

        const bank = phaseNum === 1 ? RISK_QUESTIONS : TECH_QUESTIONS;
        const totalQs = phaseNum === 1 ? 20 : 100; // P1=20, P2=100

        // Check Phase Completion
        if (qIndex >= totalQs) {
            if (phaseNum === 1) {
                if (score < 15) {
                    setRetries(prev => prev + 1);
                    return triggerDefeat(`Fase 1 Fallida: ${score}/20. Mínimo 15.`);
                }
                alert("✅ FASE 1 SUPERADA. Iniciando Fase 2 (Resistencia Mental - 100 Preguntas).");
                setPhase('p2');
                setQIndex(0);
                setScore(0); // Reset score for phase 2
                loadQuestion(2);
                return;
            } else {
                if (score < 85) {
                    setRetries(prev => prev + 1);
                    return triggerDefeat(`Fase 2 Fallida: ${score}/100. Mínimo 85.`);
                }
                startSimulator();
                return;
            }
        }

        // Get Random Question
        const qData = bank[qIndex % bank.length];
        
        // Randomize Options
        const options = [
            { text: qData.a, correct: true },
            ...qData.dist.map(d => ({ text: d, correct: false }))
        ].sort(() => Math.random() - 0.5);

        setCurrentQuestion(qData);
        setCurrentOptions(options);

        // Start Timer
        timerRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    handleAnswer(false); // Time out = wrong
                    return 20;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) setScore(prev => prev + 1);
        setQIndex(prev => prev + 1);
        loadQuestion(phase === 'p1' ? 1 : 2);
    };

    const startSimulator = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase('p3');
        // Auto-fail timer for simulator if they don't act
        setTimer(15);
        timerRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    setRetries(prev => prev + 1);
                    triggerDefeat("Tiempo agotado. No ejecutaste la operación.");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSimAction = (action: 'CALL' | 'PUT') => {
        if (timerRef.current) clearInterval(timerRef.current);
        // Scenario: Doji at Resistance -> Expect Reversal (PUT)
        if (action === 'PUT') {
            triggerVictory();
        } else {
            setRetries(prev => prev + 1);
            triggerDefeat("Error: Compraste en Resistencia. Cuenta quemada.");
        }
    };

    const triggerDefeat = (reason: string) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase('defeat');
        setCurrentQuestion({ q: reason });
    };

    const triggerVictory = () => {
        // Only trigger Perfect Run if retries is 0
        if (retries === 0) {
            const hash = 'TV-MASTER-' + Math.floor(Math.random() * 89999 + 10000);
            setSecurityHash(`HASH: ${hash}`);
            setPhase('victory');
        } else {
            // Standard victory (not perfect run)
            alert("¡Nivel Completado! (No fue Perfect Run, has reiniciado antes).");
            navigate('/zona-de-ejecucion');
        }
    };

    // --- GOD MODE (Password Protected) ---
    const handleOwlClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setGodClicks(prev => {
            const newVal = prev + 1;
            if (newVal === 5) {
                const pass = prompt("🔐 ACCESO DIRECTIVO\nIngrese Clave Maestra:");
                if (pass === "TV2024") {
                    setRetries(0); // Ensure it counts as Perfect Run
                    triggerVictory();
                } else {
                    alert("⛔ ACCESO DENEGADO");
                }
                return 0;
            }
            return newVal;
        });
        
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(() => setGodClicks(0), 1000);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        };
    }, []);

    // Soft reset function
    const resetGame = () => {
        setPhase('lobby');
        setScore(0);
        setQIndex(0);
        setTimer(20);
        setCurrentQuestion(null);
        setCurrentOptions([]);
    };

    return (
        <div className="battle-wrapper">
            <style>{styles}</style>
            
            {/* FIXED EXIT BUTTON */}
            <button 
                onClick={() => navigate('/zona-de-ejecucion')} 
                className="fixed top-4 left-4 flex items-center gap-2 bg-gray-800/80 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition z-50 border border-gray-600 text-sm font-bold"
            >
                <FiArrowLeft /> SALIR
            </button>

            {/* LOBBY */}
            {phase === 'lobby' && (
                <div className="game-card">
                    <div className="owl-icon" onClick={handleOwlClick}>🦉</div>
                    <h1 className="game-title">Trading <span className="highlight">Arena</span></h1>
                    
                    <div className="premium-warning" style={{ border: '1px solid var(--gold)', background: 'linear-gradient(45deg, rgba(255,215,0,0.1), transparent)', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                        <h4 className="text-gold font-bold mb-2">🏆 REGLAS DEL NIVEL ELITE</h4>
                        <ul className="text-left text-sm text-gray-300 space-y-1 list-disc pl-5">
                            <li>🛡️ <strong>Fase 1 (Gestión):</strong> 20 Preguntas (Min 15 aciertos).</li>
                            <li>🧠 <strong>Fase 2 (Técnico):</strong> 100 Preguntas (Min 85 aciertos).</li>
                            <li>⚔️ <strong>Fase 3 (Simulador):</strong> Operación de Precisión Única.</li>
                        </ul>
                        <p className="text-danger text-xs mt-3 font-bold">FALLAR REINICIA EL CONTADOR DE "PERFECT RUN".</p>
                    </div>

                    <div className="status-panel">
                        <div className="stat-box"><h3>Nivel 6</h3><p>Dificultad Extrema</p></div>
                        <div className="stat-box"><h3>3 Fases</h3><p>Sin Puntos de Guardado</p></div>
                    </div>

                    <button className="btn-action" onClick={startGame}>ACEPTAR EL RETO</button>
                </div>
            )}

            {/* QUIZ (PHASE 1 & 2) */}
            {(phase === 'p1' || phase === 'p2') && (
                <div className="game-card">
                    <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
                        {phase === 'p1' ? 'FASE 1: GESTIÓN DE RIESGO' : 'FASE 2: RESISTENCIA MENTAL'}
                    </div>
                    
                    <div className="status-panel">
                        <div className="stat-box">
                            <h3 style={{ color: timer <= 5 ? 'var(--danger)' : 'var(--gold)' }}>{timer}s</h3>
                            <p>Tiempo</p>
                        </div>
                        <div className="stat-box">
                            <h3>{qIndex + 1} / {phase === 'p1' ? 20 : 100}</h3>
                            <p>Progreso</p>
                        </div>
                        <div className="stat-box">
                            <h3 className="highlight">{score}</h3>
                            <p>Aciertos</p>
                        </div>
                    </div>

                    <div className="min-h-[80px] flex items-center justify-center my-4">
                        <h3 className="text-xl font-bold leading-tight">{currentQuestion?.q}</h3>
                    </div>

                    <div className="flex flex-col gap-3">
                        {currentOptions.map((opt, i) => (
                            <button key={i} className="option-btn" onClick={() => handleAnswer(opt.correct)}>
                                {opt.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* SIMULATOR (PHASE 3) */}
            {phase === 'p3' && (
                <div className="game-card">
                    <h2 className="text-gold font-bold text-2xl mb-2">FASE FINAL: EL MERCADO REAL</h2>
                    <p className="text-gray-400 mb-6">Has demostrado conocimiento. Ahora demuestra instinto.</p>
                    
                    <div className="sim-chart-container">
                        <div className="absolute inset-0 flex items-end justify-end p-4 gap-1 opacity-50">
                            {/* Fake candles background */}
                            {[...Array(20)].map((_,i) => (
                                <div key={i} style={{ width:'10px', height: `${Math.random()*80}%`, background: Math.random()>0.5 ? 'var(--neon-blue)' : 'var(--danger)' }}></div>
                            ))}
                        </div>
                        <div className="z-10 bg-black/80 p-4 rounded border border-gray-600">
                            <p className="text-white font-mono text-sm">ACTIVO: EUR/USD (OTC)</p>
                            <p className="text-xs text-gray-400 mt-1">CONTEXTO: PRECIO EN RESISTENCIA CLAVE + VELA DOJI</p>
                        </div>
                    </div>

                    <p className="text-red-500 font-bold mb-6 animate-pulse">TIEMPO RESTANTE: {timer}s</p>

                    <div className="flex justify-center gap-4">
                        <button onClick={() => handleSimAction('CALL')} className="btn-action" style={{ borderColor: '#39FF14', color: '#39FF14' }}>
                            COMPRAR (CALL)
                        </button>
                        <button onClick={() => handleSimAction('PUT')} className="btn-action" style={{ borderColor: '#FF003C', color: '#FF003C' }}>
                            VENDER (PUT)
                        </button>
                    </div>
                </div>
            )}

            {/* DEFEAT */}
            {phase === 'defeat' && (
                <div className="game-card">
                    <div className="text-6xl mb-4">💀</div>
                    <h2 className="text-danger font-bold text-3xl mb-4">MARGIN CALL</h2>
                    <p className="text-lg text-gray-300 mb-8">{currentQuestion?.q}</p>
                    <button className="btn-action" onClick={resetGame}>INTENTAR DE NUEVO</button>
                </div>
            )}

            {/* VICTORY MODAL */}
            {phase === 'victory' && (
                <div className="victory-modal">
                    <div className="trophy-emoji">🦉🏆</div>
                    <h1 className="victory-title">PERFECT RUN</h1>
                    <h2 className="text-neon-blue text-xl tracking-widest mb-6 font-bold">MASTER TRADER ELITE</h2>
                    
                    <div className="max-w-md text-gray-300 text-sm mb-8 leading-relaxed">
                        Has superado la Fase 1 (Riesgo), Fase 2 (Resistencia Mental) y el Simulador sin reiniciar. Eres parte del 1% que opera con disciplina absoluta.
                    </div>

                    <div className="action-box bg-red-900/20 border border-danger p-6 rounded-xl max-w-md w-full">
                        <strong className="text-danger uppercase block mb-4 text-lg">⚠️ PROTOCOLO FINAL:</strong>
                        <ol className="text-left text-gray-400 text-sm space-y-3 mb-6 list-decimal pl-5">
                            <li><strong>TOMA UNA CAPTURA DE PANTALLA</strong> ahora mismo.</li>
                            <li>Asegúrate de que el <strong>HASH</strong> de abajo sea visible.</li>
                            <li>Envía la evidencia al WhatsApp Oficial para recibir tu certificado.</li>
                        </ol>
                        <a href="https://wa.me/message/T6UFHN3SSTIEJ1?text=Hola%20TraderVision%20%F0%9F%A6%89%20He%20completado%20el%20Nivel%206%20Perfect%20Run.%20Adjunto%20mi%20evidencia." 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="whatsapp-btn w-full justify-center">
                           <FaWhatsapp size={20} /> ENVIAR EVIDENCIA
                        </a>
                    </div>

                    <div className="font-mono bg-black px-4 py-2 rounded text-gray-500 text-sm mt-4">
                        {securityHash}
                    </div>
                    
                    <button onClick={() => navigate('/zona-de-ejecucion')} className="mt-8 text-gray-500 hover:text-white underline text-sm">
                        VOLVER A LA ARENA
                    </button>
                </div>
            )}

        </div>
    );
};

export default BattlegroundsPage;
