"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    static responseSuccess(res, statusCode, message, data) {
        const responseObj = {
            status: 'success',
            message: message,
        };
        if (data !== null && data !== undefined) {
            responseObj.data = data;
        }
        return res.status(statusCode).json(responseObj);
    }
    static responseError(res, statusCode, message, errors) {
        const responseObj = {
            status: 'error',
            message: message,
        };
        if (errors !== null && errors !== undefined) {
            responseObj.errors = errors;
        }
        return res.status(statusCode).json(responseObj);
    }
}
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=response.helper.js.map