import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiArrowLeft } from 'react-icons/fi';

const AvisoLegalRiesgoPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Aviso Legal y Advertencia de Riesgo | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Documento completo sobre la advertencia de riesgo, exención de responsabilidad y términos de uso de los servicios educativos de TradeVision Latam.");
        }
    }, []);

    const legalContent = {
        mainTitle: "AVISO LEGAL Y ADVERTENCIA FUNDAMENTAL DE RIESGO",
        preamble: "El Cliente (usuario de TradeVision) debe revisar cuidadosamente la siguiente lista de riesgos junto con los Términos y Condiciones aplicables, y reconoce y acepta que La Academia TradeVision y sus integrantes están exentos de toda responsabilidad en relación con sus decisiones de inversión. Toda la formación se proporciona en un entorno educativo y/o simulado.",
        sections: [
            {
                title: "1. Advertencia de Alto Riesgo de Inversión (Estándar CFTC)",
                content: [
                    "El trading en instrumentos financieros como los Contratos por Diferencia ('CFDs'), Opciones Binarias y Criptomonedas conlleva un <strong>alto nivel de riesgo</strong>. Antes de decidir invertir, debe considerar cuidadosamente sus objetivos de inversión, nivel de experiencia y apetito por el riesgo. Esta actividad es <strong>MUY ESPECULATIVA Y ALTAMENTE RIESGOSA</strong> y puede resultar en la <strong>pérdida de todos sus fondos</strong>.",
                    "Usted <strong>nunca debe invertir dinero que no pueda permitirse perder</strong>.",
                    "Estos productos complejos solo son adecuados para inversores que:",
                    "<ol class='list-decimal list-inside space-y-1 pl-4'><li>Estén dispuestos a asumir los riesgos económicos, legales y de otra índole.</li><li>Sean capaces de asumir financieramente la <strong>pérdida total de su inversión</strong>.</li><li>Posean el nivel adecuado de experiencia y conocimiento en los instrumentos específicos.</li></ol>",
                    "El trading en los instrumentos ofrecidos puede poner su capital en riesgo. Usted reconoce y acepta sin reservas que el valor de cualquier inversión puede variar tanto al alza como a la baja, y acepta el <strong>riesgo sustancial de incurrir en pérdidas y daños</strong>."
                ]
            },
            {
                title: "2. Exclusión de Responsabilidad (No Asesoramiento Financiero)",
                content: [
                    "La Academia TradeVision y sus integrantes no proporcionan, ni ofrecen, servicios de consultoría o <strong>asesoramiento de inversión</strong>, fiscal o comercial. Somos una entidad de formación educativa.",
                    "Nuestros servicios se basan en la base de \"<strong>solo educación y/o simulación</strong>\", lo que significa que no se administra la cuenta ni se asesora al Cliente. La provisión de informes, noticias, opiniones o cualquier otra información <strong>no constituye asesoramiento de inversión o investigación de inversiones</strong>.",
                    "El Cliente acepta que es el <strong>único responsable de las operaciones que realice</strong> en plataformas de terceros. Cualquier decisión de inversión se toma basándose en su <strong>propio juicio</strong> y <strong>discreción</strong>. Debe ser consciente de todos los riesgos asociados con el trading y buscar el asesoramiento de un asesor financiero independiente si tiene alguna duda.",
                    "La Academia TradeVision y sus integrantes <strong>no serán responsables</strong> por ninguna pérdida de ganancias, ni por ninguna pérdida indirecta o consecuente."
                ]
            },
            {
                title: "3. Naturaleza del Contenido Educativo y Señales",
                content: [
                    "Todo el contenido educativo, incluyendo cualquier 'señal' o idea de trading que se comparta, se proporciona con la advertencia explícita de que no constituye asesoramiento financiero.",
                    "<ol class='list-decimal list-inside space-y-3 pl-4'><li><strong>Señales o Ideas de Trading:</strong> Si se ofrecen, se basan en análisis técnico y se proporcionan <strong>únicamente con fines educativos y en entornos simulados</strong>. No deben considerarse <strong>consejo financiero</strong>. No existe garantía de que resulten en ganancias.</li><li><strong>Riesgo de Confianza en la Información:</strong> Los materiales educativos o informativos se proporcionan únicamente para permitirle tomar sus propias decisiones de inversión y <strong>no equivalen a asesoramiento</strong>. La Academia <strong>no aprueba ni respalda</strong> esta información ni acepta responsabilidad por las pérdidas resultantes de acciones tomadas por usted basándose en dicha información.</li><li><strong>Rendimiento Histórico:</strong> La información sobre el rendimiento previo <strong>no garantiza su rendimiento actual y/o futuro</strong>.</li></ol>"
                ]
            },
            {
                title: "4. Riesgos Técnicos y de Plataformas de Terceros",
                content: [
                    "Usted asume los riesgos derivados de fallas en su equipo, software y conexión. El uso de cualquier servicio o <em>chatbot</em> de IA debe ser complementado con verificación independiente. <strong>No comparta datos sensibles con los chatbots</strong>.",
                    "El cliente es <strong>responsable de la seguridad</strong> de sus credenciales y contraseñas en plataformas de terceros y acepta el riesgo de órdenes realizadas por personas no autorizadas."
                ]
            },
        ],
        summary: {
            title: "Resumen Metáforico de la Exclusión de Responsabilidad",
            content: "Imagine que la Academia TradeVision es un simulador de vuelo y sus integrantes son instructores. Le proporcionamos el manual y las herramientas para practicar en el simulador. Sin embargo, usted es el piloto que gestiona su propio avión (su capital) en una tormenta real (el mercado financiero). La Academia le advierte que el vuelo es inherentemente peligroso y, si usted estrella su avión, la responsabilidad es totalmente suya, ya que nosotros no estamos en la cabina de control."
        }
    };
    
    // Function to handle the `translate="no"` for the brand name
    const renderContent = (htmlString: string) => {
        const parts = htmlString.split('TradeVision');
        return (
            <div dangerouslySetInnerHTML={{
                __html: parts.join('<span translate="no">TradeVision</span>')
            }} />
        );
    };


    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <header className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">Aviso Legal y Advertencia de Riesgo</h1>
                        </header>

                        <article className="prose dark:prose-invert prose-lg max-w-none prose-h2:text-brand-primary dark:prose-h2:text-white prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-2 prose-h3:text-brand-primary dark:prose-h3:text-white prose-a:text-brand-accent hover:prose-a:underline">
                            <h2 className="text-2xl font-bold">{legalContent.mainTitle}</h2>
                            <p>{renderContent(legalContent.preamble)}</p>

                            {legalContent.sections.map((section, index) => (
                                <section key={index} className="mt-8">
                                    <h3 className="text-xl font-bold">{section.title}</h3>
                                    <div className="space-y-4">
                                        {section.content.map((p, pIndex) => (
                                            <div key={pIndex}>{renderContent(p)}</div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                            
                            <section className="mt-12 p-6 bg-gray-100 dark:bg-white/5 rounded-lg border-l-4 border-brand-accent">
                                <h3 className="text-xl font-bold">{legalContent.summary.title}</h3>
                                <p className="italic">{renderContent(legalContent.summary.content)}</p>
                            </section>
                        </article>
                        
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

export default AvisoLegalRiesgoPage;