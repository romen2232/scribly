import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { AuthContext } from '../hoc/auth/context';
import { FormLogin } from '../components/FormLogin';
import { PageContainer } from '../components/PageContainer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from './loader';
import HeadFoot from '../components/HeadFoot';
import Scribly from '../components/Scribly';
const Login = () => {
    const { t } = useTranslation();
    const { loginUser, loading } = useContext(AuthContext);
    const handleLogin = async (email, password) => {
        loginUser({ email, password });
    };
    return loading ? (_jsx(Loader, {})) : (_jsx(HeadFoot, { children: _jsxs(PageContainer, { children: [_jsx(Scribly, {}), _jsx("h2", { className: "py-4 text-center text-2xl font-bold", children: t('login.Title') }), _jsxs("p", { children: [t('login.NoAccount'), "\u00A0", _jsx(Link, { to: t('/register'), className: "text-tiviElectricViolet", children: t('login.Register') })] }), _jsx(FormLogin, { onSubmit: handleLogin })] }) }));
};
export default Login;
