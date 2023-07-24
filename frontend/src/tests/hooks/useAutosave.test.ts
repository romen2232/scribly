import { renderHook } from '@testing-library/react-hooks';
import { useAutosave } from '../../hooks/useAutosave';

// Mocking the useDebounce hook by replacing it with a simple mock function
jest.mock('../../hooks/useDebounce', () => jest.fn((fn) => fn));

test('should autosave data after specified interval', async () => {
    // Creating a mock function to simulate the save functionality
    const saveFn = jest.fn();

    // Using renderHook from React Testing Library to render the useAutosave hook
    // initialProps: { data: 'Initial data' } provides the initial data prop to the hook
    const { rerender } = renderHook(
        ({ data }) =>
            useAutosave({ data: data, onSave: saveFn, interval: 500 }),
        { initialProps: { data: 'Initial data' } },
    );

    // Change data by re-rendering the hook with updated data
    rerender({ data: 'Updated data' });

    // Fast-forward until all timers have been executed
    // This allows the timer inside the useAutosave hook to trigger the autosave
    jest.runAllTimers();

    // Check if the save function has been called with the correct data
    expect(saveFn).toHaveBeenCalledWith('Updated data');
});
