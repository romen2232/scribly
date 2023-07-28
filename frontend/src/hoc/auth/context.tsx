// Importing necessary modules and components
import React, { ReactNode, createContext, useCallback, useState } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { IUser, IUserLogin, IUserRegister } from '../../utils/types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AUTH_COOKIE_NAME } from '../../utils/consts';
import { login, register } from '../../services/auth';

// Defining the shape of our context
export interface IAuthContextProps {
    user: IUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    checkToken: () => Promise<boolean>;
    login: (data: IUserLogin) => void;
    logout: () => void;
    register: (data: IUserRegister) => void;
}

export interface IAuthProviderProps {
    children: ReactNode;
}

// Creating our AuthContext with a default shape
export const AuthContext = createContext({} as IAuthContextProps);

// Provider component that wraps around parts of our app where the context will be used
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();

    // Setting up local state using React useState hook
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Login function
    const loginUser = useCallback(
        async ({ username, password }: IUserLogin) => {
            setLoading(true);
            const response = await login(username, password); // Authenticate user
            setLoading(false);

            if (response) {
                const { user, token } = response;
                // Display a success message
                toast(`Bienvenide ${user.username}`, {
                    position: 'top-right',
                    type: 'success',
                    pauseOnHover: false,
                });
                // Save authorization token in cookies
                setCookie(undefined, AUTH_COOKIE_NAME, token, {
                    sameSite: true,
                    maxAge: 60 * 60, // 1 hour
                });

                // Redirect to main page
                navigate('/');

                // Update state with user data and token
                setUser(user);
                setToken(token);
            }
        },
        [navigate],
    );

    // Registration function
    const registerUser = useCallback(
        async ({ username, password }: IUserRegister) => {
            setLoading(true);
            const response = await register(username, password); // Register user
            setLoading(false);

            if (response) {
                // Display a success message
                toast(
                    'Bienvenide a bordo. Inicia sesión para utilizar Escribly!',
                    {
                        position: 'top-right',
                        type: 'success',
                        pauseOnHover: false,
                    },
                );

                // Redirect to login page
                navigate('/login');
            }
        },
        [navigate],
    );

    // Logout function
    const logout = useCallback(() => {
        // Destroy authentication cookie and update state
        destroyCookie(undefined, AUTH_COOKIE_NAME);
        setUser(null);
        setToken(null);
    }, []);

    // Token checker function
    const checkToken = async () => {
        const checking = new Promise<boolean>((resolve) => {
            const cookies = parseCookies(); // Parsing cookies
            const storedToken = cookies[AUTH_COOKIE_NAME]; // Extracting our token

            if (!storedToken) {
                // If no token, redirect to login page
                navigate('/login');
                resolve(true);
            } else {
                // If token exists, update state with token
                setToken(storedToken);
                resolve(false);
            }
        });

        return checking;
    };

    // Return the context provider with value and children
    return (
        <AuthContext.Provider
            value={{
                checkToken,
                isAuthenticated: !!token, // Double-bang operator coerces the value into a boolean
                user,
                login: loginUser,
                loading,
                logout,
                register: registerUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
