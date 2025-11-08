
import React from 'react';
import Modal from './Modal';
import { BROKERS } from '../constants';

const BrokersModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const brokerTypes = ['Binarias', 'Forex', 'Wallets'];
    return (
        <Modal onClose={onClose} title="Brokers y Herramientas Recomendadas">
            <div className="space-y-6">
                {brokerTypes.map(type => (
                    <div key={type}>
                        <h3 className="text-xl font-bold mb-3 text-brand-primary">{type}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {BROKERS.filter(b => b.type === type).map(broker => (
                                <div key={broker.name} className="flex items-center p-4 border rounded-lg">
                                    {/* Placeholder for logo */}
                                    <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex items-center justify-center font-bold text-gray-500">{broker.name.substring(0, 2)}</div>
                                    <div>
                                        <h4 className="font-bold">{broker.name}</h4>
                                        <p className="text-gray-600 text-sm">{broker.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default BrokersModal;
