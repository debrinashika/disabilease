import { Router } from 'express';
import { Routes } from 'interfaces/route.interface';
import { AuthMiddleware, ValidationMiddleware } from '../middlewares';
import { TaskCategoryService } from '../services/task.category.service';
import { TaskCategoryController } from '../controllers/task.category.controller';
import { addOrUpdateTaskCategoriesSchema, validateAddTaskCategorySchema } from '../dtos/task.category.dto';

export class TaskCategoryRoute implements Routes {
  public router = Router();
  private taskCategoryService = new TaskCategoryService();
  private taskCategoryController = new TaskCategoryController(this.taskCategoryService);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.exceptionGuard(this.taskCategoryController.getTaskCategories)
    );

    this.router.put(
      '/',
      AuthMiddleware.authenticateToken,
      ValidationMiddleware.validate(addOrUpdateTaskCategoriesSchema),
      ValidationMiddleware.exceptionGuard(this.taskCategoryController.addOrUpdateTaskCategories)
    );

    this.router.post(
      '/add-validate',
      AuthMiddleware.authenticateToken,
      ValidationMiddleware.validate(validateAddTaskCategorySchema),
      ValidationMiddleware.exceptionGuard(this.taskCategoryController.validateAddTaskCategory)
    )
  }
}
