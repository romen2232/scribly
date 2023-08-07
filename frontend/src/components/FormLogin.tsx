import React, { FC, useState } from 'react';
import { InputField } from './InputField';
import { useTranslation } from 'react-i18next';

interface FormProps {
    onSubmit: (email: string, password: string) => void;
}

export const FormLogin: FC<FormProps> = ({ onSubmit }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <InputField
                label={t('login.Email')}
                inputType="email"
                name={t('login.Email')}
                placeholder={t('login.Email')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                label={t('login.Password')}
                inputType="password"
                placeholder={t('login.Password')}
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="mt-4 w-full rounded bg-tiviElectricPurple-100 px-3 py-2 transition duration-200 ease-in-out hover:bg-tiviElectricViolet"
            >
                {t('login.Login')}
            </button>
        </form>
    );
};
