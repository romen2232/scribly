// Importing necessary modules and components
import React, { ReactNode, createContext, useCallback, useState } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { IUser, IUserLogin, IUserRegister } from '../../utils/types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AUTH_COOKIE_NAME } from '../../utils/consts';
import { getUser, login, register } from '../../services/auth';

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
        async ({ email, password }: IUserLogin) => {
            setLoading(true);
            const response = await login(email, password); // Authenticate user

            if (response) {
                const { access } = response;
                const user = await getUser(access); // Get user data
                setLoading(false);

                if (!user) {
                    // Display an error message
                    toast('Error al iniciar sesión', {
                        position: 'top-right',
                        type: 'error',
                        pauseOnHover: false,
                    });
                    return;
                }
                // Save authorization token in cookies
                setCookie(undefined, AUTH_COOKIE_NAME, access, {
                    sameSite: true,
                    maxAge: 60 * 60, // 1 hour
                });

                // Display a success message
                toast(`Bienvenide ${user.email}`, {
                    position: 'top-right',
                    type: 'success',
                    pauseOnHover: false,
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
        async ({ email, password }: IUserRegister) => {
            setLoading(true);
            const response = await register(email, password); // Register user
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
                isAuthenticated: !!token, // Double-bang operator coerces the value into a boolean
                user,
                login: loginUser,
                loading,
                checkToken: checkToken,
                logout,
                register: registerUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
