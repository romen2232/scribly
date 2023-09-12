import { apiClient } from './api';
/** Fetches all units from the API
 * @param token JWT token
 * @returns List of units
 * @throws Error if fetching units fails
 */
const listUnits = async (token) => {
    try {
        const response = await apiClient.get('/api/v1/unit/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error listing units: ${error}`);
    }
};
/** Fetches a specific unit from the API
 * @param unitId Unit ID
 * @param token JWT token
 * @returns Unit
 * @throws Error if fetching the specific unit fails
 */
const retrieveUnit = async (unitId, token) => {
    try {
        const response = await apiClient.get(`/api/v1/unit/${unitId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving unit: ${error}`);
    }
};
/** Creates a unit
 * @param unit Unit object
 * @param token JWT token
 * @returns Unit
 * @throws Error if creating unit fails
 * */
const createUnit = async (unit, token) => {
    try {
        const response = await apiClient.post(`/api/v1/unit/`, unit, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error creating unit: ${error}`);
    }
};
/** Updates a unit
 * @param unit Unit object
 * @param token JWT token
 * @returns Unit
 * @throws Error if updating unit fails
 * */
const updateUnit = async (unit, token) => {
    try {
        const response = await apiClient.put(`/api/v1/unit/${unit.id}/`, unit, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating unit: ${error}`);
    }
};
/** Partially updates a unit
 * @param unit Unit object
 * @param token JWT token
 * @returns Unit
 * @throws Error if partially updating unit fails
 * */
const partialUpdateUnit = async (unit, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/unit/${unit.id}/`, unit, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error partially updating unit: ${error}`);
    }
};
/** Deletes a unit
 * @param unitId Unit ID
 * @param token JWT token
 * @throws Error if deleting unit fails
 * */
const deleteUnit = async (unitId, token) => {
    try {
        await apiClient.delete(`/api/v1/unit/${unitId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting unit: ${error}`);
    }
};
/** Retrieve units by category
 * @param category Category
 * @param token JWT token
 * @returns List of units
 * @throws Error if retrieving units by category fails
 * */
const retrieveUnitsByCategory = async (category, token) => {
    try {
        const response = await apiClient.get(`/api/v1/units/${category}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving units by category: ${error}`);
    }
};
export { listUnits, retrieveUnit, createUnit, updateUnit, partialUpdateUnit, deleteUnit, retrieveUnitsByCategory, };
