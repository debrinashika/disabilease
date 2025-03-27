"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
const auth_route_1 = require("./auth.route");
const user_route_1 = require("./user.route");
const assessment_route_1 = require("./assessment.route");
const task_category_route_1 = require("./task.category.route");
const task_route_1 = require("./task.route");
class AppRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.use(new auth_route_1.AuthRoute().router);
        this.router.use('/users', new user_route_1.UserRoute().router);
        this.router.use('/assessments', new assessment_route_1.AssessmentRoute().router);
        this.router.use('/task-categories', new task_category_route_1.TaskCategoryRoute().router);
        this.router.use('/tasks', new task_route_1.TaskRoute().router);
    }
}
exports.AppRouter = AppRouter;
//# sourceMappingURL=index.js.map