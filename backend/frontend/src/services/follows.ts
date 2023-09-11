import { apiClient } from './api';
import { User, Follow } from '../utils/types';

/** This request lists all the followers of the user with the given ID.
 * @param userId User ID
 * @param token JWT token
 * @returns List of all followers of the user with the given ID
 * @throws Error if listing user followers fails
 */
const listUserFollowers = async (
    userId: number,
    token: string,
): Promise<Follow[]> => {
    try {
        const response = await apiClient.get<Follow[]>(
            `/api/v1/follows/${userId}/followers/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error listing user followers: ${error}`);
    }
};

/** This request lists all the follows that the user with the given ID is following.
 * @param userId User ID
 * @param token JWT token
 * @returns List of all users that the user with the given ID is following
 * @throws Error if listing user followings fails
 */
const listUserFollowings = async (
    userId: number,
    token: string,
): Promise<Follow[]> => {
    try {
        const response = await apiClient.get<Follow[]>(
            `/api/v1/follows/${userId}/following/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error listing user followings: ${error}`);
    }
};

/** This request retrieves the details of the follow relation between the follower and the followed.
 * @param followerId Follower ID
 * @param followedId Followed ID
 * @param token JWT token
 * @returns Follow relation details
 * @throws Error if retrieving follow relation fails
 */
const retrieveFollow = async (
    followerId: number,
    followedId: number,
    token: string,
): Promise<Follow> => {
    try {
        const response = await apiClient.get<Follow>(
            `/api/v1/follows/${followerId}/follow/${followedId}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving follow relation: ${error}`);
    }
};

/** This request deletes the follow relation between the follower and the followed.
 * @param followerId Follower ID
 * @param followedId Followed ID
 * @param token JWT token
 * @throws Error if deleting follow relation fails
 * @returns void
 */
const destroyFollow = async (
    followerId: number,
    followedId: number,
    token: string,
): Promise<void> => {
    try {
        await apiClient.delete(
            `/api/v1/follows/${followerId}/unfollow/${followedId}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
    } catch (error) {
        throw new Error(`Error deleting follow relation: ${error}`);
    }
};

/** This request retrieves the friends (followed and following) of the user with the given ID.
 * @param userId User ID
 * @param token JWT token
 * @returns List of all friends of the user with the given ID
 * @throws Error if retrieving user friends fails
 */
const retrieveUserFriends = async (
    userId: number,
    token: string,
): Promise<User[]> => {
    try {
        const response = await apiClient.get<User[]>(
            `/api/v1/friends/${userId}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving user friends: ${error}`);
    }
};

/** This request lists all the follows.
 * @param token JWT token
 * @returns List of all follows
 * @throws Error if listing follows fails
 */
const listFollows = async (token: string): Promise<Follow[]> => {
    try {
        const response = await apiClient.get<Follow[]>('/api/v1/follows/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error listing follows: ${error}`);
    }
};

/** This request creates a new follow relation.
 * @param follower Follower ID
 * @param followed Followed ID
 * @param token JWT token
 * @returns Follow relation
 * @throws Error if creating follow relation fails
 */
const createFollow = async (
    follower: number,
    followed: number,
    token: string,
): Promise<Follow> => {
    try {
        const response = await apiClient.post<Follow>(
            '/api/v1/follows/',
            { follower, followed },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error creating follow relation: ${error}`);
    }
};

const notFollowing = async (
    userId: number,
    token: string,
): Promise<User[]> => {
    try {
        const response = await apiClient.get<User[]>(
            `api/v1/follows/notFollowing/${userId}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error listing users not followed: ${error}`);
    }
}

export {
    listUserFollowers,
    listUserFollowings,
    retrieveFollow,
    destroyFollow,
    retrieveUserFriends,
    listFollows,
    createFollow,
    notFollowing
};
