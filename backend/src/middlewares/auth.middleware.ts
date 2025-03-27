import { NextFunction, Response } from 'express';
import { ErrorMiddleware } from '.';
import jwt from 'jsonwebtoken';
import { DataPayload, RequestWithUser } from '../interfaces/auth.interface';
import { HttpStatusCode } from '../constants/http.enum';
import { ACCESS_TOKEN_SECRET } from '../config';
import { UserService } from '../services/user.service';
import { HttpException } from '../exceptions/http.exception';

class AuthMiddleware {
  public static async authenticateToken(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1]; // Bearer Token

      if (!token) {
        throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
      }

      const payload: DataPayload = await new Promise((resolve, reject) => {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
          if (err) {
            reject(new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials', err));
          } else {
            resolve(decoded as DataPayload);
          }
        });
      });

      const userService = new UserService();
      const user = await userService.getUserById(payload.user_id);

      if (!user) {
        throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
      }

      req.user = user;
      next();
    } catch (error) {
      ErrorMiddleware.handle(res, error);
    }
  }
}

export default AuthMiddleware;