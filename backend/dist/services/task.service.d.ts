import { Task } from '@prisma/client';
import { IApiBaseTask } from '../interfaces/task.interface';
export declare class TaskService {
    private taskModel;
    getTaskById(task_id: number): Promise<Task>;
    createOrUpdateTask(user_id: number, taskData: IApiBaseTask): Promise<IApiBaseTask>;
    getTask(user_id: number, date: string): Promise<any[]>;
    getCompletedTask(user_id: number): Promise<IApiBaseTask[]>;
    private getUnder10Hours;
    private getRecommendations;
    checkTask(user_id: number, task_id: number): Promise<void>;
}
