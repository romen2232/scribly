import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { AuthContext } from '../hoc/auth/context';
import { FormRegister } from '../components/FormRegister';
import { PageContainer } from '../components/PageContainer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Login = () => {
    const { t } = useTranslation();
    const { registerUser } = useContext(AuthContext);
    const handleLogin = async (email, password, username) => {
        registerUser({ email, password, username });
    };
    return (_jsxs(PageContainer, { children: [' ', _jsx("h2", { className: "my-4 text-center text-2xl font-bold", children: t('register.Register') }), _jsxs("p", { children: [t('register.Already'), " \u00A0", _jsx(Link, { to: t('/login'), className: "text-tiviElectricViolet", children: t('register.Login') })] }), _jsx(FormRegister, { onSubmit: handleLogin })] }));
};
export default Login;
