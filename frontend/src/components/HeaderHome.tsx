import * as React from 'react';
import { Link } from 'react-router-dom';

import { FaDumbbell, FaFireAlt } from 'react-icons/fa';
import { FaUsers, FaTrophy, FaUser } from 'react-icons/fa6';
import { AuthContext } from '../hoc/auth/context';
import { useContext } from 'react';
export interface IHeaderProps {
    children?: React.ReactNode;
    onHeaderModalClick: () => void;
}

export function Header(props: IHeaderProps) {
    const { logout } = useContext(AuthContext);

    return (
        <header
            className="h-[8.25rem] w-full
    "
        >
            <nav
                className="
          flex
          h-full
          w-full
          flex-row
          items-center
          justify-around
          bg-tiviElectricPurple-100
          text-tiviWhite"
            >
                <button onClick={props.onHeaderModalClick}>
                    <FaFireAlt className="h-16 w-16 transition duration-300 ease-in-out hover:text-tiviBlack" />
                </button>

                <Link to="/leaderboard">
                    <FaTrophy className="h-16 w-16 transition duration-300 ease-in-out hover:text-tiviBlack" />
                </Link>

                {/* TODO: When the lessons part is done check this out */}
                <Link to="/training">
                    <FaDumbbell className="h-16 w-16 transition duration-300 ease-in-out hover:text-tiviBlack" />
                </Link>

                <Link to="/community">
                    <FaUsers className="h-16 w-16 transition duration-300 ease-in-out hover:text-tiviBlack" />
                </Link>

                <button onClick={logout}>
                    <FaUser className="h-16 w-16 transition duration-300 ease-in-out hover:text-tiviBlack" />
                </button>
            </nav>
        </header>
    );
}
