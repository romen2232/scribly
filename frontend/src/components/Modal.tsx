import * as React from 'react';
import { useRef } from 'react';
import useOnClickOutsideAndEsc from '../hooks/useOnClickOutsideAndEsc';

export interface IModalProps {
    isModalOpen: boolean;
    type?: string;
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal({ isModalOpen, onClose, type, children }: IModalProps) {
    if (!isModalOpen) return null;

    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutsideAndEsc(ref, onClose);

    return (
        <div className="absolute bottom-0 left-0 z-10 h-full w-full backdrop-blur-sm">
            <div
                className={`relative h-3/4 bg-tiviBlack text-black dark:bg-tiviWhite ${
                    type === 'forest' ? 'top-[25%]' : ''
                }`}
                ref={ref}
            >
                {children}
            </div>
        </div>
    );
}
