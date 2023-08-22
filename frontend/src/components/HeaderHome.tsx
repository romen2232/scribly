import * as React from 'react';
import { Link } from 'react-router-dom';

import { FaDumbbell, FaFireAlt } from 'react-icons/fa';
import { FaUsers, FaTrophy, FaUser } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
export interface IHeaderProps {
    children?: React.ReactNode;
    onHeaderModalClick: () => void;
}

export function Header(props: IHeaderProps) {
    const { t } = useTranslation();

    return (
        <header className="h-min-[8.25rem] h-[8.25rem] w-full flex-shrink-0">
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
                    <FaFireAlt className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </button>

                <Link to={t('/leaderboard')}>
                    <FaTrophy className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </Link>

                {/* TODO: When the lessons part is done check this out */}
                <Link to={t('/training')}>
                    <FaDumbbell className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </Link>

                <Link to={t('/community')}>
                    <FaUsers className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </Link>

                <Link to={t('/profile')}>
                    <FaUser className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </Link>
            </nav>
        </header>
    );
}
