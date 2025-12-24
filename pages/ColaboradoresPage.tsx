import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import PageBackButton from '../components/PageBackButton';
import { useRouter } from '../hooks/useRouter';
import { FiStar, FiAward, FiTrendingUp, FiCheckCircle, FiShield, FiAlertTriangle, FiArrowRight, FiZap, FiX, FiCheck } from 'react-icons/fi';
import { FaUserShield, FaCrown, FaMoneyBillWave, FaHandshake, FaBan } from 'react-icons/fa';

// --- SUBCOMPONENTE: MODAL DE COMPLIANCE ---
const ComplianceModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-[#0a0a0a] rounded-3xl border-2 border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden animate-fade-in-up">
                
                {/* Botón Cerrar */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors z-30"
                >
                    <FiX size={24} />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] mb-4">
                            <FiShield size={24} />
                        </div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tighter font-sans">MARCO LEGAL DE COLABORACIÓN</h2>
                    </div>

                    <div className="space-y-6">
                        {/* SECCIÓN A: DERECHOS */}
                        <div>
                            <h3 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                <FiCheck className="text-sm" /> SECCIÓN A: TUS DERECHOS
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500">✅</span>
                                    <span>Licencia oficial para comercializar el catálogo educativo.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500">✅</span>
                                    <span>Acceso a comisiones por venta efectiva (sin techo).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500">✅</span>
                                    <span>Uso de material de marketing autorizado.</span>
                                </li>
                            </ul>
                        </div>

                        {/* SECCIÓN B: PROHIBICIONES */}
                        <div>
                            <h3 className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                <FiAlertTriangle className="text-sm" /> SECCIÓN B: LO PROHIBIDO
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500">⛔</span>
                                    <span>Prometer rentabilidad fija o garantizada.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500">⛔</span>
                                    <span>Hacerse pasar por dueño o corporativo de la marca.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500">⛔</span>
                                    <span>Usar logotipos en estafas o esquemas piramidales.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500">⛔</span>
                                    <span>La inactividad operativa por 2 meses revoca la licencia.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10">
                        <a 
                            href="https://wa.me/message/T6UFHN3SSTIEJ1" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-black py-4 rounded-xl shadow-lg transition-all transform active:scale-95 uppercase text-xs tracking-widest"
                        >
                            ENTENDIDO. CONTACTAR SOPORTE HUMANO
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StepCard: React.FC<{ num: number, title: string, description: string, icon: React.ReactNode }> = ({ num, title, description, icon }) => (
    <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all group overflow-hidden h-full flex flex-col">
        <div className="absolute -right-4 -bottom-4 text-white/5 text-8xl font-black">{num}</div>
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-2xl shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed relative z-10 flex-grow">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ name: string, location: string, text: string, img: string }> = ({ name, location, text, img }) => (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-[#112240] to-black border border-[#D4AF37]/10 flex flex-col h-full shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
        <div className="flex items-center gap-4 mb-6">
            <img src={img} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]/50 p-0.5" />
            <div>
                <h4 className="font-black text-[#D4AF37] uppercase text-sm tracking-widest">{name}</h4>
                <p className="text-xs text-gray-500 font-bold">{location}</p>
            </div>
        </div>
        <p className="text-gray-300 italic text-sm leading-relaxed flex-grow">"{text}"</p>
        <div className="mt-6 flex justify-end opacity-20 group-hover:opacity-100 transition-opacity">
            <FiAward className="text-[#D4AF37] text-3xl" />
        </div>
    </div>
);

