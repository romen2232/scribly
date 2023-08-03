import { apiClient } from './api';
import { components } from '../utils/openapi';

type Badge = components['schemas']['Badge'];
type User = components['schemas']['User'];
type BadgeUser = components['schemas']['BadgeUser'];

/**
 * Fetches all badges from the API
 * @param token JWT token
 * @returns List of badges
 * @throws Error if fetching badges fails
 */
const listBadges = async (token: string): Promise<Badge[]> => {
    try {
        const response = await apiClient.get<Badge[]>('/api/v1/badges/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching badges: ${error}`);
    }
};
/**
 * Creates a new badge
 * @param badge Badge to create
 * @param token JWT token
 * @returns Created badge
 * @throws Error if creating badge fails
 */
const createBadge = async (badge: Badge, token: string): Promise<Badge> => {
    try {
        const response = await apiClient.post<Badge>('/api/v1/badges/', badge, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error creating badge: ${error}`);
    }
};
/**
 * Fetches a badge from the API
 * @param id Badge ID
 * @param token JWT token
 * @returns Badge
 * @throws Error if fetching badge fails
 */
const retrieveBadge = async (id: number, token: string): Promise<Badge> => {
    try {
        const response = await apiClient.get<Badge>(`/api/v1/badge/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving badge: ${error}`);
    }
};
/**
 * Updates a badge
 * @param id Badge ID to update
 * @param badge Badge to update with new values (must have all fields)
 * @param token JWT token
 * @returns Updated badge
 * @throws Error if updating badge fails
 */
const updateBadge = async (
    id: number,
    badge: Badge,
    token: string,
): Promise<Badge> => {
    try {
        const response = await apiClient.put<Badge>(
            `/api/v1/badge/${id}/`,
            badge,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error updating badge: ${error}`);
    }
};
/**
 * Partially updates a badge
 * @param id Badge ID to update
 * @param badge Badge to update with new values (can have only some fields)
 * @param token JWT token
 * @returns Updated badge
 * @throws Error if updating badge fails
 */
const partialUpdateBadge = async (
    id: number,
    badge: Partial<Badge>,
    token: string,
): Promise<Badge> => {
    try {
        const response = await apiClient.patch<Badge>(
            `/api/v1/badge/${id}/`,
            badge,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error partially updating badge: ${error}`);
    }
};
/**
 * Deletes a badge
 * @param id Badge ID to delete
 * @param token JWT token
 * @returns void
 * @throws Error if deleting badge fails
 */
const destroyBadge = async (id: number, token: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/badge/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw new Error(`Error deleting badge: ${error}`);
    }
};
/**
 * Lists all users that have a badge
 * @param badgeId Badge ID
 * @param token JWT token
 * @returns List of users
 * @throws Error if listing badge users fails
 */
const listBadgeUsers = async (
    badgeId: number,
    token: string,
): Promise<User[]> => {
    try {
        const response = await apiClient.get<User[]>(
            `/api/v1/badge/${badgeId}/users/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error listing badge users: ${error}`);
    }
};
/**
 * Creates a new badge user relationship
 * @param badgeUser Badge user relationship to create
 * @param token JWT token
 * @returns Created badge user relationship
 * @throws Error if creating badge user fails
 */
const createBadgeUser = async (
    badgeUser: BadgeUser,
    token: string,
): Promise<BadgeUser> => {
    try {
        const response = await apiClient.post<BadgeUser>(
            '/api/v1/badge/user/',
            badgeUser,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error creating badge user: ${error}`);
    }
};
/**
 * Lists all badges that a user has
 * @param userId User ID
 * @param token JWT token
 * @returns List of badges
 * @throws Error if listing user badges fails
 */
const listUserBadges = async (
    userId: number,
    token: string,
): Promise<Badge[]> => {
    try {
        const response = await apiClient.get<Badge[]>(
            `/api/v1/user/${userId}/badges/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error listing user badges: ${error}`);
    }
};
/**
 * Fetches a specific user badge relationship from the API
 * @param userId User ID
 * @param badgeId Badge ID
 * @param token JWT token
 * @returns Badge user relationship
 * @throws Error if fetching the specific user badge fails
 */
const retrieveBadgeUser = async (
    userId: number,
    badgeId: number,
    token: string,
): Promise<BadgeUser> => {
    try {
        const response = await apiClient.get<BadgeUser>(
            `/api/v1/user/${userId}/badge/${badgeId}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving user badge: ${error}`);
    }
};
/**
 * Deletes a badge user relationship
 * @param userId User ID
 * @param badgeId Badge ID
 * @param token JWT token
 * @returns void
 * @throws Error if deleting user badge fails
 */
const destroyBadgeUser = async (
    userId: number,
    badgeId: number,
    token: string,
): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/user/${userId}/badge/${badgeId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw new Error(`Error deleting user badge: ${error}`);
    }
};
export {
    listBadges,
    createBadge,
    retrieveBadge,
    updateBadge,
    partialUpdateBadge,
    destroyBadge,
    listBadgeUsers,
    createBadgeUser,
    listUserBadges,
    retrieveBadgeUser,
    destroyBadgeUser,
};
