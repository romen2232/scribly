import { apiClient } from './api';
/**
 * Leaderboards
These endpoints manage the lifecycle of leaderboards in the application. They enable the creation, updating,
deletion, and retrieval of leaderboards, each associated with a specific league and defined by a week date.
json
Leaderboard {
league: number;
week_date: Date;
}
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly
leaderboards
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly
GET
list Leaderboards
/api/v1/leaderboards/
This request lists all available leaderboards.
AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
HEADERS
Accept
POST
application/json
create Leaderboards
/api/v1/leaderboards/
This request creates a new leaderboard.AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
HEADERS
Content-Typeapplication/x-www-form-urlencoded
Acceptapplication/json
Body urlencoded
league
<integer>
�Required)
id<integer>
week_date<dateTime>
leaderboard
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly
{leaderboard_id}
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly
users
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly
GET
list Leaderboard Users
/api/v1/leaderboard/:leaderboard_id/users/
This request lists all users belonging to a specific leaderboard.AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
HEADERS
Accept
application/json
PATH VARIABLES
leaderboard_id
<string>
{id}
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly
GET
retrieve Leaderboards
/api/v1/leaderboard/:id/
This request retrieves specific leaderboard details based on the provided leaderboard ID.
AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
HEADERS
Accept
application/json
PATH VARIABLES
id
PUT
<string>
update Leaderboards
/api/v1/leaderboard/:id/This request updates the information for the specified leaderboard.
AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
HEADERS
Content-Typeapplication/x-www-form-urlencoded
Acceptapplication/json
PATH VARIABLES
id
<string>
Body urlencoded
league
<integer>
�Required)
id<integer>
week_date<dateTime>
PATCH
partial Update Leaderboards
/api/v1/leaderboard/:id/
This request partially updates the information for the specified leaderboard.
AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
HEADERS
Content-Typeapplication/x-www-form-urlencoded
Acceptapplication/json
PATH VARIABLES
id
<string>id
<string>
Body urlencoded
league
<integer>
�Required)
id<integer>
week_date<dateTime>
DELETE
destroy Leaderboards
/api/v1/leaderboard/:id/
This request deletes the specified leaderboard.
AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
PATH VARIABLES
id
<string>
user
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly
POST
create Leaderboard User
/api/v1/leaderboard/user/
This request creates a relation between an user a leaderboard.
AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
HEADERSContent-Typeapplication/x-www-form-urlencoded
Acceptapplication/json

Leaderboards
These routes handle the assignment of users to leaderboards. They allow the establishment of a new user-
leaderboard association, manage the leaderboard scores of users, track leaderboard update dates, and facilitate
retrieval of all users on a specific leaderboard.
jsonjson
LeaderboardUser {
leaderboard: number;
user: number;
leaderboard_update_date: Date;
leaderboard_score: number;
}
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly
leaderboards
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly
GET
list User Leaderboards
/api/v1/user/:user_id/leaderboards/
This endpoint is used to retrieve all leaderboards for a given user.
AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
HEADERS
Accept
application/json
PATH VARIABLES
user_id
<string>
leaderboard
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly{leaderboard_id}
AUTHORIZATION Bearer Token
This folder is using Bearer Token from collection Scribly
GET
retrieve Specific User Leaderboard
/api/v1/user/:user_id/leaderboard/:leaderboard_id/
This endpoint is used to retrieve a specific leaderboard for a given user.
AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
HEADERS
Accept
application/json
PATH VARIABLES
user_id<string>
leaderboard_id<string>
PATCH
partial Update Specific User Leaderboard
/api/v1/user/:user_id/leaderboard/:leaderboard_id/
This endpoint is used to partially update a specific leaderboard for a given user.
AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
HEADERS
Content-Typeapplication/x-www-form-urlencoded
Acceptapplication/json
PATH VARIABLESuser_id<string>
leaderboard_id<string>
DELETE
destroy Specific User Leaderboard
/api/v1/user/:user_id/leaderboard/:leaderboard_id/
This endpoint is used to delete a specific leaderboard for a given user.
AUTHORIZATION Bearer Token
This request is using Bearer Token from collection Scribly
PATH VARIABLES
user_id<string>
leaderboard_id<string>
 */
/** This request lists all available leaderboards.
 * @param token JWT token
 * @returns List of all available leaderboards
 * @throws Error if listing leaderboards fails
 */
