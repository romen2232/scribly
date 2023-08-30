import { apiClient } from './api';
import { Folder } from '../utils/types';

/** Fetches all folders from the API
 * @param token JWT token
 * @returns List of folders
 * @throws Error if fetching folders fails
 */
const listFolders = async (token: string): Promise<Folder> => {
    try {
        const response = await apiClient.get<Folder>('/api/v1/folders/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching folders: ${error}`);
    }
};

/** Creates a new folder
 * @param folder Folder to create
 * @param token JWT token
 * @returns Created folder
 * @throws Error if folder creation fails
 */
const createFolder = async (folder: Folder, token: string): Promise<Folder> => {
    try {
        console.log(folder);
        const response = await apiClient.post<Folder>(
            '/api/v1/folders/',
            folder,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error creating folder: ${error}`);
    }
};

/** Fetches a single folder from the API
 * @param id ID of the folder to fetch
 * @param token JWT token
 * @returns Folder
 * @throws Error if fetching folder fails
 */
const retrieveFolder = async (id: number, token: string): Promise<Folder> => {
    try {
        const response = await apiClient.get<Folder>(`/api/v1/folder/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving folder: ${error}`);
    }
};

/** Updates a folder
 * @param id ID of the folder to update
 * @param folder Folder to update, all fields are required
 * @param token JWT token
 * @returns Updated folder
 * @throws Error if updating folder fails
 */
const updateFolder = async (
    id: number,
    folder: Folder,
    token: string,
): Promise<Folder> => {
    try {
        const response = await apiClient.put<Folder>(
            `/api/v1/folder/${id}/`,
            folder,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error updating folder: ${error}`);
    }
};

/** Partially updates a folder
 * @param id ID of the folder to update
 * @param folder Folder to update, it can contain only the fields to update
 * @param token JWT token
 * @returns Updated folder
 * @throws Error if updating folder fails
 */
const partialUpdateFolder = async (
    id: number,
    folder: Partial<Folder>,
    token: string,
): Promise<Folder> => {
    try {
        const response = await apiClient.patch<Folder>(
            `/api/v1/folder/${id}/`,
            folder,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error partially updating folder: ${error}`);
    }
};

/** Deletes a folder
 * @param id ID of the folder to delete
 * @param token JWT token
 * @returns void
 * @throws Error if deleting folder fails
 */
const destroyFolder = async (id: number, token: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/folder/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw new Error(`Error deleting folder: ${error}`);
    }
};

/** Fetches the root folder of the user
 * @param token JWT token
 * @returns Root folder
 * @throws Error if fetching root folder fails
 * */
const rootFolder = async (token: string): Promise<Folder> => {
    try {
        const response = await apiClient.get<Folder>(
            '/api/v1/user/folder/root',
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving root folder: ${error}`);
    }
};

export {
    listFolders,
    createFolder,
    retrieveFolder,
    updateFolder,
    partialUpdateFolder,
    destroyFolder,
    rootFolder,
};
