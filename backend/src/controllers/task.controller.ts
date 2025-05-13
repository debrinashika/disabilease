import { Response } from 'express';
import { ResponseHelper } from '../helpers';
import { RequestWithUser } from '../interfaces/auth.interface';
import { IApiBaseTask } from '../interfaces/task.interface';
import { TaskService } from '../services/task.service';
import { HttpStatusCode } from '../constants/http.enum';

export class TaskController {
  constructor(private taskService: TaskService) {
    this.addOrUpdateTask = this.addOrUpdateTask.bind(this);
    this.getTask = this.getTask.bind(this);
    this.checkTask = this.checkTask.bind(this);
    this.getCompletedTasks = this.getCompletedTasks.bind(this);
    this.getUserCategory = this.getUserCategory.bind(this);
    this.getAIRecommendation = this.getAIRecommendation.bind(this);
  }

  public async addOrUpdateTask(req: RequestWithUser, res: Response) {
    const taskData: IApiBaseTask = req.body;

    const updatedTask = await this.taskService.createOrUpdateTask(
      req.user.user_id,
      taskData
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Task submitted successfully', 
      updatedTask
    );
  }

  public async getTask(req: RequestWithUser, res: Response) {
    const { date } = req.params;

    const tasks = await this.taskService.getTask(
      req.user.user_id,
      date
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Operation successful', 
      tasks
    );
  }

  public async checkTask(req: RequestWithUser, res: Response) {
    const { task_id } = req.params;

    await this.taskService.checkTask(
      req.user.user_id,
      parseInt(task_id)
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Task checked off successfully', 
    );
  }

  public async getCompletedTasks(req: RequestWithUser, res: Response) {
    const completedTasks = await this.taskService.getCompletedTask(
      req.user.user_id
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Operation successful', 
      completedTasks
    );
  }

  public async getUserCategory(req: RequestWithUser, res: Response) {
    const completedTasks = await this.taskService.getUserCategory(
      req.user.user_id
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Operation successful', 
      completedTasks
    );
  }

  public async getAIRecommendation(req: RequestWithUser, res: Response) {
    const completedTasks = await this.taskService.getAIRecommendations(
      req.user.user_id
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Operation successful', 
      completedTasks
    );
  }
}
