import { z } from 'zod';
export declare const addOrUpdateTaskSchema: z.ZodObject<{
    body: z.ZodObject<{
        task_id: z.ZodNumber;
        task_name: z.ZodString;
        deadline: z.ZodDate;
        task_duration: z.ZodNumber;
        status: z.ZodEffects<z.ZodNumber, number, number>;
        task_category_id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        status?: number;
        task_category_id?: number;
        task_id?: number;
        task_name?: string;
        deadline?: Date;
        task_duration?: number;
    }, {
        status?: number;
        task_category_id?: number;
        task_id?: number;
        task_name?: string;
        deadline?: Date;
        task_duration?: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        status?: number;
        task_category_id?: number;
        task_id?: number;
        task_name?: string;
        deadline?: Date;
        task_duration?: number;
    };
}, {
    body?: {
        status?: number;
        task_category_id?: number;
        task_id?: number;
        task_name?: string;
        deadline?: Date;
        task_duration?: number;
    };
}>;
export declare const getTaskSchema: z.ZodObject<{
    params: z.ZodObject<{
        date: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        date?: Date;
    }, {
        date?: Date;
    }>;
}, "strip", z.ZodTypeAny, {
    params?: {
        date?: Date;
    };
}, {
    params?: {
        date?: Date;
    };
}>;
export declare const checkTaskSchema: z.ZodObject<{
    params: z.ZodObject<{
        task_id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        task_id?: number;
    }, {
        task_id?: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params?: {
        task_id?: number;
    };
}, {
    params?: {
        task_id?: number;
    };
}>;
