import { useState, useEffect } from 'react';

/**
 * Debounce hook
 * This custom hook can be used to debounce any data update in a React component, allowing you to control the rate at which the data changes are propagated.
 * @param data generic data
 * @param interval interval in milliseconds
 * @returns debounced data
 */
function useDebounce<TData>(data: TData, interval: number) {
    //State variable to store the debounced data
    const [liveData, setLiveData] = useState<TData>(data);

    //Debounce logic
    useEffect(() => {
        // Using setTimeout to set up a delay before updating 'liveData'.
        // The provided 'interval' defines the time (in milliseconds) to wait before updating.
        const handler = setTimeout(() => {
            // Update 'liveData' after the delay
            setLiveData(data);
        }, interval);

        // Cleanup function to clear the timeout
        return () => {
            clearTimeout(handler);
        };
    }, [data, interval]);

    // Return the debounced data
    return liveData;
}

export default useDebounce;
