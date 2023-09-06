export interface IAsideProps {
    children?: React.ReactNode;
}

export const Aside = ({ children }: IAsideProps) => {
    return (
        <aside className="flex h-full w-1/5 min-w-min flex-col items-center border-r-4 p-8">
            {children}
        </aside>
    );
};
