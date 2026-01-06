
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import PageBackButton from '../components/PageBackButton';
import { useRouter } from '../hooks/useRouter';
// Fix: Removed incorrect and unused imports (FaMoneyBillWave, FaChartPie, FaRocket, FaGem, FiLock) that were causing build errors
import { FiBriefcase, FiTrendingUp, FiLayers, FiShield, FiCheckCircle, FiArrowRight, FiTarget, FiAlertCircle, FiInfo } from 'react-icons/fi';
import EarningsCalculator from '../components/EarningsCalculator';

const SOCIAL_PROOF_MESSAGES = [
    "Carlos ha generado $50 USD esta semana.",
    "Vanesa ha vendido 2 cursos de nivel Intermedio.",
    "Jose llegó a sus primeros $1,000 USD y desbloqueó el Nivel Fundador.",
    "Lucía activó su bono de $150 USD por volumen mensual.",
    "Miguel subió al rango Élite (45% de comisión).",
];

const PartnersPage: React.FC = () => {
    const { navigate } = useRouter();
    const [currentProofIndex, setCurrentProofIndex] = useState(0);

    useEffect(() => {
        document.title = "Socio Fundador | Programa de Partners | TradeVision Latam";
        window.scrollTo(0, 0);

        const proofInterval = setInterval(() => {
            setCurrentProofIndex((prev) => (prev + 1) % SOCIAL_PROOF_MESSAGES.length);
        }, 8000);

        return () => clearInterval(proofInterval);
    }, []);

    const scalabilityLevels = [
        { pct: "30%", rank: "GLOBAL", req: "Registro gratuito", desc: "Abierto para cualquier trader que quiera empezar de forma ética." },
        { pct: "35%", rank: "MIEMBRO", req: "Alumnos curso $99", desc: "Bonificación automática por ser parte de la academia." },
        { pct: "38%", rank: "PRO", req: "Alumnos curso $199", desc: "Nivel de recomendación estratégica para traders en formación." },
        { pct: "45%", rank: "ÉLITE", req: "Curso $499 o Socios B2B", desc: "Máximo beneficio. Acceso a herramientas de marketing avanzado." }
    ];

    return (
        <div className="bg-[#050b14] min-h-screen text-white font-sans selection:bg-brand-accent selection:text-brand-primary">
            <Header onOpenModal={() => {}} />
            
            {/* SOCIAL PROOF ROTATIVO FLOTANTE */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] pointer-events-none w-full max-w-lg px-4">
                <div className="bg-brand-accent/10 backdrop-blur-xl border border-brand-accent/30 rounded-full py-2 px-6 shadow-[0_0_30px_rgba(64,224,208,0.2)] flex items-center justify-center gap-3 animate-fade-in-up">
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-ping"></div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand-accent">
                        {SOCIAL_PROOF_MESSAGES[currentProofIndex]}
                    </span>
                </div>
            </div>

            <main className="pt-20">
                {/* HERO SECTION */}
                <AnimatedSection className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full animate-pulse"></div>
                    
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="mb-12 inline-flex">
                            <PageBackButton variant="on-dark" />
                        </div>
                        
                        <div className="inline-block mb-6 px-6 py-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/5 text-brand-accent text-[10px] font-black tracking-[0.4em] uppercase">
                            Business Intelligence & Funnel Architecture
                        </div>
                        
                        <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight uppercase">
                            CONVIÉRTETE EN SOCIO FUNDADOR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-accent">DE TRADEVISION LATAM</span>
                        </h1>
                        
                        <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-2xl leading-relaxed mb-10 font-medium">
                            Genera comisiones profesionales de por vida recomendando la academia de trading más disciplinada de Latinoamérica.
                        </p>

                        <div className="flex flex-col items-center gap-6">
                            <p className="text-brand-accent font-black text-xs uppercase tracking-[0.5em] italic">De Trader a Dueño de Negocio: Emprende con la Élite.</p>
                            <a 
                                href="https://whop.com/tradevisionlatam/sistema-de-ejecucion-binarias?a=tradevisionlatam"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-accent text-brand-primary font-black py-4 px-12 rounded-xl text-lg uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(64,224,208,0.4)] flex items-center gap-3"
                            >
                                <FiBriefcase className="text-2xl" /> ACTIVAR LICENCIA WHOP
                            </a>
                        </div>
                    </div>
                </AnimatedSection>

                {/* PILARES DE NEGOCIO */}
                <AnimatedSection className="py-20 bg-black/40">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-accent/30 transition-all">
                                <FiTarget className="text-4xl text-brand-accent mb-6" />
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Trading Personal</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Domina los mercados operando con nuestra metodología <strong className="text-white">C90</strong>. Tu primer activo es tu propia rentabilidad verificada.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-accent/30 transition-all scale-105 shadow-[0_0_30px_rgba(64,224,208,0.1)]">
                                <FiTrendingUp className="text-4xl text-brand-accent mb-6" />
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Afiliación Directa</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Gana desde el <strong className="text-white">30% al 45%</strong> por cada referido que acceda a la academia usando tus links exclusivos de Whop.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-accent/30 transition-all">
                                <FiLayers className="text-4xl text-brand-accent mb-6" />
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Infraestructura B2B</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Te asesoramos y creamos tu propia <strong className="text-white">Web, Comunidad y Embudos</strong> para que lances tu marca bajo nuestro respaldo.</p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* ESCALABILIDAD DE COMISIONES */}
                <AnimatedSection className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">TABLA DE ESCALABILIDAD</h2>
                            <div className="h-1 w-24 bg-brand-accent mx-auto mt-4 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mb-12">
                            {scalabilityLevels.map((level, i) => (
                                <div key={i} className="group relative flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="text-4xl md:text-6xl font-black text-brand-accent opacity-50 group-hover:opacity-100 transition-opacity">
                                            {level.pct}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-white text-lg tracking-widest">{level.rank}</h4>
                                            <p className="text-xs text-brand-accent font-bold uppercase">{level.req}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm md:max-w-xs text-center md:text-right leading-tight">
                                        {level.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                        
                        <div id="earnings-calculator">
                            <EarningsCalculator />
                        </div>
                    </div>
                </AnimatedSection>

                {/* PAGOS Y PRODUCTOS */}
                <AnimatedSection className="py-20 bg-brand-primary">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-black uppercase tracking-tighter">SISTEMA DE PAGOS AUTOMATIZADO</h2>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-gray-300 leading-relaxed text-sm">
                                        Utilizamos la infraestructura de <strong className="text-brand-accent">Whop.com</strong> para gestionar las comisiones. Esto garantiza que cada centavo generado sea acreditado automáticamente a tu cuenta vinculada sin intermediarios ni demoras.
                                    </p>
                                    <div className="mt-6 flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        <span className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Transparencia 100%</span>
                                        <span className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Pago Directo</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-900/10 border-l-4 border-blue-500 rounded-r-xl">
                                    <FiInfo className="text-blue-500 text-xl shrink-0 mt-1" />
                                    <p className="text-xs text-gray-400">
                                        Recomendamos encarecidamente adquirir nuestros cursos para conocer la calidad del producto que recomiendas, pero no es una condición obligatoria para registrarte como partner global.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {/* CURSO ACTIVO */}
                                <div className="p-6 rounded-2xl bg-brand-accent/10 border-2 border-brand-accent shadow-[0_0_30px_rgba(64,224,208,0.15)] relative overflow-hidden group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-[10px] font-black bg-brand-accent text-brand-primary px-2 py-0.5 rounded-full uppercase mb-2 inline-block">Producto Activo</span>
                                            <h4 className="text-xl font-black text-white uppercase tracking-tight">SISTEMA DE EJECUCIÓN</h4>
                                        </div>
                                        <span className="text-2xl font-black text-brand-accent">$99</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-6">Curso Intermedio: 35% de comisión garantizada.</p>
                                    <button onClick={() => navigate('/cursos/binarias-intermedio')} className="w-full py-3 bg-brand-accent text-brand-primary font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all">Ver Módulos</button>
                                </div>

                                {/* CURSOS INACTIVOS (PLACEHOLDERS GLASS) */}
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm opacity-60 hover:opacity-100 transition-all flex justify-between items-center">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-300 uppercase">VISIÓN AVANZADA</h4>
                                        <p className="text-[10px] text-gray-500">Comisión 38% - Curso $199</p>
                                    </div>
                                    <span className="text-xs font-mono text-gray-600">LOCKED</span>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm opacity-60 hover:opacity-100 transition-all flex justify-between items-center">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-300 uppercase">ÉLITE INSTITUCIONAL</h4>
                                        <p className="text-[10px] text-gray-500">Comisión 45% - Curso $499</p>
                                    </div>
                                    <span className="text-xs font-mono text-gray-600">LOCKED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* SEGURIDAD Y ÉTICA */}
                <AnimatedSection className="py-24">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="p-8 md:p-12 rounded-[2.5rem] border-4 border-red-600/30 bg-[#1a0505] relative shadow-[0_0_50px_rgba(255,0,0,0.1)]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white font-black px-8 py-2 rounded-full text-sm uppercase tracking-widest flex items-center gap-2">
                                <FiAlertCircle /> PROTOCOLO DE SEGURIDAD
                            </div>
                            
                            <div className="text-center space-y-6">
                                <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">CERO TOLERANCIA AL FRAUDE</h3>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                    <span translate="no">TradeVision Latam</span> <strong className="text-white underline decoration-red-600 decoration-2">NO es un multinivel ni un esquema piramidal</strong>. No pagamos por reclutar; pagamos por venta efectiva de educación real.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                    <div className="p-4 bg-black/40 rounded-xl border border-red-900/50">
                                        <h5 className="text-red-500 font-black text-[10px] uppercase mb-1">PROHIBIDO:</h5>
                                        <p className="text-[11px] text-gray-400">Hacer promesas falsas de ganancias o usar captación de capital de terceros.</p>
                                    </div>
                                    <div className="p-4 bg-black/40 rounded-xl border border-red-900/50">
                                        <h5 className="text-red-500 font-black text-[10px] uppercase mb-1">PROHIBIDO:</h5>
                                        <p className="text-[11px] text-gray-400">Usar la marca TradeVision para estafar. Rastreabilidad total vía ID de afiliado.</p>
                                    </div>
                                </div>

                                <p className="text-xs text-red-400 font-bold uppercase tracking-widest animate-pulse">
                                    Cualquier mal uso resultará en BANEO PERMANENTE, CONGELACIÓN DE FONDOS y expulsión de por vida.
                                </p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* CIERRE */}
                <div className="text-center pb-24">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center justify-center gap-2 bg-white/5 text-gray-500 font-black py-4 px-10 rounded-2xl border border-white/10 hover:bg-brand-accent hover:text-brand-primary hover:border-brand-accent transition-all duration-300 uppercase text-sm tracking-widest group"
                    >
                        <FiArrowRight className="rotate-180 group-hover:-translate-x-2 transition-transform" /> Volver al Inicio
                    </button>
                </div>
            </main>

            <Footer onOpenModal={() => {}} />
            <ScrollToTopButton />
        </div>
    );
};

export default PartnersPage;
