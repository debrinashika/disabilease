"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const helpers_1 = require("../helpers");
const http_enum_1 = require("../constants/http.enum");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getSelfData = this.getSelfData.bind(this);
    }
    async getSelfData(req, res) {
        const selfData = await this.userService.getUserSelfDataById(req.user.user_id);
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Operation successful', selfData);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map