"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_EXPIRATION = exports.ACCESS_TOKEN_EXPIRATION = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.VERSION = exports.ORIGIN = exports.CREDENTIALS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env` });
exports.CREDENTIALS = process.env.CREDENTIALS === 'true';
_a = process.env, exports.ORIGIN = _a.ORIGIN, exports.VERSION = _a.VERSION, exports.ACCESS_TOKEN_SECRET = _a.ACCESS_TOKEN_SECRET, exports.REFRESH_TOKEN_SECRET = _a.REFRESH_TOKEN_SECRET;
exports.ACCESS_TOKEN_EXPIRATION = parseInt(process.env.ACCESS_TOKEN_EXPIRATION);
exports.REFRESH_TOKEN_EXPIRATION = parseInt(process.env.REFRESH_TOKEN_EXPIRATION);
//# sourceMappingURL=index.js.map