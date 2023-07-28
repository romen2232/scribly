import { Routes, Route } from 'react-router';
import Home from '../pages/home';
import New from '../pages/new';
import Folders from '../pages/folders';
import { AuthProvider } from '../hoc/auth/context';
import Login from '../pages/login';

export interface IAppProps {}

/**
 * Component App is the root component of our application. It renders the different
 * pages of our application depending on the current route.
 * @returns JSX.Element
 */
export function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/new" element={<New />} />
                <Route path="/folders" element={<Folders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<h1>Register</h1>} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </AuthProvider>
    );
}
