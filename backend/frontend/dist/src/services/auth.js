import { apiClient } from './api';
/**
 * Fetches the logged in user from the API using the JWT token
 * @param token JWT token
 * @returns User object of the logged in user
 * @throws Error if fetching user fails
 */
const retrieveUser = async (token) => {
    try {
        const response = await apiClient.get('/api/v1/auth/me/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving user: ${error}`);
    }
};
/**
 * Registers a new user
 * @param user User to register
 * @returns Registered user
 * @throws Error if registering user fails
 */
const registerUser = async (user) => {
    try {
        const response = await apiClient.post('/api/v1/auth/register/', user, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        throw new Error(`Error registering user: ${error}`);
    }
};
/**
 * Activates a user
 * @param token Activation token
 * @returns Activated user
 * @throws Error if activating user fails
 * TODO: I don't know if this works
 */
const activateUser = async (token) => {
    try {
        const response = await apiClient.post('/api/v1/auth/activate/', { token }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error activating user: ${error}`);
    }
};
/**
 * Logs in a user
 * @param email User email
 * @param password User password
 * @returns JWT token
 * @throws Error if logging in user fails
 */
const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('/api/v1/auth/login/', { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error logging in user: ${error}`);
    }
};
/**
 * Refreshes a user's JWT token
 * @param refresh Refresh token
 * @returns Refreshed user
 * @throws Error if refreshing user fails
 */
const refreshToken = async (refresh) => {
    try {
        const response = await apiClient.post('/api/v1/auth/login/refresh/', { refresh }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error refreshing token: ${error}`);
    }
};
/**
 * Updates a user
 * @param user User to update
 * @param token JWT token
 * @returns Updated user
 * @throws Error if updating user fails
 * TODO: Implement this in the backend
 */
const updateUser = async (user, token) => {
    try {
        const response = await apiClient.patch('/api/v1/auth/update/', user, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating user: ${error}`);
    }
};
/**
 * Updates a user's password
 * @param currentPassword User's current password
 * @param newPassword User's new password
 * @param token JWT token
 * @returns Updated user
 * @throws Error if updating user fails
 */
const updateUserPassword = async (currentPassword, newPassword, token) => {
    try {
        const response = await apiClient.patch('/api/v1/auth/update/password/', { currentPassword, newPassword }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating user password: ${error}`);
    }
};
/**
 * Deletes the logged in user
 * @param token JWT token
 * @returns void
 * @throws Error if deleting user fails
 */
const deleteUser = async (token) => {
    try {
        const response = await apiClient.delete('/api/v1/auth/delete/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error deleting user: ${error}`);
    }
};
export { retrieveUser, registerUser, activateUser, loginUser, refreshToken, updateUserPassword, updateUser, deleteUser, };
