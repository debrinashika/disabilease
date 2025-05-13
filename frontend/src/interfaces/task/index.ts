export interface IApiBaseTask {
  task_id?: number
  task_name: string
  deadline: string
  task_duration: number
  status: number
  task_category_id: number
}

export interface UserCategoryResponse {
  category_name: string; // Ganti sesuai dengan struktur data yang sebenarnya
}
