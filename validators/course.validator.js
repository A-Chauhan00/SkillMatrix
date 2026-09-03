import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;


export const courseIdParamValidation = z.object({
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID parameter is required" })
      .regex(objectIdRegex, "Invalid course ID format"),
  }),
});

export const lectureIdParamValidation = z.object({
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID parameter is required" })
      .regex(objectIdRegex, "Invalid course ID format"),
    lectureId: z
      .string({ required_error: "Lecture ID parameter is required" })
      .regex(objectIdRegex, "Invalid lecture ID format"),
  }),
});


export const createCourseValidation = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Course title is required" })
      .trim()
      .min(5, "Title must be at least 5 characters long")
      .max(100, "Title cannot exceed 100 characters"),

    subtitle: z
      .string()
      .trim()
      .max(200, "Subtitle cannot exceed 200 characters")
      .optional(),

    description: z
      .string({ required_error: "Course description is required" })
      .trim()
      .min(15, "Description must be at least 15 characters long"),

    category: z
      .string({ required_error: "Category is required" })
      .trim()
      .min(1, "Please select a valid category"),

    level: z.enum(["Beginner", "Medium", "Advance"], {
      errorMap: () => ({
        message: "Level must be either Beginner, Medium, or Advance",
      }),
    }),

    price: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .pipe(
        z
          .number({ invalid_type_error: "Price must be a valid number" })
          .min(0, "Price cannot be negative")
      ),
  }),
});


export const updateCourseValidation = z.object({
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID is required" })
      .regex(objectIdRegex, "Invalid course ID format"),
  }),
  body: z.object({
    title: z
      .string()
      .trim()
      .min(5, "Title must be at least 5 characters long")
      .max(100, "Title cannot exceed 100 characters")
      .optional(),

    subtitle: z
      .string()
      .trim()
      .max(200, "Subtitle cannot exceed 200 characters")
      .optional(),

    description: z
      .string()
      .trim()
      .min(15, "Description must be at least 15 characters long")
      .optional(),

    category: z.string().trim().min(1, "Category cannot be empty").optional(),

    level: z
      .enum(["Beginner", "Medium", "Advance"], {
        errorMap: () => ({
          message: "Level must be either Beginner, Medium, or Advance",
        }),
      })
      .optional(),

    price: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .pipe(
        z
          .number({ invalid_type_error: "Price must be a valid number" })
          .min(0, "Price cannot be negative")
      )
      .optional(),

    isPublished: z
      .union([z.boolean(), z.string()])
      .transform((val) => (typeof val === "string" ? val === "true" : val))
      .optional(),
  }),
});


export const addLectureValidation = z.object({
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID parameter is required" })
      .regex(objectIdRegex, "Invalid course ID format"),
  }),
  body: z.object({
    title: z
      .string({ required_error: "Lecture title is required" })
      .trim()
      .min(3, "Lecture title must be at least 3 characters long")
      .max(100, "Lecture title cannot exceed 100 characters"),

    isPreviewFree: z
      .union([z.boolean(), z.string()])
      .transform((val) => (typeof val === "string" ? val === "true" : val))
      .optional()
      .default(false),
  }),
});

export const updateLectureValidation = z.object({
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID parameter is required" })
      .regex(objectIdRegex, "Invalid course ID format"),
    lectureId: z
      .string({ required_error: "Lecture ID parameter is required" })
      .regex(objectIdRegex, "Invalid lecture ID format"),
  }),
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, "Lecture title must be at least 3 characters long")
      .max(100, "Lecture title cannot exceed 100 characters")
      .optional(),

    isPreviewFree: z
      .union([z.boolean(), z.string()])
      .transform((val) => (typeof val === "string" ? val === "true" : val))
      .optional(),
  }),
});