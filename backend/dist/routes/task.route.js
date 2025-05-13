"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoute = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const task_service_1 = require("../services/task.service");
const task_controller_1 = require("../controllers/task.controller");
const task_dto_1 = require("../dtos/task.dto");
class TaskRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.taskService = new task_service_1.TaskService();
        this.taskController = new task_controller_1.TaskController(this.taskService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.put('/', middlewares_1.AuthMiddleware.authenticateToken, middlewares_1.ValidationMiddleware.validate(task_dto_1.addOrUpdateTaskSchema), middlewares_1.ValidationMiddleware.exceptionGuard(this.taskController.addOrUpdateTask));
        this.router.get('/completed', middlewares_1.AuthMiddleware.authenticateToken, middlewares_1.ValidationMiddleware.exceptionGuard(this.taskController.getCompletedTasks));
        this.router.get('/category', middlewares_1.AuthMiddleware.authenticateToken, middlewares_1.ValidationMiddleware.exceptionGuard(this.taskController.getUserCategory));
        this.router.get('/ai-recommendation', middlewares_1.AuthMiddleware.authenticateToken, middlewares_1.ValidationMiddleware.exceptionGuard(this.taskController.getAIRecommendation));
        this.router.get('/task/:date', middlewares_1.AuthMiddleware.authenticateToken, middlewares_1.ValidationMiddleware.validate(task_dto_1.getTaskSchema), middlewares_1.ValidationMiddleware.exceptionGuard(this.taskController.getTask));
        this.router.patch('/:task_id', middlewares_1.AuthMiddleware.authenticateToken, middlewares_1.ValidationMiddleware.validate(task_dto_1.checkTaskSchema), middlewares_1.ValidationMiddleware.exceptionGuard(this.taskController.checkTask));
    }
}
exports.TaskRoute = TaskRoute;
//# sourceMappingURL=task.route.js.map