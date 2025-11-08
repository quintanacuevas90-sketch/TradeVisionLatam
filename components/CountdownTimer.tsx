import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2024-12-31T23:59:59") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    // Fix: Changed JSX.Element[] to React.ReactNode[] to resolve "Cannot find namespace 'JSX'" error.
    const timerComponents: React.ReactNode[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        const value = (timeLeft as any)[interval];
        if (!value && value !== 0) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="text-center">
                <span className="text-3xl font-bold text-brand-primary">{value}</span>
                <span className="block text-sm text-gray-500 uppercase">{interval}</span>
            </div>
        );
    });

    return (
        <div className="flex justify-center gap-4 my-4">
            {timerComponents.length ? timerComponents : <span>¡La oferta ha terminado!</span>}
        </div>
    );
};

export default CountdownTimer;