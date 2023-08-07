import React, { useContext } from 'react';
import { AuthContext } from '../hoc/auth/context';
import { FormLogin } from '../components/FormLogin';
import { PageContainer } from '../components/PageContainer';
import { Splash } from '../components/Splash';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from './loader';

const Login: React.FC = () => {
    const { t } = useTranslation();
    const { loginUser, loading } = useContext(AuthContext);

    const handleLogin = async (email: string, password: string) => {
        loginUser({ email, password });
    };

    return loading ? (
        <Loader />
    ) : (
        <PageContainer>
            <Splash>
                <h2 className="my-4 text-center text-2xl font-bold">
                    {t('login.Title')}
                </h2>

                <p>
                    {t('login.NoAccount')}
                    &nbsp;
                    <Link
                        to={t('/register')}
                        className="text-tiviElectricViolet"
                    >
                        {t('login.Register')}
                    </Link>
                </p>

                <FormLogin onSubmit={handleLogin} />
            </Splash>
        </PageContainer>
    );
};

export default Login;
