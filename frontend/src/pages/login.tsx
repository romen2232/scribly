import React, { useContext } from 'react';
import { AuthContext } from '../hoc/auth/context';
import { LoginForm } from '../components/LoginForm';
import { PageContainer } from '../components/PageContainer';

const Login: React.FC = () => {
    const { login, loading } = useContext(AuthContext);

    const handleLogin = async (email: string, password: string) => {
        login({ email, password });
    };

    return (
        <PageContainer>
            <h2 className="my-4 text-center text-2xl font-bold">Login</h2>
            <LoginForm onLogin={handleLogin} />
            {loading && <p>Loading...</p>}
        </PageContainer>
    );
};

export default Login;
