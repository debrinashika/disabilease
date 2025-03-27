"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHelper = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
class AuthHelper {
    static createAccessToken(user) {
        return jsonwebtoken_1.default.sign({ user_id: user.user_id }, config_1.ACCESS_TOKEN_SECRET, { expiresIn: config_1.ACCESS_TOKEN_EXPIRATION });
    }
    static createRefreshToken(user) {
        return jsonwebtoken_1.default.sign({ user_id: user.user_id }, config_1.REFRESH_TOKEN_SECRET, { expiresIn: config_1.REFRESH_TOKEN_EXPIRATION });
    }
    static sendRefreshToken(res, token) {
        res.cookie('jid', token, {
            httpOnly: true,
            path: '/api/v1/refresh-token',
        });
    }
}
exports.AuthHelper = AuthHelper;
//# sourceMappingURL=auth.helper.js.map