const ColaboradoresPage: React.FC = () => {
    const { navigate } = useRouter();
    const [isLegalOpen, setIsLegalOpen] = useState(false);

    useEffect(() => {
        document.title = "Socio Certificado | Acceso Gold | TradeVision Latam";
        window.scrollTo(0, 0);
    }, []);

    const roadmap = [
        { title: "Formación", desc: "Adquiere tu credencial. Debes ser alumno activo de nuestros módulos avanzados para entender qué recomiendas.", icon: <FaUserShield /> },
        { title: "Reto de Fondeo", desc: "Carga un mínimo de $100 USD en uno de nuestros Brokers Recomendados para validar tu intención real de operar.", icon: <FaMoneyBillWave /> },
        { title: "Prueba de Fuego", desc: "Sube esa cuenta a $500 USD en 30 días aplicando estrictamente nuestra gestión de riesgo (Backtesting verificado).", icon: <FiZap /> },
        { title: "Auditoría Gold", desc: "Envía tu historial y ID. Al aprobar, desbloqueas tu Licencia de Distribución Gold. Habilita tu derecho a comercializar nuestros productos legalmente.", icon: <FaCrown /> }
    ];

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
            <Header onOpenModal={() => {}} />
            
            <main className="pt-20">
                {/* 1. HERO SECTION */}
                <AnimatedSection className="relative py-24 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]"></div>
                    
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="mb-12 inline-flex">
                            <PageBackButton variant="on-dark" />
                        </div>
                        
                        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] font-black tracking-[0.3em] uppercase animate-pulse">
                            PROGRAMA DE SOCIOS ELITE
                        </div>
                        
                        <h1 className="text-4xl md:text-7xl font-black mb-6 leading-none uppercase">
                            No buscamos vendedores.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFF] to-[#D4AF37]">Buscamos Traders Rentables.</span>
                        </h1>
                        
                        <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-medium">
                            El Programa de Partners de <span translate="no">TradeVision Latam</span> no es para todos. Solo quienes demuestran resultados ganan el derecho a comisionar de por vida con nuestra academia.
                        </p>

                        <div className="flex flex-col items-center gap-4">
                            <div className="px-6 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl">
                                <h3 className="text-[#D4AF37] font-black text-sm uppercase tracking-widest">No somos un Multinivel. Somos una Meritocracia.</h3>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* 2. TRANSFORMACIÓN (HISTORIAS) */}
                <AnimatedSection className="py-20 bg-black/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Historias de <span className="text-[#D4AF37]">Transformación</span></h2>
                            <p className="text-gray-500 mt-2">Ética, resultados y libertad real.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <TestimonialCard 
                                name="Lucas" location="Río de Janeiro, Brasil" img="https://randomuser.me/api/portraits/men/32.jpg"
                                text="Tenía 19 años y quería sacar a mis padres de la favela. TradeVision me enseñó a operar, no a reclutar. Hoy genero ingresos recurrentes solo recomendando lo que a mí me funcionó."
                            />
                            <TestimonialCard 
                                name="Sofía" location="Barcelona, España" img="https://randomuser.me/api/portraits/women/44.jpg"
                                text="Estaba harta de las estafas piramidales. Aquí tuve que demostrar mi trading antes de poder vender. Eso me dio la ética para pagarme la universidad y mi primer auto."
                            />
                            <TestimonialCard 
                                name="Mark" location="Manila, Filipinas" img="https://randomuser.me/api/portraits/men/85.jpg"
                                text="La libertad no es un yate, es no tener jefe. Con el ecosistema TradeVision, gano por mis operaciones y por mis referidos verificados. Pagué la casa de mi madre en 6 meses."
                            />
                        </div>
                    </div>
                </AnimatedSection>

                {/* 3. EL RETO (ROADMAP) */}
                <AnimatedSection className="py-24 relative">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">EL FILTRO DE ENTRADA: <span className="text-[#D4AF37]">EL RETO</span></h2>
                            <p className="text-gray-400">Sigue este camino para obtener tu Certificación Gold.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {roadmap.map((step, i) => (
                                <StepCard key={i} num={i+1} title={step.title} description={step.desc} icon={step.icon} />
                            ))}
                        </div>

                        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black text-center shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
                            <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">¿Crees tener la disciplina necesaria?</h3>
                            <button 
                                onClick={() => navigate('/premium-courses')}
                                className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                INICIAR PASO 1: FORMACIÓN <FiArrowRight />
                            </button>
                        </div>
                    </div>
                </AnimatedSection>

                {/* 4. REGLAMENTO Y ÉTICA */}
                <AnimatedSection className="py-20 bg-white/5 border-y border-white/10">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="p-8 md:p-12 rounded-3xl border border-red-500/20 bg-red-950/10">
                            <div className="flex items-center gap-4 mb-8 text-red-500">
                                <FiAlertTriangle className="text-4xl animate-pulse" />
                                <h2 className="text-2xl md:text-3xl font-black uppercase">REGLAMENTO: TOLERANCIA CERO</h2>
                            </div>
                            
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <FiCheckCircle className="text-red-500 shrink-0 mt-1" />
                                    <p className="text-gray-300 text-sm md:text-base"><strong className="text-white">Propiedad Intelectual:</strong> Prohibido usar nuestra marca, logos o mascotas sin autorización oficial expresa.</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <FiCheckCircle className="text-red-500 shrink-0 mt-1" />
                                    <p className="text-gray-300 text-sm md:text-base"><strong className="text-white">Publicidad Ética:</strong> Prohibido hacer promesas de 'Dinero Fácil' o 'Rentabilidad Garantizada'.</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <FiCheckCircle className="text-red-500 shrink-0 mt-1" />
                                    <p className="text-gray-300 text-sm md:text-base"><strong className="text-white">Prohibición de Captación:</strong> Prohibido captar capital de terceros bajo el nombre de la academia.</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <FiCheckCircle className="text-red-500 shrink-0 mt-1" />
                                    <p className="text-gray-300 text-sm md:text-base"><strong className="text-white">Sanciones:</strong> Si detectamos publicidad engañosa, serás baneado permanentemente y tus ingresos retenidos.</p>
                                </li>
                            </ul>

                            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-3">
                                    <FiShield className="text-2xl text-[#D4AF37]" />
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Pagos Regulados <br /> Vía Cuentas USA</span>
                                </div>
                                <button 
                                    onClick={() => setIsLegalOpen(true)} 
                                    className="flex items-center gap-2 text-[#D4AF37] font-black text-sm hover:underline"
                                >
                                    <FaHandshake /> CONSULTAR DUDAS LEGALES
                                </button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* 5. DISCLAIMER FINAL */}
                <section className="py-16 bg-black">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed uppercase tracking-tighter font-medium">
                            <strong className="text-red-500/50 block mb-2">ADVERTENCIA DE RIESGO PROFESIONAL:</strong>
                            EL TRADING IMPLICA UN RIESGO SIGNIFICATIVO DE PÉRDIDA Y NO ES ADECUADO PARA TODOS LOS INVERSORES. TRADEVISION LATAM ES UNA ACADEMIA ESTRICTAMENTE EDUCATIVA. NO SOMOS UN BROKER NI ASESORES FINANCIEROS. TODA INVERSIÓN O PÉRDIDA ES 100% RESPONSABILIDAD DEL USUARIO. RESULTADOS PASADOS NO GARANTIZAN FUTUROS.
                        </p>
                    </div>
                </section>
            </main>

            <Footer onOpenModal={() => {}} />
            <ScrollToTopButton />

            {/* MODAL DE COMPLIANCE */}
            <ComplianceModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
        </div>
    );
};

export default ColaboradoresPage;