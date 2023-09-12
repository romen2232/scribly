import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
// import { FaFireAlt } from 'react-icons/fa';
import { CommunityIcon, ProfileIcon } from '../assets/icons/Icons';
import { useTranslation } from 'react-i18next';
import WavyHeader from './WavyHeader';
// export function Header(props: IHeaderProps) {
export function Header() {
    const { t } = useTranslation();
    return (_jsx(WavyHeader, { color: "yellow", children: _jsxs("nav", { className: "\n          text-tiviWhite\n          mb-10\n          flex\n          h-full\n          w-full\n          flex-row\n          items-center\n          justify-around\n          lg:flex-col-reverse\n          ", children: [_jsx(Link, { to: t('/community'), children: _jsx(CommunityIcon, { className: "hover:text-tiviBlack h-16 w-16 duration-300 ease-in-out transition" }) }), _jsx(Link, { to: t('/profile'), children: _jsx(ProfileIcon, { className: "hover:text-tiviBlack h-16 w-16 duration-300 ease-in-out transition" }) })] }) }));
}
