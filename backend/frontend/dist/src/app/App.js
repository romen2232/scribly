import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import { withAuth, withNoAuth } from '../hoc/auth/withAuth';
import { AuthProvider } from '../hoc/auth/context';
import Loader from '../pages/loader';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import LandingPage from '../pages/landingPage';
import PageNotFound from '../pages/pageNotFound';
const Home = lazy(() => import('../pages/home'));
const New = lazy(() => import('../pages/new'));
const Folders = lazy(() => import('../pages/folders'));
const Activate = lazy(() => import('../pages/activate'));
const Profile = lazy(() => import('../pages/profile'));
const Lesson = lazy(() => import('../pages/lesson'));
const ProtectedHome = withAuth(Home);
const ProtectedNew = withAuth(New);
const ProtectedFolders = withAuth(Folders);
const ProtectedProfile = withAuth(Profile);
const ProtectedLesson = withAuth(Lesson);
const ProtectedLogin = withNoAuth(LandingPage);
const ProtectedRegister = withNoAuth(LandingPage);
/**
 * Component App is the root component of our application. It renders the different
 * pages of our application depending on the current route.
 * @returns JSX.Element
 */
export default function App() {
    const { t } = useTranslation();
    return (_jsxs(_Fragment, { children: [_jsx(ToastContainer, { position: "top-right", autoClose: 5000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true, theme: "light" }), _jsx(AuthProvider, { children: _jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: t('/'), element: _jsx(ProtectedHome, {}) }), _jsx(Route, { path: t('/about'), element: _jsx(ProtectedHome, {}) }), _jsx(Route, { path: t('/note'), element: _jsx(ProtectedNew, {}) }), _jsx(Route, { path: t('/folders'), element: _jsx(ProtectedFolders, {}) }), _jsx(Route, { path: t('/login'), element: _jsx(ProtectedLogin, {}) }), _jsx(Route, { path: t('/register'), element: _jsx(ProtectedRegister, {}) }), _jsx(Route, { path: t('/activate') + '/:token', element: _jsx(Activate, {}) }), _jsx(Route, { path: t('/activate'), element: _jsx(Activate, {}) }), _jsx(Route, { path: t('/profile') + '/:username', element: _jsx(ProtectedProfile, {}) }), _jsx(Route, { path: t('/profile'), element: _jsx(ProtectedProfile, {}) }), _jsx(Route, { path: t('/lesson') + '/:lessonId', element: _jsx(ProtectedLesson, {}) }), _jsx(Route, { path: "*", element: _jsx(PageNotFound, {}) })] }) }) })] }));
}
