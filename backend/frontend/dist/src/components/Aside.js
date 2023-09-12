import { jsx as _jsx } from "react/jsx-runtime";
export const Aside = ({ children, className }) => {
    const finalClassName = [
        'flex h-full min-w-min flex-col items-center border-r-4 p-8',
        className,
    ];
    return _jsx("aside", { className: finalClassName.join(' '), children: children });
};
