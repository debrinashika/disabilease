import { TaskCategory } from "@prisma/client";
import { IApiBaseTaskCategory } from "../interfaces/task.category.interface";
export declare class TaskCategoryService {
    private taskCategoryModel;
    createInitialTaskCategories(user_id: number): Promise<void>;
    getTaskCategoriesByUserId(user_id: number): Promise<IApiBaseTaskCategory[]>;
    getTaskCategoriesWithPriorityByUserId(user_id: number): Promise<TaskCategory[]>;
    createOrUpdateTaskCategoriesByUserId(user_id: number, categories: IApiBaseTaskCategory[]): Promise<IApiBaseTaskCategory[]>;
    validateAddTaskCategory(user_id: number, task_category_name: string): Promise<void>;
    getTaskCategory(user_id: number, task_category_name: string): Promise<TaskCategory>;
}
