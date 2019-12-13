import { hash } from 'argon2';
import uuid from 'uuid';

import { SignupRequest, SignupResponse } from './types';

import { Database } from '../database';
import { fieldNotSetError } from '../api';
import { 
    usernameTooShortError, 
    usernameTooLongError, 
    usernameInvalidFormatError,
    userAlreadyExistsError,
    passwordTooShortError,
} from './errors';

const minUsernameLength = 8;
const maxUsernameLength = 100;
const usernameRegularExpression = /[a-zA-Z0-9_\\.]+/
const minPasswordLength = 8;

const validateUsername = async (database: Database, username: string) => {
    if (username === undefined) {
        throw fieldNotSetError('username'); 
    }

    if (username.length < minUsernameLength) {
        throw usernameTooShortError(username, minUsernameLength);
    }

    if (username.length > maxUsernameLength) {
        throw usernameTooLongError(username, maxUsernameLength);
    }

    if (!usernameRegularExpression.test(username)) {
        throw usernameInvalidFormatError(username);
    }

    const user = await database.findUserByUsername(username);
    if (user !== undefined) {
        throw userAlreadyExistsError(username);
    }
};

const validatePassword = (password: string) => {
    if (password === undefined) {
        throw fieldNotSetError('password');
    }

    if (password.length < minPasswordLength) {
        throw passwordTooShortError(password, minPasswordLength);
    }
};

const generateUserID = (): string => uuid.v4();

const hashPassword = (password: string): Promise<string> => hash(password);

export const signupInit = (database: Database) => async (req: SignupRequest): Promise<SignupResponse> => {
    await validateUsername(database, req.body.username);
    validatePassword(req.body.password);

    const id = await generateUserID();
    const passwordHash = await hashPassword(req.body.password);

    await database.createUser(id, req.body.username, passwordHash);

    return {
        status: 'ok',
    };
};