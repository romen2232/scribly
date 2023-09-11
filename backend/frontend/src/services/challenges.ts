import { apiClient } from './api';
import { components } from '../utils/openapi';

type Challenge = components['schemas']['Challenge'];
type User = components['schemas']['User'];
type ChallengeUser = components['schemas']['ChallengeUser'];

/** This request lists all available challenges.
 * @param token JWT token
 * @returns List of all challenges
 * @throws Error if listing challenges fails
 */
const listChallenges = async (token: string): Promise<Challenge[]> => {
    try {
        const response = await apiClient.get<Challenge[]>(
            '/api/v1/challenges/',
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error listing challenges: ${error}`);
    }
};

/** This request creates a new challenge
 * @param challenge Challenge object
 * @param token JWT token
 * @returns Created challenge
 * @throws Error if creating challenge fails
 */
const createChallenge = async (
    challenge: Challenge,
    token: string,
): Promise<Challenge> => {
    try {
        const response = await apiClient.post<Challenge>(
            '/api/v1/challenges/',
            challenge,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error creating challenge: ${error}`);
    }
};

/** This request lists all users participating in a specific challenge.
 * @param challengeId Challenge ID
 * @param token JWT token
 * @returns List of all users participating in a specific challenge
 * @throws Error if listing challenge users fails
 */
const listChallengeUsers = async (
    challengeId: number,
    token: string,
): Promise<User[]> => {
    try {
        const response = await apiClient.get<User[]>(
            `/api/v1/challenge/${challengeId}/users/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error listing challenge users: ${error}`);
    }
};

/** This request retrieves specific challenge details based on the provided challenge ID.
 * @param id Challenge ID
 * @param token JWT token
 * @returns Challenge
 * @throws Error if retrieving challenge fails
 */
const retrieveChallenge = async (
    id: number,
    token: string,
): Promise<Challenge> => {
    try {
        const response = await apiClient.get<Challenge>(
            `/api/v1/challenge/${id}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving challenge: ${error}`);
    }
};

/** This request updates the information for the specified challenge.
 * @param id Challenge ID to update
 * @param challenge Challenge to update
 * @param token JWT token
 * @returns Updated challenge
 * @throws Error if updating challenge fails
 */
const updateChallenge = async (
    id: number,
    challenge: Challenge,
    token: string,
): Promise<Challenge> => {
    try {
        const response = await apiClient.put<Challenge>(
            `/api/v1/challenge/${id}/`,
            challenge,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error updating challenge: ${error}`);
    }
};

/** This request partially updates the information for the specified challenge.
 * @param id Challenge ID to update
 * @param challenge Challenge to update
 * @param token JWT token
 * @returns Updated challenge
 * @throws Error if updating challenge fails
 */
const partialUpdateChallenge = async (
    id: number,
    challenge: Partial<Challenge>,
    token: string,
): Promise<Challenge> => {
    try {
        const response = await apiClient.patch<Challenge>(
            `/api/v1/challenge/${id}/`,
            challenge,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error updating challenge: ${error}`);
    }
};

/** This request deletes the specified challenge.
 * @param id Challenge ID to delete
 * @param token JWT token
 * @throws Error if deleting challenge fails
 * @returns void
 */
const destroyChallenge = async (id: number, token: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/challenge/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw new Error(`Error deleting challenge: ${error}`);
    }
};

/** This request lists all challenges for a given user.
 * @param userId User ID
 * @param token JWT token
 * @returns List of all challenges for a given user
 * @throws Error if listing user challenges fails
 */
const listUserChallenges = async (
    userId: number,
    token: string,
): Promise<Challenge[]> => {
    try {
        const response = await apiClient.get<Challenge[]>(
            `/api/v1/user/${userId}/challenges/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error listing user challenges: ${error}`);
    }
};

/** This request retrieves a specific challenge user relation.
 * @param userId User ID
 * @param challengeId Challenge ID
 * @param token JWT token
 * @returns Challenge
 * @throws Error if retrieving user challenge fails
 */
const retrieveUserChallenge = async (
    userId: number,
    challengeId: number,
    token: string,
): Promise<ChallengeUser> => {
    try {
        const response = await apiClient.get<ChallengeUser>(
            `/api/v1/user/${userId}/challenge/${challengeId}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving user challenge: ${error}`);
    }
};

/** This request deletes a specific challenge user relation.
 * @param userId User ID
 * @param challengeId Challenge ID
 * @param token JWT token
 * @throws Error if deleting user challenge fails
 * @returns void
 */
const destroyUserChallenge = async (
    userId: number,
    challengeId: number,
    token: string,
): Promise<void> => {
    try {
        await apiClient.delete(
            `/api/v1/user/${userId}/challenge/${challengeId}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
    } catch (error) {
        throw new Error(`Error deleting user challenge: ${error}`);
    }
};

/** This request creates a new challenge user relation.
 * @param challengeUser Challenge user relation
 * @param token JWT token
 * @returns Created challenge user relation
 * @throws Error if creating user challenge fails
 */
const createUserChallenge = async (
    challengeUser: ChallengeUser,
    token: string,
): Promise<ChallengeUser> => {
    try {
        const response = await apiClient.post<ChallengeUser>(
            '/api/v1/challenge/user/',
            challengeUser,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error creating user challenge: ${error}`);
    }
};

export {
    listChallenges,
    createChallenge,
    listChallengeUsers,
    retrieveChallenge,
    updateChallenge,
    partialUpdateChallenge,
    destroyChallenge,
    listUserChallenges,
    retrieveUserChallenge,
    destroyUserChallenge,
    createUserChallenge,
};
