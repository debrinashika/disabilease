"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCategoryService = void 0;
const client_1 = require("@prisma/client");
const http_enum_1 = require("../constants/http.enum");
const http_exception_1 = require("../exceptions/http.exception");
const task_category_utils_1 = require("../utils/task.category.utils");
const createTaskCategorySeeds = (user_id) => {
    const taskCategorySeeds = [
        { task_category_name: 'Document', user_id: user_id, priority: 1 },
        { task_category_name: 'Creativity', user_id: user_id, priority: 2 },
        { task_category_name: 'Extracurricular', user_id: user_id, priority: 3 },
        { task_category_name: 'Math', user_id: user_id, priority: 4 },
    ];
    return taskCategorySeeds;
};
class TaskCategoryService {
    constructor() {
        this.taskCategoryModel = new client_1.PrismaClient().taskCategory;
    }
    async createInitialTaskCategories(user_id) {
        await this.taskCategoryModel.createMany({
            data: createTaskCategorySeeds(user_id)
        });
    }
    async getTaskCategoriesByUserId(user_id) {
        const categories = await this.taskCategoryModel.findMany({
            where: {
                user_id: user_id
            },
            select: {
                task_category_id: true,
                task_category_name: true,
            },
            orderBy: {
                priority: "asc"
            }
        });
        return categories;
    }
    async getTaskCategoriesWithPriorityByUserId(user_id) {
        const categories = await this.taskCategoryModel.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                priority: "asc"
            }
        });
        return categories;
    }
    async createOrUpdateTaskCategoriesByUserId(user_id, categories) {
        const updatedCategories = [];
        let errors = {};
        // Validate first
        for (const category of categories) {
            if (category.task_category_id === -1) {
                errors = await task_category_utils_1.TaskCategoryUtils.validateAddTaskCategory(user_id, category.task_category_name, errors);
            }
        }
        if (Object.keys(errors).length > 0) {
            throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Conflict, 'Invalid request', errors);
        }
        // for (const [index, category] of categories.entries()) {
        //   if (category.task_category_id === -1) { // create
        //     const newCategory = await this.taskCategoryModel.create({
        //       data: {
        //         user_id: user_id,
        //         task_category_name: category.task_category_name,
        //         priority: index + 1
        //       }, 
        //       select: {
        //         task_category_id: true,
        //         task_category_name: true
        //       }
        //     });
        //     updatedCategories.push(newCategory);
        //   } else { // update
        //     const updatedCategory = await this.taskCategoryModel.update({
        //       where: {
        //         user_id: user_id,
        //         task_category_id: category.task_category_id
        //       },
        //       data: {
        //         priority: index + 1
        //       },
        //       select: {
        //         task_category_id: true,
        //         task_category_name: true
        //       }
        //     });
        //     updatedCategories.push(updatedCategory);
        //   }
        // }
        for (const [index, category] of categories.entries()) {
            const categoryData = {
                user_id: user_id,
                task_category_name: category.task_category_name,
                priority: index + 1
            };
            const updatedCategory = await this.taskCategoryModel.upsert({
                where: { task_category_id: category.task_category_id },
                create: Object.assign({}, categoryData),
                update: { priority: index + 1 },
                select: {
                    task_category_id: true,
                    task_category_name: true
                }
            });
            updatedCategories.push(updatedCategory);
        }
        return updatedCategories;
    }
    async validateAddTaskCategory(user_id, task_category_name) {
        let errors = {};
        errors = await task_category_utils_1.TaskCategoryUtils.validateAddTaskCategory(user_id, task_category_name, errors);
        if (Object.keys(errors).length > 0) {
            throw new http_exception_1.HttpException(http_enum_1.HttpStatusCode.Conflict, 'Invalid request', errors);
        }
        return;
    }
    async getTaskCategory(user_id, task_category_name) {
        const category = await this.taskCategoryModel.findFirst({
            where: {
                user_id: user_id,
                task_category_name: task_category_name
            }
        });
        return category;
    }
}
exports.TaskCategoryService = TaskCategoryService;
//# sourceMappingURL=task.category.service.js.map