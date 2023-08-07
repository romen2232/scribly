export function isStrongPassword(password: string): boolean {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);

    return password.length >= 8 && hasLowercase && hasUppercase && hasDigit;
}
