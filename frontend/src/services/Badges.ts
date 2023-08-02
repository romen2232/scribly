import { apiClient } from './api';
import { components } from '../utils/openapi';

type JWT = string; // Define your JWT type here. I am using string for simplicity.

export async function listBadges(jwt: JWT) {
    try {
        const response = await apiClient.get('/api/v1/badges/', {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error listing badges:', error);
        throw error;
    }
}

export async function createBadge(
    jwt: JWT,
    badgeData: components['schemas']['Badge'],
) {
    try {
        const response = await apiClient.post('/api/v1/badges/', badgeData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating badge:', error);
        throw error;
    }
}

export async function retrieveBadge(jwt: JWT, badgeId: number) {
    try {
        const response = await apiClient.get(`/api/v1/badge/${badgeId}/`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error retrieving badge:', error);
        throw error;
    }
}

export async function updateBadge(
    jwt: JWT,
    badgeId: number,
    badgeData: components['schemas']['Badge'],
) {
    try {
        const response = await apiClient.put(
            `/api/v1/badge/${badgeId}/`,
            badgeData,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error updating badge:', error);
        throw error;
    }
}

export async function destroyBadge(jwt: JWT, badgeId: number) {
    try {
        const response = await apiClient.delete(`/api/v1/badge/${badgeId}/`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting badge:', error);
        throw error;
    }
}

export async function partialUpdateBadge(
    jwt: JWT,
    badgeId: number,
    badgeData: Partial<components['schemas']['Badge']>,
) {
    try {
        const response = await apiClient.patch(
            `/api/v1/badge/${badgeId}/`,
            badgeData,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error partially updating badge:', error);
        throw error;
    }
}
