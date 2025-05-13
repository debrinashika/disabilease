import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { AuthMiddleware, ValidationMiddleware } from '../middlewares';
import { TaskService } from '../services/task.service';
import { TaskController } from '../controllers/task.controller';
import { addOrUpdateTaskSchema, checkTaskSchema, getTaskSchema } from '../dtos/task.dto';

export class TaskRoute implements Routes {
  public router = Router();
  private taskService = new TaskService();
  private taskController = new TaskController(this.taskService);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      '/', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.validate(addOrUpdateTaskSchema),
      ValidationMiddleware.exceptionGuard(this.taskController.addOrUpdateTask)
    );

    this.router.get(
      '/completed', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.exceptionGuard(this.taskController.getCompletedTasks)
    );

    this.router.get(
      '/category', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.exceptionGuard(this.taskController.getUserCategory)
    );

    this.router.get(
      '/ai-recommendation', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.exceptionGuard(this.taskController.getAIRecommendation)
    );

    this.router.get(
      '/task/:date', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.validate(getTaskSchema),
      ValidationMiddleware.exceptionGuard(this.taskController.getTask)
    );

    this.router.patch(
      '/:task_id',
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.validate(checkTaskSchema),
      ValidationMiddleware.exceptionGuard(this.taskController.checkTask)
    );
  }
}
