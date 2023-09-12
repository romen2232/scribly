import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { InputField } from './InputField';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { Hyperlink } from './Hyperlink';
export const FormLogin = ({ onSubmit }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (event) => {
        event.preventDefault();
        onSubmit(email, password);
    };
    return (_jsxs("main", { className: "h-96", children: [_jsx("h2", { className: "py-4 text-center text-2xl font-bold", children: t('login.Title') }), _jsxs("p", { className: 'text-center', children: [t('login.NoAccount'), "\u00A0", _jsx(Hyperlink, { to: t('/register'), color: "pink", children: t('login.Register') })] }), _jsxs("form", { className: "space-y-6 pt-8", onSubmit: handleLogin, children: [_jsx(InputField, { label: t('login.Email'), inputType: "email", name: t('login.Email'), placeholder: t('login.Email'), required: true, value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(InputField, { label: t('login.Password'), inputType: "password", placeholder: t('login.Password'), name: "password", value: password, required: true, onChange: (e) => setPassword(e.target.value) }), _jsx(Button, { className: "mt-4 w-full rounded  px-3 py-2 font-bold text-secondaryYellow-500 duration-200 ease-in-out transition", bgColor: "zinc-800 ", children: t('login.Login') })] })] }));
};
