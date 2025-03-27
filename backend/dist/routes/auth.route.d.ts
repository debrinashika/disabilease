import { Routes } from '../interfaces/route.interface';
export declare class AuthRoute implements Routes {
    router: import("express-serve-static-core").Router;
    private authService;
    private authController;
    constructor();
    private initializeRoutes;
}
