import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { IRequestResponseHandler } from '../interfaces/http.interface';
declare class ValidationMiddleware {
    static validate(schema: AnyZodObject | any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static exceptionGuard(handler: IRequestResponseHandler): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default ValidationMiddleware;
