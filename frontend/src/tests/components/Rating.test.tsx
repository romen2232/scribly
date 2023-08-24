import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Rating, { IRatingProps } from '../../components/Rating';
import '../../i18n/config';

function renderWithProviders(ui: React.ReactElement) {
    return render(ui);
}

const handleRatingMock = jest.fn();

const defaultProps: IRatingProps = {
    rating: 3,
    handleRating: handleRatingMock,
};

describe('Rating', () => {
    it('renders correctly', () => {
        renderWithProviders(<Rating {...defaultProps} />);
        const stars = screen.getAllByRole('button', {
            name: /puntuación media/i,
        });
        expect(stars).toHaveLength(5);
    });

    it('fills stars on hover', () => {
        renderWithProviders(<Rating {...defaultProps} />);
        const stars = screen.getAllByRole('button', {
            name: /puntuación media/i,
        });
        userEvent.hover(stars[2]);
        // Depending on your CSS-in-JS solution, adjust the assertion below
        expect(stars[2]).toHaveClass('text-amber-400'); // or some other assertion based on visual change
    });

    it('calls handleRating with correct value on star click', () => {
        renderWithProviders(<Rating {...defaultProps} />);
        const stars = screen.getAllByRole('button', {
            name: /puntuación media/i,
        });
        userEvent.click(stars[2]);
        expect(handleRatingMock).toHaveBeenCalledWith(3); // Assuming 3rd star represents the rating of 3
    });

    it('has correct translated aria-label', () => {
        renderWithProviders(<Rating {...defaultProps} />);
        expect(
            screen.getByRole('button', {
                name: /puntuación media/i,
            }),
        ).toBeInTheDocument();
    });
});
