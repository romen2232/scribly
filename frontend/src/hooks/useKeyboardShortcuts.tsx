import { useEffect } from 'react';

type ShortcutHandler = () => void;

interface ShortcutMap {
    save?: ShortcutHandler;
    undo?: ShortcutHandler;
    redo?: ShortcutHandler;
}

const useKeyboardShortcuts = ({ save, undo, redo }: ShortcutMap) => {
    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault();
                        save && save();
                        break;
                    case 'z':
                        if (e.shiftKey) {
                            e.preventDefault();
                            redo && redo();
                        } else {
                            e.preventDefault();
                            undo && undo();
                        }
                        break;
                    case 'y':
                        e.preventDefault();
                        redo && redo();
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [save, undo, redo]);
};

export default useKeyboardShortcuts;
