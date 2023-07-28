import * as React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router';

export interface IHeaderProps {
    children?: React.ReactNode;
}

export function Header(props: IHeaderProps) {
    const navigate = useNavigate();
    return (
        <header>
            <nav>
                <button
                    onClick={() => navigate(-1)}
                    className="transition duration-150 ease-in-out hover:text-tiviElectricPurple-100"
                >
                    <IoIosArrowRoundBack className="h-16 w-16 " />
                </button>
            </nav>

            {props.children}
        </header>
    );
}
