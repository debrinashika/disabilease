import { z } from 'zod';
export declare const submitAssessmentTestSchema: z.ZodObject<{
    body: z.ZodObject<{
        tests: z.ZodArray<z.ZodObject<{
            question_id: z.ZodNumber;
            category_id: z.ZodNumber;
            answer_id: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            category_id?: number;
            question_id?: number;
            answer_id?: number;
        }, {
            category_id?: number;
            question_id?: number;
            answer_id?: number;
        }>, "atleastone">;
        task_categories: z.ZodArray<z.ZodObject<{
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
        task_categories?: [{
            task_category_id?: number;
            task_category_name?: string;
        }, ...{
            task_category_id?: number;
            task_category_name?: string;
        }[]];
        tests?: [{
            category_id?: number;
            question_id?: number;
            answer_id?: number;
        }, ...{
            category_id?: number;
            question_id?: number;
            answer_id?: number;
        }[]];
    }, {
        task_categories?: [{
            task_category_id?: number;
            task_category_name?: string;
        }, ...{
            task_category_id?: number;
            task_category_name?: string;
        }[]];
        tests?: [{
            category_id?: number;
            question_id?: number;
            answer_id?: number;
        }, ...{
            category_id?: number;
            question_id?: number;
            answer_id?: number;
        }[]];
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        task_categories?: [{
            task_category_id?: number;
            task_category_name?: string;
        }, ...{
            task_category_id?: number;
            task_category_name?: string;
        }[]];
        tests?: [{
            category_id?: number;
            question_id?: number;
            answer_id?: number;
        }, ...{
            category_id?: number;
            question_id?: number;
            answer_id?: number;
        }[]];
    };
}, {
    body?: {
        task_categories?: [{
            task_category_id?: number;
            task_category_name?: string;
        }, ...{
            task_category_id?: number;
            task_category_name?: string;
        }[]];
        tests?: [{
            category_id?: number;
            question_id?: number;
            answer_id?: number;
        }, ...{
            category_id?: number;
            question_id?: number;
            answer_id?: number;
        }[]];
    };
}>;
