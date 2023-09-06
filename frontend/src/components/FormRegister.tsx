import React, { FC, useState } from 'react';
import { InputField } from './InputField';
import { useTranslation } from 'react-i18next';
import { Hyperlink } from './Hyperlink';
import { Button } from './Button';

interface FormProps {
    onSubmit: (email: string, password: string, username: string) => void;
}

export const FormRegister: FC<FormProps> = ({ onSubmit }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(email, password, username);
    };

    return (
        <main className="h-96">
            <h2 className="my-4 text-center text-2xl font-bold">
                {t('register.Register')}
            </h2>
            <p>
                {t('register.Already')} &nbsp;
                <Hyperlink to={t('/login')} color="blue">
                    {t('login.Login')}
                </Hyperlink>
            </p>
            <form className="mt-8 space-y-6" onSubmit={handleRegister}>
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

                <Button
                    className="mt-4 w-full rounded  px-3 py-2 font-bold text-secondaryYellow-500 duration-200 ease-in-out transition"
                    bgColor="zinc-800 "
                >
                    {t('register.Register')}
                </Button>
            </form>
        </main>
    );
};
