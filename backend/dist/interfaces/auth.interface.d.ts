/// <reference types="cookie-parser" />
import { Request } from 'express';
import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
export interface DataPayload extends JwtPayload {
    user_id: number;
}
export interface RequestWithUser extends Request {
    user: User;
}
