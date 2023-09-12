import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
export const AsideButton = ({ icon, title, linkTo, onClick, disabled, className, bgColor, }) => {
    const finalClass = [
        'mt-3.5 flex h-12 w-full items-center justify-start rounded-lg p-6  duration-150 ease-in-out transition',
        className,
        disabled
            ? 'cursor-default'
            : 'hover:font-bold hover:shadow-inner-dark hover:active:translate-y-1.5 hover:active:shadow-none',
        bgColor ?? 'hover:bg-secondaryYellow-400',
    ].join(' ');
    if (linkTo) {
        return (_jsxs(Link, { to: linkTo, className: finalClass, children: [icon, _jsx("span", { className: "ml-4 text-xl", children: title })] }));
    }
    else {
        return (_jsx("li", { className: "w-full", children: _jsxs("button", { className: finalClass, onClick: onClick, children: [icon, _jsx("span", { className: "ml-4 text-xl", children: title })] }) }));
    }
};
