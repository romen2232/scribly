import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, } from '@nextui-org/react';
import UserList from './UserList';
import { t } from 'i18next';
const Follows = ({ type, follows }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    let users = null;
    let followButton = null;
    if (type === 'followers') {
        users = follows.map((follow) => follow.follower);
        followButton = (_jsx("button", { className: "text-sm text-gray-500 hover:text-gray-700", children: t('profile.follow') }));
    }
    if (type === 'following') {
        users = follows.map((follow) => follow.followed);
    }
    const capitalize = type.charAt(0).toUpperCase() + type.slice(1);
    return (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs("button", { onClick: onOpen, className: "text-sm text-gray-500 hover:text-gray-700", ...(follows.length === 0 && { disabled: true }), children: [follows.length, " ", t('profile.' + capitalize)] }), _jsx(Modal, { isOpen: isOpen, onOpenChange: onOpenChange, scrollBehavior: "inside", children: _jsx(ModalContent, { children: _jsxs(_Fragment, { children: [_jsx(ModalHeader, { className: "flex flex-col gap-1", children: capitalize }), _jsx(ModalBody, { children: _jsx(UserList, { users: users ?? [], children: followButton }) })] }) }) })] }));
};
export default Follows;
