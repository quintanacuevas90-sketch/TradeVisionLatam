import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    expiryTimestamp: number;
}

// Moved outside the component to be a pure helper function and prevent stale closures.
const calculateTimeLeft = (expiryTimestamp: number) => {
    const difference = expiryTimestamp - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
            Minutos: Math.floor((difference / 1000 / 60) % 60),
            Segundos: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiryTimestamp }) => {
    // Use lazy initialization for the state to compute it only once.
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(expiryTimestamp));

    useEffect(() => {
        // Set an interval to update the time left every second.
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(expiryTimestamp));
        }, 1000);

        // Clean up the interval when the component unmounts or the expiryTimestamp changes.
        return () => clearInterval(timer);
    }, [expiryTimestamp]); // The effect depends only on expiryTimestamp.

    const timerComponents: React.ReactNode[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        const value = (timeLeft as any)[interval];
        if (value === undefined) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="text-center p-2">
                <span className="text-3xl font-bold text-brand-accent">{String(value).padStart(2, '0')}</span>
                <span className="block text-sm text-gray-500 uppercase">{interval}</span>
            </div>
        );
    });

    return (
        <div className="flex justify-center gap-4 my-4">
            {timerComponents.length ? timerComponents : <span className="text-xl font-bold text-red-500">¡La oferta ha terminado!</span>}
        </div>
    );
};

export default CountdownTimer;
