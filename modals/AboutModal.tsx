
import React from 'react';
import Modal from './Modal';

const AboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Sobre TradeVision Latam">
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                    TradeVision Latam se fundó con un objetivo claro: crear una academia de trading honesta, transparente y enfocada en resultados realistas.
                </p>
                <p>
                    La visión, arquitectada por nuestro <strong>CEO y Fundador, Javier Solís</strong>, nació del cansancio de la desinformación y los "vendedores de humo" en la industria.
                </p>
                <p>
                    Nuestra comunidad está construida sobre la base de la disciplina, el trabajo duro y el conocimiento real del mercado, principios liderados por <strong>José Quintana, nuestro Asesor Principal y Voz de la Marca para Latinoamérica</strong>.
                </p>
                <p>
                    No prometemos riqueza de la noche a la mañana. Prometemos darte las herramientas, la mentalidad y el apoyo para que te conviertas en un trader autosuficiente y rentable a largo plazo.
                </p>
                <p>
                    Nuestra voz es la de la experiencia, la disciplina y la confianza. Bienvenido a la nueva era del trading en Latinoamérica.
                </p>
            </div>
        </Modal>
    );
};

export default AboutModal;
