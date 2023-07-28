import { render, waitFor } from '@testing-library/react';
import { AuthContext } from '../../../hoc/auth/context';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { withAuth } from '../../../hoc/auth/withAuth';
import '@testing-library/jest-dom/extend-expect';

// Create a mock component to wrap with the HOC
const MockComponent = () => <div>MockComponent</div>;

// Create a HOC
const WithAuthComponent = withAuth(MockComponent);

describe('WithAuth HOC', () => {
    test('should render MockComponent if authenticated', async () => {
        const mockContext = {
            isAuthenticated: true,
            loading: false,
            checkToken: jest.fn().mockResolvedValue(false),
            user: {
                username: 'JohnDoe',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: null,
                experience: 5,
                gems: 10,
                appearDailyChallenge: false,
                isStaff: false,
                isActive: true,
                dateJoined: new Date(),
            },
            login: jest.fn(),
            logout: jest.fn(),
            register: jest.fn(),
        };

        const { getByText } = render(
            <AuthContext.Provider value={mockContext}>
                <MemoryRouter initialEntries={['/protected']}>
                    <Routes>
                        <Route
                            path="/protected"
                            element={<WithAuthComponent />}
                        />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>,
        );

        await waitFor(() => {
            expect(getByText('MockComponent')).toBeInTheDocument();
        });
    });

    test('should redirect to login if not authenticated', async () => {
        const mockContext = {
            isAuthenticated: false,
            loading: false,
            checkToken: jest.fn().mockResolvedValue(false),
            user: {
                username: 'JohnDoe',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: null,
                experience: 5,
                gems: 10,
                appearDailyChallenge: false,
                isStaff: false,
                isActive: true,
                dateJoined: new Date(),
            },
            login: jest.fn(),
            logout: jest.fn(),
            register: jest.fn(),
        };

        const { queryByText } = render(
            <AuthContext.Provider value={mockContext}>
                <MemoryRouter initialEntries={['/protected']}>
                    <Routes>
                        <Route
                            path="/protected"
                            element={<WithAuthComponent />}
                        />
                        <Route path="/login" element={<div>Login</div>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>,
        );

        await waitFor(() => {
            expect(queryByText('MockComponent')).not.toBeInTheDocument();
        });
    });

    test('should show loading while checking token', () => {
        const mockContext = {
            isAuthenticated: false,
            loading: true,
            checkToken: jest.fn(),
            user: {
                username: 'JohnDoe',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: null,
                experience: 5,
                gems: 10,
                appearDailyChallenge: false,
                isStaff: false,
                isActive: true,
                dateJoined: new Date(),
            },
            login: jest.fn(),
            logout: jest.fn(),
            register: jest.fn(),
        };

        const { getByText } = render(
            <AuthContext.Provider value={mockContext}>
                <WithAuthComponent />
            </AuthContext.Provider>,
        );

        expect(getByText('Loading...')).toBeInTheDocument();
    });

    test('should have the correct display name', () => {
        expect(WithAuthComponent.displayName).toBe('WithAuth(MockComponent)');
    });
});
