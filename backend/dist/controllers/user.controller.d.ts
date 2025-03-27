import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { UserService } from '../services/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getSelfData(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
