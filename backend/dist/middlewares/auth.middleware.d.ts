import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
declare class AuthMiddleware {
    static authenticateToken(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
export default AuthMiddleware;
