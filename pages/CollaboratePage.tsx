import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FaUserGraduate, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import { FiTrendingUp, FiAlertTriangle, FiHome, FiSend } from 'react-icons/fi';
import CollaborationTermsModal from '../modals/CollaborationTermsModal';

interface CollaboratePageProps {
    onOpenModal: (modal: ModalType) => void;
}

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-white dark:bg-white/5 p-6 rounded-lg border border-gray-200 dark:border-white/10 shadow-md h-full">
        <div className="text-brand-accent text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-brand-primary dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{children}</p>
    </div>
);

const ProfileCard: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border-l-4 border-brand-accent">
        <h3 className="text-2xl font-bold text-brand-primary dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{children}</p>
    </div>
);

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    languages: '',
    position: 'Influencer/Youtuber',
    socialLink: '',
    source: '',
    bio: ''
};

const countries = [
  "Argentina", "Bolivia", "Chile", "Colombia", "Costa Rica", "Cuba",
  "Ecuador", "El Salvador", "España", "Guatemala", "Honduras",
  "México", "Nicaragua", "Panamá", "Paraguay", "Perú",
  "Puerto Rico", "República Dominicana", "Uruguay", "Venezuela",
  "---",
  "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda",
  "Arabia Saudita", "Argelia", "Armenia", "Australia", "Austria", "Azerbaiyán",
  "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín",
  "Bielorrusia", "Birmania", "Botsuana", "Brasil", "Brunéi", "Bulgaria",
  "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún",
  "Canadá", "Catar", "Chad", "China", "Chipre", "Ciudad del Vaticano",
  "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Croacia",
  "Dinamarca", "Dominica", "Egipto", "Emiratos Árabes Unidos", "Eritrea",
  "Eslovaquia", "Eslovenia", "Estados Unidos", "Estonia", "Etiopía",
  "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia",
  "Ghana", "Granada", "Grecia", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial",
  "Guyana", "Haití", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda",
  "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica",
  "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait",
  "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein",
  "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí",
  "Malta", "Marruecos", "Mauricio", "Mauritania", "Micronesia", "Moldavia",
  "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal",
  "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos",
  "Pakistán", "Palaos", "Papúa Nueva Guinea", "Polonia", "Portugal", "Reino Unido",
  "República Centroafricana", "República Checa", "República de Macedonia",
  "República del Congo", "República Democrática del Congo", "Ruanda", "Rumanía",
  "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas",
  "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles",
  "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia",
  "Sudáfrica", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam",
  "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga",
  "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania",
  "Uganda", "Uzbekistán", "Vanuatu", "Vietnam", "Yemen", "Yibuti", "Zambia",
  "Zimbabue"
];

