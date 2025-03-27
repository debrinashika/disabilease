"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class ValidationMiddleware {
    static validate(schema) {
        return async (req, res, next) => {
            try {
                const parsed = await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                req.body = parsed.body;
                req.query = parsed.query;
                req.params = parsed.params;
                return next();
            }
            catch (error) {
                _1.ErrorMiddleware.handle(res, error);
            }
        };
    }
    static exceptionGuard(handler) {
        return async (req, res, next) => {
            try {
                await handler(req, res);
            }
            catch (error) {
                _1.ErrorMiddleware.handle(res, error);
            }
            return next();
        };
    }
}
exports.default = ValidationMiddleware;
//# sourceMappingURL=validation.middleware.js.map