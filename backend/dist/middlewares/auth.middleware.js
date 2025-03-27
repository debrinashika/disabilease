"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _1 = require(".");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const http_enum_1 = require("../constants/http.enum");
const config_1 = require("../config");
const user_service_1 = require("../services/user.service");
const http_exception_1 = require("../exceptions/http.exception");
class AuthMiddleware {
    static async authenticateToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1]; // Bearer Token
            if (!token) {
                throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Unauthorized, 'Invalid credentials');
            }
            const payload = await new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(token, config_1.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        reject(new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Unauthorized, 'Invalid credentials', err));
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
            const userService = new user_service_1.UserService();
            const user = await userService.getUserById(payload.user_id);
            if (!user) {
                throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Unauthorized, 'Invalid credentials');
            }
            req.user = user;
            next();
        }
        catch (error) {
            _1.ErrorMiddleware.handle(res, error);
        }
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map