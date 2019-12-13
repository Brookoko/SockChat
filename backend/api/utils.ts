import Koa from 'koa';

import { APIRequest, APIResponse, APIError, APIRequestHandler, APIResponseMapper, APIRequestBody } from './types';

const defaultResponseMapper = <T> (ctx: Koa.Context, response: T): T => response;

export const writePromiseResponse = <T extends APIResponse>(ctx: Koa.Context, responsePromise: Promise<T>, responseMapper?: APIResponseMapper<T>): Promise<T | void> =>
    responsePromise
        .then((res: T) => ctx.body = (responseMapper || defaultResponseMapper)(ctx, res))
        .catch((err: APIError) => {
            console.error(err);
            ctx.body = {
                'status': 'error',
                'error': err.apiErrorCode || 'internal_server_error',
                'message': err.apiErrorMessage || 'Internal Server Error',
            };
            ctx.status = err.status || 500;
        });

export const wrapPromiseHandler = <T extends APIRequest, S extends APIResponse> (handler: APIRequestHandler<T, S>, responseMapper?: APIResponseMapper<S>) => 
    (ctx: Koa.Context) => writePromiseResponse(ctx, handler({ body: ctx.request!.body, params: ctx.params } as T), responseMapper);