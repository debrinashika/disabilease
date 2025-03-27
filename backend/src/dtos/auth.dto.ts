import { z } from 'zod';

const usernameRegex = /^\w{5,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .min(1, {
        message: 'Email is required',
      })
      .email({
        message: "Email format is invalid"
      }),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(1, {
        message: 'Password is required',
      }),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required"
      })
      .min(1, {
        message: 'Email is required',
      })
      .email({
        message: "Email format is invalid"
      })
      .max(255, {
        message: 'Email is too long',
      }),

    username: z
      .string({
        required_error: "Username is required"
      }).min(1, {
        message: "Username is required"
      }).refine(value => usernameRegex.test(value), {
        message: "Username must consist of a minimum of 5 characters, can be letters, numbers, or underscores"
      }),

    password: z
      .string({
        required_error: "Password is required"
      }).min(1, {
        message: "Password is required"
      }).refine(value => passwordRegex.test(value), {
        message: "Password must consist of a minimum of 8 characters, at least one letter and one number"
      }),

    confirm_password: z
      .string({
        required_error: "Confirm password is required"
      }).min(1, {
        message: "Confirm password is required"
      })
  })
});