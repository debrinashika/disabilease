import { Routes } from 'interfaces/route.interface';
export declare class TaskCategoryRoute implements Routes {
    router: import("express-serve-static-core").Router;
    private taskCategoryService;
    private taskCategoryController;
    constructor();
    private initializeRoutes;
}
