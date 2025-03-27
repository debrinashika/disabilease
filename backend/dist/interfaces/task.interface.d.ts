export interface IApiBaseTask {
    task_id?: number;
    task_name: string;
    deadline: Date;
    task_duration: number;
    status: number;
    task_category_id: number;
}
