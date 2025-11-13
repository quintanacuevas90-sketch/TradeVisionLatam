import React from 'react';
import Modal from './Modal';

const LegalModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Información Legal y Advertencia de Riesgo">
            <div className="text-gray-700 dark:text-gray-300 space-y-6 text-sm">
                <h3 className="text-lg font-bold text-brand-primary dark:text-white">
                    ADVERTENCIA FUNDAMENTAL DE RIESGO Y EXENCIÓN DE RESPONSABILIDAD
                </h3>
                <p>
                    El Cliente (usuario de TradeVision) debe revisar cuidadosamente la siguiente lista de riesgos junto con los Términos y Condiciones aplicables, y reconoce y acepta que la Academia TradeVision y sus integrantes están exentos de toda responsabilidad en relación con sus decisiones de inversión.
                </p>

                <div className="space-y-4">
                    <h4 className="text-md font-bold text-brand-primary dark:text-white">
                        1. Alto Riesgo y Pérdida de Capital
                    </h4>
                    <p>
                        El trading en instrumentos financieros como los Contratos por Diferencia ('CFDs') conlleva un <strong>alto nivel de riesgo</strong>. Antes de decidir invertir, debe considerar cuidadosamente sus objetivos de inversión, nivel de experiencia y apetito por el riesgo. Esta actividad es <strong>MUY ESPECULATIVA Y ALTAMENTE RIESGOSA</strong> y puede resultar en la <strong>pérdida de todos sus fondos</strong>.
                    </p>
                    <p className="font-bold">
                        Usted <strong>nunca debe invertir dinero que no pueda permitirse perder</strong>.
                    </p>
                    <p>
                        Estos productos complejos solo son adecuados para inversores que:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 pl-4">
                        <li>Estén dispuestos a asumir los riesgos económicos, legales y de otra índole.</li>
                        <li>Sean capaces de asumir financieramente la <strong>pérdida total de su inversión</strong>.</li>
                        <li>Posean el nivel adecuado de experiencia y conocimiento en los instrumentos específicos.</li>
                    </ol>
                    <p>
                        El trading en los instrumentos ofrecidos puede poner su capital en riesgo, y usted puede perder todo o parte del monto invertido. Usted reconoce y acepta sin reservas que el valor de cualquier inversión puede variar tanto al alza como a la baja, y acepta el <strong>riesgo sustancial de incurrir en pérdidas y daños</strong>.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-md font-bold text-brand-primary dark:text-white">
                        2. Exclusión de Responsabilidad de la Academia y sus Integrantes (No Asesoramiento)
                    </h4>
                    <p>
                        La Academia TradeVision y sus integrantes no proporcionan, ni ofrecen, servicios de consultoría o <strong>asesoramiento de inversión</strong>, fiscal o comercial.
                    </p>
                    <p>
                        Los servicios que ofrece la Plataforma (si proporciona acceso a ejecución de órdenes o información de mercado) se basan en la base de "<strong>solo ejecución</strong>" (<em>execution-only</em>), lo que significa que no se administra la cuenta ni se asesora al Cliente. La provisión de informes, noticias, opiniones o cualquier otra información <strong>no constituye asesoramiento de inversión o investigación de inversiones</strong>.
                    </p>
                    <p>
                        El Cliente acepta que es el <strong>único responsable de las operaciones que realice</strong>. Cualquier decisión de inversión se toma basándose en su <strong>propio juicio</strong> y <strong>discreción</strong>. Debe ser consciente de todos los riesgos asociados con el trading y buscar el asesoramiento de un asesor financiero independiente si tiene alguna duda.
                    </p>
                    <p>
                        La Academia TradeVision y sus integrantes <strong>no serán responsables</strong> por ninguna pérdida de ganancias, ni por ninguna pérdida indirecta o consecuente, independientemente de la causa.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-md font-bold text-brand-primary dark:text-white">
                        3. Disclaimers sobre Contenido Educativo y Señales
                    </h4>
                    <p>
                        Cualquier mención de torneos o contenido educativo que pueda ayudar a mejorar los conocimientos de trading debe ir acompañada de una advertencia clara.
                    </p>
                    <ol className="list-decimal list-inside space-y-3 pl-4">
                        <li>
                            <strong>Señales de Trading:</strong> Si se ofrecen señales, estas se basan en una combinación de métodos de análisis técnico y se proporcionan <strong>únicamente con fines educativos</strong>. No deben considerarse <strong>consejo financiero</strong>. No existe garantía de que las señales resulten en ganancias.
                        </li>
                        <li>
                            <strong>Riesgo de Confianza en la Información:</strong> Los materiales educativos o informativos, incluyendo noticias, comentarios de mercado o cualquier otra información, se proporcionan únicamente para permitirle tomar sus propias decisiones de inversión y <strong>no equivalen a asesoramiento de inversión</strong>. La Academia <strong>no aprueba ni respalda</strong> esta información ni acepta responsabilidad por las pérdidas resultantes de acciones tomadas por usted basándose en dicha información.
                        </li>
                        <li>
                            <strong>Rendimiento Histórico:</strong> La información sobre el rendimiento previo de los instrumentos financieros <strong>no garantiza las mismas circunstancias de su rendimiento actual y/o futuro</strong>.
                        </li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <h4 className="text-md font-bold text-brand-primary dark:text-white">
                        4. Riesgos Técnicos y de Plataforma
                    </h4>
                    <p>
                        Usted asume los riesgos derivados de fallas en su equipo, software y conexión, o errores en la configuración.
                    </p>
                    <p>
                        El uso de cualquier servicio o <em>chatbot</em> de IA para obtener información debe ser complementado con la verificación independiente, ya que la precisión, integridad o actualidad de la información proporcionada por estos medios <strong>no se puede garantizar</strong>. <strong>No comparta datos personales, sensibles y/o confidenciales con los chatbots</strong>.
                    </p>
                    <p>
                        El cliente es <strong>responsable de la seguridad</strong> de sus credenciales y contraseñas y acepta el riesgo de órdenes realizadas por personas no autorizadas.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-md font-bold text-brand-primary dark:text-white">
                        5. Instrumentos Financieros y Apalancamiento
                    </h4>
                    <p>
                        Si se discuten o se negocian CFDs, es fundamental señalar que son productos financieros <strong>apalancados</strong>; el uso del multiplicador (apalancamiento) conlleva un <strong>alto riesgo de pérdida</strong> ya que los movimientos de precios se ven influenciados por el apalancamiento utilizado. El alto grado de apalancamiento puede funcionar tanto a favor como en contra de usted, magnificando tanto las ganancias como las pérdidas.
                    </p>
                </div>

                <div className="space-y-4 p-4 bg-gray-100 dark:bg-white/5 rounded-lg border-l-4 border-brand-accent">
                    <h4 className="text-md font-bold text-brand-primary dark:text-white">
                        Resumen Metáforico de la Exclusión de Responsabilidad
                    </h4>
                    <p className="italic">
                        Imagine que la Academia TradeVision es un simulador de vuelo y sus integrantes son instructores que enseñan teoría y maniobras. Ellos le proporcionan las herramientas y el conocimiento del manual (los materiales educativos y la plataforma). Sin embargo, usted es el piloto que está gestionando su propio avión (su capital) en una tormenta real (el mercado financiero). La Academia le advierte que el vuelo es inherentemente peligroso y, si usted estrella su avión, la responsabilidad es totalmente suya por el manejo del timón y por decidir volar, ya que ellos no están a cargo de la cabina de control en ese momento.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default LegalModal;