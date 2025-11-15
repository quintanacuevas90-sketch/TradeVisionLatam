

import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiArrowLeft } from 'react-icons/fi';

const TerminosAcademiaPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Términos de la Academia | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Lea los Términos y Condiciones que rigen el uso de los servicios educativos de TradeVision Latam, incluyendo nuestras reglas de ejecución, propiedad intelectual y políticas de disciplina.");
        }
    }, []);

    const sections = [
        {
            title: "1. Aceptación de los Términos",
            content: "Al acceder o utilizar los servicios, cursos y contenido de <span translate='no'>TradeVision Latam</span> (en adelante, 'La Academia'), usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de los términos, no podrá acceder al servicio."
        },
        {
            title: "2. Política de Uso para Menores de Edad",
            content: `
                <p class="font-bold">1. Prohibición de Uso:</p>
                <p>Los servicios, plataformas de simulación y herramientas educativas de <span translate='no'>TradeVision Latam</span> están destinados exclusivamente a <strong>personas que hayan alcanzado la mayoría de edad (18 años)</strong> en su jurisdicción de residencia.</p>
                <p class="font-bold mt-4">2. Responsabilidad del Usuario:</p>
                <p>Al aceptar estos términos, el usuario declara y garantiza ser mayor de edad. El acceso y uso por parte de un menor de edad, aunque sea con fines educativos, está estrictamente prohibido sin la supervisión y consentimiento explícito y documentado del padre, tutor o representante legal.</p>
                <p class="font-bold mt-4">3. Exención de Responsabilidad:</p>
                <p><span translate='no'>TradeVision Latam</span> no asume ninguna responsabilidad por el uso de la plataforma por parte de menores de edad que hayan falseado su edad. El padre, tutor o representante legal será el único responsable de todas las acciones, resultados y consecuencias derivadas de la participación del menor en las plataformas de educación y simulación de <em>trading</em>.</p>
                <p class="font-bold mt-4">4. Verificación de Identidad (KYC):</p>
                <p>Nos reservamos el derecho de solicitar pruebas de edad y restringir o suspender cuentas que no cumplan con este requisito, en línea con la Directiva de la UE y las normativas de legalidad internacional.</p>
            `
        },
        {
            title: "3. Descripción de los Servicios",
            content: "La Academia proporciona contenido educativo sobre trading y mercados financieros únicamente con fines informativos y de formación. Nuestros servicios no constituyen asesoramiento financiero, de inversión, legal o fiscal. Toda la formación se realiza en un contexto educativo y/o simulado."
        },
        {
            title: "4. Propiedad Intelectual",
            content: "Todo el contenido de La Academia, incluyendo cursos, videos, guías, metodologías (ej. 'Lenguaje del Precio', patrón 'AMD') y software es propiedad intelectual de <span translate='no'>TradeVision Latam</span>. Cualquier copia, distribución o reventa no autorizada está estrictamente prohibida y será sancionada legalmente."
        },
        {
            title: "5. Regla de Ejecución Consistente (Anti-Juego)",
            content: `
                <p class="font-bold">TRADEVISION fomenta el trading disciplinado y sostenible. Está ESTRICTAMENTE PROHIBIDO cualquier comportamiento clasificado como práctica de "Juego" (Gambling) en entornos simulados o reales. Esto incluye:</p>
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li><strong>One Side Betting (Apuesta Unilateral):</strong> Abrir múltiples posiciones consecutivas en una sola dirección del mercado sin un análisis técnico o de gestión de riesgo coherente.</li>
                    <li><strong>Ausencia de Consistencia:</strong> Realizar operaciones esporádicas, o usar el tamaño de lote mínimo solo para cumplir los días mínimos de operativa (evitando los días 'micro-lotes' simbólicos).</li>
                    <li><strong>Martingala y Cobertura (Hedging):</strong> Queda prohibida la estrategia de aumentar el tamaño de las operaciones tras una pérdida, o abrir posiciones contrarias al mismo tiempo, ya que desvirtúa la evaluación del riesgo real.</li>
                </ul>
                <p class="mt-4 font-bold text-red-500">Consecuencia: La violación de estas reglas de ejecución resultará en la anulación de cualquier evaluación y la suspensión del acceso a nuestros programas avanzados, sin derecho a reembolso.</p>
            `
        },
        {
            title: "6. Pagos, Reembolsos y Cancelaciones",
            content: "Debido a la naturaleza digital de nuestros productos y el acceso inmediato al contenido de propiedad intelectual, todas las ventas de cursos y manuales son finales. No se ofrecen reembolsos una vez que se ha concedido el acceso."
        },
        {
            title: "7. Cláusula de Protección de Reputación y Confidencialidad",
            content: "Toda comunicación con <span translate='no'>TradeVision Latam</span> (emails, soporte, contenido de la comunidad) se considera estrictamente confidencial. La Academia se reserva el derecho de proteger su honor, reputación y propiedad intelectual. Cualquier acción de difamación, calumnia o ataque a la imagen pública de la compañía o de sus representantes legales será considerada una violación contractual y puede dar lugar a acciones legales. La creación de contenido negativo y no veraz en redes sociales para forzar reembolsos o acciones similares es una violación material de estos términos."
        },
        {
            title: "8. Limitación de Responsabilidad",
            content: "La Academia no será responsable de ninguna pérdida o daño, directo o indirecto, que surja del uso de nuestro contenido o de las decisiones de trading que usted tome. El trading es una actividad de alto riesgo y usted es el único responsable de sus acciones."
        },
        {
            title: "9. Modificación de los Términos",
            content: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Es su responsabilidad revisar esta página periódicamente para estar al tanto de los cambios."
        }
    ];

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <header className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">Términos de la Academia (T&C)</h1>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Normas que rigen el uso de nuestros servicios y la participación en nuestra comunidad.</p>
                        </header>

                        <article className="prose dark:prose-invert prose-lg max-w-none space-y-8">
                            {sections.map(section => (
                                <section key={section.title}>
                                    <h2 className="text-2xl font-bold text-brand-primary dark:text-white">{section.title}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                                </section>
                            ))}
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

export default TerminosAcademiaPage;