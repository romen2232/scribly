import tailwindConfig from '../../tailwind.config';
/**
 * Checks if password is strong
 * Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter and one digit
 * @param password password to be validated
 * @returns true if password is strong, false otherwise
 */
export function isStrongPassword(password) {
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
export function isValidUsername(username) {
    const regex = /^[a-zA-Z][a-zA-Z0-9-_]{4,14}$/;
    return regex.test(username);
}
/**
 * formats date from YYYY-MM-DD to DD/MM/YYYY
 * @param date String in the format YYYY-MM-DD or Date object
 * @returns String in the format DD/MM/YYYY
 */
export function formatDate(date) {
    date = date || new Date();
    let dateObj;
    if (typeof date === 'string') {
        dateObj = new Date(date);
    }
    else {
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
export function camelToSnake(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
/**
 * Converts string from snake case to camel case
 * @param str string to be converted from snake case to camel case
 * @returns string in camel case
 */
export function snakeToCamel(str) {
    return str.replace(/_\w/g, (letter) => letter[1].toUpperCase());
}
/**
 * Converts object keys from camel case to snake case
 * @param obj object to be converted from camel case to snake case
 * @returns object in snake case
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keysToSnake(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((v) => keysToSnake(v));
    }
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [camelToSnake(k), keysToSnake(v)]));
}
/**
 * Converts object keys from snake case to camel case
 * @param obj object to be converted from snake case to camel case
 * @returns object in camel case
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keysToCamel(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((v) => keysToCamel(v));
    }
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [snakeToCamel(k), keysToCamel(v)]));
}
/**
 * Shuffles array using Fisher-Yates algorithm (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
 * @param array Array to be shuffled
 * @returns shuffled array
 */
export function shuffleArray(originalArray) {
    const array = [...originalArray];
    let currentIndex = array.length;
    let randomIndex;
    let tempValue;
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
/**
 * Searches through folders and notes for a query
 * @param folder Folder to be searched
 * @param query Query to be searched for
 * @param favorites If true, only searches through favorites
 * @returns Folder with matched notes and subfolders
 */
export function searchFolders(folder, query, favorites) {
    // If query is empty and favorites is true, we're just looking for favorites.
    const lookingForFavsOnly = query === '' && favorites;
    // Check if folder name matches the query and if it's favorite (if favorites filter is enabled)
    const doesFolderMatch = lookingForFavsOnly
        ? folder.favorite
        : folder.folderName.toLowerCase().includes(query.toLowerCase()) &&
            (!favorites || folder.favorite);
    // Filter notes based on the query and favorites criteria
    const matchedNotes = folder.notes?.filter((note) => lookingForFavsOnly
        ? note.favorite
        : note.noteName?.toLowerCase().includes(query.toLowerCase()) &&
            (!favorites || note.favorite)) || [];
    // Use recursion to search through subfolders
    const matchedSubfolders = folder.subfolders
        ?.map((sf) => searchFolders(sf, query, favorites))
        .filter((f) => f !== null) || [];
    // Determine if the folder or its sub-content matches the criteria
    const hasMatchingContent = doesFolderMatch ||
        matchedNotes.length > 0 ||
        matchedSubfolders.length > 0;
    if (hasMatchingContent) {
        return {
            ...folder,
            notes: matchedNotes,
            subfolders: matchedSubfolders,
        };
    }
    return null;
}
/**
 * Returns the color from the Tailwind config
 * @param colorName Name of the color
 * @param shade Shade of the color
 * @returns Color in hex format without the #
 */
export function getColor(tailwindColor, tailwindShade) {
    if (tailwindColor.startsWith('#'))
        return tailwindColor.replace('#', '');
    const parsedColor = tailwindColor.replace('bg-', '');
    const colors = tailwindConfig?.theme?.colors;
    let colorName = parsedColor.replace('bg-', '');
    let shade = tailwindShade;
    if (parsedColor.split('-').length > 1) {
        colorName = parsedColor.split('-')[0];
        shade = parsedColor.split('-')[1];
    }
    if (typeof shade === 'string') {
        shade = parseInt(shade);
    }
    const color = colors[colorName];
    if (!color) {
        throw new Error(`Color ${colorName} not found in Tailwind config.`);
    }
    if (typeof color === 'string') {
        if (shade) {
            throw new Error(`Shade ${shade} was specified, but color ${colorName} is a string and doesn't have shades.`);
        }
        return color;
    }
    // At this point, TypeScript knows color is of type ColorShades
    const shadeColor = color[shade]; // We use `!` to assert that shade is defined
    if (!shadeColor) {
        throw new Error(`Shade ${shade} of color ${colorName} not found in Tailwind config.`);
    }
    return shadeColor.replace('#', '');
}
/**
 * Returns the lightness of a color
 * @param color Color in hex format
 * @returns Lightness of the color
 */
export function determineLightColor(hexColor) {
    // Check if the given hex has the # symbol at the start and remove it
    if (hexColor.charAt(0) === '#') {
        hexColor = hexColor.slice(1);
    }
    // Convert the hex to RGB values
    const r = parseInt(hexColor.substring(0, 2), 16) / 255;
    const g = parseInt(hexColor.substring(2, 4), 16) / 255;
    const b = parseInt(hexColor.substring(4, 6), 16) / 255;
    // Calculate the luminance using relative luminance formula
    const getLuminanceComponent = (color) => {
        if (color <= 0.03928) {
            return color / 12.92;
        }
        else {
            return Math.pow((color + 0.055) / 1.055, 2.4);
        }
    };
    const luminance = 0.2126 * getLuminanceComponent(r) +
        0.7152 * getLuminanceComponent(g) +
        0.0722 * getLuminanceComponent(b);
    // Typically, a luminance value of greater than 0.5 is considered "light",
    // and anything less than or equal to that is "dark"
    return luminance > 0.5;
}
/**
 * Lightens a color
 * @param color Color in hex format
 * @param percent Percent to lighten the color by
 * @returns Lightened color in hex format
 */
export function lightenColor(color, percent) {
    const parsedColor = color.replace('#', '');
    const num = parseInt(parsedColor.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
