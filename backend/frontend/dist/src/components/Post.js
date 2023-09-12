import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Rating from './Rating';
import { useState } from 'react';
import { useEffect } from 'react';
import { createUserNoteRating, partialUpdateUserNoteRating, retrieveUserNoteRating, } from '../services/ratings';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
export default function Post(props) {
    const { t } = useTranslation();
    const averageRating = Math.round(props.post.noteAverageRating ?? 0);
    const [UserRating, setUserRating] = useState();
    const [patched, setPatched] = useState(false);
    const cookies = parseCookies();
    useEffect(() => {
        retrieveUserNoteRating(props.post.id ?? -1, cookies[AUTH_COOKIE_NAME])
            .then((response) => {
            setUserRating(response.rating);
        })
            .catch(() => {
            createUserNoteRating({
                note: props.post.id ?? -1,
                rating: UserRating ?? 0,
            }, cookies[AUTH_COOKIE_NAME]);
        });
    }, []);
    useEffect(() => {
        if (patched) {
            partialUpdateUserNoteRating(props.post.id ?? -1, {
                note: props.post.id ?? -1,
                rating: UserRating ?? 0,
            }, cookies[AUTH_COOKIE_NAME]);
            setPatched(false);
        }
    }, [UserRating]);
    return (_jsxs("div", { className: "my-4 flex w-full max-w-3xl flex-col rounded-md border bg-white shadow-md", children: [_jsxs("div", { className: "flex flex-row justify-between px-5 py-2", children: [_jsxs("div", { className: "flex w-full flex-col items-start gap-1", children: [_jsxs("div", { className: "flex w-full justify-between pr-8", children: [_jsx("p", { className: "text-lg font-bold text-gray-700", children: props.post.noteName }), _jsx("p", { className: "text-xs text-gray-400", children: new Date(props.post.noteLastModified ?? '2021-01-01').toLocaleDateString() })] }), _jsx(Rating, { rating: UserRating ?? averageRating, handleRating: (rating) => {
                                    setPatched(true);
                                    setUserRating(rating);
                                } })] }), _jsx(Link, { to: t('/profile') + '/' + props.post.user?.username, className: " flex w-16 items-center", children: _jsx("img", { src: props.post.user?.profilePhoto ?? '/user.png', alt: props.post.user?.username ?? 'user', className: "rounded-full border border-gray-500 shadow-sm" }) })] }), _jsx("div", { className: "flex flex-col px-5 py-2", children: (props.post.noteContent?.length ?? 0 > 500) ? (_jsxs("p", { className: "text-sm text-gray-500", children: [props.post.noteContent?.substring(0, 500) + '...', _jsx(Link, { to: "", className: "rounded-b-lg p-4 text-center font-semibold text-gray-600 hover:text-tiviElectricPurple-100", children: t('profile.SeeMore') })] })) : (_jsx("p", { className: "text-sm text-gray-500", children: props.post.noteContent })) })] }));
}
