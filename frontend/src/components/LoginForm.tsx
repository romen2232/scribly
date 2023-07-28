import React, { FC, useState } from 'react';
import { InputField } from './InputField';

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        onLogin(username, password);
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <InputField
                label="Username"
                inputType="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                Login
            </button>
        </form>
    );
};
