import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { useRouter } from '../hooks/useRouter';
import { FiCheckCircle, FiExternalLink, FiArrowLeft, FiMessageCircle, FiHome } from 'react-icons/fi';
import { FaTelegram, FaRocket } from 'react-icons/fa';

const SuccessPage: React.FC = () => {
  const { navigate } = useRouter();
  
  useEffect(() => {
    document.title = "¡Bienvenido a la Élite! | TradeVision Latam";
    window.scrollTo(0, 0);
  }, []);
  
  const handleHome = () => navigate('/');

  return (
    <div className="bg-[#050b14] min-h-screen text-white font-sans selection:bg-brand-accent selection:text-brand-primary">
      <Header onOpenModal={() => {}} />
      
      <main className="pt-20">
        <AnimatedSection className="relative py-20 md:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-violet/5 blur-[120px] rounded-full"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              
              {/* Card de Éxito */}
              <div className="bg-[#0A1931]/60 backdrop-blur-xl border border-brand-accent/20 rounded-[2.5rem] p-8 md:p-16 shadow-[0_0_80px_rgba(64,224,208,0.1)] text-center animate-fade-in-up">
                
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-accent/10 border-2 border-brand-accent mb-8 shadow-[0_0_30px_rgba(64,224,208,0.3)]">
                  <FiCheckCircle className="text-brand-accent text-5xl animate-bounce" />
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.2em] leading-tight mb-8">
                  ¡BIENVENIDO A LA <br className="hidden md:block" />
                  <span className="text-brand-accent">ZONA DE DISCIPLINA!</span>
                </h1>
                
                <div className="space-y-6 text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
                  <p>Tu acceso al <span className="text-white font-bold">Sistema de Ejecución</span> ha sido validado satisfactoriamente.</p>
                  <p>Has tomado la decisión que separa a los apostadores de los <span className="text-brand-accent font-bold">Traders Profesionales</span>. En TradeVision Latam entregamos metodología y rigor técnico.</p>
                  <p className="text-sm md:text-base opacity-80">Tu formación ha sido habilitada y un correo con credenciales de acceso está en camino. Por favor, revisa tu bandeja de entrada (y carpeta de spam).</p>
                </div>

                <p className="mt-8 text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
                  ¡Bienvenido a la academia! El siguiente paso es unirse a nuestro canal oficial. Desde allí, nuestro equipo te guiará para activar tu acceso VIP y proporcionarte las credenciales de la plataforma una vez verificado tu perfil.
                </p>
                
                {/* Acciones VIP - BOTÓN CENTRAL ÚNICO */}
                <div className="mt-12 flex justify-center">
                  <a 
                    href="https://t.me/TFTRADER25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-brand-accent text-brand-primary font-black py-5 px-10 rounded-2xl text-base uppercase tracking-widest hover:bg-white transition-all transform hover:scale-[1.02] shadow-lg shadow-brand-accent/20 group"
                  >
                    <FaTelegram className="text-2xl group-hover:scale-110 transition-transform" />
                    UNIRSE AL CANAL DE COMUNICADOS Y RESULTADOS
                  </a>
                </div>
                
                <button 
                  onClick={handleHome}
                  className="mt-12 flex items-center justify-center gap-2 text-gray-500 hover:text-brand-accent transition-colors font-black text-xs uppercase tracking-[0.3em] mx-auto group"
                >
                  <FiHome className="group-hover:-translate-y-1 transition-transform" />
                  VOLVER A LA ACADEMIA
                </button>
                
              </div>
              
              {/* Nota de Soporte */}
              <div className="mt-12 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                  <FiMessageCircle /> ¿Problemas con tu acceso? Contacta a soporte inmediato vía WhatsApp.
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