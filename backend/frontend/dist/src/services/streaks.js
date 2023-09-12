import { apiClient } from './api';
/** This request lists all available streaks.
 * @param token JWT token
 * @returns List of streaks
 * @throws Error if listing streaks fails
 * @returns List of streaks
 */
const listStreaks = async (token) => {
    try {
        const response = await apiClient.get('/api/v1/streaks/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error listing streaks: ${error}`);
    }
};
/** This request creates a new streak.
 * @param streak Streak to create
 * @param token JWT token
 * @returns Created streak
 * @throws Error if creating streak fails
 */
const createStreak = async (streak, token) => {
    try {
        const response = await apiClient.post('/api/v1/streaks/', streak, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error creating streak: ${error}`);
    }
};
/** This request retrieves specific streak details based on the provided streak ID.
 * @param id Streak ID to retrieve
 * @param token JWT token
 * @returns Retrieved streak
 * @throws Error if retrieving streak fails
 */
const retrieveStreak = async (id, token) => {
    try {
        const response = await apiClient.get(`/api/v1/streak/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving streak: ${error}`);
    }
};
/** This request updates the information for the specified streak.
 * @param id Streak ID to update
 * @param streak Streak to update
 * @param token JWT token
 * @returns Updated streak
 * @throws Error if updating streak fails
 */
const updateStreak = async (id, streak, token) => {
    try {
        const response = await apiClient.put(`/api/v1/streak/${id}/`, streak, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating streak: ${error}`);
    }
};
/** This request partially updates the information for the specified streak.
 * @param id Streak ID to update
 * @param streak Streak to update
 * @param token JWT token
 * @returns Updated streak
 * @throws Error if updating streak fails
 */
const partialUpdateStreak = async (id, streak, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/streak/${id}/`, streak, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating streak: ${error}`);
    }
};
/** This request deletes the specified streak.
 * @param id Streak ID to delete
 * @param token JWT token
 * @throws Error if deleting streak fails
 */
const destroyStreak = async (id, token) => {
    try {
        await apiClient.delete(`/api/v1/streak/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting streak: ${error}`);
    }
};
export { listStreaks, createStreak, retrieveStreak, updateStreak, partialUpdateStreak, destroyStreak, };
