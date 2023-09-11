import { RefObject, useEffect } from 'react';

function useOnClickOutsideAndEsc(
    ref: RefObject<HTMLElement>,
    handler: (event: MouseEvent | TouchEvent | KeyboardEvent) => void,
) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
            if (
                event.type === 'keydown' &&
                (event as KeyboardEvent).key === 'Escape'
            ) {
                handler(event);
            } else if (
                event.type === 'mousedown' ||
                event.type === 'touchstart'
            ) {
                if (
                    !ref.current ||
                    ref.current.contains(event.target as Node)
                ) {
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
