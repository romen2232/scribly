export interface paths {
    '/api/v1/badges/': {
        get: operations['listBadges'];
        post: operations['createBadge'];
    };
    '/api/v1/badge/{id}/': {
        get: operations['retrieveBadge'];
        put: operations['updateBadge'];
        delete: operations['destroyBadge'];
        patch: operations['partialUpdateBadge'];
    };
    '/api/v1/auth/me/': {
        get: operations['listUsers'];
    };
    '/api/v1/notes/': {
        get: operations['listNotes'];
        post: operations['createNotes'];
    };
    '/api/v1/note/{id}/': {
        get: operations['retrieveNotes'];
        put: operations['updateNotes'];
        delete: operations['destroyNotes'];
        patch: operations['partialUpdateNotes'];
    };
    '/api/v1/leagues/': {
        get: operations['listLeagues'];
        post: operations['createLeagues'];
    };
    '/api/v1/league/{id}/': {
        get: operations['retrieveLeagues'];
        put: operations['updateLeagues'];
        delete: operations['destroyLeagues'];
        patch: operations['partialUpdateLeagues'];
    };
    '/api/v1/user/{user_id}/badges/': {
        get: operations['listUserBadges'];
    };
    '/api/v1/badge/{badge_id}/users/': {
        get: operations['listBadgeUsers'];
    };
    '/api/v1/user/{user_id}/badge/{badge_id}/': {
        get: operations['retrieveSpecificUserBadge'];
        delete: operations['destroySpecificUserBadge'];
    };
    '/api/v1/user/{user_id}/leaderboards/': {
        get: operations['listUserLeaderboards'];
    };
    '/api/v1/leaderboard/{leaderboard_id}/users/': {
        get: operations['listLeaderboardUsers'];
    };
    '/api/v1/user/{user_id}/leaderboard/{leaderboard_id}/': {
        get: operations['retrieveSpecificUserLeaderboard'];
        delete: operations['destroySpecificUserLeaderboard'];
        patch: operations['partialUpdateSpecificUserLeaderboard'];
    };
    '/api/v1/user/{user_id}/challenges/': {
        get: operations['listUserChallenges'];
    };
    '/api/v1/challenge/{challenge_id}/users/': {
        get: operations['listChallengeUsers'];
    };
    '/api/v1/user/{user_id}/challenge/{challenge_id}/': {
        get: operations['retrieveSpecificUserChallenge'];
        delete: operations['destroySpecificUserChallenge'];
    };
    '/api/v1/leaderboards/': {
        get: operations['listLeaderboards'];
        post: operations['createLeaderboards'];
    };
    '/api/v1/leaderboard/{id}/': {
        get: operations['retrieveLeaderboards'];
        put: operations['updateLeaderboards'];
        delete: operations['destroyLeaderboards'];
        patch: operations['partialUpdateLeaderboards'];
    };
    '/api/v1/conversation/{sender_id}/{receiver_id}/': {
        get: operations['retrieveConversation'];
    };
    '/api/v1/folders/': {
        get: operations['listFolders'];
        post: operations['createFolders'];
    };
    '/api/v1/folder/{id}/': {
        get: operations['retrieveFolders'];
        put: operations['updateFolders'];
        delete: operations['destroyFolders'];
        patch: operations['partialUpdateFolders'];
    };
    '/api/v1/ratings/': {
        get: operations['listRatings'];
        post: operations['createRatingsList'];
    };
    '/api/v1/ratings/user/{user_id}/': {
        get: operations['retrieveUserRatings'];
    };
    '/api/v1/ratings/challenge/{challenge_id}/': {
        get: operations['retrieveChallengeRatings'];
    };
    '/api/v1/ratings/task/{task_id}/': {
        get: operations['retrieveTaskRatings'];
    };
    '/api/v1/ratings/user/{user_id}/challenge/{challenge_id}/': {
        get: operations['retrieveRatingDetail'];
        delete: operations['destroyRatingDetail'];
        patch: operations['partialUpdateRatingDetail'];
    };
    '/api/v1/ratings/user/{user_id}/task/{task_id}/': {
        get: operations['retrieveRatingDetail'];
        delete: operations['destroyRatingDetail'];
        patch: operations['partialUpdateRatingDetail'];
    };
    '/api/v1/streaks/': {
        get: operations['listStreaks'];
        post: operations['createStreaks'];
    };
    '/api/v1/streak/{id}/': {
        get: operations['retrieveStreaks'];
        put: operations['updateStreaks'];
        delete: operations['destroyStreaks'];
        patch: operations['partialUpdateStreaks'];
    };
    '/api/v1/boosters/': {
        get: operations['listBoosters'];
        post: operations['createBoosters'];
    };
    '/api/v1/booster/{id}/': {
        get: operations['retrieveBoosters'];
        put: operations['updateBoosters'];
        delete: operations['destroyBoosters'];
        patch: operations['partialUpdateBoosters'];
    };
    '/api/v1/user/{user_id}/boosters/': {
        get: operations['listUserBoosters'];
    };
    '/api/v1/booster/{booster_id}/users/': {
        get: operations['listBoosterUsers'];
    };
    '/api/v1/user/{user_id}/booster/{booster_id}/': {
        get: operations['retrieveSpecificUserBooster'];
        put: operations['updateSpecificUserBooster'];
        delete: operations['destroySpecificUserBooster'];
        patch: operations['partialUpdateSpecificUserBooster'];
    };
    '/api/v1/challenges/': {
        get: operations['listChallenges'];
        post: operations['createChallenges'];
    };
    '/api/v1/challenge/{id}/': {
        get: operations['retrieveChallenges'];
        put: operations['updateChallenges'];
        delete: operations['destroyChallenges'];
        patch: operations['partialUpdateChallenges'];
    };
    '/api/v1/follows/': {
        get: operations['listFollows'];
        post: operations['createFollowList'];
    };
    '/api/v1/follows/{user_id}/followers/': {
        get: operations['listFollowers'];
    };
    '/api/v1/follows/{user_id}/following/': {
        get: operations['listFollowings'];
    };
    '/api/v1/follows/{follower_id}/follow/{followed_id}/': {
        get: operations['retrieveFollowDetail'];
    };
    '/api/v1/friends/{user_id}/': {
        get: operations['retrieveFriends'];
    };
    '/api/v1/auth/register/': {
        post: operations['createUser'];
    };
    '/api/v1/auth/activate/': {
        post: operations['createactivate_user_account'];
    };
    '/api/v1/auth/login/': {
        post: operations['createTokenObtainPair'];
    };
    '/api/v1/auth/login/refresh/': {
        post: operations['createTokenRefresh'];
    };
    '/api/v1/badge/user/': {
        post: operations['createBadgeUser'];
    };
    '/api/v1/leaderboard/user/': {
        post: operations['createLeaderboardUser'];
    };
    '/api/v1/challenge/user/': {
        post: operations['createChallengeUser'];
    };
    '/api/v1/direct/': {
        post: operations['createDirect'];
    };
    '/api/v1/booster/user/': {
        post: operations['createBoosterUser'];
    };
    '/api/v1/auth/update/': {
        /** @description Used to update the user's personal data */
        patch: operations['partialUpdateupdate_user'];
    };
    '/api/v1/auth/update/password/': {
        /** @description Receives the current password and the new password, and after confirming the current password, updates the user's password */
        patch: operations['partialUpdateupdate_user_password'];
    };
    '/api/v1/auth/delete/': {
        delete: operations['destroydelete_user_account'];
    };
    '/api/v1/direct/{direct_id}/': {
        delete: operations['destroyDirectDelete'];
    };
    '/api/v1/follows/{follower_id}/unfollow/{followed_id}/': {
        delete: operations['destroyUnfollow'];
    };
}

