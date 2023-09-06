import { Link } from 'react-router-dom';

export interface IAsideProps {
    icon: React.ReactNode;
    title: string;
    linkTo?: string;
}

export const AsideButton = ({ icon, title, linkTo }: IAsideProps) => {
    const classNames =
        'mt-4 flex h-12 w-full items-center justify-start rounded-lg p-6 hover:bg-secondaryYellow-500 hover:font-bold hover:shadow-inner-dark hover:active:translate-y-1.5 hover:active:shadow-none';
    if (linkTo) {
        return (
            <Link to={linkTo} className={classNames}>
                {icon}
                <span className="ml-4 text-xl">{title}</span>
            </Link>
        );
    } else {
        return (
            <li className="w-full">
                <button className={classNames}>
                    {icon}
                    <span className="ml-4 text-xl">{title}</span>
                </button>
            </li>
        );
    }
};
