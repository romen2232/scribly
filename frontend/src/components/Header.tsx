import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    STREAK_URL,
    LEADERBOARD_URL,
    PROFILE_URL,
    TRAINING_URL,
    COMMUNITY_URL,
} from '../utils/consts';

export interface IHeaderProps {
    children?: React.ReactNode;
    onHeaderModalClick: () => void;
}

export function Header(props: IHeaderProps) {
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
          bg-tiviIndigo
          text-tiviWhite"
            >
                <button onClick={props.onHeaderModalClick}>
                    <img
                        src={STREAK_URL}
                        alt="Streak and gems"
                        className="h-16 w-16"
                    />
                </button>

                <Link to="/leaderboard">
                    <img
                        src={LEADERBOARD_URL}
                        alt="Leaderboard"
                        className="h-16 w-16"
                    />
                </Link>

                {/* TODO: When the lessons part is done check this out */}
                <Link to="/training">
                    <img src={TRAINING_URL} alt="Training" />
                </Link>

                <Link to="/community">
                    <img src={COMMUNITY_URL} alt="Community" />
                </Link>

                <Link to="/profile">
                    <img src={PROFILE_URL} alt="Profile" />
                </Link>
            </nav>
        </header>
    );
}
