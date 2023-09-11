import axios from 'axios';
import { BASE_URL, REFRESH_COOKIE_NAME } from '../utils/consts';
import { refreshToken } from './auth';
import { parseCookies, setCookie } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { keysToCamel, keysToSnake } from '../utils/functions';

const cookies = parseCookies();

/**
 * This is the base URL for the API.
 * It is the same for all requests.
 */
const apiClient = axios.create({
    baseURL: BASE_URL,
});

let retries = 0;
const MAX_RETRIES = 2;
apiClient.interceptors.response.use(
    (response) => {
        if (response.data) {
            response.data = keysToCamel(response.data);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is a 401 and the request is not already trying to refresh the token
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            retries <= MAX_RETRIES
        ) {
            originalRequest._retry = true;
            retries++;

            // Get refresh token from storage
            const storedRefreshToken = cookies[REFRESH_COOKIE_NAME];
            if (storedRefreshToken !== null)
                // Attempt to refresh the token
                try {
                    // Use the refreshToken function from your auth service
                    const { access } = await refreshToken(storedRefreshToken);

                    // Update the access token wherever it's stored
                    setCookie(undefined, AUTH_COOKIE_NAME, access, {
                        sameSite: true,
                        maxAge: 60 * 60,
                    });

                    // Set the new access token in the original request and retry it
                    originalRequest.headers[
                        'Authorization'
                    ] = `Bearer ${access}`;
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // Handle errors, maybe force logout or redirect to login page
                    return Promise.reject(refreshError);
                }
        }

        // If error is not a 401 or there's another issue refreshing, reject the promise
        return Promise.reject(error);
    },
);

apiClient.interceptors.request.use((config) => {
    if (config.data) {
        config.data = keysToSnake(config.data);
    }
    return config;
});

export { apiClient };
