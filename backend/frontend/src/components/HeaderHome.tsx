import { Link } from 'react-router-dom';

// import { FaFireAlt } from 'react-icons/fa';
import { CommunityIcon, ProfileIcon } from '../assets/icons/Icons';
import { useTranslation } from 'react-i18next';
import WavyHeader from './WavyHeader';
export interface IHeaderProps {
    children?: React.ReactNode;
    onHeaderModalClick: () => void;
}

// export function Header(props: IHeaderProps) {
export function Header() {
    const { t } = useTranslation();

    return (
        <WavyHeader color="yellow">
            <nav
                className="
          text-tiviWhite
          mb-10
          flex
          h-full
          w-full
          flex-row
          items-center
          justify-around
          lg:flex-col-reverse
          "
            >
                {/* <button onClick={props.onHeaderModalClick}>
                    <FaFireAlt className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </button> */}

                {/* <Link to={t('/leaderboard')}>
                    <FaTrophy className="h-16 w-16 duration-300 ease-in-out transition hover:text-tiviBlack" />
                </Link> */}

                <Link to={t('/community')}>
                    <CommunityIcon className="hover:text-tiviBlack h-16 w-16 duration-300 ease-in-out transition" />
                </Link>

                <Link to={t('/profile')}>
                    <ProfileIcon className="hover:text-tiviBlack h-16 w-16 duration-300 ease-in-out transition" />
                </Link>
            </nav>
        </WavyHeader>
    );
}
