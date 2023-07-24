// Import necessary testing utilities
import { renderHook } from '@testing-library/react-hooks';
import { RefObject } from 'react';
import useOnClickOutsideAndEsc from '../../hooks/useOnClickOutsideAndEsc';

// Set up Jest fake timers to control time-related behavior
jest.useFakeTimers();

// Test suite for the 'useOnClickOutsideAndEsc' custom hook
describe('useOnClickOutsideAndEsc', () => {
    // Test case: Check if the handler is called on mousedown outside the element
    it('calls the handler on mousedown outside the element', () => {
        // Create a mock ref object with a current property containing a div element
        const ref = { current: document.createElement('div') };
        // Create a mock handler function using Jest's mock function
        const handler = jest.fn();
        // Render the custom hook, providing the mock ref and handler
        renderHook(() =>
            useOnClickOutsideAndEsc(ref as RefObject<HTMLElement>, handler),
        );

        // Create an element that simulates a click outside the component
        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        // Dispatch a mousedown event on the outside element
        const mousedown = new MouseEvent('mousedown', { bubbles: true });
        outsideElement.dispatchEvent(mousedown);

        // Assert that the handler function has been called once
        expect(handler).toHaveBeenCalledTimes(1);

        // Clean up by removing the outside element from the DOM
        document.body.removeChild(outsideElement);
    });

    // Test case: Check if the handler is not called on mousedown inside the element
    it('does not call the handler on mousedown inside the element', () => {
        // Create a mock ref object with a current property containing a div element
        const ref = { current: document.createElement('div') };
        // Create a mock handler function using Jest's mock function
        const handler = jest.fn();
        // Render the custom hook, providing the mock ref and handler
        renderHook(() =>
            useOnClickOutsideAndEsc(ref as RefObject<HTMLElement>, handler),
        );

        // Create a mousedown event on the element itself (inside the component)
        const mousedown = new MouseEvent('mousedown', { bubbles: true });
        ref.current?.dispatchEvent(mousedown);

        // Assert that the handler function has not been called
        expect(handler).toHaveBeenCalledTimes(0);
    });

    // Test case: Check if the handler is called on keydown of the escape key
    it('calls the handler on keydown of the escape key', () => {
        // Create a mock ref object with a current property containing a div element
        const ref = { current: document.createElement('div') };
        // Create a mock handler function using Jest's mock function
        const handler = jest.fn();
        // Render the custom hook, providing the mock ref and handler
        renderHook(() =>
            useOnClickOutsideAndEsc(ref as RefObject<HTMLElement>, handler),
        );

        // Dispatch a keydown event with the Escape key
        const keydown = new KeyboardEvent('keydown', {
            key: 'Escape',
            bubbles: true,
        });
        document.dispatchEvent(keydown);

        // Assert that the handler function has been called once
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
