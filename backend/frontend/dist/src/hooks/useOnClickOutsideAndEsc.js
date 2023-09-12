import { useEffect } from 'react';
function useOnClickOutsideAndEsc(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (event.type === 'keydown' &&
                event.key === 'Escape') {
                handler(event);
            }
            else if (event.type === 'mousedown' ||
                event.type === 'touchstart') {
                if (!ref.current ||
                    ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            }
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
            document.removeEventListener('keydown', listener);
        };
    }, [handler, ref]);
}
export default useOnClickOutsideAndEsc;
