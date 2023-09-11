import { useRef } from 'react';
import useOnClickOutsideAndEsc from '../hooks/useOnClickOutsideAndEsc';

export interface ILargeModalProps {
    isLargeModalOpen: boolean;
    type?: string;
    onClose: () => void;
    children: React.ReactNode;
}

export function LargeModal({
    isLargeModalOpen,
    onClose,
    type,
    children,
}: ILargeModalProps) {
    if (!isLargeModalOpen) return null;

    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutsideAndEsc(ref, onClose);

    return (
        <div className="absolute bottom-0 left-0 z-10 h-full w-full backdrop-blur-sm">
            <div
                className={`relative h-3/4 bg-tiviBlack text-black dark:bg-tiviWhite ${
                    type === 'category' ? 'top-[25%]' : ''
                }`}
                ref={ref}
            >
                {children}
            </div>
        </div>
    );
}
