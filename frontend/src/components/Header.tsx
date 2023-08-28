import * as React from 'react';
import { BackIcon } from '../assets/icons/Icons';
import { useNavigate } from 'react-router';

export interface IHeaderProps {
    children?: React.ReactNode;
}

export function Header(props: IHeaderProps) {
    const navigate = useNavigate();
    return (
        <header className="flex justify-between">
            <nav>
                <button
                    onClick={() => navigate(-1)}
                    className="duration-150 ease-in-out transition hover:text-tiviElectricPurple-100"
                >
                    <BackIcon className="h-16 w-16 " />
                </button>
            </nav>

            {props.children}
        </header>
    );
}
