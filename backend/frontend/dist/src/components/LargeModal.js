import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import useOnClickOutsideAndEsc from '../hooks/useOnClickOutsideAndEsc';
export function LargeModal({ isLargeModalOpen, onClose, type, children, }) {
    if (!isLargeModalOpen)
        return null;
    const ref = useRef(null);
    useOnClickOutsideAndEsc(ref, onClose);
    return (_jsx("div", { className: "absolute bottom-0 left-0 z-10 h-full w-full backdrop-blur-sm", children: _jsx("div", { className: `relative h-3/4 bg-tiviBlack text-black dark:bg-tiviWhite ${type === 'category' ? 'top-[25%]' : ''}`, ref: ref, children: children }) }));
}
