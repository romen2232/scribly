import * as React from 'react';
import { Link } from 'react-router-dom';

// import { FaFireAlt } from 'react-icons/fa';
import { CommunityIcon, ProfileIcon } from '../assets/icons/Icons';
import { useTranslation } from 'react-i18next';
export interface IHeaderProps {
    children?: React.ReactNode;
    onHeaderModalClick: () => void;
}

// export function Header(props: IHeaderProps) {
export function Header() {
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
                {/* <button onClick={props.onHeaderModalClick}>
                    <FaFireAlt className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </button> */}

                {/* <Link to={t('/leaderboard')}>
                    <FaTrophy className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </Link> */}

                <Link to={t('/community')}>
                    <CommunityIcon className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </Link>

                <Link to={t('/profile')}>
                    <ProfileIcon className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </Link>
            </nav>
        </header>
    );
}
