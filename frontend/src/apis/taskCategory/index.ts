import { api, support } from "@apis/support";
import { IApiBaseResponse } from "@interfaces/api";
import { IApiBaseTaskCategory } from "@interfaces/taskCategory";

const taskCategory = () => {
  const { apiUrl } = support();

  const url = {
    taskCategory: apiUrl.taskCategory.self,
    addValidate: apiUrl.taskCategory.addValidate
  }

  const getTaskCategories = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseTaskCategory[]>>(
      url.taskCategory
    );

    return response.data;
  }

  const addValidateTaskCategory = async (task_category: IApiBaseTaskCategory) => {
    const response = await api.post<IApiBaseResponse<undefined>>(
      url.addValidate,
      task_category
    );

    return response.data;
  }

  const updateTaskCategories = async (task_categories: IApiBaseTaskCategory[]) => {
    const response = await api.put<IApiBaseResponse<IApiBaseTaskCategory[]>>(
      url.taskCategory,
      task_categories
    );

    return response.data;
  }

  return {
    getTaskCategories,
    addValidateTaskCategory,
    updateTaskCategories
  }
}

export default taskCategory;