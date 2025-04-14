import express from 'express';
export declare class App {
    app: express.Application;
    port: string | number;
    constructor();
    private initializeMiddlewares;
    private initializeRoutes;
    listen(): void;
}
