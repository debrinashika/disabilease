"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCategoryRoute = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const task_category_service_1 = require("../services/task.category.service");
const task_category_controller_1 = require("../controllers/task.category.controller");
const task_category_dto_1 = require("../dtos/task.category.dto");
class TaskCategoryRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.taskCategoryService = new task_category_service_1.TaskCategoryService();
        this.taskCategoryController = new task_category_controller_1.TaskCategoryController(this.taskCategoryService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', middlewares_1.AuthMiddleware.authenticateToken, middlewares_1.ValidationMiddleware.exceptionGuard(this.taskCategoryController.getTaskCategories));
        this.router.put('/', middlewares_1.AuthMiddleware.authenticateToken, middlewares_1.ValidationMiddleware.validate(task_category_dto_1.addOrUpdateTaskCategoriesSchema), middlewares_1.ValidationMiddleware.exceptionGuard(this.taskCategoryController.addOrUpdateTaskCategories));
        this.router.post('/add-validate', middlewares_1.AuthMiddleware.authenticateToken, middlewares_1.ValidationMiddleware.validate(task_category_dto_1.validateAddTaskCategorySchema), middlewares_1.ValidationMiddleware.exceptionGuard(this.taskCategoryController.validateAddTaskCategory));
    }
}
exports.TaskCategoryRoute = TaskCategoryRoute;
//# sourceMappingURL=task.category.route.js.map