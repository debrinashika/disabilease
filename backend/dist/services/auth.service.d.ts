import { Response } from 'express';
export declare class AuthService {
    private userService;
    private userModel;
    login(res: Response, email: string, password: string): Promise<{
        user: {
            user_id: number;
            username: string;
            email: string;
            already_test: boolean;
        };
        token: string;
    }>;
    register(email: string, username: string, password: string, confirm_password: string): Promise<void>;
    refreshToken(res: Response, refreshToken: string | null): Promise<{
        token: string;
    }>;
}