export type webhooks = Record<string, never>;

export interface components {
    schemas: {
        Badge: {
            id?: number;
            badgeName: string;
            badgeDescription: string;
            badgeImage?: string;
        };
        User: {
            id?: number;
            lastLogin?: string | null;
            isSuperuser?: boolean;
            username?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            email: string;
            phoneNumber?: string | null;
            experience?: number;
            gems?: number;
            appearDailyChallenge?: boolean;
            receiveFuturePromotionalEmails?: boolean;
            provideDataToImproveUserExp?: boolean;
            isStaff?: boolean;
            isActive?: boolean;
            dateJoined?: string;
            groups?: number[];
            userPermissions?: number[];
        };
        Note: {
            id?: number;
            noteName: string;
            noteContent: string;
            noteImage?: string;
            noteLastModified?: string;
            public?: boolean;
            noteAverageRating?: number;
            tags?: string;
            task?: number | null;
            challenge?: number | null;
            folder?: number | null;
        };
        League: {
            id?: number;
            leagueName: string;
            leagueDescription: string;
            leagueImage?: string;
        };
        Leaderboard: {
            id?: number;
            league: number;
            weekDate?: string;
        };
        Folder: {
            id?: number;
            folderName: string;
            folderDescription: string;
            folderImage?: string;
            folderCreated?: string;
            favorite?: boolean;
            folderParent?: number | null;
            depth?: number;
        };
        Streak: {
            id?: number;
            user: number;
            streak?: number;
            streakStartDate?: string;
            streakCurrentDate?: string | null;
            streakEndDate?: string | null;
        };
        Booster: {
            id?: number;
            boosterName: string;
            boosterDescription: string;
            boosterImage?: string;
            duration?: number;
            multiplier?: number;
        };
        Challenge: {
            id?: number;
            challengeName: string;
            challengeDescription: string;
            challengeStyle: string;
            difficulty?: number;
            challengePoints?: number;
            challengeAverageRating?: number;
            user: number;
        };
        UserCreate: {
            id?: number;
            password: string;
            lastLogin?: string | null;
            isSuperuser?: boolean;
            username?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            email: string;
            phoneNumber?: string | null;
            experience?: number;
            gems?: number;
            appearDailyChallenge?: boolean;
            receiveFuturePromotionalEmails?: boolean;
            provideDataToImproveUserExp?: boolean;
            isStaff?: boolean;
            isActive?: boolean;
            dateJoined?: string;
            groups?: number[];
            userPermissions?: number[];
        };
        TokenObtainPair: {
            email: string;
            password: string;
        };
        Token: {
            refresh: string;
            access: string;
        };
        Direct: {
            sender: number;
            receiver: number;
            message: string;
            sent_date: Date;
        };
        Follow: {
            follower: number;
            followed: number;
            follow_date: Date;
        };
        Rating: {
            user: number;
            rating: number;
            challenge?: number | null;
            task?: number | null;
            rating_date: Date;
        };
        BadgeUser: {
            badge: Badge;
            user: User;
            earned_date: Date;
        };
        BoosterUser: {
            booster: number;
            user: number;
            booster_start_date?: Date;
            booster_end_date?: Date | null;
        };
        ChallengeUser: {
            challenge: number;
            user: number;
            challenge_end_date?: Date;
        };
        LeaderboardUser: {
            leaderboard: number;
            user: number;
            leaderboard_update_date?: Date;
            leaderboard_score: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}

export type external = Record<string, never>;

export interface operations {
    listBadges: {
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Badge'][];
                };
            };
        };
    };
    /** @description Create a new badge instance. */
    createBadge: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['Badge'];
                'application/x-www-form-urlencoded': components['schemas']['Badge'];
                'multipart/form-data': components['schemas']['Badge'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['Badge'];
                };
            };
        };
    };
    /** @description Return the given badge. */
    retrieveBadge: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this badge. */
                id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Badge'];
                };
            };
        };
    };
    updateBadge: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this badge. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Badge'];
                'application/x-www-form-urlencoded': components['schemas']['Badge'];
                'multipart/form-data': components['schemas']['Badge'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Badge'];
                };
            };
        };
    };
    /** @description Delete the given badge. */
    destroyBadge: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this badge. */
                id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateBadge: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this badge. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Badge'];
                'application/x-www-form-urlencoded': components['schemas']['Badge'];
                'multipart/form-data': components['schemas']['Badge'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Badge'];
                };
            };
        };
    };
    /** @description List all users */
    listUsers: {
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['User'][];
                };
            };
        };
    };
    listNotes: {
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Note'][];
                };
            };
        };
    };
    createNotes: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['Note'];
                'application/x-www-form-urlencoded': components['schemas']['Note'];
                'multipart/form-data': components['schemas']['Note'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['Note'];
                };
            };
        };
    };
    retrieveNotes: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this notes. */
                id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Note'];
                };
            };
        };
    };
    updateNotes: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this notes. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Note'];
                'application/x-www-form-urlencoded': components['schemas']['Note'];
                'multipart/form-data': components['schemas']['Note'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Note'];
                };
            };
        };
    };
    destroyNotes: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this notes. */
                id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateNotes: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this notes. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Note'];
                'application/x-www-form-urlencoded': components['schemas']['Note'];
                'multipart/form-data': components['schemas']['Note'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Note'];
                };
            };
        };
    };
    listLeagues: {
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['League'][];
                };
            };
        };
    };
    createLeagues: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['League'];
                'application/x-www-form-urlencoded': components['schemas']['League'];
                'multipart/form-data': components['schemas']['League'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['League'];
                };
            };
        };
    };
    retrieveLeagues: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this leagues. */
                id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['League'];
                };
            };
        };
    };
    updateLeagues: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this leagues. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['League'];
                'application/x-www-form-urlencoded': components['schemas']['League'];
                'multipart/form-data': components['schemas']['League'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['League'];
                };
            };
        };
    };
    destroyLeagues: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this leagues. */
                id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateLeagues: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this leagues. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['League'];
                'application/x-www-form-urlencoded': components['schemas']['League'];
                'multipart/form-data': components['schemas']['League'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['League'];
                };
            };
        };
    };
    listUserBadges: {
        parameters: {
            path: {
                user_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    listBadgeUsers: {
        parameters: {
            path: {
                badge_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    retrieveSpecificUserBadge: {
        parameters: {
            path: {
                user_id: string;
                badge_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    destroySpecificUserBadge: {
        parameters: {
            path: {
                user_id: string;
                badge_id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    listUserLeaderboards: {
        parameters: {
            path: {
                user_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    listLeaderboardUsers: {
        parameters: {
            path: {
                leaderboard_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    retrieveSpecificUserLeaderboard: {
        parameters: {
            path: {
                user_id: string;
                leaderboard_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    destroySpecificUserLeaderboard: {
        parameters: {
            path: {
                user_id: string;
                leaderboard_id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateSpecificUserLeaderboard: {
        parameters: {
            path: {
                user_id: string;
                leaderboard_id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    listUserChallenges: {
        parameters: {
            path: {
                user_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    listChallengeUsers: {
        parameters: {
            path: {
                challenge_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    retrieveSpecificUserChallenge: {
        parameters: {
            path: {
                user_id: string;
                challenge_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    destroySpecificUserChallenge: {
        parameters: {
            path: {
                user_id: string;
                challenge_id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    listLeaderboards: {
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Leaderboards'][];
                };
            };
        };
    };
    createLeaderboards: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['Leaderboards'];
                'application/x-www-form-urlencoded': components['schemas']['Leaderboards'];
                'multipart/form-data': components['schemas']['Leaderboards'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['Leaderboards'];
                };
            };
        };
    };
    retrieveLeaderboards: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this leaderboards. */
                id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Leaderboards'];
                };
            };
        };
    };
    updateLeaderboards: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this leaderboards. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Leaderboards'];
                'application/x-www-form-urlencoded': components['schemas']['Leaderboards'];
                'multipart/form-data': components['schemas']['Leaderboards'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Leaderboards'];
                };
            };
        };
    };
    destroyLeaderboards: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this leaderboards. */
                id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateLeaderboards: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this leaderboards. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Leaderboards'];
                'application/x-www-form-urlencoded': components['schemas']['Leaderboards'];
                'multipart/form-data': components['schemas']['Leaderboards'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Leaderboards'];
                };
            };
        };
    };
    retrieveConversation: {
        parameters: {
            path: {
                sender_id: string;
                receiver_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    listFolders: {
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Folder'][];
                };
            };
        };
    };
    createFolders: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['Folder'];
                'application/x-www-form-urlencoded': components['schemas']['Folder'];
                'multipart/form-data': components['schemas']['Folder'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['Folder'];
                };
            };
        };
    };
    retrieveFolders: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this folders. */
                id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Folder'];
                };
            };
        };
    };
    updateFolders: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this folders. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Folder'];
                'application/x-www-form-urlencoded': components['schemas']['Folder'];
                'multipart/form-data': components['schemas']['Folder'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Folder'];
                };
            };
        };
    };
    destroyFolders: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this folders. */
                id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateFolders: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this folders. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Folders'];
                'application/x-www-form-urlencoded': components['schemas']['Folders'];
                'multipart/form-data': components['schemas']['Folders'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Folders'];
                };
            };
        };
    };
    listRatings: {
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    createRatingsList: {
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    retrieveUserRatings: {
        parameters: {
            path: {
                user_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    retrieveChallengeRatings: {
        parameters: {
            path: {
                challenge_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    retrieveTaskRatings: {
        parameters: {
            path: {
                task_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    retrieveRatingDetail: {
        parameters: {
            path: {
                user_id: string;
                task_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    destroyRatingDetail: {
        parameters: {
            path: {
                user_id: string;
                task_id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateRatingDetail: {
        parameters: {
            path: {
                user_id: string;
                task_id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    listStreaks: {
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Streak'][];
                };
            };
        };
    };
    createStreaks: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['Streak'];
                'application/x-www-form-urlencoded': components['schemas']['Streak'];
                'multipart/form-data': components['schemas']['Streak'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['Streak'];
                };
            };
        };
    };
    retrieveStreaks: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this streaks. */
                id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Streak'];
                };
            };
        };
    };
    updateStreaks: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this streaks. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Streak'];
                'application/x-www-form-urlencoded': components['schemas']['Streak'];
                'multipart/form-data': components['schemas']['Streak'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Streak'];
                };
            };
        };
    };
    destroyStreaks: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this streaks. */
                id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateStreaks: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this streaks. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Streak'];
                'application/x-www-form-urlencoded': components['schemas']['Streak'];
                'multipart/form-data': components['schemas']['Streak'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Streak'];
                };
            };
        };
    };
    listBoosters: {
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Boosters'][];
                };
            };
        };
    };
    createBoosters: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['Boosters'];
                'application/x-www-form-urlencoded': components['schemas']['Boosters'];
                'multipart/form-data': components['schemas']['Boosters'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['Boosters'];
                };
            };
        };
    };
    retrieveBoosters: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this boosters. */
                id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Boosters'];
                };
            };
        };
    };
    updateBoosters: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this boosters. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Boosters'];
                'application/x-www-form-urlencoded': components['schemas']['Boosters'];
                'multipart/form-data': components['schemas']['Boosters'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Boosters'];
                };
            };
        };
    };
    destroyBoosters: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this boosters. */
                id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateBoosters: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this boosters. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Boosters'];
                'application/x-www-form-urlencoded': components['schemas']['Boosters'];
                'multipart/form-data': components['schemas']['Boosters'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Boosters'];
                };
            };
        };
    };
    listUserBoosters: {
        parameters: {
            path: {
                user_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    listBoosterUsers: {
        parameters: {
            path: {
                booster_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    retrieveSpecificUserBooster: {
        parameters: {
            path: {
                user_id: string;
                booster_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    updateSpecificUserBooster: {
        parameters: {
            path: {
                user_id: string;
                booster_id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    destroySpecificUserBooster: {
        parameters: {
            path: {
                user_id: string;
                booster_id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateSpecificUserBooster: {
        parameters: {
            path: {
                user_id: string;
                booster_id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    listChallenges: {
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Challenges'][];
                };
            };
        };
    };
    createChallenges: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['Challenges'];
                'application/x-www-form-urlencoded': components['schemas']['Challenges'];
                'multipart/form-data': components['schemas']['Challenges'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['Challenges'];
                };
            };
        };
    };
    retrieveChallenges: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this challenges. */
                id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Challenges'];
                };
            };
        };
    };
    updateChallenges: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this challenges. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Challenges'];
                'application/x-www-form-urlencoded': components['schemas']['Challenges'];
                'multipart/form-data': components['schemas']['Challenges'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Challenges'];
                };
            };
        };
    };
    destroyChallenges: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this challenges. */
                id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    partialUpdateChallenges: {
        parameters: {
            path: {
                /** @description A unique integer value identifying this challenges. */
                id: string;
            };
        };
        requestBody?: {
            content: {
                'application/json': components['schemas']['Challenges'];
                'application/x-www-form-urlencoded': components['schemas']['Challenges'];
                'multipart/form-data': components['schemas']['Challenges'];
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': components['schemas']['Challenges'];
                };
            };
        };
    };
    listFollows: {
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    createFollowList: {
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    listFollowers: {
        parameters: {
            path: {
                user_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    listFollowings: {
        parameters: {
            path: {
                user_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown[];
                };
            };
        };
    };
    retrieveFollowDetail: {
        parameters: {
            path: {
                follower_id: string;
                followed_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    retrieveFriends: {
        parameters: {
            path: {
                user_id: string;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    /** @description Receives the user's data and creates a new user. */
    createUser: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['UserCreate'];
                'application/x-www-form-urlencoded': components['schemas']['UserCreate'];
                'multipart/form-data': components['schemas']['UserCreate'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['UserCreate'];
                };
            };
        };
    };
    /** @description Receives a token sent by email, and if valid, activates the user's account */
    createactivate_user_account: {
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    /**
     * @description Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     */
    createTokenObtainPair: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['TokenObtainPair'];
                'application/x-www-form-urlencoded': components['schemas']['TokenObtainPair'];
                'multipart/form-data': components['schemas']['TokenObtainPair'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['TokenObtainPair'];
                };
            };
        };
    };
    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     */
    createTokenRefresh: {
        requestBody?: {
            content: {
                'application/json': components['schemas']['TokenRefresh'];
                'application/x-www-form-urlencoded': components['schemas']['TokenRefresh'];
                'multipart/form-data': components['schemas']['TokenRefresh'];
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': components['schemas']['TokenRefresh'];
                };
            };
        };
    };
    createBadgeUser: {
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    createLeaderboardUser: {
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    createChallengeUser: {
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    createDirect: {
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    createBoosterUser: {
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            201: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    /** @description Used to update the user's personal data */
    partialUpdateupdate_user: {
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    /** @description Receives the current password and the new password, and after confirming the current password, updates the user's password */
    partialUpdateupdate_user_password: {
        requestBody?: {
            content: {
                'application/json': unknown;
                'application/x-www-form-urlencoded': unknown;
                'multipart/form-data': unknown;
            };
        };
        responses: {
            200: {
                content: {
                    'application/json': unknown;
                };
            };
        };
    };
    destroydelete_user_account: {
        responses: {
            204: never;
        };
    };
    destroyDirectDelete: {
        parameters: {
            path: {
                direct_id: string;
            };
        };
        responses: {
            204: never;
        };
    };
    destroyUnfollow: {
        parameters: {
            path: {
                follower_id: string;
                followed_id: string;
            };
        };
        responses: {
            204: never;
        };
    };
}
