import { useEffect } from 'react';
const useKeyboardShortcuts = ({ save, undo, redo }) => {
    useEffect(() => {
        const handleKeyDown = async (e) => {
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
                        }
                        else {
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
