import React, { FC, useState } from 'react';
import { InputField } from './InputField';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { Hyperlink } from './Hyperlink';

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
        <main className="h-96">
            <h2 className="py-4 text-center text-2xl font-bold">
                {t('login.Title')}
            </h2>

            <p className='text-center'>
                {t('login.NoAccount')}
                &nbsp;
                <Hyperlink to={t('/register')} color="pink">
                    {t('login.Register')}
                </Hyperlink>
            </p>
            <form className="space-y-6 pt-8" onSubmit={handleLogin}>
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
                <Button
                    className="mt-4 w-full rounded  px-3 py-2 font-bold text-secondaryYellow-500 duration-200 ease-in-out transition"
                    bgColor="zinc-800 "
                >
                    {t('login.Login')}
                </Button>
            </form>
        </main>
    );
};
