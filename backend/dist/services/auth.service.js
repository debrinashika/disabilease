"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const bcryptjs_1 = require("bcryptjs");
const client_1 = require("@prisma/client");
const user_service_1 = require("./user.service");
const http_exception_1 = require("../exceptions/http.exception");
const http_enum_1 = require("../constants/http.enum");
const helpers_1 = require("../helpers");
const assessment_result_service_1 = require("./assessment.result.service");
const task_category_service_1 = require("./task.category.service");
const config_1 = require("../config");
class AuthService {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.userModel = new client_1.PrismaClient().user;
    }
    async login(res, email, password) {
        const user = await this.userService.getUserByEmail(email);
        // Check user
        if (!user) {
            throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Unauthorized, 'Invalid credentials');
        }
        // Password validation
        const isValidPassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isValidPassword) {
            throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Unauthorized, 'Invalid credentials');
        }
        // User is valid
        // Make refresh token
        const refreshToken = helpers_1.AuthHelper.createRefreshToken(user);
        // Send it to cookie
        helpers_1.AuthHelper.sendRefreshToken(res, refreshToken);
        // Make acess token
        const accessToken = helpers_1.AuthHelper.createAccessToken(user);
        const assessmentResultService = new assessment_result_service_1.AssessmentResultService();
        return {
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                already_test: await assessmentResultService.isUserHasTakenTest(user.user_id) != null
            },
            token: accessToken,
        };
    }
    async register(email, username, password, confirm_password) {
        const errors = {};
        // Check confirm password
        if (password !== confirm_password) {
            errors.confirm_password = ["Confirm password doesn't match password"];
        }
        const isUsernameExists = await this.userService.getUserByUsername(username);
        const isEmailExists = await this.userService.getUserByEmail(email);
        // Check uniqueness
        if (isUsernameExists) {
            errors.username = ["Username already exists"];
        }
        if (isEmailExists) {
            errors.email = ["Email already exists"];
        }
        if (Object.keys(errors).length > 0) {
            throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Conflict, 'Invalid request', errors);
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, await (0, bcryptjs_1.genSalt)());
        const newUser = await this.userModel.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword
            },
        });
        const taskCategoryService = new task_category_service_1.TaskCategoryService();
        await taskCategoryService.createInitialTaskCategories(newUser.user_id);
        return;
    }
    async refreshToken(res, refreshToken) {
        if (!refreshToken) {
            throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Unauthorized, 'Invalid credentials');
        }
        let payload;
        jsonwebtoken_1.default.verify(refreshToken, config_1.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Unauthorized, 'Invalid credentials');
            }
            payload = decoded;
        });
        // Token is valid
        if (typeof payload !== 'string' && payload && 'user_id' in payload) {
            const user = await this.userService.getUserById(payload.user_id);
            if (!user) {
                throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Unauthorized, 'Invalid credentials');
            }
            // User is valid
            // Refresh the token
            const newRefreshToken = helpers_1.AuthHelper.createRefreshToken(user);
            // Send it to cookie
            helpers_1.AuthHelper.sendRefreshToken(res, newRefreshToken);
            // Make acess token
            const accessToken = helpers_1.AuthHelper.createAccessToken(user);
            return {
                token: accessToken,
            };
        }
        else {
            throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Unauthorized, 'Invalid credentials');
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map