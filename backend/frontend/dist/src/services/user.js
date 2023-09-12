import { apiClient } from './api';
/**
 * Fetches the user which username is given as a parameter
 * @param token JWT token
 * @param username Username of the user
 * @returns User object
 * @throws Error if fetching user fails
 */
const retrieveUserByUsername = async (token, username) => {
    try {
        const response = await apiClient.get(`/api/v1/user/${username}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving user: ${error}`);
    }
};
export { retrieveUserByUsername };
