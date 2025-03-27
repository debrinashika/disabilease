/// <reference types="cookie-parser" />
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
