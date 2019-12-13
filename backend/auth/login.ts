import { verify } from 'argon2';

import { LoginRequest, LoginResponse } from './types';

import { Database } from '../database';
import { fieldNotSetError } from '../api';

import { userNotFoundError, invalidPasswordError } from './errors';
import { generateAuthToken } from './common';
import { AppSecret } from '../types';

export const verifyPassword = (passwordHash: string, password: string): Promise<boolean> => verify(passwordHash, password);

export const loginInit = (database: Database, appSecret: AppSecret) => async (req: LoginRequest): Promise<LoginResponse> => {
    if (req.body.username === undefined) {
        throw fieldNotSetError('username');
    }

    if (req.body.password === undefined) {
        throw fieldNotSetError('password');
    }

    const user = await database.findUserByUsername(req.body.username);
    if (user === undefined) {
        throw userNotFoundError(req.body.username);
    }

    if (!await verifyPassword(user.password_hash, req.body.password)) {
        throw invalidPasswordError();
    }

    return {
        status: 'ok',
        authToken: await generateAuthToken(user, appSecret)
    };
};