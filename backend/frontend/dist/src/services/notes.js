import { apiClient } from './api';
/** Fetches all notes from the API
 * @param token JWT token
 * @returns List of notes
 * @throws Error if fetching notes fails
 */
const listNotes = async (token) => {
    try {
        const response = await apiClient.get('/api/v1/notes/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error fetching notes: ${error}`);
    }
};
/** Creates a new note
 * @param note Note to create
 * @param token JWT token
 * @returns Created note
 * @throws Error if note creation fails
 */
const createNote = async (note, token) => {
    try {
        const response = await apiClient.post('/api/v1/notes/', note, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error creating note: ${error}`);
    }
};
/** Fetches a single note from the API
 * @param id Note ID
 * @param token JWT token
 * @returns Note
 * @throws Error if fetching note fails
 */
const retrieveNote = async (id, token) => {
    try {
        const response = await apiClient.get(`/api/v1/note/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving note: ${error}`);
    }
};
/** Updates a note
 * @param id Note ID
 * @param note Note to update (all fields)
 * @param token JWT token
 * @returns Updated note
 * @throws Error if note update fails
 */
const updateNote = async (id, note, token) => {
    try {
        const response = await apiClient.put(`/api/v1/note/${id}/`, note, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating note: ${error}`);
    }
};
/** Partially updates a note
 * @param id Note ID
 * @param note Note to partially update (only fields to update)
 * @param token JWT token
 * @returns Partially updated note
 * @throws Error if note partial update fails
 */
const partialUpdateNote = async (id, note, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/note/${id}/`, note, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error partially updating note: ${error}`);
    }
};
/** Deletes a note
 * @param id Note ID
 * @param token JWT token
 * @returns void
 * @throws Error if note deletion fails
 */
const destroyNote = async (id, token) => {
    try {
        await apiClient.delete(`/api/v1/note/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting note: ${error}`);
    }
};
/** Partially updates a note
 * @param id Note ID
 * @param answer Note to partially update (only fields to update)
 * @param token JWT token
 * @returns Partially updated note
 * @throws Error if note partial update fails
 */
const analyzeNote = async (id, note, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/note/analyze/${id}/`, note, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error analysing note: ${error}`);
    }
};
export { listNotes, createNote, retrieveNote, updateNote, partialUpdateNote, destroyNote, analyzeNote, };
