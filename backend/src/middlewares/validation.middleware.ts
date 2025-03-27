import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { ErrorMiddleware } from '.';
import { IRequestResponseHandler } from '../interfaces/http.interface';

class ValidationMiddleware {
  public static validate(schema: AnyZodObject | any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const parsed = await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        req.body = parsed.body;
        req.query = parsed.query;
        req.params = parsed.params;

        return next();
      } catch (error) {
        ErrorMiddleware.handle(res, error);
      }
    };
  }

  public static exceptionGuard(handler: IRequestResponseHandler) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await handler(req, res);
      } catch (error) {
        ErrorMiddleware.handle(res, error);
      }

      return next();
    };
  }
}

export default ValidationMiddleware;