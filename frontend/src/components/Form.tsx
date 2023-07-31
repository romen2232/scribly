import React, { FC, useState } from 'react';
import { InputField } from './InputField';

interface FormProps {
    onSubmit: (email: string, password: string) => void;
    type: 'login' | 'register';
}

export const Form: FC<FormProps> = ({ onSubmit, type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <InputField
                label="Email"
                inputType="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                label="Password"
                inputType="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="mt-4 w-full rounded bg-tiviElectricPurple-100 px-3 py-2 transition duration-200 ease-in-out hover:bg-tiviElectricViolet"
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
        </form>
    );
};
