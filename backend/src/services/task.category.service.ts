import { PrismaClient, TaskCategory } from "@prisma/client";
import { HttpStatusCode } from "../constants/http.enum";
import { HttpException } from "../exceptions/http.exception";
import { IApiBaseTaskCategory } from "../interfaces/task.category.interface";
import { TaskCategoryUtils } from "../utils/task.category.utils";

const createTaskCategorySeeds = (user_id: number) => {
  const taskCategorySeeds = [
    { task_category_name: 'Document', user_id: user_id, priority: 1 },
    { task_category_name: 'Creativity', user_id: user_id, priority: 2 },
    { task_category_name: 'Extracurricular', user_id: user_id, priority: 3 },
    { task_category_name: 'Math', user_id: user_id, priority: 4 },
  ];

  return taskCategorySeeds;
}
export class TaskCategoryService {
  private taskCategoryModel = new PrismaClient().taskCategory;

  public async createInitialTaskCategories(user_id: number): Promise<void> {
    await this.taskCategoryModel.createMany({
      data: createTaskCategorySeeds(user_id)
    });
  }

  public async getTaskCategoriesByUserId(user_id: number): Promise<IApiBaseTaskCategory[]> {
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

  public async getTaskCategoriesWithPriorityByUserId(user_id: number): Promise<TaskCategory[]> {
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

  public async createOrUpdateTaskCategoriesByUserId(user_id: number, categories: IApiBaseTaskCategory[]): Promise<IApiBaseTaskCategory[]> {
    const updatedCategories: IApiBaseTaskCategory[] = [];
    let errors: Record<string, string[]> = {};

    // Validate first
    for (const category of categories) {
      if (category.task_category_id === -1) {
        errors = await TaskCategoryUtils.validateAddTaskCategory(user_id, category.task_category_name, errors);
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new HttpException(
        HttpStatusCode.Conflict, 
        'Invalid request', 
        errors
      );
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
        create: { ...categoryData },
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

  public async validateAddTaskCategory(user_id: number, task_category_name: string): Promise<void> {
    let errors: Record<string, string[]> = {};

    errors = await TaskCategoryUtils.validateAddTaskCategory(user_id, task_category_name, errors);

    if (Object.keys(errors).length > 0) {
      throw new HttpException(
        HttpStatusCode.Conflict, 
        'Invalid request', 
        errors
      );
    }

    return;
  }

  public async getTaskCategory(user_id: number, task_category_name: string): Promise<TaskCategory> {
    const category = await this.taskCategoryModel.findFirst({
      where: {
        user_id: user_id,
        task_category_name: task_category_name
      }
    });

    return category;
  }
}
