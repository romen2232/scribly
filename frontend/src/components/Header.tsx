import * as React from 'react';
import { BackIcon } from '../assets/icons/Icons';
import { useNavigate } from 'react-router';
import Scribly from './Scribly';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
    children?: React.ReactNode;
}

export function Header(props: IHeaderProps) {
    const navigate = useNavigate();
    return (
        <header className="flex w-full justify-between">
            <nav className="flex w-full items-center justify-between bg-mainBackground-100 px-4 py-2">
                <button
                    onClick={() => navigate(-1)}
                    className="duration-150 ease-in-out transition hover:text-primaryBlue-500"
                >
                    <BackIcon className="h-16 w-16 " />
                </button>
                <Link to={'/'}>
                    <Scribly className="text-5xl duration-150 ease-in-out transition hover:text-primaryPink-500" />
                </Link>
            </nav>

            {props.children}
        </header>
    );
}