const listLeaderboards = async (token) => {
    try {
        const response = await apiClient.get('/api/v1/leaderboards/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error listing leaderboards: ${error}`);
    }
};
/** This request creates a new leaderboard.
 * @param leaderboard Leaderboard to create (all fields)
 * @param token JWT token
 * @returns Created leaderboard
 * @throws Error if leaderboard creation fails
 */
const createLeaderboard = async (leaderboard, token) => {
    try {
        const response = await apiClient.post('/api/v1/leaderboards/', leaderboard, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error creating leaderboard: ${error}`);
    }
};
/** This request lists all users belonging to a specific leaderboard.
 * TODO: Implement in backend
 * @param leaderboardId Leaderboard ID
 * @param token JWT token
 * @returns List of all users belonging to the specified leaderboard
 * @throws Error if listing leaderboard users fails
 */
const listLeaderboardUsers = async (leaderboardId, token) => {
    try {
        const response = await apiClient.get(`/api/v1/leaderboard/${leaderboardId}/users/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error listing leaderboard users: ${error}`);
    }
};
/** This request retrieves specific leaderboard details based on the provided leaderboard ID.
 * @param id Leaderboard ID
 * @param token JWT token
 * @returns Leaderboard with the specified ID
 * @throws Error if retrieving leaderboard fails
 */
const retrieveLeaderboard = async (id, token) => {
    try {
        const response = await apiClient.get(`/api/v1/leaderboard/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving leaderboard: ${error}`);
    }
};
/** This request updates the information for the specified leaderboard.
 * @param id Leaderboard ID
 * @param leaderboard Leaderboard to update (all fields)
 * @param token JWT token
 * @returns Updated leaderboard
 * @throws Error if leaderboard update fails
 */
const updateLeaderboard = async (id, leaderboard, token) => {
    try {
        const response = await apiClient.put(`/api/v1/leaderboard/${id}/`, leaderboard, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating leaderboard: ${error}`);
    }
};
/** This request partially updates the information for the specified leaderboard.
 * @param id Leaderboard ID
 * @param leaderboard Leaderboard to update (some fields)
 * @param token JWT token
 * @returns Partially updated leaderboard
 * @throws Error if leaderboard partial update fails
 */
const partialUpdateLeaderboard = async (id, leaderboard, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/leaderboard/${id}/`, leaderboard, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error partially updating leaderboard: ${error}`);
    }
};
/** This request deletes the specified leaderboard.
 * @param id Leaderboard ID
 * @param token JWT token
 * @throws Error if deleting leaderboard fails
 */
const deleteLeaderboard = async (id, token) => {
    try {
        await apiClient.delete(`/api/v1/leaderboard/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting leaderboard: ${error}`);
    }
};
/** This request creates a relation between an user and a leaderboard.
 * @param leaderboard Leaderboard ID
 * @param user User ID
 * @param token JWT token
 * @returns Created leaderboard user relation
 * @throws Error if creating leaderboard user relation fails
 */
const createLeaderboardUser = async (leaderboard, user, token) => {
    try {
        const response = await apiClient.post('/api/v1/leaderboard/user/', { leaderboard, user }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error creating leaderboard user relation: ${error}`);
    }
};
//TODO: Implement in backend
/** This endpoint is used to retrieve all leaderboards for a given user.
 * @param userId User ID
 * @param token JWT token
 * @returns List of all leaderboards for the specified user
 * @throws Error if listing user leaderboards fails
 */
const listUserLeaderboards = async (userId, token) => {
    try {
        const response = await apiClient.get(`/api/v1/user/${userId}/leaderboards/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error listing user leaderboards: ${error}`);
    }
};
/** This endpoint is used to retrieve a specific leaderboard for a given user.
 * @param userId User ID
 * @param leaderboardId Leaderboard ID
 * @param token JWT token
 * @returns Leaderboard with the specified ID for the specified user
 * @throws Error if retrieving user leaderboard fails
 */
const retrieveSpecificUserLeaderboard = async (userId, leaderboardId, token) => {
    try {
        const response = await apiClient.get(`/api/v1/user/${userId}/leaderboard/${leaderboardId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving user leaderboard: ${error}`);
    }
};
/** This endpoint is used to partially update a specific leaderboard for a given user.
 * @param userId User ID
 * @param leaderboardId Leaderboard ID
 * @param leaderboardUser Leaderboard user to partially update (some fields)
 * @param token JWT token
 * @returns Partially updated leaderboard user
 * @throws Error if partially updating user leaderboard fails
 */
const partialUpdateSpecificUserLeaderboard = async (userId, leaderboardId, leaderboardUser, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/user/${userId}/leaderboard/${leaderboardId}/`, leaderboardUser, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error partially updating user leaderboard: ${error}`);
    }
};
/** This endpoint is used to delete a specific leaderboard for a given user.
 * @param userId User ID
 * @param leaderboardId Leaderboard ID
 * @param token JWT token
 * @throws Error if deleting user leaderboard fails
 */
const destroySpecificUserLeaderboard = async (userId, leaderboardId, token) => {
    try {
        await apiClient.delete(`/api/v1/user/${userId}/leaderboard/${leaderboardId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting user leaderboard: ${error}`);
    }
};
export { listLeaderboards, createLeaderboard, listLeaderboardUsers, retrieveLeaderboard, updateLeaderboard, partialUpdateLeaderboard, deleteLeaderboard, createLeaderboardUser, listUserLeaderboards, retrieveSpecificUserLeaderboard, partialUpdateSpecificUserLeaderboard, destroySpecificUserLeaderboard, };
