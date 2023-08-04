import { apiClient } from './api';
import { components } from '../utils/openapi';

type Booster = components['schemas']['Booster'];
type User = components['schemas']['User'];
type BoosterUser = components['schemas']['BoosterUser'];

/** This request lists all available boosters.
 * @param token JWT token
 * @returns List of all boosters
 * @throws Error if listing boosters fails
 */
const listBoosters = async (token: string): Promise<Booster[]> => {
    try {
        const response = await apiClient.get<Booster[]>('/api/v1/boosters/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error listing boosters: ${error}`);
    }
};

/** This request creates a new booster.
 * @param booster Booster to create
 * @param token JWT token
 * @returns Created booster
 * @throws Error if creating booster fails
 */
const createBooster = async (
    booster: Partial<Booster>,
    token: string,
): Promise<Booster> => {
    try {
        const response = await apiClient.post<Booster>(
            '/api/v1/boosters/',
            booster,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error creating booster: ${error}`);
    }
};

/** This request retrieves specific booster details based on the provided booster ID.
 * @param id Booster ID
 * @param token JWT token
 * @returns Booster
 * @throws Error if retrieving booster fails
 */
const retrieveBooster = async (id: number, token: string): Promise<Booster> => {
    try {
        const response = await apiClient.get<Booster>(
            `/api/v1/booster/${id}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving booster: ${error}`);
    }
};

/** This request updates the information for the specified booster.
 * @param id Booster ID to update
 * @param booster Booster to update
 * @param token JWT token
 * @returns Updated booster
 * @throws Error if updating booster fails
 */
const updateBooster = async (
    id: number,
    booster: Booster,
    token: string,
): Promise<Booster> => {
    try {
        const response = await apiClient.put<Booster>(
            `/api/v1/booster/${id}/`,
            booster,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error updating booster: ${error}`);
    }
};

/** This request partially updates the information for the specified booster.
 * @param id Booster ID to update
 * @param booster Booster to update
 * @param token JWT token
 * @returns Updated booster
 * @throws Error if updating booster fails
 */
const partialUpdateBooster = async (
    id: number,
    booster: Partial<Booster>,
    token: string,
): Promise<Booster> => {
    try {
        const response = await apiClient.patch<Booster>(
            `/api/v1/booster/${id}/`,
            booster,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error partially updating booster: ${error}`);
    }
};

/** This request deletes the specified booster.
 * @param id Booster ID to delete
 * @param token JWT token
 * @throws Error if deleting booster fails
 * @returns void
 */
const destroyBooster = async (id: number, token: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/booster/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw new Error(`Error deleting booster: ${error}`);
    }
};

/** This request lists all users associated with a specific booster.
 * @param boosterId Booster ID
 * @param token JWT token
 * @returns List of all users associated with the booster
 * @throws Error if listing booster users fails
 */
const listBoosterUsers = async (
    boosterId: number,
    token: string,
): Promise<User[]> => {
    try {
        const response = await apiClient.get<User[]>(
            `/api/v1/booster/${boosterId}/users/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error listing booster users: ${error}`);
    }
};

/** This request creates a relation between an user a booster.
 * @param boosterId Booster ID
 * @param userId User ID
 * @param token JWT token
 * @returns  booster user object
 * @throws Error if creating booster user fails
 */
const createBoosterUser = async (
    boosterId: number,
    userId: number,
    token: string,
): Promise<BoosterUser> => {
    try {
        const response = await apiClient.post<BoosterUser>(
            '/api/v1/booster/user/',
            { booster: boosterId, user: userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error creating booster user: ${error}`);
    }
};

/** This request lists all boosters for a given user.
 * @param userId User ID
 * @param token JWT token
 * @returns List of all boosters for a given user
 * @throws Error if listing user boosters fails
 */
const listUsersBoosters = async (
    userId: number,
    token: string,
): Promise<Booster[]> => {
    try {
        const response = await apiClient.get<Booster[]>(
            `/api/v1/user/${userId}/boosters/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error listing user boosters: ${error}`);
    }
};

/** This endpoint is used to retrieve a specific booster user relation.
 * @param userId User ID
 * @param boosterId Booster ID
 * @param token JWT token
 * @returns Booster user object
 * @throws Error if retrieving booster user fails
 */
const retrieveBoosterUser = async (
    userId: number,
    boosterId: number,
    token: string,
): Promise<BoosterUser> => {
    try {
        const response = await apiClient.get<BoosterUser>(
            `/api/v1/user/${userId}/booster/${boosterId}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving booster user: ${error}`);
    }
};

/** This endpoint is used to update a specific booster user relation.
 * @param boosterUser Booster user object
 * @param token JWT token
 * @returns Updated booster user object
 * @throws Error if updating booster user fails
 */
const updateBoosterUser = async (
    boosterUser: BoosterUser,
    token: string,
): Promise<BoosterUser> => {
    try {
        const response = await apiClient.put<BoosterUser>(
            `/api/v1/user/${boosterUser.user}/booster/${boosterUser.booster}/`,
            boosterUser,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error updating booster user: ${error}`);
    }
};

/** This endpoint is used to partially update a specific booster user relation.
 * @param boosterUser Booster user object
 * @param token JWT token
 * @returns Updated booster user object
 * @throws Error if partially updating booster user fails
 */
const partialUpdateBoosterUser = async (
    boosterUser: Partial<BoosterUser>,
    token: string,
): Promise<BoosterUser> => {
    try {
        const response = await apiClient.patch<BoosterUser>(
            `/api/v1/user/${boosterUser.user}/booster/${boosterUser.booster}/`,
            boosterUser,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error partially updating booster user: ${error}`);
    }
};

/** This endpoint is used to delete a specific booster user relation.
 * @param userId User ID
 * @param boosterId Booster ID
 * @param token JWT token
 * @throws Error if deleting booster user fails
 * @returns void
 * */
const destroyBoosterUser = async (
    userId: number,
    boosterId: number,
    token: string,
): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/user/${userId}/booster/${boosterId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw new Error(`Error deleting booster user: ${error}`);
    }
};

export {
    listBoosters,
    createBooster,
    retrieveBooster,
    updateBooster,
    partialUpdateBooster,
    destroyBooster,
    listBoosterUsers,
    createBoosterUser,
    listUsersBoosters,
    retrieveBoosterUser,
    updateBoosterUser,
    partialUpdateBoosterUser,
    destroyBoosterUser,
};
