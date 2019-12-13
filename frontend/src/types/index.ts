export * from './api';

// auth
export const AUTH_DONE = 'AUTH_DONE';

export type User = {
    name?: string;
    authorized: boolean;
};

export const MESSAGE_SEND = 'MESSAGE_SEND';
export const MESSAGE_RECENT = 'MESSAGE_RECENT';

