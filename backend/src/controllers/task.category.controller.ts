import { Response } from 'express';
import { ResponseHelper } from '../helpers';
import { RequestWithUser } from '../interfaces/auth.interface';
import { IApiBaseTaskCategory } from '../interfaces/task.category.interface';
import { TaskCategoryService } from '../services/task.category.service';
import { HttpStatusCode } from '../constants/http.enum';

export class TaskCategoryController {
  constructor(private taskCategoryService: TaskCategoryService) {
    this.getTaskCategories = this.getTaskCategories.bind(this);
    this.addOrUpdateTaskCategories = this.addOrUpdateTaskCategories.bind(this);
    this.validateAddTaskCategory = this.validateAddTaskCategory.bind(this);
  }

  public async getTaskCategories(req: RequestWithUser, res: Response) {
    const categories = await this.taskCategoryService.getTaskCategoriesByUserId(
      req.user.user_id
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Operation successful', 
      categories
    );
  }

  public async addOrUpdateTaskCategories(req: RequestWithUser, res: Response) {
    const taskCategories: IApiBaseTaskCategory[] = req.body;

    const updatedCategories = await this.taskCategoryService.createOrUpdateTaskCategoriesByUserId(
      req.user.user_id,
      taskCategories
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Task Categories updated successfully', 
      updatedCategories
    );
  }

  public async validateAddTaskCategory(req: RequestWithUser, res: Response) {
    const { task_category_name } = req.body;

    await this.taskCategoryService.validateAddTaskCategory(
      req.user.user_id,
      task_category_name
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Validated',
    );
  }
}
