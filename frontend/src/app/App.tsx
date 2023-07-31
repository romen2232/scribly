import { Routes, Route } from 'react-router';
import Home from '../pages/home';
import New from '../pages/new';
import Folders from '../pages/folders';
import { withAuth } from '../hoc/auth/withAuth';
import Login from '../pages/login';
import { AuthProvider } from '../hoc/auth/context';

export interface IAppProps {}

const ProtectedHome = withAuth(Home);
const ProtectedNew = withAuth(New);
const ProtectedFolders = withAuth(Folders);

/**
 * Component App is the root component of our application. It renders the different
 * pages of our application depending on the current route.
 * @returns JSX.Element
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
                <Route path="/register" element={<h1>Register</h1>} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </AuthProvider>
    );
}
