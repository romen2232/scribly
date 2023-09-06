import React, { useContext } from 'react';
import { AuthContext } from '../hoc/auth/context';
import { FormLogin } from '../components/FormLogin';
import { PageContainer } from '../components/PageContainer';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from './loader';
import HeadFoot from '../components/HeadFoot';
import Scribly from '../components/Scribly';
import { FormRegister } from '../components/FormRegister';
import { registerUser } from '../services/auth';

const LandingPage: React.FC = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const { loginUser, loading } = useContext(AuthContext);

    const handleLogin = async (email: string, password: string) => {
        loginUser({ email, password });
    };

    const handleRegister = async (
        email: string,
        password: string,
        username: string,
    ) => {
        registerUser({ email, password, username });
    };

    return loading ? (
        <Loader />
    ) : (
        <HeadFoot>
            <PageContainer>
                <div className="min-h-[550px]">
                    <Scribly />
                    <div className="duration-300 transition-all">
                        {location.pathname === t('/login') ? (
                            <FormLogin onSubmit={handleLogin} />
                        ) : location.pathname === t('/register') ? (
                            <FormRegister onSubmit={handleRegister} />
                        ) : (
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <Link
                                    to="/login"
                                    className="text-center text-tiviElectricViolet"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-center text-tiviElectricViolet"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </PageContainer>
        </HeadFoot>
    );
};

export default LandingPage;
