import { APIError } from '../api';

export const usernameTooShortError = (username: string, minUsernameLength: number): APIError => ({
    status: 400,
    apiErrorCode: 'username_too_short',
    apiErrorMessage: `Username is too short: ${username.length} < ${minUsernameLength}`,
});

export const usernameTooLongError = (username: string, maxUsernameLength: number): APIError => ({
    status: 400,
    apiErrorCode: 'username_too_long',
    apiErrorMessage: `Username is too long: ${username.length} > ${maxUsernameLength}`,
});

export const usernameInvalidFormatError = (username: string): APIError => ({
    status: 400,
    apiErrorCode: 'username_invalid_format',
    apiErrorMessage: `Invalid username format`,
});``

export const userAlreadyExistsError = (username: string): APIError => ({
    status: 400,
    apiErrorCode: 'user_already_exists',
    apiErrorMessage: `User "${username}" does already exist`,
});

export const passwordTooShortError = (password: string, minPasswordLength: number): APIError => ({
    status: 400,
    apiErrorCode: 'password_too_short',
    apiErrorMessage: `Password is too short ${password.length} < ${minPasswordLength}`,
});

export const userNotFoundError = (username: string): APIError => ({
    status: 400,
    apiErrorCode: 'user_not_found',
    apiErrorMessage: `User not found: "${username}"`,
});

export const invalidPasswordError = (): APIError => ({
    status: 400,
    apiErrorCode: 'invalid_password',
    apiErrorMessage: 'Invalid password',
});