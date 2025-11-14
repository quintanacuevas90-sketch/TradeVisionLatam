
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiArrowLeft, FiShield, FiGlobe, FiBriefcase } from 'react-icons/fi';

interface LegalVerificationPageProps {
    onOpenModal: (modal: ModalType) => void;
}

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


const LegalVerificationPage: React.FC<LegalVerificationPageProps> = ({ onOpenModal }) => {
    const { navigate } = useRouter();

    useEffect(() => {
        document.title = "Verificación Legal y Alcance Global | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Conozca la estructura legal y el alcance operativo de TradeVision como entidad de consultoría educativa registrada en Canadá, Brasil y la Unión Europea (España).");
        }
    }, []);

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <header className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">Verificación Legal y Alcance Global</h1>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Nuestro compromiso con la excelencia educativa se fundamenta en una estructura profesional que opera con transparencia y bajo un marco de cumplimiento internacional.
                            </p>
                        </header>

                        <div className="space-y-8">
                            <InfoCard icon={<FiShield />} title="Estructura Legal y Registro">
                                <p>La estructura educativa y de consultoría de TRADEVISION Latam está debidamente registrada y opera en conformidad con las normativas de <strong>Consultoría Educativa y Económica</strong> aplicables en jurisdicciones clave.</p>
                                <p>Esto nos permite ofrecer nuestros servicios de formación y consultoría con pleno respaldo legal, garantizando a nuestros alumnos y socios un entorno profesional y seguro.</p>
                            </InfoCard>

                             <InfoCard icon={<FiGlobe />} title="Alcance Operativo Internacional">
                                <p>Nuestra capacidad operativa se extiende a tres de los mercados más importantes a nivel global, asegurando un alcance y una perspectiva multicultural en nuestra formación:</p>
                                <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                                    <li><strong>Canadá:</strong> Cumpliendo con los estándares de consultoría educativa del mercado norteamericano.</li>
                                    <li><strong>Brasil:</strong> Operando en línea con las regulaciones del mayor mercado de Latinoamérica.</li>
                                    <li><strong>Unión Europea (España):</strong> Adhiriéndonos a las directrices de formación y consultoría económica del marco europeo.</li>
                                </ul>
                            </InfoCard>
                            
                             <InfoCard icon={<FiBriefcase />} title="Enfoque y Respaldo Profesional">
                                 <p className="font-bold text-brand-accent">"Décadas de Experiencia Educativa Respaldan Nuestra Metodología"</p>
                                 <p>Nuestra autoridad no se basa en afirmaciones vacías, sino en años de experiencia consolidada en el sector de la formación económica y financiera. Contamos con el respaldo y la acreditación de entidades de consultoría educativa reconocidas, lo que valida la calidad y la seriedad de nuestros programas.</p>
                                 <p>Nuestro enfoque se centra exclusivamente en la <strong>Formación, Educación y Consultoría Económica</strong>. No somos un ente regulador financiero ni ofrecemos asesoramiento de inversión. Nuestra misión es empoderar a los traders a través del conocimiento y la disciplina.</p>
                            </InfoCard>

                            <div className="text-center pt-8 border-t border-gray-200 dark:border-white/10">
                                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Para una total transparencia, le invitamos a revisar nuestros documentos legales completos.</p>
                                <button
                                    onClick={() => onOpenModal('legal')}
                                    className="text-brand-accent font-semibold hover:underline"
                                >
                                    Ver Advertencia de Riesgo y Términos Legales
                                </button>
                            </div>
                        </div>

                        <div className="text-center mt-12">
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
            <Footer onOpenModal={onOpenModal} />
            <ScrollToTopButton />
        </>
    );
};

export default LegalVerificationPage;
