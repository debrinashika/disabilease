import { Response } from 'express';
declare abstract class ErrorMiddleware {
    protected nextHandler?: ErrorMiddleware;
    setNextHandler(nextHandler: ErrorMiddleware): ErrorMiddleware;
    handle(res: Response, error: unknown): Response;
    protected abstract canHandle(error: unknown): boolean;
    protected abstract getResponse(jsonResponse: Response, error: unknown): Response;
}
declare const _default: ErrorMiddleware;
export default _default;
