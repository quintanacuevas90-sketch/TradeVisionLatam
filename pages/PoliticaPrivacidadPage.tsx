import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { ModalType } from '../types';
import { useRouter } from '../hooks/useRouter';
import { FiArrowLeft } from 'react-icons/fi';

const PoliticaPrivacidadPage: React.FC = () => {
    const { navigate } = useRouter();
    const onOpenModal = (modal: ModalType) => navigate(`/?open=${modal}`);

    useEffect(() => {
        document.title = "Política de Privacidad | TradeVision Latam";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Conozca cómo TradeVision Latam recopila, utiliza y protege su información personal. Detallamos sus derechos y nuestro compromiso con la privacidad de sus datos.");
        }
    }, []);

    const sections = [
        {
            title: "1. Introducción",
            content: "Bienvenido a la Política de Privacidad de <span translate='no'>TradeVision Latam</span>. Su privacidad es de suma importancia para nosotros. Este documento describe qué datos personales recopilamos, cómo los usamos, y sus derechos en relación con sus datos."
        },
        {
            title: "2. Información que Recopilamos",
            content: `
                <ul class="list-disc list-inside space-y-2">
                    <li><strong>Datos de Identificación:</strong> Nombre, apellido y dirección de correo electrónico cuando se registra en nuestros cursos o se suscribe a nuestro boletín.</li>
                    <li><strong>Datos de Contacto:</strong> Número de teléfono si nos contacta a través de WhatsApp para soporte.</li>
                    <li><strong>Datos de Uso:</strong> Información sobre cómo utiliza nuestro sitio web (páginas visitadas, tiempo en el sitio) recopilada a través de cookies y tecnologías similares. No recopilamos datos personales sensibles.</li>
                </ul>
            `
        },
        {
            title: "3. Cómo Utilizamos su Información",
            content: `
                <ul class="list-disc list-inside space-y-2">
                    <li>Para proporcionar y mantener nuestros servicios educativos.</li>
                    <li>Para comunicarnos con usted, incluyendo notificaciones sobre cursos, soporte y marketing (siempre con su consentimiento).</li>
                    <li>Para mejorar y personalizar su experiencia en nuestro sitio web.</li>
                    <li>Para cumplir con nuestras obligaciones legales y proteger la seguridad de nuestra comunidad.</li>
                </ul>
            `
        },
        {
            title: "4. Intercambio y Divulgación de Datos",
            content: "No vendemos, alquilamos ni intercambiamos su información personal con terceros para fines de marketing. Podemos compartir datos con proveedores de servicios que nos ayudan a operar (ej. plataformas de correo electrónico, análisis web), siempre bajo estrictos acuerdos de confidencialidad."
        },
        {
            title: "5. Seguridad de los Datos",
            content: "Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra el acceso no autorizado, la alteración, la divulgación o la destrucción."
        },
        {
            title: "6. Sus Derechos de Privacidad",
            content: `
                Usted tiene derecho a:
                <ul class="list-disc list-inside space-y-2 mt-2">
                    <li><strong>Acceder:</strong> Solicitar una copia de los datos personales que tenemos sobre usted.</li>
                    <li><strong>Rectificar:</strong> Solicitar la corrección de datos inexactos.</li>
                    <li><strong>Eliminar:</strong> Solicitar la eliminación de sus datos personales ("derecho al olvido").</li>
                    <li><strong>Oponerse:</strong> Oponerse al procesamiento de sus datos para fines de marketing directo.</li>
                </ul>
            `,
            footer: (
                <p>
                    Para ejercer estos derechos, contáctenos en{' '}
                    <button onClick={() => window.open('mailto:tradevision2026@gmail.com')} className="text-brand-accent hover:underline">
                        tradevision2026@gmail.com
                    </button>.
                </p>
            )
        },
        {
            title: "7. Política de Eliminación de Cuentas",
            content: "Si solicita la eliminación de su cuenta, procederemos a eliminar de forma permanente todos sus datos personales de nuestros sistemas activos en un plazo de 30 días, excepto cuando la ley exija su conservación (ej. registros de facturación)."
        },
        {
            title: "8. Cláusula de Protección de la Reputación",
            content: "Toda comunicación con <span translate='no'>TradeVision Latam</span> (correos electrónicos, mensajes de soporte, etc.) es confidencial. La Academia se reserva el derecho de proteger su honor y reputación. Cualquier acto de difamación o calumnia contra la compañía o sus representantes legales puede ser considerado una violación de nuestros términos y dar lugar a acciones legales."
        },
        {
            title: "9. Cambios a esta Política",
            content: "Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta página y, si es significativo, se lo notificaremos por correo electrónico."
        }
    ];

    return (
        <>
            <Header onOpenModal={onOpenModal} />
            <main className="pt-20">
                <AnimatedSection className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <header className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-white">Política de Privacidad</h1>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Última actualización: 1 de Agosto de 2024</p>
                        </header>

                        <article className="prose dark:prose-invert prose-lg max-w-none space-y-8">
                            {sections.map(section => (
                                <section key={section.title}>
                                    <h2 className="text-2xl font-bold text-brand-primary dark:text-white">{section.title}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                                    {/* @ts-ignore */}
                                    {section.footer && <div className="not-prose mt-4 text-lg">{section.footer}</div>}
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

export default PoliticaPrivacidadPage;