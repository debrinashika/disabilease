import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email?: string;
        password?: string;
    }, {
        email?: string;
        password?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        email?: string;
        password?: string;
    };
}, {
    body?: {
        email?: string;
        password?: string;
    };
}>;
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        username: z.ZodEffects<z.ZodString, string, string>;
        password: z.ZodEffects<z.ZodString, string, string>;
        confirm_password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        username?: string;
        email?: string;
        password?: string;
        confirm_password?: string;
    }, {
        username?: string;
        email?: string;
        password?: string;
        confirm_password?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        username?: string;
        email?: string;
        password?: string;
        confirm_password?: string;
    };
}, {
    body?: {
        username?: string;
        email?: string;
        password?: string;
        confirm_password?: string;
    };
}>;
