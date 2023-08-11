import { Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import { withAuth } from '../hoc/auth/withAuth';
import { AuthProvider } from '../hoc/auth/context';
import Loader from '../pages/loader';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const Home = lazy(() => import('../pages/home'));
const New = lazy(() => import('../pages/new'));
const Folders = lazy(() => import('../pages/folders'));
const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const Activate = lazy(() => import('../pages/activate'));
const Profile = lazy(() => import('../pages/profile'));

export interface IAppProps {}

const ProtectedHome = withAuth(Home);
const ProtectedNew = withAuth(New);
const ProtectedFolders = withAuth(Folders);
const ProtectedProfile = withAuth(Profile);

/**
 * Component App is the root component of our application. It renders the different
 * pages of our application depending on the current route.
 * @returns JSX.Element
 */
export default function App() {
    const { t } = useTranslation();

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <AuthProvider>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path={t('/')} element={<ProtectedHome />} />
                        <Route path={t('/about')} element={<h1>About</h1>} />
                        <Route path={t('/new')} element={<ProtectedNew />} />
                        <Route
                            path={t('/folders')}
                            element={<ProtectedFolders />}
                        />
                        <Route path={t('/login')} element={<Login />} />
                        <Route path={t('/register')} element={<Register />} />
                        <Route
                            path={t('/activate') + '/:token'}
                            element={<Activate />}
                        />
                        <Route path={t('/activate')} element={<Activate />} />

                        <Route
                            path={t('/profile') + '/:username'}
                            element={<ProtectedProfile />}
                        />

                        <Route
                            path={t('/profile')}
                            element={<ProtectedProfile />}
                        />

                        <Route path="*" element={<h1>Not Found</h1>} />
                    </Routes>
                </Suspense>
            </AuthProvider>
        </>
    );
}
