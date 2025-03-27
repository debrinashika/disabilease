"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const user_service_1 = require("../services/user.service");
const user_controller_1 = require("../controllers/user.controller");
class UserRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userService = new user_service_1.UserService();
        this.userController = new user_controller_1.UserController(this.userService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/self', middlewares_1.AuthMiddleware.authenticateToken, middlewares_1.ValidationMiddleware.exceptionGuard(this.userController.getSelfData));
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=user.route.js.map