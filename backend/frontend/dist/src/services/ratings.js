import { apiClient } from './api';
import { parseCookies } from 'nookies';
import { USER_COOKIE_NAME } from '../utils/consts';
/** This request retrieves a list of all ratings.
 * @param token JWT token
 * @returns List of ratings
 * @throws Error if retrieving ratings fails
 */
const listRatings = async (token) => {
    try {
        const response = await apiClient.get('/api/v1/ratings/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving ratings: ${error}`);
    }
};
/** This request creates a new rating.
 * @param rating Rating to create
 * @param token JWT token
 * @returns Created rating
 * @throws Error if creating rating fails
 */
const createRating = async (rating, token) => {
    try {
        const response = await apiClient.post('/api/v1/ratings/', rating, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error creating rating: ${error}`);
    }
};
/** This request retrieves all ratings from the specified challenge.
 * @param challengeId Challenge ID
 * @param token JWT token
 * @returns List of ratings
 * @throws Error if retrieving ratings fails
 */
const listChallengeRatings = async (challengeId, token) => {
    try {
        const response = await apiClient.get(`/api/v1/ratings/challenge/${challengeId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving challenge ratings: ${error}`);
    }
};
/** This request retrieves all ratings from the specified task.
 * @param taskId Task ID
 * @param token JWT token
 * @returns List of ratings
 * @throws Error if retrieving ratings fails
 */
const listTaskRatings = async (taskId, token) => {
    try {
        const response = await apiClient.get(`/api/v1/ratings/task/${taskId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving task ratings: ${error}`);
    }
};
/** This request retrieves all ratings from the specified user.
 * @param userId User ID
 * @param token JWT token
 * @returns List of ratings
 * @throws Error if retrieving ratings fails
 */
const listUserRatings = async (userId, token) => {
    try {
        const response = await apiClient.get(`/api/v1/ratings/user/${userId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving user ratings: ${error}`);
    }
};
/** This request retrieves a specific rating based on the provided user and challenge IDs.
 * @param userId User ID
 * @param challengeId Challenge ID
 * @param token JWT token
 * @returns Rating
 * @throws Error if retrieving rating fails
 */
const retrieveUserChallengeRating = async (userId, challengeId, token) => {
    try {
        const response = await apiClient.get(`/api/v1/ratings/user/${userId}/challenge/${challengeId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving user challenge rating: ${error}`);
    }
};
/** This request retrieves a specific rating based on the provided user and task IDs.
 * @param userId User ID
 * @param taskId Task ID
 * @param token JWT token
 * @returns Rating
 * @throws Error if retrieving rating fails
 */
const retrieveUserTaskRating = async (userId, taskId, token) => {
    try {
        const response = await apiClient.get(`/api/v1/ratings/user/${userId}/task/${taskId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving user task rating: ${error}`);
    }
};
/** This request partially updates a specific rating based on the provided user and challenge IDs.
 * @param userId User ID
 * @param challengeId Challenge ID
 * @param rating Rating to update
 * @param token JWT token
 * @returns Updated rating
 * @throws Error if updating rating fails
 */
const updateUserChallengeRating = async (userId, challengeId, rating, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/ratings/user/${userId}/challenge/${challengeId}/`, rating, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating user challenge rating: ${error}`);
    }
};
/** This request partially updates a specific rating based on the provided user and task IDs.
 * @param userId User ID
 * @param taskId Task ID
 * @param rating Rating to update
 * @param token JWT token
 * @returns Updated rating
 * @throws Error if updating rating fails
 */
const updateUserTaskRating = async (userId, taskId, rating, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/ratings/user/${userId}/task/${taskId}/`, rating, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating user task rating: ${error}`);
    }
};
/** This request deletes a specific rating based on the provided user and challenge IDs.
 * @param userId User ID
 * @param challengeId Challenge ID
 * @param token JWT token
 * @throws Error if deleting rating fails
 */
const deleteUserChallengeRating = async (userId, challengeId, token) => {
    try {
        await apiClient.delete(`/api/v1/ratings/user/${userId}/challenge/${challengeId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting user challenge rating: ${error}`);
    }
};
/** This request deletes a specific rating based on the provided user and task IDs.
 * @param userId User ID
 * @param taskId Task ID
 * @param token JWT token
 * @throws Error if deleting rating fails
 */
const deleteUserTaskRating = async (userId, taskId, token) => {
    try {
        await apiClient.delete(`/api/v1/ratings/user/${userId}/task/${taskId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting user task rating: ${error}`);
    }
};
const retrieveUserNoteRating = async (noteId, token, userId) => {
    let idUser = userId;
    if (!idUser) {
        const cookies = parseCookies();
        idUser = JSON.parse(cookies[USER_COOKIE_NAME]).id;
    }
    try {
        const response = await apiClient.get(`/api/v1/ratings/user/${idUser}/note/${noteId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving user note rating: ${error}`);
    }
};
const createUserNoteRating = async (rating, token) => {
    try {
        const response = await apiClient.post(`/api/v1/ratings/note/`, rating, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error creating user note rating: ${error}`);
    }
};
const updateUserNoteRating = async (userId, noteId, rating, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/ratings/user/${userId}/note/${noteId}/`, rating, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating user note rating: ${error}`);
    }
};
const partialUpdateUserNoteRating = async (noteId, rating, token, userId) => {
    let idUser = userId;
    if (!idUser) {
        const cookies = parseCookies();
        idUser = JSON.parse(cookies[USER_COOKIE_NAME]).id;
    }
    try {
        const response = await apiClient.patch(`/api/v1/ratings/user/${idUser}/note/${noteId}/`, rating, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating user note rating: ${error}`);
    }
};
const deleteUserNoteRating = async (userId, noteId, token) => {
    try {
        await apiClient.delete(`/api/v1/ratings/user/${userId}/note/${noteId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting user note rating: ${error}`);
    }
};
export { listRatings, createRating, listChallengeRatings, listTaskRatings, listUserRatings, retrieveUserChallengeRating, retrieveUserTaskRating, updateUserChallengeRating, updateUserTaskRating, deleteUserChallengeRating, deleteUserTaskRating, retrieveUserNoteRating, createUserNoteRating, updateUserNoteRating, partialUpdateUserNoteRating, deleteUserNoteRating, };
