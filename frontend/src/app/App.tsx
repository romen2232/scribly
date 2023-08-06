import { Routes, Route } from 'react-router';
import { lazy } from 'react';
import { withAuth } from '../hoc/auth/withAuth';
import { AuthProvider } from '../hoc/auth/context';
const Home = lazy(() => import('../pages/home'));
const New = lazy(() => import('../pages/new'));
const Folders = lazy(() => import('../pages/folders'));
const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));

export interface IAppProps {}

const ProtectedHome = withAuth(Home);
const ProtectedNew = withAuth(New);
const ProtectedFolders = withAuth(Folders);

/**
 * Component App is the root component of our application. It renders the different
 * pages of our application depending on the current route.
 * @returns JSX.Elemenlt
 */
export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<ProtectedHome />} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/new" element={<ProtectedNew />} />
                <Route path="/folders" element={<ProtectedFolders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </AuthProvider>
    );
}
