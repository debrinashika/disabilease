import { TaskCategoryService } from "../services/task.category.service";

export class TaskCategoryUtils {
  public static async validateAddTaskCategory(user_id: number, task_category_name: string, errors: Record<string, string[]>) {
    const taskCategoryService = new TaskCategoryService();
    
    const isTaskCategoryNameExists = await taskCategoryService.getTaskCategory(
      user_id,
      task_category_name
    );

    if (isTaskCategoryNameExists) {
      errors.task_category_name = ["Task category name already exists"];
    }

    return errors;
  }
}