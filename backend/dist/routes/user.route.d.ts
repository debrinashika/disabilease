import { Routes } from '../interfaces/route.interface';
export declare class UserRoute implements Routes {
    router: import("express-serve-static-core").Router;
    private userService;
    private userController;
    constructor();
    private initializeRoutes;
}
