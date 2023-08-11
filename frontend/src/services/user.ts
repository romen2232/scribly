import { apiClient } from './api';
import { components } from '../utils/openapi';

type User = components['schemas']['User'];

/**
 * Fetches the user which username is given as a parameter
 * @param token JWT token
 * @param username Username of the user
 * @returns User object
 * @throws Error if fetching user fails
 */
const retrieveUserByUsername = async (
    token: string,
    username: string,
): Promise<User> => {
    try {
        const response = await apiClient.get<User>(
            `/api/v1/user/${username}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving user: ${error}`);
    }
};

export { retrieveUserByUsername };
