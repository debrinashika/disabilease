import { z } from 'zod';

export const submitAssessmentTestSchema = z.object({
  body: z.object({
    tests: z.array(
      z.object({
        question_id: z
          .number({
            required_error: "Question id is required"
          })
          .positive(),

        category_id: z
          .number({
            required_error: "Category id is required"
          })
          .positive(),

        answer_id: z
          .number({
            required_error: "Answer id is required"
          })
          .positive()
      })
    ).nonempty(),
    task_categories: z.array(
      z.object({
        task_category_id: z
          .number({
            required_error: "Question id is required"
          })
          .positive(),

        task_category_name: z
          .string({
            required_error: "Task category name is required"
          })
          .min(1, {
            message: "Task category name is required"
          })
      })
    ).nonempty(),
  }),
});
