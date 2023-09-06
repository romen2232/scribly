import { useEffect, useRef, useState } from 'react';

type UseVisibilityOptions = {
    threshold?: number | number[];
    rootMargin?: string;
};

/**
 *
 * @param threshold number or array of numbers between 0 and 1 indicating the percentage of the target's visibility the observer's callback should be executed
 * @param rootMargin margin around the root. Can have values similar to the CSS margin property
 * @returns a ref to the element and a boolean indicating if it's visible
 */
function useVisibility<T extends HTMLElement>(
    { threshold, rootMargin }: UseVisibilityOptions = {
        threshold: 0,
        rootMargin: '0px',
    },
): [React.RefObject<T>, boolean] {
    const [isVisible, setIsVisible] = useState(true);
    const elementRef = useRef<T>(null);

    useEffect(() => {
        // Check if IntersectionObserver is available in the browser
        // https://caniuse.com/intersectionobserver 95% global support
        if (!('IntersectionObserver' in window)) {
            console.warn(
                'IntersectionObserver is not available in this browser.',
            );
            return;
        }

        // Create the observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold,
                rootMargin,
            },
        );

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
