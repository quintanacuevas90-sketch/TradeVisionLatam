
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import PageBackButton from '../components/PageBackButton';
import { ModalType, Mentor } from '../types';
import { MENTORS } from '../constants';
import { FaCrown, FaUserGraduate, FaHandshake, FaBan, FaFlag } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { useRouter } from '../hooks/useRouter';

// --- STYLES ---
// Using inline styles/Tailwind for specific effects requested in the prompt.

// --- COMPONENTS ---

const FounderCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => (
    <div className="relative group w-full max-w-sm mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative h-full bg-[#0d1b2a] bg-opacity-80 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:border-[#00E5FF]">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-r from-[#00E5FF] to-blue-600 mb-4 shadow-[0_0_20px_rgba(0,229,255,0.5)]">
                <img src={mentor.imageUrl} alt={mentor.name} className="w-full h-full rounded-full object-cover border-2 border-[#0A192F]" />
            </div>
            <h3 className="text-xl font-bold text-white font-[Orbitron] tracking-wider">{mentor.name}</h3>
            <p className="text-[#00E5FF] text-sm font-bold uppercase tracking-widest mt-1">{mentor.role === "CEO y Fundador" ? "FUNDADOR" : "MENTOR GLOBAL"}</p>
            <p className="text-gray-400 text-xs mt-3 italic">"{mentor.specialty}"</p>
            <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-blue-900/50 border border-blue-500/30 rounded text-[10px] text-blue-200">VISIONARIO</span>
                <span className="px-3 py-1 bg-cyan-900/50 border border-cyan-500/30 rounded text-[10px] text-cyan-200">LÍDER</span>
            </div>
        </div>
    </div>
);

interface HallOfFameUser {
    name: string;
    country: string;
    rank: string;
    image: string;
}

const UserCard: React.FC<{ user: HallOfFameUser, type: 'gold' | 'silver' | 'turquoise' }> = ({ user, type }) => {
    let borderClass = '';
    let glowClass = '';
    let titleColor = '';
    let icon = null;

    if (type === 'gold') {
        borderClass = 'border-[#FFD700]';
        glowClass = 'shadow-[0_0_30px_rgba(255,215,0,0.3)]';
        titleColor = 'text-[#FFD700]';
        icon = <FaCrown className="text-[#FFD700]" />;
    } else if (type === 'silver') {
        borderClass = 'border-gray-300';
        glowClass = 'shadow-[0_0_20px_rgba(192,192,192,0.2)]';
        titleColor = 'text-gray-200';
        icon = <FaUserGraduate className="text-gray-300" />;
    } else {
        borderClass = 'border-[#00E5FF]';
        glowClass = 'shadow-[0_0_20px_rgba(0,229,255,0.4)]';
        titleColor = 'text-[#00E5FF]';
        icon = <FaHandshake className="text-[#00E5FF]" />;
    }

    return (
        <div className={`bg-[#112240] rounded-lg p-4 border-2 ${borderClass} ${glowClass} flex items-center gap-4 transition-transform transform hover:-translate-y-2 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-2 opacity-20">
                <FaFlag className={`text-4xl ${titleColor}`} />
            </div>
            <img src={user.image} alt={user.name} className={`w-16 h-16 rounded-full border-2 ${borderClass} object-cover`} />
            <div>
                <h4 className="font-bold text-white text-lg flex items-center gap-2">
                    {user.name} 
                    <img 
                        src={`https://flagcdn.com/24x18/${user.country.toLowerCase()}.png`} 
                        alt={user.country} 
                        className="w-4 h-3 rounded-sm opacity-80"
                    />
                </h4>
                <p className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${titleColor} mt-1`}>
                    {icon} {user.rank}
                </p>
            </div>
        </div>
    );
};

const HallOfFamePage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => {
        navigate(`/?open=${modal}`);
    };

    useEffect(() => {
        document.title = "Salón de la Fama | TradeVision Latam";
    }, []);

    // --- MOCK DATA ---
    const elites: HallOfFameUser[] = [
        { name: "Alejandro V.", country: "MX", rank: "Elite", image: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Sofía R.", country: "CO", rank: "Elite", image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Carlos M.", country: "AR", rank: "Elite", image: "https://randomuser.me/api/portraits/men/85.jpg" },
    ];

    const pros: HallOfFameUser[] = [
        { name: "Diego F.", country: "PE", rank: "Pro", image: "https://randomuser.me/api/portraits/men/22.jpg" },
        { name: "Valentina G.", country: "CL", rank: "Pro", image: "https://randomuser.me/api/portraits/women/28.jpg" },
        { name: "Javier T.", country: "ES", rank: "Pro", image: "https://randomuser.me/api/portraits/men/54.jpg" },
        { name: "Lucía P.", country: "UY", rank: "Pro", image: "https://randomuser.me/api/portraits/women/65.jpg" },
    ];

    const affiliates: HallOfFameUser[] = [
        { name: "Roberto S.", country: "BR", rank: "Partner", image: "https://randomuser.me/api/portraits/men/11.jpg" },
        { name: "Ana K.", country: "MX", rank: "Partner", image: "https://randomuser.me/api/portraits/women/12.jpg" },
        { name: "Miguel O.", country: "CO", rank: "Partner", image: "https://randomuser.me/api/portraits/men/33.jpg" },
    ];

    const blacklist = [
        { name: "TraderFake_99", reason: "Uso de Bots Ilegales", date: "FEB 2025" },
        { name: "SignalSellerX", reason: "Estafa a Comunidad", date: "ENE 2025" },
        { name: "CopyCat_Vzla", reason: "Plagio de IP", date: "MAR 2025" },
    ];

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20 bg-[#0A192F] min-h-screen text-gray-200 font-sans selection:bg-[#00E5FF] selection:text-[#0A192F]">
                
                {/* HERO */}
                <AnimatedSection className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-blue-500/20 blur-[100px] rounded-full"></div>
                    
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="absolute top-0 left-4 md:left-8">
                            <PageBackButton variant="on-dark" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 font-[Orbitron] uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            Salón de la Fama
                        </h1>
                        <h2 className="text-xl md:text-2xl text-[#00E5FF] font-bold mt-4 tracking-wide uppercase text-shadow-glow">
                            TradeVision Latam
                        </h2>
                        
                        <div className="mt-12 max-w-4xl mx-auto p-8 bg-[#112240]/80 backdrop-blur-md border border-[#FFD700]/30 rounded-xl relative">
                            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#FFD700]"></div>
                            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#FFD700]"></div>
                            
                            <h3 className="text-2xl font-bold text-[#FFD700] font-[Orbitron] mb-4">LA HISTORIA LA ESCRIBEN LOS RENTABLES</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Bienvenidos al santuario de la excelencia. Aquí no celebramos la suerte; honramos la disciplina, la consistencia y la lealtad. Estos nombres han demostrado que el trading es una profesión de élite.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* FOUNDERS */}
                <AnimatedSection className="py-16">
                    <div className="container mx-auto px-4">
                        <h3 className="text-center text-3xl font-bold text-white font-[Orbitron] mb-12 flex items-center justify-center gap-4">
                            <span className="w-12 h-1 bg-[#00E5FF]"></span>
                            LOS FUNDADORES
                            <span className="w-12 h-1 bg-[#00E5FF]"></span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {MENTORS.map((mentor) => (
                                <FounderCard key={mentor.name} mentor={mentor} />
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* THE GRID */}
                <AnimatedSection className="py-16 bg-[#0B1629]">
                    <div className="container mx-auto px-4">
                        
                        {/* Elite */}
                        <div className="mb-16">
                            <div className="flex items-center gap-3 mb-8">
                                <FaCrown className="text-[#FFD700] text-3xl" />
                                <h3 className="text-2xl font-bold text-[#FFD700] font-[Orbitron]">COMERCIANTES DE ÉLITE</h3>
                            </div>
                            <p className="text-gray-400 mb-6 italic">"Estos comerciantes dominaron el mercado. Rentabilidad verificada y disciplina de acero."</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {elites.map((user, i) => <UserCard key={i} user={user} type="gold" />)}
                            </div>
                        </div>

                        {/* Pros */}
                        <div className="mb-16">
                            <div className="flex items-center gap-3 mb-8">
                                <FaUserGraduate className="text-gray-300 text-3xl" />
                                <h3 className="text-2xl font-bold text-gray-200 font-[Orbitron]">ESTUDIANTES PRO</h3>
                            </div>
                            <p className="text-gray-400 mb-6 italic">"El conocimiento aplicado es poder. Alumnos destacados del programa C90."</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {pros.map((user, i) => <UserCard key={i} user={user} type="silver" />)}
                            </div>
                        </div>

                        {/* Affiliates */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <FaHandshake className="text-[#00E5FF] text-3xl" />
                                <h3 className="text-2xl font-bold text-[#00E5FF] font-[Orbitron]">SOCIOS ESTRATÉGICOS</h3>
                            </div>
                            <p className="text-gray-400 mb-6 italic">"Líderes de comunidad que expanden la visión con ética y transparencia."</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {affiliates.map((user, i) => <UserCard key={i} user={user} type="turquoise" />)}
                            </div>
                        </div>

                    </div>
                </AnimatedSection>

                {/* BLACKLIST */}
                <AnimatedSection id="blacklist" className="py-20 bg-black relative overflow-hidden border-t-4 border-red-600">
                    {/* Caution Tape Pattern */}
                    <div className="absolute top-0 left-0 w-full h-8 bg-yellow-400 flex items-center overflow-hidden">
                        <div className="whitespace-nowrap font-bold text-black text-sm uppercase tracking-widest animate-ticker-scroll w-full">
                            CAUTION /// BLACKLIST /// BANNED /// ESTAFADORES /// CAUTION /// BLACKLIST /// BANNED /// ESTAFADORES /// CAUTION /// BLACKLIST /// BANNED /// ESTAFADORES ///
                        </div>
                    </div>

                    <div className="container mx-auto px-4 mt-12 relative z-10">
                        <div className="text-center mb-12">
                            <FiAlertTriangle className="text-red-600 text-6xl mx-auto mb-4 animate-pulse" />
                            <h3 className="text-4xl font-black text-red-600 font-[Orbitron] uppercase tracking-widest" style={{ textShadow: '0 0 10px #FF0000' }}>
                                LISTA NEGRA
                            </h3>
                            <p className="text-red-400 mt-4 text-lg font-mono">"El mercado expulsa a quien no lo respeta. Nosotros también."</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blacklist.map((item, i) => (
                                <div key={i} className="bg-[#1a0505] border border-red-900/50 p-6 rounded relative overflow-hidden grayscale hover:grayscale-0 transition duration-300 group">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 pointer-events-none"></div>
                                    
                                    {/* BANNED STAMP */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600 text-red-600 font-black text-3xl px-4 py-2 transform -rotate-12 opacity-50 group-hover:opacity-100 transition duration-300 z-20 pointer-events-none">
                                        BANNED
                                    </div>

                                    <div className="flex items-center gap-4 mb-4 relative z-10 opacity-50 group-hover:opacity-100">
                                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                                            <FaBan className="text-gray-600 text-3xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-400 font-bold font-mono text-lg">{item.name}</h4>
                                            <p className="text-red-500 text-xs font-bold">{item.date}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 font-mono text-sm relative z-10">Razón: <span className="text-red-400">{item.reason}</span></p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-12 text-center">
                            <p className="text-xs text-gray-600 uppercase tracking-wide">
                                TradeVision Latam mantiene una política de tolerancia cero contra el fraude, el uso de bots ilegales y el marketing engañoso.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default HallOfFamePage;
