import { Routes, Route } from 'react-router';
import Home from '../pages/home';

export interface IAppProps {}

/**
 * Component App is the root component of our application. It renders the different
 * pages of our application depending on the current route.
 * @returns JSX.Element
 */
export function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<h1>About</h1>} />
        </Routes>
    );
}
