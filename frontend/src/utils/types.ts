export type Category = 'POETRY' | 'PROSE' | 'SCRIPT';

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    email: string;
    password: string;
    username: string;
}

export interface IUser {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    experience: number;
    gems: number;
    appearDailyChallenge: boolean;
    isStaff: boolean;
    isActive: boolean;
    dateJoined: Date;
}

export interface BadgeType {
    id?: number;
    badgeName: string;
    badgeDescription: string;
    badgeImage?: string;
    badgeLevel: number;
    badgeColor: string;
    badgeGoal: number;
}
export interface User {
    id: number;
    lastLogin?: string | null;
    isSuperuser?: boolean;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    phoneNumber?: string | null;
    experience?: number;
    gems?: number;
    profilePhoto?: string;
    appearDailyChallenge?: boolean;
    receiveFuturePromotionalEmails?: boolean;
    provideDataToImproveUserExp?: boolean;
    isStaff?: boolean;
    isActive?: boolean;
    dateJoined?: string;
    groups?: number[];
    userPermissions?: number[];
}
export interface Note {
    id?: number;
    noteName?: string;
    noteContent?: string;
    noteImage?: string;
    noteLastModified?: string;
    public?: boolean;
    noteAverageRating?: number;
    tags?: string;
    task?: number | null;
    challenge?: Challenge | null;
    folder: Folder | number;
    user?: User;
}
export interface League {
    id?: number;
    leagueName: string;
    leagueDescription: string;
    leagueImage?: string;
}
export interface Leaderboard {
    id?: number;
    league: number;
    weekDate?: string;
}
export interface Folder {
    id?: number;
    folderName: string;
    folderDescription: string;
    folderImage?: string;
    folderCreated?: string;
    favorite?: boolean;
    folderParent?: number | null;
    depth?: number;
    subfolders?: Folder[];
    notes?: Note[];
}
export interface Streak {
    id?: number;
    user: number;
    streak?: number;
    streakStartDate?: string;
    streakCurrentDate?: string | null;
    streakEndDate?: string | null;
}
export interface Booster {
    id?: number;
    boosterName: string;
    boosterDescription: string;
    boosterImage?: string;
    duration?: number;
    multiplier?: number;
}
export interface Challenge {
    id?: number;
    challengeName: string;
    challengeDescription: string;
    challengeStyle: string;
    difficulty?: number;
    challengePoints?: number;
    challengeAverageRating?: number;
    user: number;
}
export interface UserCreate {
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
}
export interface TokenObtainPair {
    email: string;
    password: string;
}
export interface Token {
    refresh: string;
    access: string;
}
export interface Direct {
    sender: number;
    receiver: number;
    message: string;
    sent_date: Date;
}
export interface Follow {
    follower: User;
    followed: User;
    follow_date: Date;
}
export interface Rating {
    user: number;
    rating: number;
    challenge?: number | null;
    task?: number | null;
    rating_date: Date;
}
export interface BadgeUser {
    badge: BadgeType;
    user: User;
    earned_date: Date;
    badgeProgress: number;
}
export interface BoosterUser {
    booster: number;
    user: number;
    booster_start_date?: Date;
    booster_end_date?: Date | null;
}
export interface ChallengeUser {
    challenge: number;
    user: number;
    challenge_end_date?: Date;
}
export interface LeaderboardUser {
    leaderboard: number;
    user: number;
    leaderboard_update_date?: Date;
    leaderboard_score: number;
}

export interface LessonUser {
    id: number;
    percentageCompleted: number;
    lessonStartDate: Date;
    taskUser: TaskUser[];
    lesson: Lesson;
    user: User;
}

export interface UnitType {
    id: number;
    unitName: string;
    unitDescription: string;
    unitStyle: Category;
    unitColor: string;
    unitNumber: number;
    lessons: Lesson[];
}

export interface Lesson {
    id: number;
    lessonName: string;
    lessonDescription: string;
    lessonTheory: string;
    lessonColor: string;
    difficulty: number;
    unit?: UnitType;
    percentageCompleted?: number;
}

export interface TaskUser {
    task: Task;
    user: User | number;
    taskEndDate: Date;
    earnedPoints: number;
    answerNote?: Note;
    answerText: string;
    answerBoolean: boolean;
    responseText?: string;
    lessonUser: number;
}

export interface Task {
    id: number;
    taskName: string;
    taskDescription: string;
    taskPoints: number;
    type: string;
    text: string;
    lesson: number;
}

export interface TaskProps {
    task: Task;
    onSubmit: (answer: AnswerProps) => void;
    onSkip: () => void;
}

export interface AnswerProps {
    answerText: string;
    type: string;
}
