
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { useRouter } from '../hooks/useRouter';
import { FiCheckCircle, FiExternalLink, FiShield, FiAlertTriangle, FiVideo, FiUsers, FiLock, FiHome } from 'react-icons/fi';
import { FaTelegram, FaShieldAlt } from 'react-icons/fa';

const SuccessPage: React.FC = () => {
  const { navigate } = useRouter();
  
  useEffect(() => {
    document.title = "¡Bienvenido a la Élite! | Protección TradeVision";
    window.scrollTo(0, 0);
  }, []);
  
  const handleHome = () => navigate('/');

  return (
    <div className="bg-[#050b14] min-h-screen text-white font-sans selection:bg-brand-accent selection:text-brand-primary">
      <Header onOpenModal={() => {}} />
      
      <main className="pt-20">
        <AnimatedSection className="relative py-12 md:py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              
              {/* 1. WELCOME HEADER */}
              <div className="text-center mb-12 animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  <FiCheckCircle className="text-green-500 text-4xl" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
                  ¡ACCESO VALIDADO <span className="text-brand-accent">EXITOSAMENTE!</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                  Has tomado la decisión que separa a los apostadores de los <span className="text-white font-bold">Traders Profesionales</span>.
                </p>
              </div>

              {/* 2. INSTITUTIONAL PROTECTION SECTION (CRITICAL) */}
              <div className="bg-[#0A1931] border-2 border-[#D4AF37]/40 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.1)] mb-12">
                
                {/* Header de Autoridad */}
                <div className="bg-gradient-to-r from-[#112240] to-[#0A1931] p-6 md:p-10 border-b border-[#D4AF37]/20 text-center">
                    <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter flex items-center justify-center gap-4">
                        <FaShieldAlt className="text-[#D4AF37] animate-pulse" /> 
                        PASO OBLIGATORIO: Asegura tu Operativa y Blindaje
                    </h2>
                </div>

                <div className="p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Copy de Valor */}
                        <div className="space-y-6">
                            <p className="text-lg text-gray-200 leading-relaxed">
                                Para gozar de nuestra <span className="text-[#D4AF37] font-bold">Protección Institucional</span>, es imperativo que tu cuenta de trading esté vinculada directamente a nuestra estructura auditada.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="bg-[#D4AF37]/10 p-2 rounded-lg text-[#D4AF37]"><FiShield size={20}/></div>
                                    <p className="text-sm text-gray-300"><strong className="text-white">Mediación Oficial:</strong> Damos la cara por ti ante el broker en caso de irregularidades.</p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="bg-[#D4AF37]/10 p-2 rounded-lg text-[#D4AF37]"><FiLock size={20}/></div>
                                    <p className="text-sm text-gray-300"><strong className="text-white">Resolución Prioritaria:</strong> Gestión directa de problemas de retiro o verificación (KYC).</p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="bg-[#D4AF37]/10 p-2 rounded-lg text-[#D4AF37]"><FaShieldAlt size={20}/></div>
                                    <p className="text-sm text-gray-300"><strong className="text-white">Capa de Protección Técnica:</strong> Acceso a los protocolos de seguridad de José Quintana.</p>
                                </div>
                            </div>

                            <div className="p-4 bg-red-950/20 border-l-4 border-red-500 rounded-r-xl">
                                <p className="text-xs text-red-200 font-bold uppercase mb-1 flex items-center gap-2">
                                    <FiAlertTriangle /> Instrucción Técnica para Cuentas Existentes:
                                </p>
                                <p className="text-xs text-gray-400 italic">
                                    Si ya tienes cuenta, debes cerrarla y abrir una nueva con estos links exclusivos. "Limpia tu entorno de trading para recibir soporte directo y ser parte de nuestra red verificada".
                                </p>
                            </div>
                        </div>

                        {/* Botones de Registro Premium */}
                        <div className="flex flex-col gap-6">
                            <a 
                                href="https://exnova.org/es/?aff=753088&afftrack=PaginaWeb&aff_model=revenue" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group relative bg-[#FACC15] hover:bg-white text-black font-black py-6 px-8 rounded-2xl transition-all shadow-[0_15px_40px_rgba(250,204,21,0.2)] text-center overflow-hidden active:scale-95"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 text-sm md:text-base uppercase tracking-widest">
                                    REGISTRAR CUENTA PROTEGIDA EN EXNOVA <FiExternalLink />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </a>

                            <a 
                                href="https://iqoption.net/lp/mobile-partner/es/?aff=753088&afftrack=PaginaWeb&clickid=&aff_model=revenue" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group relative bg-white hover:bg-[#D4AF37] text-black font-black py-6 px-8 rounded-2xl transition-all shadow-[0_15px_40px_rgba(255,255,255,0.1)] text-center overflow-hidden active:scale-95"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 text-sm md:text-base uppercase tracking-widest">
                                    REGISTRAR CUENTA PROTEGIDA EN IQ OPTION <FiExternalLink />
                                </span>
                            </a>
                            
                            <p className="text-[10px] text-center text-gray-500 uppercase font-black tracking-[0.3em] opacity-60">
                                Protocolo de Afiliación Segura V2.0
                            </p>
                        </div>
                    </div>

                    {/* Beneficios Exclusivos (Grid Inferior) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/5">
                        <div className="text-center group">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                                <FiUsers />
                            </div>
                            <h4 className="font-bold text-sm text-white uppercase mb-2">Soporte Legal y Técnico</h4>
                            <p className="text-[11px] text-gray-400">Ayuda directa y mediación en disputas técnicas con el broker.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                                <FiVideo />
                            </div>
                            <h4 className="font-bold text-sm text-white uppercase mb-2">Contenido VIP</h4>
                            <p className="text-[11px] text-gray-400">Videos sobre depósitos y retiros legales en Venezuela sin trabas.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                                <FaShieldAlt />
                            </div>
                            <h4 className="font-bold text-sm text-white uppercase mb-2">Comunidad Auditada</h4>
                            <p className="text-[11px] text-gray-400">Acceso a beneficios extra por ser parte de nuestra estructura verificada.</p>
                        </div>
                    </div>
                </div>
              </div>

              {/* 3. FINAL STEPS & CALL TO ACTION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                    <p className="text-gray-400 text-sm mb-6 uppercase font-bold tracking-widest">Comunicados Oficiales</p>
                    <a 
                        href="https://t.me/TFTRADER25"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-[#0088CC] hover:bg-white hover:text-[#0088CC] text-white font-black py-4 px-8 rounded-xl w-full transition-all group"
                    >
                        <FaTelegram size={24} className="group-hover:scale-110 transition-transform" />
                        UNIRSE AL CANAL DE COMUNICADOS
                    </a>
                </div>

                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center flex flex-col justify-center">
                    <button 
                        onClick={handleHome}
                        className="flex items-center justify-center gap-2 text-gray-400 hover:text-brand-accent transition-colors font-black text-xs uppercase tracking-[0.3em] mx-auto group"
                    >
                        <FiHome className="group-hover:-translate-y-1 transition-transform" size={18} />
                        VOLVER A LA ACADEMIA PRINCIPAL
                    </button>
                </div>
              </div>
              
              {/* Footer de Soporte */}
              <div className="text-center py-10 opacity-40">
                <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">
                    TradeVision Latam © 2025 | Sistema de Formación Profesional Blindado
                </p>
              </div>
              
            </div>
          </div>
        </AnimatedSection>
      </main>
      
      <Footer onOpenModal={() => {}} />
      <ScrollToTopButton />
    </div>
  );
};

export default SuccessPage;