const CollaboratePage: React.FC<CollaboratePageProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData | 'terms', string>>>({});
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showLegalModal, setShowLegalModal] = useState(false);

    useEffect(() => {
        document.title = "Forma Parte de TradeVision | Colabora con Nosotros";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Buscamos líderes, mentores e influencers para una alianza estratégica. Te formamos gratis con nuestras metodologías avanzadas a cambio de tu compromiso ético.");
        }
    }, []);

    const handleOpenLegalModal = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowLegalModal(true);
    };

    const handleCloseLegalModal = () => {
        setShowLegalModal(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof formData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof typeof formData | 'terms', string>> = {};
        const { firstName, lastName, email, phone, country, languages, socialLink, bio } = formData;

        const nameRegex = /^[\p{L}\s'-]+$/u;
    
        if (!firstName.trim()) newErrors.firstName = 'Por favor, introduce tu nombre.';
        else if (!nameRegex.test(firstName)) newErrors.firstName = 'El nombre solo puede contener letras y espacios.';

        if (!lastName.trim()) newErrors.lastName = 'Por favor, introduce tu apellido.';
        else if (!nameRegex.test(lastName)) newErrors.lastName = 'El apellido solo puede contener letras y espacios.';
        
        if (!email.trim()) {
            newErrors.email = 'Necesitamos tu correo electrónico para contactarte.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Por favor, revisa el formato de tu correo (ej. tu@dominio.com).';
        }
        if (!phone.trim()) {
            newErrors.phone = 'Por favor, introduce un número de teléfono.';
        } else if (!/^\+?[0-9\s-()]{7,}$/.test(phone)) {
            newErrors.phone = 'Introduce un número de teléfono válido, incluyendo el código de país.';
        }
        if (!country) newErrors.country = 'Por favor, selecciona tu país de residencia.';

        if (!languages.trim()) newErrors.languages = 'Indica los idiomas que dominas.';
        else if (!/^[\p{L}\s',-]+$/u.test(languages)) newErrors.languages = 'Los idiomas solo pueden contener letras, comas y espacios.';

        if (!socialLink.trim()) {
            newErrors.socialLink = 'El enlace a tu red social principal es necesario.';
        } else {
            try {
                const url = new URL(socialLink);
                if (!['http:', 'https:'].includes(url.protocol)) {
                     throw new Error('Invalid protocol');
                }
            } catch (_) {
                newErrors.socialLink = "El enlace no es una URL válida. Asegúrate de que empiece con 'https://' o 'http://'.";
            }
        }
        if (!bio.trim()) {
            newErrors.bio = 'Cuéntanos un poco sobre ti y tu visión.';
        } else if (bio.trim().length < 50) {
            newErrors.bio = `Tu biografía es muy corta. Por favor, proporciona más detalles (mínimo 50 caracteres, actual: ${bio.trim().length}).`;
        }

        if (!termsAccepted) {
            newErrors.terms = 'Debes aceptar los términos y condiciones para continuar.';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setFormStatus('submitting');
        const { firstName, lastName, email, phone, country, languages, position, socialLink, source, bio } = formData;
        
        const subject = `Nueva Aplicación de Colaboración: ${position} - ${firstName} ${lastName}`;
        const body = `
            Nueva aplicación recibida desde la página "Forma Parte de TradeVision":
            --------------------------------------------------
            Nombre: ${firstName} ${lastName}
            Correo Electrónico: ${email}
            Teléfono (WhatsApp): ${phone}
            País de Residencia: ${country}
            Idiomas: ${languages}
            Posición de Interés: ${position}
            Red Social Principal: ${socialLink}
            Cómo nos conoció: ${source}
            --------------------------------------------------
            Biografía y Visión:
            ${bio}
            --------------------------------------------------
        `;

        window.location.href = `mailto:tradevision2026@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        setTimeout(() => {
            setFormStatus('success');
            setShowSuccessModal(true);
        }, 1000);
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        setFormData(initialFormData);
        setErrors({});
        setTermsAccepted(false);
        setFormStatus('idle');
    };

    const inputClasses = (field: keyof typeof formData) => 
        `w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border ${errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-2 focus:ring-brand-accent focus:outline-none transition-colors`;


    return (
        <>
            <Header onOpenModal={onOpenModal} />
            
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
                    <AnimatedSection className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
                        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-brand-primary dark:text-white">¡Postulación Recibida!</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Gracias por tu interés en unirte a TradeVision Latam. Hemos recibido tu postulación.
                        </p>
                        <div className="mt-4 text-left bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="font-bold text-brand-primary dark:text-white">Próximos Pasos:</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Nuestro equipo de operaciones revisará tu perfil. Si tu experiencia y visión se alinean con nuestra misión, nos pondremos en contacto contigo para coordinar una entrevista.
                            </p>
                        </div>
                        <button 
                            onClick={handleCloseSuccessModal}
                            className="mt-6 bg-brand-accent text-brand-primary font-bold py-2 px-8 rounded-lg"
                        >
                            Entendido
                        </button>
                    </AnimatedSection>
                </div>
            )}
            
            {showLegalModal && <CollaborationTermsModal onClose={handleCloseLegalModal} />}

            <main className="pt-20">
                {/* Hero */}
                <AnimatedSection className="relative bg-brand-primary text-white py-24 sm:py-32">
                    <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/80 to-brand-primary"></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Impulsa la Próxima Generación de Traders</h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">Buscamos líderes, mentores e influencers comprometidos con el trading ético y la disciplina. Esta no es una oferta de empleo; es una alianza estratégica para dominar el mercado latino.</p>
                    </div>
                </AnimatedSection>

                {/* The Offer */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Crece, Innova y Triunfa con TradeVision</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Si tienes una comunidad (YouTube, Telegram, TikTok) o la pasión por enseñar, te proporcionamos las herramientas para crecer profesionalmente.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <BenefitCard icon={<FaUserGraduate />} title="Te Formamos Gratis.">Si cumples los requisitos y demuestras compromiso, te formamos gratis con nuestras metodologías avanzadas (Lógica Institucional, Psicotrading) bajo la supervisión directa de nuestros Mentores Globales (Amara Srisuk, José Quintana).</BenefitCard>
                            <BenefitCard icon={<FiTrendingUp />} title="Recompensas Reales.">Accede a nuestro programa de partnership (RevShare/CPA) y obtén las comisiones más competitivas del mercado, respaldadas por nuestra transparencia total. (Ref: Modal de Afiliados).</BenefitCard>
                            <BenefitCard icon={<FaShieldAlt />} title="Respaldo Profesional.">Te damos el branding (Azul/Turquesa), el soporte técnico (Bots/Scripts) y la autoridad de la marca José Quintana para impulsar tu crecimiento y credibilidad.</BenefitCard>
                            <BenefitCard icon={<FiAlertTriangle />} title="Crecimiento Ético.">Solo colaboramos con líderes que comparten nuestra ética. No aceptamos 'vendedores de humo'. Exigimos transparencia y la Advertencia de Riesgo como pilar fundamental.</BenefitCard>
                        </div>
                    </div>
                </AnimatedSection>
                
                {/* Opportunities */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">Oportunidades de Colaboración</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Buscamos jóvenes dispuestos a ser mentores y líderes con comunidades establecidas.</p>
                        </div>
                        <div className="space-y-8">
                            <ProfileCard title="Influencers y Youtubers (Líderes de Opinión)">Si ya tienes una audiencia (TikTok, YouTube, Instagram) y quieres monetizarla de forma ética y profesional, te damos la estructura, el compliance legal (Manual de Afiliados) y la autoridad de la marca.</ProfileCard>
                            <ProfileCard title="Gestores de Comunidad (Líderes de Telegram/Discord)">Si manejas grupos de trading y buscas dar el salto a una marca profesional, te damos el respaldo, el contenido de valor y la infraestructura tecnológica para escalar.</ProfileCard>
                            <ProfileCard title="Nuevos Mentores (Jóvenes Talentos)">Si eres un trader rentable, disciplinado y tienes pasión por enseñar pero te falta la plataforma, te formamos gratis para convertirte en un Asesor oficial de TradeVision Latam.</ProfileCard>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Application Form */}
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-brand-primary dark:text-white">¡Conectemos!</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Completa el siguiente formulario (en español) y nuestro equipo de operaciones (liderado por Lucas Almeida) revisará tu perfil. Si cumples los requisitos, te contactaremos para una consulta.</p>
                        </div>
                        <form onSubmit={handleSubmit} noValidate className="bg-white dark:bg-gray-900/50 p-8 rounded-lg shadow-xl space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <input type="text" name="firstName" placeholder="Nombre" onChange={handleChange} value={formData.firstName} required className={inputClasses('firstName')} aria-invalid={!!errors.firstName} aria-describedby="firstName-error" />
                                    {errors.firstName && <p id="firstName-error" className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <input type="text" name="lastName" placeholder="Apellido" onChange={handleChange} value={formData.lastName} required className={inputClasses('lastName')} aria-invalid={!!errors.lastName} aria-describedby="lastName-error" />
                                    {errors.lastName && <p id="lastName-error" className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} value={formData.email} required className={inputClasses('email')} aria-invalid={!!errors.email} aria-describedby="email-error" />
                                    {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <input type="tel" name="phone" placeholder="Número de teléfono (WhatsApp)" onChange={handleChange} value={formData.phone} required className={inputClasses('phone')} aria-invalid={!!errors.phone} aria-describedby="phone-error" />
                                    {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <select
                                        name="country"
                                        onChange={handleChange}
                                        value={formData.country}
                                        required
                                        className={inputClasses('country')}
                                        aria-invalid={!!errors.country}
                                        aria-describedby="country-error"
                                    >
                                        <option value="" disabled>Selecciona tu país...</option>
                                        {countries.map(c =>
                                            c === "---"
                                            ? <option key="divider" disabled>──────────</option>
                                            : <option key={c} value={c}>{c}</option>
                                        )}
                                    </select>
                                    {errors.country && <p id="country-error" className="text-red-500 text-sm mt-1">{errors.country}</p>}
                                </div>
                                <div>
                                    <input type="text" name="languages" placeholder="Idiomas que hablas" onChange={handleChange} value={formData.languages} required className={inputClasses('languages')} aria-invalid={!!errors.languages} aria-describedby="languages-error" />
                                    {errors.languages && <p id="languages-error" className="text-red-500 text-sm mt-1">{errors.languages}</p>}
                                </div>
                            </div>
                            <div>
                                <select name="position" onChange={handleChange} value={formData.position} required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-brand-accent focus:outline-none">
                                    <option>Influencer/Youtuber</option>
                                    <option>Gestor de Comunidad</option>
                                    <option>Nuevo Mentor</option>
                                </select>
                            </div>
                            <div>
                                <input type="url" name="socialLink" placeholder="Enlace a tu Red Social Principal (TikTok, YouTube, etc.)" onChange={handleChange} value={formData.socialLink} required className={inputClasses('socialLink')} aria-invalid={!!errors.socialLink} aria-describedby="socialLink-error" />
                                {errors.socialLink && <p id="socialLink-error" className="text-red-500 text-sm mt-1">{errors.socialLink}</p>}
                            </div>
                             <div>
                                <input type="text" name="source" placeholder="¿Cómo supiste de TradeVision Latam?" onChange={handleChange} value={formData.source} className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-brand-accent focus:outline-none"/>
                            </div>
                            <div>
                                <textarea name="bio" placeholder="Cuéntanos sobre ti y tu comunidad (Biografía breve / Visión)" rows={4} onChange={handleChange} value={formData.bio} required className={inputClasses('bio')} aria-invalid={!!errors.bio} aria-describedby="bio-error"></textarea>
                                {errors.bio && <p id="bio-error" className="text-red-500 text-sm mt-1">{errors.bio}</p>}
                            </div>

                            <div>
                                <div className="flex items-start">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => {
                                            setTermsAccepted(e.target.checked);
                                            if (errors.terms) setErrors(prev => ({...prev, terms: undefined}));
                                        }}
                                        required
                                        className="h-4 w-4 text-brand-accent focus:ring-brand-accent border-gray-300 rounded mt-1"
                                        aria-describedby="terms-error"
                                    />
                                    <label htmlFor="terms" className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                                        He leído y acepto los{' '}
                                        <button type="button" onClick={handleOpenLegalModal} className="text-brand-accent hover:underline font-semibold">
                                            Términos y Condiciones de Colaboración
                                        </button>
                                        {' '}de TradeVision Latam.
                                    </label>
                                </div>
                                {errors.terms && <p id="terms-error" className="text-red-500 text-sm mt-1">{errors.terms}</p>}
                            </div>

                            <div className="text-center">
                                {formStatus !== 'success' && (
                                    <button type="submit" disabled={formStatus === 'submitting' || !termsAccepted} className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <FiSend /> {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Aplicación'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </AnimatedSection>

                {/* Alternative CTA */}
                <AnimatedSection className="py-20 bg-white dark:bg-brand-primary">
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
                        <h3 className="text-2xl font-bold text-brand-primary dark:text-white">¿Ya eres un Mentor Establecido?</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Si ya operas a nivel profesional y buscas una alianza de alto nivel (Branding, Diseño Web, Estrategia Legal), tenemos un servicio de consultoría élite.</p>
                        <button onClick={() => navigate('/consultancy')} className="mt-6 bg-transparent border-2 border-brand-accent text-brand-accent font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition duration-300">
                            Ver Consultoría para Mentores
                        </button>
                     </div>
                </AnimatedSection>
                
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800">
                    <button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 bg-brand-primary dark:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300">
                        <FiHome /> Volver a la Página Principal
                    </button>
                </div>
            </main>
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default CollaboratePage;