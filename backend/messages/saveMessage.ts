import { MessageRequest, MessageResponse } from './types';

import { Database } from '../database';
import { fieldNotSetError } from '../api';

import uuid = require('uuid');

const generateID = (): string => uuid.v4();

export const messageInit = (database: Database) => async (req: MessageRequest): Promise<MessageResponse> => {
    console.dir(req.body)
    if (req.body.message === undefined) {
        throw fieldNotSetError('message');
    }
    if (req.body.username === undefined) {
        throw fieldNotSetError('username');
    }
   
    const id = generateID();
    const date = new Date();

    await database.createMessage(id, req.body.username, req.body.message, date);

    return {
        status: 'ok',
    };
};