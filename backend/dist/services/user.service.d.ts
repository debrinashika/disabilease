import { User } from '@prisma/client';
import { IApiBaseUserSelf } from '../interfaces/user.iterface';
export declare class UserService {
    private userModel;
    getUserById(user_id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
    getUserSelfDataById(user_id: number): Promise<IApiBaseUserSelf>;
}
