"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCategoryUtils = void 0;
const task_category_service_1 = require("../services/task.category.service");
class TaskCategoryUtils {
    static async validateAddTaskCategory(user_id, task_category_name, errors) {
        const taskCategoryService = new task_category_service_1.TaskCategoryService();
        const isTaskCategoryNameExists = await taskCategoryService.getTaskCategory(user_id, task_category_name);
        if (isTaskCategoryNameExists) {
            errors.task_category_name = ["Task category name already exists"];
        }
        return errors;
    }
}
exports.TaskCategoryUtils = TaskCategoryUtils;
//# sourceMappingURL=task.category.utils.js.map