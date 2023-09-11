import { FC, ReactNode } from 'react';

export interface IPageContainerProps {
    children: ReactNode;
}

export const PageContainer: FC<IPageContainerProps> = ({ children }) => {
    return (
        <div className="mx-auto flex h-full max-w-3xl flex-col  items-center justify-center px-4 duration-300 transition-opacity sm:px-6 md:px-8">
            {children}
        </div>
    );
};
