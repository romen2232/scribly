import { apiClient } from './api';
import { components } from '../utils/openapi';

type Direct = components['schemas']['Direct'];

/** This request creates a new direct message.
 * @param direct Direct message to create
 * @param token JWT token
 * @returns Created direct message
 * @throws Error if creating direct message fails
 */
const createDirect = async (
    direct: Partial<Direct>,
    token: string,
): Promise<Direct> => {
    try {
        const response = await apiClient.post<Direct>(
            '/api/v1/direct/',
            direct,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error creating direct message: ${error}`);
    }
};

/** This request retrieves the conversation between the sender and receiver. It does not matter the order.
 * @param senderId Sender ID
 * @param receiverId Receiver ID
 * @param token JWT token
 * @returns Conversation
 * @throws Error if retrieving conversation fails
 */
const retrieveConversation = async (
    senderId: number,
    receiverId: number,
    token: string,
): Promise<Direct[]> => {
    try {
        const response = await apiClient.get<Direct[]>(
            `/api/v1/conversation/${senderId}/${receiverId}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving conversation: ${error}`);
    }
};

/** This request deletes the direct message with the given ID.
 * @param directId Direct message ID
 * @param token JWT token
 * @throws Error if deleting direct message fails
 * @returns void
 */
const destroyDirect = async (
    directId: number,
    token: string,
): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/direct/${directId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw new Error(`Error deleting direct message: ${error}`);
    }
};

export { createDirect, retrieveConversation, destroyDirect };
