export type ForestType = 'poetry' | 'prose' | 'script';

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    email: string;
    password: string;
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
