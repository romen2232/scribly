import { Link } from 'react-router-dom';

export interface IHyperlinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    color: 'blue' | 'pink';
}

export function Hyperlink({ to, children, className, color }: IHyperlinkProps) {
    const linkColor =
        color === 'blue'
            ? 'text-primaryBlue-700 hover:text-primaryPink-700 after:bg-primaryPink-700'
            : 'text-primaryPink-700 hover:text-primaryBlue-700 after:bg-primaryBlue-700';
    const finalClasses = [
        "relative font-bold  duration-500 transition-colors after:absolute after:bottom-[-0.25em] after:left-0 after:h-[0.15rem] after:w-0 after:bg-primaryBlue-600 after:duration-500 after:content-[''] after:transition-all after:hover:w-full",
        linkColor,
        className,
    ];

    return (
        <span className="mt-[3em]">
            <Link to={to} className={finalClasses.join(' ')}>
                {children}
            </Link>
        </span>
    );
}
