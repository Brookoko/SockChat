import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import { Database } from './database';

import { routerInit } from './routing';
import { AppSecret } from './types';

const ORIGIN_WHITELIST = ['http://localhost:3000'];

const isOriginInWhitelist = (ctx: Koa.Context) => {
    const requestOrigin = ctx.get('Origin');
    
    if (ORIGIN_WHITELIST.includes(requestOrigin)) {
      return requestOrigin;
    }

    return ORIGIN_WHITELIST[0];
};



export default async (database: Database, appSecret: AppSecret) => {
    const app = new Koa()
        .use(bodyParser())
        .use(cors({ origin: isOriginInWhitelist, allowMethods: ['GET', 'POST'], maxAge: 3600 }))
        .use((await routerInit(database, appSecret)).routes())

    return { app };
};
