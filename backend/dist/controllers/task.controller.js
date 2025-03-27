"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const helpers_1 = require("../helpers");
const http_enum_1 = require("../constants/http.enum");
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
        this.addOrUpdateTask = this.addOrUpdateTask.bind(this);
        this.getTask = this.getTask.bind(this);
        this.checkTask = this.checkTask.bind(this);
        this.getCompletedTasks = this.getCompletedTasks.bind(this);
    }
    async addOrUpdateTask(req, res) {
        const taskData = req.body;
        const updatedTask = await this.taskService.createOrUpdateTask(req.user.user_id, taskData);
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Task submitted successfully', updatedTask);
    }
    async getTask(req, res) {
        const { date } = req.params;
        const tasks = await this.taskService.getTask(req.user.user_id, date);
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Operation successful', tasks);
    }
    async checkTask(req, res) {
        const { task_id } = req.params;
        await this.taskService.checkTask(req.user.user_id, parseInt(task_id));
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Task checked off successfully');
    }
    async getCompletedTasks(req, res) {
        const completedTasks = await this.taskService.getCompletedTask(req.user.user_id);
        return helpers_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Operation successful', completedTasks);
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map