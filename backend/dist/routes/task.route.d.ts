import { Routes } from '../interfaces/route.interface';
export declare class TaskRoute implements Routes {
    router: import("express-serve-static-core").Router;
    private taskService;
    private taskController;
    constructor();
    private initializeRoutes;
}
