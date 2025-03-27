import express from 'express';
export declare class App {
    app: express.Application;
    env: string;
    port: string | number;
    constructor();
    private initializeMiddlewares;
    private initializeRoutes;
    listen(): void;
}
