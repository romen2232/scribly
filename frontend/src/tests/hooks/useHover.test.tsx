import { render, fireEvent } from '@testing-library/react';
import useHover from '../../hooks/useHover';

const HoverableComponent = () => {
    const { ref: hoverRef, isHovered } = useHover();

    return (
        <div data-testid="hoverable" ref={hoverRef}>
            {isHovered ? 'Hovering over me!' : 'Not hovering over me!'}
        </div>
    );
};

test('should react on hover', () => {
    const { getByTestId } = render(<HoverableComponent />);
    const hoverable = getByTestId('hoverable');

    // Initially, we are not hovering
    expect(hoverable.textContent).toBe('Not hovering over me!');

    // Simulate a mouseover event
    fireEvent.mouseOver(hoverable);
    expect(hoverable.textContent).toBe('Hovering over me!');

    // Simulate a mouseout event
    fireEvent.mouseOut(hoverable);
    expect(hoverable.textContent).toBe('Not hovering over me!');
});
