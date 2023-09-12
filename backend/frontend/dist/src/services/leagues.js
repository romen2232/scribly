import { apiClient } from './api';
/** This request retrieves a list of all leagues.
 * @param token JWT token
 * @returns List of leagues
 * @throws Error if retrieving leagues fails
 */
const listLeagues = async (token) => {
    try {
        const response = await apiClient.get('/api/v1/leagues/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving leagues: ${error}`);
    }
};
/** This request creates a new league.
 * @param league League to create
 * @param token JWT token
 * @returns Created league
 * @throws Error if creating league fails
 */
const createLeague = async (league, token) => {
    try {
        const response = await apiClient.post('/api/v1/leagues/', league, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error creating league: ${error}`);
    }
};
/** This request retrieves specific league details based on the provided league ID.
 * @param id League ID
 * @param token JWT token
 * @returns League
 * @throws Error if retrieving league fails
 */
const retrieveLeague = async (id, token) => {
    try {
        const response = await apiClient.get(`/api/v1/league/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving league: ${error}`);
    }
};
/** This request updates the information for the specified league.
 * @param id League ID to update
 * @param league League to update
 * @param token JWT token
 * @returns Updated league
 * @throws Error if updating league fails
 */
const updateLeague = async (id, league, token) => {
    try {
        const response = await apiClient.put(`/api/v1/league/${id}/`, league, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating league: ${error}`);
    }
};
/** This request partially updates the information for the specified league.
 * @param id League ID to update partially
 * @param league League to update
 * @param token JWT token
 * @returns Updated league
 * @throws Error if updating league fails
 */
const partialUpdateLeague = async (id, league, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/league/${id}/`, league, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating league: ${error}`);
    }
};
/** This request deletes the specified league.
 * @param id League ID to delete
 * @param token JWT token
 * @throws Error if deleting league fails
 */
const deleteLeague = async (id, token) => {
    try {
        await apiClient.delete(`/api/v1/league/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting league: ${error}`);
    }
};
export { listLeagues, createLeague, retrieveLeague, updateLeague, partialUpdateLeague, deleteLeague, };
