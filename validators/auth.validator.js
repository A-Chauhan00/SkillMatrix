import { z } from "zod";


export const registerValidation = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name cannot exceed 50 characters"),

    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Please enter a valid email address")
      .toLowerCase(),

    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password cannot exceed 100 characters"),

    role: z
      .enum(["student", "instructor"], {
        errorMap: () => ({ message: "Role must be either student or instructor" }),
      })
      .optional()
      .default("student"),
  }),
});

export const loginValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Please enter a valid email address")
      .toLowerCase(),

    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password cannot be empty"),
  }),
});


export const updateProfileValidation = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name cannot exceed 50 characters")
      .optional(),

    bio: z
      .string()
      .trim()
      .max(200, "Bio cannot exceed 300 characters")
      .optional(),
  }),
});


