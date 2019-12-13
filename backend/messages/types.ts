import { APIRequest, APIResponse } from '../api';

export type Message = {
    username: string,
    message: string,
};

export type MessageRequest = APIRequest & {
    body: {
        username: string,
        message: string,   
    },
    params: {},
    rawBody: undefined,
};

export type MessageResponse = APIResponse & {
    status: 'ok',
};

export type AllMessageRequest = {
};

export type AllMessageResponse = {
    status: 'ok',
    messages: Message[]
};

export type RecentMessageRequest = {
};

export type RecentMessageResponse = {
    status: 'ok',
    messages: Message[]
};
