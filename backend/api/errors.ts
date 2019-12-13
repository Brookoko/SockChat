import { APIError } from './types';

export const fieldNotSetError = (fieldName: string): APIError => ({
    status: 400,
    apiErrorCode: 'missing_field',
    apiErrorMessage: `Field is not set: ${fieldName}`,
});