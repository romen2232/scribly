import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { t } from 'i18next';
import { Avatar } from '@nextui-org/react';
import { RightIcon } from '../assets/icons/Icons';
const UserItem = ({ user, children }) => {
    const { username, profilePhoto, experience } = user;
    return (_jsxs("div", { className: "flex items-center justify-between border-b-2 p-4", children: [_jsxs("div", { className: "flex items-center gap-6", children: [_jsx(Avatar, { src: profilePhoto, name: username ?? '', showFallback: true, size: "md" }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-bold", children: username }), _jsx("p", { className: "text-sm text-gray-500", children: experience + ' ' + t('TotalXp') })] })] }), children ?? _jsx(RightIcon, { className: "text-gray-500" })] }));
};
export default UserItem;
