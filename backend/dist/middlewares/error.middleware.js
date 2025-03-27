"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const library_1 = require("@prisma/client/runtime/library");
const http_exception_1 = require("../exceptions/http.exception");
const helpers_1 = require("../helpers");
const http_enum_1 = require("../constants/http.enum");
class ErrorMiddleware {
    setNextHandler(nextHandler) {
        this.nextHandler = nextHandler;
        return this;
    }
    handle(res, error) {
        if (this.canHandle(error)) {
            return this.getResponse(res, error);
        }
        else if (this.nextHandler) {
            return this.nextHandler.handle(res, error);
        }
        else {
            return helpers_1.ResponseHelper.responseError(res, http_enum_1.HttpStatusCode.InternalServerError, 'Internal server error', error);
        }
    }
}
class HttpErrorMiddleware extends ErrorMiddleware {
    canHandle(error) {
        return error instanceof http_exception_1.HttpException;
    }
    getResponse(jsonResponse, error) {
        return helpers_1.ResponseHelper.responseError(jsonResponse, error.statusCode, error.message, error.errors);
    }
}
class ZodErrorMiddleware extends ErrorMiddleware {
    canHandle(error) {
        return error instanceof zod_1.ZodError;
    }
    getResponse(jsonResponse, error) {
        const errors = {};
        error.issues.forEach(issue => {
            const fieldName = issue.path[issue.path.length - 1];
            const errorMessage = issue.message;
            if (errors[fieldName] === undefined) {
                errors[fieldName] = [];
            }
            errors[fieldName].push(errorMessage);
        });
        return helpers_1.ResponseHelper.responseError(jsonResponse, http_enum_1.HttpStatusCode.UnprocessableEntity, 'Invalid request', errors);
    }
}
class PrismaClientKnownRequestErrorMiddleware extends ErrorMiddleware {
    // THINGS TO NOTICE: cuman bisa nge catch 1 exception
    canHandle(error) {
        return error instanceof library_1.PrismaClientKnownRequestError;
    }
    capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    formatConstraintName(name) {
        const words = name.split('_');
        const formattedWords = words.map(word => this.capitalizeFirstLetter(word));
        return formattedWords.join(' ');
    }
    getResponse(jsonResponse, error) {
        let message = 'Internal server error';
        let code = http_enum_1.HttpStatusCode.InternalServerError;
        let errors = {};
        switch (error.code) {
            case 'P2001': {
                // Not exist constraint
                break;
            }
            case 'P2002': {
                // Unique constraint
                if (error.meta && error.meta.target) {
                    const constraintName = error.meta.target[0];
                    if (!errors[constraintName]) {
                        errors[constraintName] = [];
                    }
                    errors[constraintName].push(`${this.formatConstraintName(constraintName)} already exists`);
                    code = http_enum_1.HttpStatusCode.Conflict;
                    message = 'Invalid request';
                }
                break;
            }
            case 'P2003': {
                // Foreign key constraint
                if (error.meta) {
                    const fieldName = error.meta.field_name.match(/_(.+)_fkey/);
                    if (fieldName) {
                        const constraintName = fieldName[1];
                        if (!errors[constraintName]) {
                            errors[constraintName] = [];
                        }
                        errors[constraintName].push(`${this.formatConstraintName(constraintName)} is not exists`);
                    }
                    code = http_enum_1.HttpStatusCode.Conflict;
                    message = 'Invalid request';
                }
                break;
            }
            case 'P2025': {
                code = http_enum_1.HttpStatusCode.NotFound;
                message = error.message;
                break;
            }
            default:
                message = error.message;
                break;
        }
        if (Object.keys(errors).length === 0) {
            errors = null;
        }
        return helpers_1.ResponseHelper.responseError(jsonResponse, code, message, errors);
    }
}
class PrismaClientUnknownRequestErrorMiddleware extends ErrorMiddleware {
    // THINGS TO NOTICE: cuman bisa nge catch 1 exception
    canHandle(error) {
        return error instanceof library_1.PrismaClientUnknownRequestError;
    }
    getResponse(jsonResponse, error) {
        return helpers_1.ResponseHelper.responseError(jsonResponse, http_enum_1.HttpStatusCode.InternalServerError, error.message, error);
    }
}
exports.default = new HttpErrorMiddleware().setNextHandler(new ZodErrorMiddleware().setNextHandler(new PrismaClientKnownRequestErrorMiddleware().setNextHandler(new PrismaClientUnknownRequestErrorMiddleware())));
//# sourceMappingURL=error.middleware.js.map