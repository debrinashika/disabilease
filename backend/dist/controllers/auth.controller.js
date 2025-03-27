"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const helpers_1 = require("../helpers");
const http_enum_1 = require("../constants/http.enum");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
        this.logout = this.logout.bind(this);
    }
    async login(req, res) {
        const { email, password } = req.body;
        const data = await this.authService.login(res, email, password);
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Login successful', data);
    }
    async register(req, res) {
        const { email, username, password, confirm_password } = req.body;
        await this.authService.register(email, username, password, confirm_password);
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Created, 'Register successful');
    }
    async refreshToken(req, res) {
        const refreshToken = req.cookies.jid;
        const data = await this.authService.refreshToken(res, refreshToken);
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Token has been refreshed', data);
    }
    async logout(req, res) {
        helpers_1.AuthHelper.sendRefreshToken(res, "");
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Logout successful');
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map