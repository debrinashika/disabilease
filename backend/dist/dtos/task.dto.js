"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTaskSchema = exports.getTaskSchema = exports.addOrUpdateTaskSchema = void 0;
const zod_1 = require("zod");
exports.addOrUpdateTaskSchema = zod_1.z.object({
    body: zod_1.z.object({
        task_id: zod_1.z
            .number({
            required_error: "Task id is required"
        }),
        task_name: zod_1.z
            .string({
            required_error: 'Task name is required',
        })
            .min(1, {
            message: 'Task name is required',
        })
            .max(255, {
            message: 'Task name is too long',
        }),
        deadline: zod_1.z
            .coerce
            .date({
            required_error: "Deadline is required"
        }),
        task_duration: zod_1.z
            .number({
            required_error: "Task duration is required"
        })
            .nonnegative(),
        status: zod_1.z // Not required
            .number()
            .refine(value => value === 0 || value === 1, {
            message: "Invalid status",
        }),
        task_category_id: zod_1.z
            .number({
            required_error: "Task category id is required"
        }),
    })
});
exports.getTaskSchema = zod_1.z.object({
    params: zod_1.z.object({
        date: zod_1.z
            .coerce
            .date()
    }),
});
exports.checkTaskSchema = zod_1.z.object({
    params: zod_1.z.object({
        task_id: zod_1.z
            .coerce
            .number({
            required_error: "Task id is required"
        })
            .positive()
    }),
});
//# sourceMappingURL=task.dto.js.map