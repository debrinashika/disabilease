import { User } from '@prisma/client';
import { Response } from 'express';
export declare class AuthHelper {
    static createAccessToken(user: User): string;
    static createRefreshToken(user: User): string;
    static sendRefreshToken(res: Response, token: string): void;
}
