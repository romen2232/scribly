// Purpose: To store all the constants used in the frontend

// Assets URLs
export const TIVI_URL = '/src/assets/img/Tivi_0.1.0.png',
    FOREST_URL = '/src/assets/img/Forest_0.1.0.png',
    // Header icons
    STREAK_URL = '/src/assets/img/mock/fire_5234822.png',
    LEADERBOARD_URL = '/src/assets/img/mock/cup_4262692.png',
    TRAINING_URL = 'https://placehold.co/50',
    COMMUNITY_URL = 'https://placehold.co/50',
    PROFILE_URL = 'https://placehold.co/50',
    // Footer icons
    CATEGORY_URL = 'https://placehold.co/50',
    NOTE_URL = 'https://placehold.co/50',
    FOLDER_URL = 'https://placehold.co/50',
    // New icons
    NAVIGATE_BACK_URL = '/src/assets/img/mock/back.png',
    TURN_URL = '/src/assets/img/mock/turn.png',
    RETURN_URL = '/src/assets/img/mock/return.png';

export const BASE_URL = 'http://192.168.249.134:9000',
    AUTH_COOKIE_NAME = 'escribly.auth',
    REFRESH_COOKIE_NAME = 'escribly.refresh',
    USER_COOKIE_NAME = 'escribly.user';


export const mockUsers = [
    {
        id: 1,
        lastLogin: '2023-01-15T12:00:00Z',
        email: 'johndoe@example.com',
        phoneNumber: '123-456-7890',
        profilePhoto: '/src/assets/img/Tivi_0.1.0.png',
        experience: 5,
        username: 'johndoe',
        gems: 100,
        appearDailyChallenge: true,
        dateJoined: '2022-01-15T12:00:00Z',
        groups: [1, 2],
        userPermissions: [1, 3]
    },
    {
        id: 2,
        lastLogin: '2023-01-10T10:00:00Z',
        email: 'alice@example.com',
        phoneNumber: '123-456-7891',
        username: 'alice',
        experience: 10,
        gems: 150,
        appearDailyChallenge: false,
        dateJoined: '2021-05-10T10:00:00Z',
        groups: [2, 3],
        userPermissions: [2, 3]
    },
    {
        id: 3,
        lastLogin: '2023-01-20T09:00:00Z',
        email: 'bob@example.com',
        phoneNumber: '123-456-7892',
        experience: 15,
        username: 'bob',
        gems: 75,
        appearDailyChallenge: true,
        dateJoined: '2021-08-20T09:00:00Z',
        groups: [1, 3],
        userPermissions: [1, 2]
    }
],
 mockFollows= [
    {
        follower: mockUsers[0], // John follows Alice
        followed: mockUsers[1],
        follow_date: '2022-03-01T12:00:00Z'
    },
    {
        follower: mockUsers[1], // Alice follows Bob
        followed: mockUsers[2],
        follow_date: '2022-03-05T12:00:00Z'
    },
    {
        follower: mockUsers[2], // Bob follows John
        followed: mockUsers[0],
        follow_date: '2022-03-10T12:00:00Z'
    }
];