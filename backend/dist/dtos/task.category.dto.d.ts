import { z } from 'zod';
export declare const addOrUpdateTaskCategoriesSchema: z.ZodObject<{
    body: z.ZodArray<z.ZodObject<{
        task_category_id: z.ZodNumber;
        task_category_name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        task_category_id?: number;
        task_category_name?: string;
    }, {
        task_category_id?: number;
        task_category_name?: string;
    }>, "atleastone">;
}, "strip", z.ZodTypeAny, {
    body?: [{
        task_category_id?: number;
        task_category_name?: string;
    }, ...{
        task_category_id?: number;
        task_category_name?: string;
    }[]];
}, {
    body?: [{
        task_category_id?: number;
        task_category_name?: string;
    }, ...{
        task_category_id?: number;
        task_category_name?: string;
    }[]];
}>;
export declare const validateAddTaskCategorySchema: z.ZodObject<{
    body: z.ZodObject<{
        task_category_name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        task_category_name?: string;
    }, {
        task_category_name?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        task_category_name?: string;
    };
}, {
    body?: {
        task_category_name?: string;
    };
}>;
