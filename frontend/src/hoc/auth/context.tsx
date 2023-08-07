// Importing necessary modules and components
import React, { ReactNode, createContext, useCallback, useState } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { User, IUserLogin, IUserRegister } from '../../utils/types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AUTH_COOKIE_NAME } from '../../utils/consts';
import {
    retrieveUser,
    loginUser,
    registerUser,
    activateUser,
} from '../../services/auth';
import { useTranslation } from 'react-i18next';
import { isStrongPassword } from '../../utils/functions';

// Defining the shape of our context
export interface IAuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    activate: boolean;
    email: string | null;
    checkToken: () => Promise<boolean>;
    loginUser: (data: IUserLogin) => void;
    logout: () => void;
    registerUser: (data: IUserRegister) => void;
    activateUser: (token: string) => void;
}

export interface IAuthProviderProps {
    children: ReactNode;
}

// Creating our AuthContext with a default shape
export const AuthContext = createContext({} as IAuthContextProps);

// Provider component that wraps around parts of our app where the context will be used
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Setting up local state using React useState hook
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [activate, setActivate] = useState(false);
    const [emailUser, setEmail] = useState<string | null>(null);

    // Login function
    const login = useCallback(
        async ({ email, password }: IUserLogin) => {
            setLoading(true);
            try {
                const response = await loginUser(email, password); // Authenticate user

                if (response) {
                    const { access } = response;
                    const user = await retrieveUser(access);
                    setLoading(false);

                    console.log(user);
                    console.log(user.username);
                    console.log(user);

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
                    toast(`Bienvenide ${user.username}`, {
                        position: 'top-right',
                        type: 'success',
                        pauseOnHover: false,
                    });
                    // Redirect to main page
                    navigate(t('/'));

                    // Update state with user data and token
                    setUser(user);
                    setToken(token);
                    setActivate(true);
                }
            } catch (error) {
                setLoading(false);
                // Display an error message
                toast(t('login.Error'), {
                    position: 'top-right',
                    type: 'error',
                    pauseOnHover: false,
                    autoClose: 2000,
                });
            }
        },
        [navigate],
    );

    // Registration function
    const register = useCallback(
        async ({ email, password, username }: IUserRegister) => {
            setLoading(true);
            if (!isStrongPassword(password)) {
                setLoading(false);
                console.log(t('weak password'));
                toast(t('register.weakPassword'), {
                    position: 'top-right',
                    type: 'error',
                    pauseOnHover: true,
                    autoClose: 5000,
                });
                return;
            }
            try {
                const response = await registerUser({
                    email,
                    password,
                    username,
                });
                setLoading(false);
                setEmail(email);
                if (response) {
                    toast(t('register.Welcome'), {
                        position: 'top-right',
                        type: 'success',
                        pauseOnHover: false,
                        autoClose: 2000,
                    });
                    // Redirect to login page
                    console.log(emailUser);
                    navigate(t('/activate'));
                }
            } catch (error) {
                setLoading(false);
                // Display an error message
                toast(t('register.Error'), {
                    position: 'top-right',
                    type: 'error',
                    pauseOnHover: false,
                    autoClose: 2000,
                });
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
        setActivate(false);
        navigate(t('/login'));
    }, []);

    // Token checker function
    const checkToken = async () => {
        const checking = new Promise<boolean>((resolve) => {
            const cookies = parseCookies(); // Parsing cookies
            const storedToken = cookies[AUTH_COOKIE_NAME]; // Extracting our token

            if (!storedToken) {
                // If no token, redirect to login page
                navigate(t('/login'));
                resolve(true);
            } else {
                // If token exists, update state with token
                setToken(storedToken);
                resolve(false);
            }
        });

        return checking;
    };

    const activateUserReact = async (token: string) => {
        setLoading(true);
        try {
            const response = await activateUser(token);
            setLoading(false);
            if (response) {
                toast(t('activate.Success'), {
                    position: 'top-right',
                    type: 'success',
                    pauseOnHover: false,
                    autoClose: 2000,
                });

                setActivate(true);

                // Redirect to login page
                navigate(t('/login'));
            }
        } catch (error) {
            setLoading(false);
            // Display an error message
            toast(t('activate.Error'), {
                position: 'top-right',
                type: 'error',
                pauseOnHover: false,
                autoClose: 2000,
            });
        }
    };

    // Return the context provider with value and children
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!token, // Double-bang operator coerces the value into a boolean
                user,
                loginUser: login,
                loading,
                checkToken: checkToken,
                logout,
                registerUser: register,
                activateUser: activateUserReact,
                activate,
                email: emailUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
