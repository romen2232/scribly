import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { AuthContext } from '../hoc/auth/context';
import { FormLogin } from '../components/FormLogin';
import { PageContainer } from '../components/PageContainer';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from './loader';
import HeadFoot from '../components/HeadFoot';
import Scribly from '../components/Scribly';
import { FormRegister } from '../components/FormRegister';
const LandingPage = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const { loginUser, loading, registerUser } = useContext(AuthContext);
    const handleLogin = async (email, password) => {
        loginUser({ email, password });
    };
    const handleRegister = async (email, password, username) => {
        registerUser({ email, password, username });
    };
    return loading ? (_jsx(Loader, {})) : (_jsx(HeadFoot, { children: _jsx(PageContainer, { children: _jsxs("div", { className: "min-h-[550px] pt-9", children: [_jsx(Scribly, {}), _jsx("div", { className: "duration-300 transition-all", children: location.pathname === t('/login') ? (_jsx(FormLogin, { onSubmit: handleLogin })) : location.pathname === t('/register') ? (_jsx(FormRegister, { onSubmit: handleRegister })) : (_jsxs("div", { className: "flex flex-col items-center justify-center space-y-4", children: [_jsx(Link, { to: "/login", className: "text-center text-tiviElectricViolet", children: "Login" }), _jsx(Link, { to: "/register", className: "text-center text-tiviElectricViolet", children: "Register" })] })) })] }) }) }));
};
export default LandingPage;
