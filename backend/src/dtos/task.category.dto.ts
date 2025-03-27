import { z } from 'zod';

export const addOrUpdateTaskCategoriesSchema = z.object({
  body: z.array(
    z.object({
      task_category_id: z
        .number({
          required_error: "Question id is required"
        }),

      task_category_name: z
        .string({
          required_error: "Task category name is required"
        })
        .min(1, {
          message: "Task category name is required"
        })
    })
  ).nonempty(),
});

export const validateAddTaskCategorySchema = z.object({
  body: z.object({
    task_category_name: z
      .string({
        required_error: "Task category name is required"
      })
      .min(1, {
        message: "Task category name is required"
      })
  })
})