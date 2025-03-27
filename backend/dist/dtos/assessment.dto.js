"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAssessmentTestSchema = void 0;
const zod_1 = require("zod");
exports.submitAssessmentTestSchema = zod_1.z.object({
    body: zod_1.z.object({
        tests: zod_1.z.array(zod_1.z.object({
            question_id: zod_1.z
                .number({
                required_error: "Question id is required"
            })
                .positive(),
            category_id: zod_1.z
                .number({
                required_error: "Category id is required"
            })
                .positive(),
            answer_id: zod_1.z
                .number({
                required_error: "Answer id is required"
            })
                .positive()
        })).nonempty(),
        task_categories: zod_1.z.array(zod_1.z.object({
            task_category_id: zod_1.z
                .number({
                required_error: "Question id is required"
            })
                .positive(),
            task_category_name: zod_1.z
                .string({
                required_error: "Task category name is required"
            })
                .min(1, {
                message: "Task category name is required"
            })
        })).nonempty(),
    }),
});
//# sourceMappingURL=assessment.dto.js.map