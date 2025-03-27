"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(statusCode, message, errors = null) {
        super(message);
        this.errors = null;
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=http.exception.js.map