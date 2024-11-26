import { useEffect } from 'react';

const useKeyboardShortcuts = (handler: (event: KeyboardEvent) => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            handler(event);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handler]);
};

export default useKeyboardShortcuts;