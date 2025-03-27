import { ACCESS_TOKEN_EXPIRATION, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_SECRET } from '../config';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Response } from 'express';

export class AuthHelper {
  public static createAccessToken(user: User) {
    return jwt.sign(
      { user_id: user.user_id }, 
      ACCESS_TOKEN_SECRET, 
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
  }

  public static createRefreshToken(user: User) {
    return jwt.sign(
      { user_id: user.user_id }, 
      REFRESH_TOKEN_SECRET, 
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );
  }

  public static sendRefreshToken(res: Response, token: string) {
    res.cookie('jid', token, {
      httpOnly: true,
      path: '/api/v1/refresh-token',
    });
  }
}
