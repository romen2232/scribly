import { renderHook } from '@testing-library/react-hooks';
import useDebounce from '../../hooks/useDebounce';

jest.useFakeTimers(); //use Jest's timer control methods

describe('useDebounce', () => {
    it('debounces the input data', () => {
        let data = 'initial';
        const { result, rerender } = renderHook(() => useDebounce(data, 500));
        expect(result.current).toBe('initial');

        //Simulate data change
        data = 'updated';
        rerender();

        //Before debounce interval, the data should not be updated
        expect(result.current).toBe('initial');
        jest.advanceTimersByTime(499);
        expect(result.current).toBe('initial');

        //After debounce interval, the data should be updated
        jest.advanceTimersByTime(1);
        expect(result.current).toBe('updated');
    });
});
