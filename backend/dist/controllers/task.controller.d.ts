import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { TaskService } from '../services/task.service';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    addOrUpdateTask(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    getTask(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    checkTask(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    getCompletedTasks(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserCategory(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    getAIRecommendation(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
