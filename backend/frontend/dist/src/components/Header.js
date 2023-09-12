import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BackIcon } from '../assets/icons/Icons';
import { useNavigate } from 'react-router';
import Scribly from './Scribly';
import { Link } from 'react-router-dom';
export function Header(props) {
    const navigate = useNavigate();
    return (_jsxs("header", { className: "flex w-full justify-between", children: [_jsxs("nav", { className: "flex w-full items-center justify-between bg-mainBackground-100 px-4 py-2", children: [_jsx("button", { onClick: () => navigate(-1), className: "duration-150 ease-in-out transition hover:text-primaryBlue-500", children: _jsx(BackIcon, { className: "h-16 w-16 " }) }), _jsx(Link, { to: '/', children: _jsx(Scribly, { className: "text-5xl duration-150 ease-in-out transition hover:text-primaryPink-500" }) })] }), props.children] }));
}
