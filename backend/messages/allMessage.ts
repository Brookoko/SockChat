import { AllMessageRequest, AllMessageResponse } from './types';

import { Database } from '../database';

export const allMessageInit = (database: Database) => async (req: AllMessageRequest): Promise<AllMessageResponse> => {
    var messages = await database.loadAllMessages();

    return {
        status: 'ok',
        messages,
    };
};