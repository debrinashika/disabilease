import { z } from 'zod';

export const addOrUpdateTaskSchema = z.object({
  body: z.object({
    task_id: z
      .number({
        required_error: "Task id is required"
      }),
    task_name: z
      .string({
        required_error: 'Task name is required',
      })
      .min(1, {
        message: 'Task name is required',
      })
      .max(255, {
        message: 'Task name is too long',
      }),
    deadline: z
      .coerce
      .date({
        required_error: "Deadline is required"
      }),
    task_duration: z
      .number({
        required_error: "Task duration is required"
      })
      .nonnegative(),
    status: z // Not required
      .number()
      .refine(value => value === 0 || value === 1, {
        message: "Invalid status",
      }),
    task_category_id: z
      .number({
        required_error: "Task category id is required"
      }),
  })
});

export const getTaskSchema = z.object({
  params: z.object({
    date: z
      .coerce
      .date()
  }),
});

export const checkTaskSchema = z.object({
  params: z.object({
    task_id: z
      .coerce
      .number({
        required_error: "Task id is required"
      })
      .positive()
  }),
});