import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import { retrieveUserByUsername } from '../services/user';
import { parseCookies } from 'nookies';
import { USER_COOKIE_NAME, AUTH_COOKIE_NAME } from '../utils/consts';
import { lazy, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './loader';
import { Header } from '../components/Header';
import BadgesDisplay from '../components/BadgesDisplay';
import PostsScroll from '../components/PostsScroll';
import { listNotes } from '../services/notes';
import { LogoutIcon } from '../assets/icons/Icons';
import { AuthContext } from '../hoc/auth/context';
const PageNotFound = lazy(() => import('./pageNotFound'));
const Profile = () => {
    const { t } = useTranslation();
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const cookies = parseCookies();
    const loggedUsername = JSON.parse(cookies[USER_COOKIE_NAME]).username;
    const [posts, setPosts] = useState([]);
    const { logout } = useContext(AuthContext);
    //TODO: change list Notes to list Notes by user
    useEffect(() => {
        listNotes(cookies[AUTH_COOKIE_NAME])
            .then((response) => {
            setPosts(response);
        })
            .catch((error) => {
            toast.error(t(error.message));
        });
    }, []);
    useEffect(() => {
        setLoading(true);
        retrieveUserByUsername(cookies[AUTH_COOKIE_NAME], username ?? loggedUsername)
            .then((response) => {
            setUser(response);
            setLoading(false);
        })
            .catch((error) => {
            toast.error(t(error.message));
            setLoading(false);
        });
    }, [username]);
    if (loading) {
        return _jsx(Loader, {});
    }
    if (!user) {
        return _jsx(PageNotFound, {});
    }
    return (_jsxs("div", { className: 'overflow-x-hidden', children: [_jsx(Header, { children: _jsx("div", { className: "h-fill flex items-center", children: _jsx("button", { onClick: logout, className: 'mx-16\n                        + text-3xl font-bold', children: _jsx(LogoutIcon, {}) }) }) }), _jsxs("div", { className: 'flex flex-row-reverse items-center p-8', children: [_jsx(UserInfo, { user: user }), _jsx(BadgesDisplay, { user: user })] }), _jsx(PostsScroll, { posts: posts })] }));
};
export default Profile;
