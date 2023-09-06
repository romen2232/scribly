import React, { useContext } from 'react';
import { AuthContext } from '../hoc/auth/context';
import { FormRegister } from '../components/FormRegister';
import { PageContainer } from '../components/PageContainer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
    const { t } = useTranslation();
    const { registerUser } = useContext(AuthContext);

    const handleLogin = async (
        email: string,
        password: string,
        username: string,
    ) => {
        registerUser({ email, password, username });
    };

    return (
        <PageContainer>
            {' '}
            <h2 className="my-4 text-center text-2xl font-bold">
                {t('register.Register')}
            </h2>
            <p>
                {t('register.Already')} &nbsp;
                <Link to={t('/login')} className="text-tiviElectricViolet">
                    {t('register.Login')}
                </Link>
            </p>
            <FormRegister onSubmit={handleLogin} />
        </PageContainer>
    );
};

export default Login;
