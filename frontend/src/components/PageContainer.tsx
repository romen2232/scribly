import { FC, ReactNode } from 'react';

export interface IPageContainerProps {
    children: ReactNode;
}

export const PageContainer: FC<IPageContainerProps> = ({ children }) => {
    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8">{children}</div>
    );
};
