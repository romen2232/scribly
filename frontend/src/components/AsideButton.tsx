import { Link } from 'react-router-dom';

export interface IAsideProps {
    icon: React.ReactNode;
    title: string;
    linkTo?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    bgColor?: string;
}

export const AsideButton = ({
    icon,
    title,
    linkTo,
    onClick,
    disabled,
    className,
    bgColor,
}: IAsideProps) => {
    const finalClass = [
        'mt-3.5 flex h-12 w-full items-center justify-start rounded-lg p-6  duration-150 ease-in-out transition',
        className,
        disabled
            ? 'cursor-default'
            : 'hover:font-bold hover:shadow-inner-dark hover:active:translate-y-1.5 hover:active:shadow-none',
        bgColor ?? 'hover:bg-secondaryYellow-400',
    ].join(' ');
    if (linkTo) {
        return (
            <Link to={linkTo} className={finalClass}>
                {icon}
                <span className="ml-4 text-xl">{title}</span>
            </Link>
        );
    } else {
        return (
            <li className="w-full">
                <button className={finalClass} onClick={onClick}>
                    {icon}
                    <span className="ml-4 text-xl">{title}</span>
                </button>
            </li>
        );
    }
};
