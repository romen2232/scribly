/**
 * Checks if password is strong
 * Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter and one digit
 * @param password password to be validated
 * @returns true if password is strong, false otherwise
 */
export function isStrongPassword(password: string): boolean {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);

    return password.length >= 8 && hasLowercase && hasUppercase && hasDigit;
}

/**
 * Checks if username is valid
 * Username must be between 5 and 15 characters long and can only contain letters, numbers, dashes and underscores
 * @param username username to be validated
 * @returns true if username is valid, false otherwise
 */
export function isValidUsername(username: string): boolean {
    const regex = /^[a-zA-Z][a-zA-Z0-9-_]{4,14}$/;
    return regex.test(username);
}

/**
 * formats date from YYYY-MM-DD to DD/MM/YYYY
 * @param date String in the format YYYY-MM-DD or Date object
 * @returns String in the format DD/MM/YYYY
 */
export function formatDate(date: string | Date): string {
    let dateObj: Date;
    if (typeof date === 'string') {
        dateObj = new Date(date);
    } else {
        dateObj = date;
    }
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
}

/**
 * Converts string from camel case to snake case
 * @param str string to be converted from camel case to snake case
 * @returns string in snake case
 */
export function camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Converts string from snake case to camel case
 * @param str string to be converted from snake case to camel case
 * @returns string in camel case
 */
export function snakeToCamel(str: string): string {
    return str.replace(/_\w/g, (letter) => letter[1].toUpperCase());
}
/**
 * Converts object keys from camel case to snake case
 * @param obj object to be converted from camel case to snake case
 * @returns object in snake case
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keysToSnake(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((v) => keysToSnake(v));
    }

    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [camelToSnake(k), keysToSnake(v)]),
    );
}

/**
 * Converts object keys from snake case to camel case
 * @param obj object to be converted from snake case to camel case
 * @returns object in camel case
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keysToCamel(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((v) => keysToCamel(v));
    }

    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [snakeToCamel(k), keysToCamel(v)]),
    );
}

/**
 * Shuffles array using Fisher-Yates algorithm (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
 * @param array Array to be shuffled
 * @returns shuffled array
 */
export function shuffleArray<T>(originalArray: T[]): T[] {
    const array = [...originalArray];
    let currentIndex = array.length;
    let randomIndex: number;
    let tempValue: T;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }

    return array;
}
