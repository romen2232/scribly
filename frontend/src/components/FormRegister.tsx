import React, { FC, useState } from 'react';
import { InputField } from './InputField';
import { useTranslation } from 'react-i18next';

interface FormProps {
    onSubmit: (email: string, password: string, username: string) => void;
}

export const FormRegister: FC<FormProps> = ({ onSubmit }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(email, password, username);
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <InputField
                label={t('register.Email')}
                inputType="email"
                name={t('register.Email')}
                placeholder={t('register.Email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <InputField
                label={t('register.Username')}
                inputType="text"
                name={t('register.Username')}
                placeholder={t('register.Username')}
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
            />

            <InputField
                label="Password"
                inputType="password"
                placeholder="Password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                type="submit"
                className="mt-4 w-full rounded bg-tiviElectricPurple-100 px-3 py-2 transition duration-200 ease-in-out hover:bg-tiviElectricViolet"
            >
                {t('register.Register')}
            </button>
        </form>
    );
};
