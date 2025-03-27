"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCategoryController = void 0;
const helpers_1 = require("../helpers");
const http_enum_1 = require("../constants/http.enum");
class TaskCategoryController {
    constructor(taskCategoryService) {
        this.taskCategoryService = taskCategoryService;
        this.getTaskCategories = this.getTaskCategories.bind(this);
        this.addOrUpdateTaskCategories = this.addOrUpdateTaskCategories.bind(this);
        this.validateAddTaskCategory = this.validateAddTaskCategory.bind(this);
    }
    async getTaskCategories(req, res) {
        const categories = await this.taskCategoryService.getTaskCategoriesByUserId(req.user.user_id);
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Operation successful', categories);
    }
    async addOrUpdateTaskCategories(req, res) {
        const taskCategories = req.body;
        const updatedCategories = await this.taskCategoryService.createOrUpdateTaskCategoriesByUserId(req.user.user_id, taskCategories);
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Task Categories updated successfully', updatedCategories);
    }
    async validateAddTaskCategory(req, res) {
        const { task_category_name } = req.body;
        await this.taskCategoryService.validateAddTaskCategory(req.user.user_id, task_category_name);
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Validated');
    }
}
exports.TaskCategoryController = TaskCategoryController;
//# sourceMappingURL=task.category.controller.js.map