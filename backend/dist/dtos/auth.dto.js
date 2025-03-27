"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
const usernameRegex = /^\w{5,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .min(1, {
            message: 'Email is required',
        })
            .email({
            message: "Email format is invalid"
        }),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(1, {
            message: 'Password is required',
        }),
    }),
});
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required"
        })
            .min(1, {
            message: 'Email is required',
        })
            .email({
            message: "Email format is invalid"
        })
            .max(255, {
            message: 'Email is too long',
        }),
        username: zod_1.z
            .string({
            required_error: "Username is required"
        }).min(1, {
            message: "Username is required"
        }).refine(value => usernameRegex.test(value), {
            message: "Username must consist of a minimum of 5 characters, can be letters, numbers, or underscores"
        }),
        password: zod_1.z
            .string({
            required_error: "Password is required"
        }).min(1, {
            message: "Password is required"
        }).refine(value => passwordRegex.test(value), {
            message: "Password must consist of a minimum of 8 characters, at least one letter and one number"
        }),
        confirm_password: zod_1.z
            .string({
            required_error: "Confirm password is required"
        }).min(1, {
            message: "Confirm password is required"
        })
    })
});
//# sourceMappingURL=auth.dto.js.map