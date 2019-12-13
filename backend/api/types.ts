import Koa from 'koa';

export interface APIRequest {
    body: APIRequestBody,
    params: APIRequestParams,
    rawBody: Buffer | undefined,
};

export interface APIRequestBody {
};

export interface APIRequestParams {
};

export interface APIResponse {
};

export interface APIError {
    status: number,
    apiErrorCode: string,
    apiErrorMessage: string,
};

export type APIRequestHandler<T extends APIRequest, S extends APIResponse> = (req: T) => Promise<S>;

export type APIResponseMapper<T extends APIResponse> = (ctx: Koa.Context, req: T) => T;