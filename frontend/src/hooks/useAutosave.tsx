// Import the necessary React hooks
import { useRef, useEffect, useState } from 'react';
// Import the useDebounce hook
import useDebounce from './useDebounce';

// Define an interface for the hook's props
export interface IUseAutosaveProps<TData, TReturn> {
    data: TData; // The data to be saved
    onSave: (data: TData) => TReturn | Promise<TReturn> | void; // The function to save the data
    interval?: number; // The interval for saving the data (default is 2000ms)
    saveOnUnmount?: boolean; // Should the data be saved when the component unmounts? (default is true)
}

/**
 * A hook to automatically save data at a given interval
 * @param data The data to be saved and the onSave function
 */
export function useAutosave<TData, TReturn>({
    data,
    onSave,
    interval = 2000,
    saveOnUnmount = true,
}: IUseAutosaveProps<TData, TReturn>) {
    // Reference to keep track of the last data
    const valueOnCleanup = useRef(data);

    // Reference to the saving function
    const handleSave = useRef(onSave);

    // State to track if the hook has been initialized
    const [isInitialized, setInitialized] = useState(false);

    // Debounce the data to avoid unnecessary saves
    const debouncedValueToSave = useDebounce(data, interval);

    // UseEffect to handle the saving of debounced data
    useEffect(() => {
        if (typeof debouncedValueToSave === 'undefined') return;

        if (!isInitialized) {
            setInitialized(true);
            return;
        }

        handleSave.current(debouncedValueToSave);
    }, [debouncedValueToSave]);

    // UseEffect to keep the valueOnCleanup up to date
    useEffect(() => {
        valueOnCleanup.current = data;
    }, [data]);

    // UseEffect to keep the handleSave reference up to date
    useEffect(() => {
        handleSave.current = onSave;
    }, [onSave]);

    // UseEffect to handle the save operation when the component unmounts
    useEffect(() => {
        return () => {
            if (saveOnUnmount) {
                handleSave.current(valueOnCleanup.current);
            }
        };
    }, [saveOnUnmount]);
}
