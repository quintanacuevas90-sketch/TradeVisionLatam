import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiArrowLeft, FiShield, FiGlobe, FiBriefcase } from 'react-icons/fi';

const TransparenciaLegalPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Transparencia y Legalidad | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Conozca la estructura legal y el compromiso con la transparencia de TradeVision Latam, una consultoría educativa registrada para operar internacionalmente.");
        }
    }, []);

    const InfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-white/10 shadow-md">
            <div className="flex items-start gap-4">
                <div className="text-brand-accent text-3xl flex-shrink-0 mt-1">{icon}</div>
                <div>
                    <h3 className="text-xl font-bold text-brand-primary dark:text-white mb-2">{title}</h3>
                    <div className="text-gray-600 dark:text-gray-300 space-y-2">{children}</div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <header className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">Transparencia y Legalidad</h1>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Nuestro compromiso con una educación de calidad se basa en una estructura corporativa transparente y un marco de cumplimiento legal sólido.
                            </p>
                        </header>

                        <div className="space-y-8">
                            <InfoCard icon={<FiBriefcase />} title="Nuestra Entidad Legal: Una Consultoría Educativa">
                                <p>Es fundamental aclarar que <strong translate="no">TradeVision Latam</strong> opera como una <strong>entidad de consultoría educativa</strong>. No somos un broker, ni una firma de asesoramiento de inversión. Nuestra única misión es proporcionar formación y herramientas para el desarrollo de traders disciplinados.</p>
                                <p>No manejamos, custodiamos ni tenemos acceso al capital de inversión de nuestros clientes. Toda operativa se realiza en plataformas de terceros, bajo la total responsabilidad del usuario.</p>
                            </InfoCard>

                            <InfoCard icon={<FiGlobe />} title="Cumplimiento Internacional">
                                <p>Nuestra estructura legal está registrada para ofrecer servicios de consultoría educativa en varias jurisdicciones clave, lo que garantiza un alto estándar de cumplimiento:</p>
                                <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                                    <li><strong>Canadá, Brasil y Unión Europea (España):</strong> Adherencia a las normativas locales sobre formación profesional y consultoría económica.</li>
                                    <li><strong>Operaciones en LATAM:</strong> Nuestras operaciones se rigen por los principios de transparencia y ética definidos en nuestros Términos de la Academia, aplicando un estándar internacional a toda la región.</li>
                                </ul>
                            </InfoCard>
                            
                            <InfoCard icon={<FiShield />} title="Representación y Responsabilidad Legal">
                                <p>Nuestra entidad legal está representada por el despacho <strong className="text-brand-accent">"Solís & Almeida Global Compliance"</strong>, que gestiona todos los asuntos de cumplimiento normativo y propiedad intelectual en la Unión Europea y Latinoamérica. Esta representación profesional garantiza que la responsabilidad legal recae sobre la estructura corporativa, brindando un marco de seguridad jurídica que protege tanto a La Academia como a nuestros estudiantes.</p>
                            </InfoCard>
                        </div>

                        <div className="text-center mt-16">
                            <button
                                onClick={() => navigate('/')}
                                className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-primary transition-colors duration-300"
                            >
                                <FiArrowLeft /> Volver a la Página Principal
                            </button>
                        </div>
                    </div>
                </AnimatedSection>
            </main>
            <ScrollToTopButton />
            <Footer onOpenModal={onOpenModal} />
        </>
    );
};

export default TransparenciaLegalPage;