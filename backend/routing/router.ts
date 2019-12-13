import Router from 'koa-router';
import Koa from 'koa';

import { Database } from '../database';
import { wrapPromiseHandler } from '../api';
import { signupInit, loginInit } from '../auth';
import { AppSecret } from '../types';
import { messageInit, allMessageInit, recentMessageInit } from '../messages';

export const routerInit = async (database: Database, appSecret: AppSecret): Promise<Router> => {
    const router = new Router();
    
    router.post('/auth/signup', wrapPromiseHandler(signupInit(database)));
    router.post('/auth/login', wrapPromiseHandler(loginInit(database, appSecret)));
    router.post('/message', wrapPromiseHandler(messageInit(database)));

    router.get('/message/all', wrapPromiseHandler(allMessageInit(database)));
    router.get('/message/recent', wrapPromiseHandler(recentMessageInit(database)));

    return router;
};