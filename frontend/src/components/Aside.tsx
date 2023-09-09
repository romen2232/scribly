export interface IAsideProps {
    children?: React.ReactNode;
    className?: string;
}

export const Aside = ({ children, className }: IAsideProps) => {
    const finalClassName = [
        'flex h-full min-w-min flex-col items-center border-r-4 p-8',
        className,
    ];
    return <aside className={finalClassName.join(' ')}>{children}</aside>;
};
