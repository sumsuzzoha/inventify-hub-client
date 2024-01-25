import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date('2024-02-31T23:59:59'); // Change this to your offer's end date
        const now = new Date();

        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            return { days, hours, minutes, seconds };
        } else {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='mt-4'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="container mx-auto text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gray-800 text-white p-8 rounded-lg shadow-lg mb-8"
                >
                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">Limited-Time Offer!</h2>
                    <p className="text-lg mb-4">
                        Do not miss out on our exclusive limited-time offer! Act now before it expires.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                        <div className="countdown-item">
                            <span className="text-3xl font-bold">{timeLeft.days}</span>
                            <span className="text-sm">days</span>
                        </div>
                        <div className="countdown-item">
                            <span className="text-3xl font-bold">{timeLeft.hours}</span>
                            <span className="text-sm">hours</span>
                        </div>
                        <div className="countdown-item">
                            <span className="text-3xl font-bold">{timeLeft.minutes}</span>
                            <span className="text-sm">minutes</span>
                        </div>
                        <div className="countdown-item">
                            <span className="text-3xl font-bold">{timeLeft.seconds}</span>
                            <span className="text-sm">seconds</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CountdownTimer;