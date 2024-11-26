'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

function Home() {
    const [text, setText] = useState('');
    const [animationStage, setAnimationStage] = useState(0);
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
    }, [text]);

    useEffect(() => {
        if (animationStage === 1) {
            const messageTimers = [
                setTimeout(() => setCurrentMessage(1), 700),
                setTimeout(() => setCurrentMessage(2), 1400),
                setTimeout(() => setAnimationStage(2), 2000)
            ];
            return () => messageTimers.forEach(timer => clearTimeout(timer));
        }
    }, [animationStage]);

    return (
        <div className={styles.container}>
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
            <div className={`${styles.content} ${animationStage >= 2 && styles.showContent}`}>
                <div>Home</div>
            </div>
        </div>
    );
}

export default Home;
