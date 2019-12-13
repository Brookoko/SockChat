import { AllMessageRequest, AllMessageResponse } from './types';

import { Database } from '../database';

export const recentMessageInit = (database: Database) => async (req: AllMessageRequest): Promise<AllMessageResponse> => {
    var messages = await database.loadRecentMessages();

    return {
        status: 'ok',
        messages,
    };
};