import { api, support } from "@apis/support";
import { IApiBaseResponse } from "@interfaces/api";
import { IApiBaseTask } from "@interfaces/task";

const task = () => {
  const { apiUrl } = support();

  const url = {
    task: apiUrl.task.self,
    getTask: apiUrl.task.getTask,
    getCompletedTask: apiUrl.task.getCompletedTask
  }

  const addOrUpdateTask = async (task_data: IApiBaseTask) => {
    const response = await api.put<IApiBaseResponse<IApiBaseTask>>(
      url.task,
      task_data
    );

    return response.data;
  }

  const getTask = async (date: string) => {
    // YYYY-MM-DD
    const response = await api.get<IApiBaseResponse<any[]>>(
      `${url.getTask}/${date}`
    );

    return response.data;
  }

  const getCompletedTask = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseTask[]>>(
      `${url.getCompletedTask}`
    );

    return response.data;
  }

  const checkTask = async (task_id: number) => {
    const response = await api.patch<IApiBaseResponse<undefined>>(
      `${url.task}/${task_id}`,
    );

    return response.data;
  }

  return {
    addOrUpdateTask,
    getTask,
    getCompletedTask,
    checkTask
  }
}

export default task;