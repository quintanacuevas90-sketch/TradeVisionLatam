import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiCpu, FiDollarSign, FiBarChart2, FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';
import { FaPaypal, FaBitcoin, FaHandHoldingHeart, FaWhatsapp } from 'react-icons/fa';
import PageBackButton from '../components/PageBackButton';

const SocialImpactPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);
    const [activeTab, setActiveTab] = useState<'services' | 'monetary'>('services');

    useEffect(() => {
        document.title = "Impacto Social | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Nuestra misión va más allá de los mercados. Conoce cómo llevamos educación financiera (IA, Cripto, Economía) a las comunidades que más lo necesitan en Latinoamérica.");
        }
    }, []);

    const impactStats = [
        { icon: <FaHandHoldingHeart size={32} />, label: "5+ AÑOS", description: "De colaboración y esfuerzo sostenido." },
        { icon: <FaHandHoldingHeart size={32} />, label: "120+ ESCUELAS", description: "Alianzas estratégicas con instituciones educativas." },
        { icon: <FaHandHoldingHeart size={32} />, label: "3000+ JÓVENES", description: "Impactados con una nueva visión financiera." },
    ];

    const topics = [
        { icon: <FiCpu size={24} />, title: "Inteligencia Artificial", description: "Cómo usar herramientas de IA para la productividad." },
        { icon: <FaBitcoin size={24} />, title: "Criptomonedas y Economía Digital", description: "Entender USDT, Binance y Wallets como herramientas de gestión." },
        { icon: <FiBarChart2 size={24} />, title: "Fundamentos del Trading", description: "Gestión de riesgo y disciplina, no 'hacerse rico rápido'." },
        { icon: <FiDollarSign size={24} />, title: "Gestión de Recursos", description: "Cómo gestionar un presupuesto personal y familiar con mentalidad profesional." },
    ];

    const serviceCollaborators = [
        { name: "Dra. Isabel Núñez", country: "Barcelona, España", role: "Alumna (Curso Psicotrading) / Médico Pediatra", collaboration: "Apoyo Médico, Psicológico y Pediátrico en talleres comunitarios." },
        { name: "Lic. Miguel Torres", country: "Caracas, Venezuela", role: "Colaborador Profesional (Firma Aliada)", collaboration: "Apoyo Jurídico y asesoría legal pro-bono para la fundación de talleres." },
        { name: "Grupo Tech Bolivia", country: "La Paz, Bolivia", role: "Proveedor de Servicios Aliado", collaboration: "Apoyo de Internet Satelital y Equipos Eléctricos para aulas remotas." },
        { name: "Mariana Ferreira", country: "Río de Janeiro, Brasil", role: "Alumna (Curso Intermedio) / Gerente de Logística", collaboration: "Apoyo en Transporte y Logística de alimentos y equipos de oficina." }
    ];

    const monetaryCollaborators = {
        titanio: [
            { name: "Javier Solís (Fundador)", country: "España", role: "CEO TradeVision" },
            { name: "Lucas Almeida (Fundador)", country: "Brasil", role: "Subdirector TradeVision" }
        ],
        platino: [
            { name: "Alejandro Valero", country: "Madrid, España", role: "Alumno Élite (Curso Forex)" },
            { name: "(Reservado - Colaborador Anónimo)", country: "Filipinas", role: "Trader Profesional" },
            { name: "Sofía Casale", country: "Buenos Aires, Argentina", role: "Alumna (Curso Cripto)" }
        ],
        oro: [
            { name: "José Quintana (Asesor)", country: "Venezuela", role: "Asesor Principal TradeVision" },
            { name: "David Gutiérrez", country: "Bogotá, Colombia", role: "Miembro Comunidad Gratuita" },
            { name: "Amara Srisuk (Asesora)", country: "Tailandia", role: "Asesora TradeVision" }
        ]
    };

    const impactImages = [
        'https://i.pinimg.com/736x/d5/0f/92/d50f92f4005204e8810bf59f9d27e235.jpg',
        'https://i.pinimg.com/736x/e8/9b/26/e89b26c2e7de5f64abeb79b8c64ec0e5.jpg',
        'https://i.pinimg.com/736x/06/76/15/06761526f68e1ad76a8ceb353e3c755f.jpg',
        'https://i.pinimg.com/736x/93/e0/f6/93e0f6c1c40fa937cc9d3055d2b74845.jpg',
        'https://i.pinimg.com/736x/73/24/7a/73247a520e649503f27d5b603bf8575b.jpg',
        'https://i.pinimg.com/736x/ce/0c/23/ce0c23c686f1ac78137de89c4eb9d2b2.jpg',
        'https://i.pinimg.com/736x/99/6b/36/996b368ef12e238228ccdde4eac0d20a.jpg',
        'https://i.pinimg.com/736x/75/3f/d7/753fd7fa4c802871215d1707e1c97ddd.jpg',
        'https://i.pinimg.com/736x/25/52/75/25527538fda4feaa84a57691a8034150.jpg',
        'https://i.pinimg.com/736x/ed/99/d9/ed99d97cb74ad0242177b252c80b2512.jpg',
        'https://i.pinimg.com/736x/cf/2c/dd/cf2cddd0e25b9a419a65c3ea07040241.jpg',
        'https://i.pinimg.com/736x/0d/40/a0/0d40a0c97aa76697a576397cd8febcbd.jpg',
    ];


    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                {/* Hero */}
                <AnimatedSection className="relative bg-gray-900 text-white py-24 sm:py-32">
                    <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop')" }}></div>
                    <div className="absolute inset-0 bg-brand-primary/50"></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="absolute top-8 left-8">
                            <PageBackButton variant="on-dark" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Educación Real. Impacto Real.</h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-200">Nuestra misión va más allá de los mercados. Creemos en llevar la educación financiera (IA, Cripto, Economía) a las comunidades que más lo necesitan en Latinoamérica.</p>
                    </div>
                </AnimatedSection>
                
                {/* Our Commitment */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Nuestra Causa: Disciplina para la Próxima Generación</h2>
                        <div className="mt-6 text-gray-600 dark:text-gray-300 space-y-4">
                            <p className="italic">"En TradeVision Latam, el trading profesional se basa en la disciplina y la gestión de recursos. Estamos convencidos de que esta mentalidad es la herramienta más poderosa para transformar el futuro."</p>
                            <p className="font-bold">- Voz de la Marca/CEO</p>
                            <hr className="my-6 border-gray-200 dark:border-white/10 w-1/4 mx-auto" />
                            <p className="italic">"Por eso, reinvertimos nuestro éxito en talleres comunitarios prácticos. Llevamos conocimiento de alto nivel (IA, Criptomonedas, Economía y Gestión de Recursos) a jóvenes en comunidades desfavorecidas, dándoles una nueva visión sobre la economía y su propia capacidad para gestionarla."</p>
                            <p className="font-bold">- José Quintana, Asesor Principal</p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Impact in Numbers */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Nuestro Impacto (Desde 2018)</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {impactStats.map((stat, index) => (
                                <div key={index} className="bg-white dark:bg-white/5 p-8 rounded-lg text-center shadow-lg">
                                    <div className="text-brand-accent inline-block mb-4">{stat.icon}</div>
                                    <p className="text-4xl font-extrabold text-brand-primary dark:text-white">{stat.label}</p>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">{stat.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* The Work */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Talleres Prácticos y Adaptados a la Realidad Local</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">No dictamos cursos genéricos. Nuestro equipo de profesionales y voluntarios evalúa las necesidades de cada sitio. Enseñamos habilidades prácticas y relevantes para el futuro:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-left">
                            {topics.map(topic => (
                                <div key={topic.title} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                                    <div className="text-brand-accent mt-1">{topic.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-brand-primary dark:text-white">{topic.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{topic.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-gray-600 dark:text-gray-300 font-semibold">Esta labor es fruto del esfuerzo colectivo de nuestros usuarios, traders y profesionales comprometidos con esta causa.</p>
                     </div>
                </AnimatedSection>

                {/* Nothing Stops Us Section */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Nada Nos Detiene</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Seguimos llevando sonrisas y educación a cada rincón.
                        </p>
                        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {impactImages.map((src, index) => (
                                <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-lg group">
                                    <img 
                                        src={src} 
                                        alt={`Impacto social de TradeVision ${index + 1}`} 
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Collaboration */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                        <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Únete a la Causa y Ayúdanos a Seguir Creciendo</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Para seguir llevando educación a los más desfavorecidos, toda colaboración se coordina directamente con nuestro personal autorizado para garantizar la máxima transparencia y seguridad.
                        </p>

                        <div className="mt-8">
                            <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-whatsapp-green text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-green-600 transition duration-300 transform hover:scale-105">
                                <FaWhatsapp size={24} />
                                Contactar a Personal Autorizado para Colaborar
                            </a>
                            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Este es el primer paso obligatorio para cualquier tipo de aporte.</p>
                        </div>
                        
                        <div className="mt-8">
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Aceptamos aportes a través de:</h4>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Volet • PayPal • Binance (USDT) • Zinli • Zelle • Soles (Perú) • Bolívares (Venezuela)
                            </p>
                        </div>

                        <div className="mt-12 text-left max-w-3xl mx-auto p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
                            <div className="flex items-start">
                                <FaHandHoldingHeart className="h-8 w-8 mr-4 text-blue-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-extrabold text-blue-800 dark:text-blue-300">Destino y Transparencia de tu Aporte</h3>
                                    <p className="mt-2 text-blue-700 dark:text-blue-200">
                                        Tu aporte irá a un fondo de resguardo y será utilizado exclusivamente para las obras sociales en cola en zonas centrales de: <strong>Venezuela, Colombia, Chile, Perú, Bolivia, Ecuador y Argentina.</strong>
                                    </p>
                                    <p className="mt-4 text-sm text-blue-700 dark:text-blue-200">
                                        Consulta con nuestro personal qué programas están disponibles y las necesidades actuales. Además de aportes monetarios, también aceptamos:
                                    </p>
                                    <ul className="mt-2 list-disc list-inside text-sm text-blue-700 dark:text-blue-200 space-y-1">
                                        <li>Ropa y calzado en buen estado.</li>
                                        <li>Equipos electrónicos funcionales (laptops, tablets).</li>
                                        <li>Alimentos no perecederos.</li>
                                        <li>Apoyo con transporte y logística.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* Community Hall of Fame */}
                <AnimatedSection className="py-20 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Cuadro de Honor de la Comunidad</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                Esta labor solo es posible gracias al esfuerzo colectivo. Reconocemos a los alumnos, traders profesionales y colaboradores que, junto a nuestros fondos, han apoyado activamente nuestra misión de llevar educación a comunidades desfavorecidas.
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex justify-center border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setActiveTab('services')}
                                className={`px-6 py-3 font-semibold text-sm transition-colors duration-300 ${activeTab === 'services' ? 'border-b-2 border-brand-accent text-brand-accent' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                            >
                                Colaboradores de Servicios y Logística
                            </button>
                            <button
                                onClick={() => setActiveTab('monetary')}
                                className={`px-6 py-3 font-semibold text-sm transition-colors duration-300 ${activeTab === 'monetary' ? 'border-b-2 border-brand-accent text-brand-accent' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                            >
                                Colaboradores de Impacto Monetario
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-8">
                            {activeTab === 'services' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                    {serviceCollaborators.map((collab, index) => (
                                        <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-brand-accent shadow-md">
                                            <h4 className="font-bold text-lg text-brand-primary dark:text-white">{collab.name}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{collab.country}</p>
                                            <p className="text-sm font-semibold text-brand-accent my-2">{collab.role}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{collab.collaboration}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'monetary' && (
                                <div className="text-left space-y-8">
                                    {/* Titanio */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500 border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                                            Nivel Titanio <span className="text-sm font-normal">(Soporte Mayor: 5.000€ - 7.000€)</span>
                                        </h3>
                                        <div className="space-y-3">
                                            {monetaryCollaborators.titanio.map((collab, index) => (
                                                <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-center">
                                                    <p className="font-bold text-brand-primary dark:text-white">{collab.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{collab.country} | Rol: {collab.role}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Platino */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500 border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                                            Nivel Platino <span className="text-sm font-normal">(Soporte Élite: 1.000€ - 4.999€)</span>
                                        </h3>
                                        <div className="space-y-3">
                                            {monetaryCollaborators.platino.map((collab, index) => (
                                                <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-center">
                                                    <p className="font-bold text-brand-primary dark:text-white">{collab.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{collab.country} | Rol: {collab.role}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Oro */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500 border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                                            Nivel Oro <span className="text-sm font-normal">(Soporte Sostenido: 100€ - 999€)</span>
                                        </h3>
                                        <div className="space-y-3">
                                            {monetaryCollaborators.oro.map((collab, index) => (
                                                <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-center">
                                                    <p className="font-bold text-brand-primary dark:text-white">{collab.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{collab.country} | Rol: {collab.role}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">(Y más de 40 colaboradores anónimos de la comunidad...)</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* Verification */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <div className="p-6 bg-red-100 dark:bg-red-900/30 border-t-4 border-red-500 rounded-b-lg shadow-2xl">
                            <div className="flex items-start">
                                <FiAlertTriangle className="h-8 w-8 mr-4 text-red-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-extrabold text-red-800 dark:text-red-300">¡IMPORTANTE! Proceso de Verificación de Donaciones</h3>
                                    <p className="mt-2 text-red-700 dark:text-red-200">Para asegurar que su colaboración sea enviada y recibida correctamente, y para evitar fraudes, siga esta disciplina de seguridad de 2 pasos:</p>
                                    <ol className="mt-4 space-y-3 list-decimal list-inside text-red-700 dark:text-red-200">
                                        <li><strong>PASO 1 (ANTES DE ENVIAR):</strong> Contacte a nuestro <a href="https://wa.me/message/T6UFHN3SSTIEJ1" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-red-500">Soporte Oficial</a> para confirmar la dirección de correo o wallet correcta.</li>
                                        <li><strong>PASO 2 (DESPUÉS DE ENVIAR):</strong> Notifique a Soporte con el comprobante de la transacción para confirmar la recepción.</li>
                                    </ol>
                                    <p className="mt-4 text-sm font-semibold text-red-800 dark:text-red-300">Disclaimer Legal: TradeVision Latam no se hace responsable por fondos enviados a cuentas que no hayan sido verificadas previamente con nuestro equipo de soporte.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
                
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-900">
                    <button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 bg-brand-primary dark:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300">
                        <FiArrowLeft /> Volver a la Página Principal
                    </button>
                </div>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default SocialImpactPage;
