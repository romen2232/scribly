//The linter is disabled for this file because it is a Higher Order Component (HOC) and the linter does not recognize the props that are passed to the WrappedComponent.

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './context';
import Loader from '../../pages/loader';

/**
 * The withAuth HOC (Higher Order Component) is used to protect routes from being accessed by unauthenticated users.
 * @param WrappedComponent the component to be rendered if authentication is successful
 * @returns the WithAuthComponent
 */
export const withAuth = (WrappedComponent: React.FC<any>) => {
    // Define the component that will be returned from the HOC
    const WithAuthComponent: React.FC<any> = (
        props: React.PropsWithChildren<any>,
    ) => {
        // Get necessary values from the AuthContext and useNavigate hook
        const navigate = useNavigate();
        const context = useContext(AuthContext);
        const { isAuthenticated, loading, checkToken } = context;

        // State to keep track of the component's mounted status and token checking status
        const [isMounted, setIsMounted] = useState(false);
        const [checking, setChecking] = useState(true);

        // Effect hook to set isMounted to true when the component is mounted and false when unmounted
        useEffect(() => {
            setIsMounted(true);

            return () => {
                setIsMounted(false);
            };
        }, []);

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

        // If the component is not mounted yet, return null (don't render anything)
        if (!isMounted) {
            return null;
        }

        // If authentication is still loading, or token checking is in progress, display a loading message
        if (loading || checking) {
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>;
            return (
                <div className="flex h-screen items-center justify-center">
                    <p>Loading...</p>
                </div>
            );
        }

        // If authenticated, render the protected page by passing props to the WrappedComponent
        return <WrappedComponent {...props} />;
    };

    // Set the display name for the WithAuthComponent using the getDisplayName helper function
    WithAuthComponent.displayName = `WithAuth(${getDisplayName(
        WrappedComponent,
    )})`;

    // Return the WithAuthComponent
    return WithAuthComponent;
};

export const withNoAuth = (WrappedComponent: React.FC<any>) => {
    const WithNoAuthComponent: React.FC<any> = (
        props: React.PropsWithChildren<any>,
    ) => {
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
            return <Loader />;
        }

        // If not authenticated, render the login page by passing props to the WrappedComponent
        return <WrappedComponent {...props} />;
    };

    // Set the display name for the WithNoAuthComponent
    WithNoAuthComponent.displayName = `WithNoAuth(${getDisplayName(
        WrappedComponent,
    )})`;

    return WithNoAuthComponent;
};

// Helper function to get the display name of a component
function getDisplayName(WrappedComponent: React.FC) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
