import { jsx as _jsx } from "react/jsx-runtime";
//The linter is disabled for this file because it is a Higher Order Component (HOC) and the linter does not recognize the props that are passed to the WrappedComponent.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './context';
import Loader from '../../pages/loader';
/**
 * The withAuth HOC (Higher Order Component) is used to protect routes from being accessed by unauthenticated users.
 * @param WrappedComponent the component to be rendered if authentication is successful
 * @returns the WithAuthComponent
 */
export const withAuth = (WrappedComponent) => {
    // Define the component that will be returned from the HOC
    const WithAuthComponent = (props) => {
        // Get necessary values from the AuthContext and useNavigate hook
        const navigate = useNavigate();
        const context = useContext(AuthContext);
        const { isAuthenticated, loading, checkToken } = context;
        // State to keep track of the component's token checking status
        const [checking, setChecking] = useState(true);
        // Effect hook to check the token and update the checking state accordingly
        useEffect(() => {
            const shouldRender = async () => {
                const result = await checkToken();
                setChecking(result);
            };
            shouldRender();
        }, [checking]);
        // Effect hook to navigate to the login page if authentication fails
        useEffect(() => {
            if (!checking && !loading && !isAuthenticated) {
                navigate('/login');
            }
        }, [isAuthenticated, loading, checking]);
        // If authentication is still loading, or token checking is in progress, display a loading message
        if (loading || checking) {
            return _jsx(Loader, {});
        }
        // If authenticated, render the protected page by passing props to the WrappedComponent
        return _jsx(WrappedComponent, { ...props });
    };
    // Set the display name for the WithAuthComponent using the getDisplayName helper function
    WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
    // Return the WithAuthComponent
    return WithAuthComponent;
};
export const withNoAuth = (WrappedComponent) => {
    const WithNoAuthComponent = (props) => {
        // Get necessary values from the AuthContext and useNavigate hook
        const navigate = useNavigate();
        const context = useContext(AuthContext);
        const { isAuthenticated, loading } = context;
        useEffect(() => {
            // If authenticated, navigate to the home page
            if (!loading && isAuthenticated) {
                navigate('/');
            }
        }, [isAuthenticated, loading]);
        // If authentication is still loading, display a loading message
        if (loading) {
            return _jsx(Loader, {});
        }
        // If not authenticated, render the login page by passing props to the WrappedComponent
        return _jsx(WrappedComponent, { ...props });
    };
    // Set the display name for the WithNoAuthComponent
    WithNoAuthComponent.displayName = `WithNoAuth(${getDisplayName(WrappedComponent)})`;
    return WithNoAuthComponent;
};
// Helper function to get the display name of a component
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
