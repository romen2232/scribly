import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { InputField } from './InputField';
import { useTranslation } from 'react-i18next';
import { Hyperlink } from './Hyperlink';
import { Button } from './Button';
export const FormRegister = ({ onSubmit }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const handleRegister = (event) => {
        event.preventDefault();
        onSubmit(email, password, username);
    };
    return (_jsxs("main", { className: "h-96", children: [_jsx("h2", { className: "my-4 text-center text-2xl font-bold", children: t('register.Register') }), _jsxs("p", { className: 'text-center', children: [t('register.Already'), " \u00A0", _jsx(Hyperlink, { to: t('/login'), color: "blue", children: t('login.Login') })] }), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleRegister, children: [_jsx(InputField, { label: t('register.Email'), inputType: "email", name: t('register.Email'), placeholder: t('register.Email'), value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx(InputField, { label: t('register.Username'), inputType: "text", name: t('register.Username'), placeholder: t('register.Username'), value: username, required: true, onChange: (e) => setUsername(e.target.value) }), _jsx(InputField, { label: "Password", inputType: "password", placeholder: "Password", name: "password", value: password, required: true, onChange: (e) => setPassword(e.target.value) }), _jsx(Button, { className: "mt-4 w-full rounded  px-3 py-2 font-bold text-secondaryYellow-500 duration-200 ease-in-out transition", bgColor: "zinc-800 ", children: t('register.Register') })] })] }));
};
