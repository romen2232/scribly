import { render, act } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../../../hoc/auth/context';
import { login, register } from '../../../services/auth';
import { IAuthContextProps } from '../../../hoc/auth/context';
import { IUser } from '../../../utils/types';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock('../../../services/auth', () => ({
    login: jest.fn(),
    register: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: jest.fn(),
}));

jest.mock('nookies', () => ({
    setCookie: jest.fn(),
    destroyCookie: jest.fn(),
    parseCookies: jest.fn(),
}));

describe('Auth Component', () => {
    it('logins user successfully', async () => {
        const userData = { username: 'test', password: 'password' };
        const token = '1234';
        (login as jest.MockedFunction<typeof login>).mockResolvedValue({
            user: userData,
            token,
        });

        let result: IAuthContextProps | null = null;
        render(
            <Router>
                <AuthProvider>
                    <AuthContext.Consumer>
                        {(value: IAuthContextProps | null) => {
                            result = value;
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            </Router>,
        );

        await act(async () => {
            await result!.login(userData);
        });

        expect(result!.user).toEqual(userData);
        expect(result!.isAuthenticated).toBe(true);
    });

    it('registers user successfully', async () => {
        const userData = {
            username: 'test',
            password: 'password',
            email: 'email@email.email',
        };
        (register as jest.MockedFunction<typeof register>).mockResolvedValue(
            true,
        );

        let result: IAuthContextProps | null = null;
        render(
            <Router>
                <AuthProvider>
                    <AuthContext.Consumer>
                        {(value: IAuthContextProps | null) => {
                            result = value;
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            </Router>,
        );

        await act(async () => {
            await result!.register(userData);
        });

        expect(register).toHaveBeenCalledWith(
            userData.username,
            userData.password,
        );
    });

    it('logs out user', () => {
        let result: {
            logout: () => void;
            user: IUser | null;
            isAuthenticated: boolean;
        } | null = null;
        render(
            <Router>
                <AuthProvider>
                    <AuthContext.Consumer>
                        {(value: IAuthContextProps) => {
                            result = value;
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            </Router>,
        );

        act(() => {
            result!.logout();
        });

        expect(result!.user).toBeNull();
        expect(result!.isAuthenticated).toBe(false);
    });
});
