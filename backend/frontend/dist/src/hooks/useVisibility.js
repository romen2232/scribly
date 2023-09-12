import { useEffect, useRef, useState } from 'react';
/**
 *
 * @param threshold number or array of numbers between 0 and 1 indicating the percentage of the target's visibility the observer's callback should be executed
 * @param rootMargin margin around the root. Can have values similar to the CSS margin property
 * @returns a ref to the element and a boolean indicating if it's visible
 */
function useVisibility({ threshold, rootMargin } = {
    threshold: 0,
    rootMargin: '0px',
}) {
    const [isVisible, setIsVisible] = useState(true);
    const elementRef = useRef(null);
    useEffect(() => {
        // Check if IntersectionObserver is available in the browser
        // https://caniuse.com/intersectionobserver 95% global support
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver is not available in this browser.');
            return;
        }
        // Create the observer
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, {
            threshold,
            rootMargin,
        });
        // Observe the element
        const currentRef = elementRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        // Cleanup
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, rootMargin]);
    return [elementRef, isVisible];
}
export default useVisibility;
