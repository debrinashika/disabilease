import { Routes } from '../interfaces/route.interface';
export declare class AssessmentRoute implements Routes {
    router: import("express-serve-static-core").Router;
    private assessmentService;
    private assessmentController;
    constructor();
    private initializeRoutes;
}
