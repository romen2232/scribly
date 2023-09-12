import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/functions';
import { listUserFollowers, listUserFollowings, createFollow, destroyFollow, notFollowing, } from '../services/follows';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME, USER_COOKIE_NAME } from '../utils/consts';
import Follows from './Follows';
import { Button } from './Button';
import UserList from './UserList';
import { FollowIcon } from '../assets/icons/Icons';
const UserInfo = ({ user }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const profilePhoto = user.profilePhoto;
    const { t } = useTranslation();
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [youFollow, setYouFollow] = useState(false);
    const [followsYou, setFollowsYou] = useState(false);
    const [notFollowingList, setNotFollowingList] = useState([]);
    const cookies = parseCookies();
    const loggedUser = JSON.parse(cookies[USER_COOKIE_NAME]);
    useEffect(() => {
        listUserFollowers(user.id, cookies[AUTH_COOKIE_NAME])
            .then((response) => {
            setFollowers(response);
            if (response.some((follower) => follower.follower.username === loggedUser.username)) {
                setYouFollow(true);
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }, []);
    useEffect(() => {
        listUserFollowings(user.id, cookies[AUTH_COOKIE_NAME])
            .then((response) => {
            setFollowings(response);
            if (response.some((following) => following.followed.username === loggedUser.username)) {
                setFollowsYou(true);
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }, []);
    useEffect(() => {
        notFollowing(user.id, cookies[AUTH_COOKIE_NAME])
            .then((response) => {
            setNotFollowingList(response);
        })
            .catch((error) => {
            console.log(error);
        });
    }, []);
    const handleFollow = (user) => {
        createFollow(loggedUser.id, user.id, cookies[AUTH_COOKIE_NAME]).then(() => {
            setNotFollowingList(notFollowingList.filter((u) => u.id !== user.id));
        });
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'flex flex-col h-full', children: [_jsx("div", { className: "flex", children: _jsxs("div", { className: "w-full overflow-hidden", children: [_jsx("div", { className: "mx-20 flex w-40 items-center", children: _jsx("img", { src: profilePhoto ?? '/user.png', alt: "avatar", className: "rounded-full border border-gray-500 shadow-sm" }) }), _jsx("h1", { className: "text-center text-2xl font-bold", children: user.username?.toUpperCase() }), _jsx("h2", { children: (user.firstName ?? '') + ' ' + (user.lastName ?? '') }), _jsxs("div", { children: [_jsx("h3", { className: "px-1.5 text-center text-sm text-gray-700", children: t('profile.Since') +
                                                ' ' +
                                                formatDate(user.dateJoined ?? '') }), _jsx("h4", { children: loggedUser.username !== user.username
                                                ? followsYou
                                                    ? t('profile.FollowsYou')
                                                    : t('profile.DoesNotFollowYou')
                                                : null })] }), _jsxs("div", { className: "flex justify-around p-5", children: [_jsx(Follows, { type: 'followers', follows: followers }), _jsx(Follows, { type: 'following', follows: followings })] })] }) }), _jsx("div", { className: "flex justify-around py-8", children: loggedUser.username == user.username ? (_jsx(Button, { className: 'rounded-lg font-bold text-lg', bgColor: 'secondaryYellow-500', onClick: onOpen, children: t('profile.AddFriends') })) : youFollow ? (_jsx(Button, { className: 'rounded-lg font-bold text-lg', bgColor: 'primaryPink-500', onClick: () => destroyFollow(loggedUser.id, user.id, cookies[AUTH_COOKIE_NAME]), children: t('profile.Unfollow') })) : (_jsx(Button, { className: 'rounded-lg font-bold text-lg', bgColor: 'primaryBlue-500', onClick: () => createFollow(loggedUser.id, user.id, cookies[AUTH_COOKIE_NAME]), children: t('profile.Follow') })) })] }), _jsx(Modal, { isOpen: isOpen, onOpenChange: onOpenChange, scrollBehavior: "inside", children: _jsx(ModalContent, { children: _jsxs(_Fragment, { children: [_jsx(ModalHeader, { className: "flex flex-col gap-1", children: t('profile.NotFollowing') }), _jsx(ModalBody, { children: _jsx(UserList, { users: notFollowingList, children: _jsx(Button, { className: 'rounded-lg font-bold text-lg', bgColor: 'primaryBlue-500', onClick: (e) => {
                                            e.preventDefault();
                                            handleFollow(user);
                                        }, children: _jsx(FollowIcon, { className: "w-6 h-6" }) }) }) })] }) }) })] }));
};
export default UserInfo;
