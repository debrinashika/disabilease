"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddTaskCategorySchema = exports.addOrUpdateTaskCategoriesSchema = void 0;
const zod_1 = require("zod");
exports.addOrUpdateTaskCategoriesSchema = zod_1.z.object({
    body: zod_1.z.array(zod_1.z.object({
        task_category_id: zod_1.z
            .number({
            required_error: "Question id is required"
        }),
        task_category_name: zod_1.z
            .string({
            required_error: "Task category name is required"
        })
            .min(1, {
            message: "Task category name is required"
        })
    })).nonempty(),
});
exports.validateAddTaskCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        task_category_name: zod_1.z
            .string({
            required_error: "Task category name is required"
        })
            .min(1, {
            message: "Task category name is required"
        })
    })
});
//# sourceMappingURL=task.category.dto.js.map