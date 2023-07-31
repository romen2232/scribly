import React, { useContext } from 'react';
import { AuthContext } from '../hoc/auth/context';
import { Form } from '../components/Form';
import { PageContainer } from '../components/PageContainer';
import { Splash } from '../components/Splash';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const { register, loading } = useContext(AuthContext);

    const handleLogin = async (email: string, password: string) => {
        register({ email, password });
    };

    return (
        <PageContainer>
            <Splash>
                <h2 className="my-4 text-center text-2xl font-bold">
                    Register
                </h2>
                <p>
                    Already have an account? &nbsp;
                    <Link to="/login" className="text-tiviElectricViolet">
                        Sing in
                    </Link>
                </p>
                <Form onSubmit={handleLogin} type="register" />
                {loading && <p>Loading...</p>}
            </Splash>
        </PageContainer>
    );
};

export default Login;
