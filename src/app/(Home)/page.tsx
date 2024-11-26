'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Terminal from '@/components/Terminal';

function Home() {
    const [text, setText] = useState('');
    const [animationStage, setAnimationStage] = useState(2);
    const [currentMessage, setCurrentMessage] = useState(0);
    const command = 'ssh nishant@127.0.0.1';
    const messages = ['Authenticating...', 'Access granted..', 'Initializing connection...'];

    useEffect(() => {
        if (text.length < command.length) {
            const timer = setTimeout(() => setText(command.slice(0, text.length + 1)), 100);
            return () => clearTimeout(timer);
        } else if (animationStage === 0) {
            setTimeout(() => setAnimationStage(1), 500);
        }
    }, [text, animationStage]);

    useEffect(() => {
        if (animationStage === 1) {
            const messageTimers = [
                setTimeout(() => setCurrentMessage(1), 700),
                setTimeout(() => setCurrentMessage(2), 1500),
                setTimeout(() => setAnimationStage(2), 2500)
            ];
            return () => messageTimers.forEach(timer => clearTimeout(timer));
        }
    }, [animationStage]);

    return (
        <div className="color-[#d4d4d4] relative flex h-[100vh] w-full items-center justify-center bg-[#181818]">
            <div className={`${styles.terminal} ${animationStage >= 2 && styles.fadeOut}`}>
                <div className={styles.prompt}>
                    <span className={styles.dollarSign}>$ </span>
                    {text}
                </div>
                {animationStage >= 1 && (
                    <div className={styles.authenticationContainer}>
                        <div className={styles.message}>{messages[currentMessage]}</div>
                    </div>
                )}
            </div>
            <div className={`${animationStage >= 2 ? styles.showContent : styles.content}`}>
                <Terminal />
            </div>
        </div>
    );
}

export default Home;
