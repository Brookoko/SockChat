import { APIRequest, APIResponse } from '../api';

export type User = {
    id: string,
    username: string,
    password_hash: string,
};

export interface AuthorizedAPIRequest extends APIRequest {
    user: User
}

export type SignupRequest = APIRequest & {
    body: {
        username: string,
        password: string,   
    },
    params: {},
    rawBody: undefined,
};

export type SignupResponse = APIResponse & {
    status: 'ok',
};

export type LoginRequest = {
    body: {
        username: string,
        password: string,
    },
    params: {},
    rawBody: undefined,
};

export type LoginResponse = {
    status: 'ok',
    authToken: string,
};

export type AuthToken = {
    username: string
};
