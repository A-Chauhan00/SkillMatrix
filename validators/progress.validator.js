import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;


export const getProgressParamValidation = z.object({
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID parameter is required" })
      .regex(objectIdRegex, "Invalid course ID format"),
  }),
});


export const updateLectureProgressValidation = z.object({
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID parameter is required" })
      .regex(objectIdRegex, "Invalid course ID format"),
    lectureId: z
      .string({ required_error: "Lecture ID parameter is required" })
      .regex(objectIdRegex, "Invalid lecture ID format"),
  }),
  body: z.object({
    isCompleted: z
      .union([z.boolean(), z.string()])
      .transform((val) => (typeof val === "string" ? val === "true" : val))
      .optional(),

    watchTime: z
      .union([z.number(), z.string()])
      .transform((val) => Number(val))
      .pipe(
        z
          .number({ invalid_type_error: "Watch time must be a valid number of seconds" })
          .min(0, "Watch time cannot be negative")
      )
      .optional(),
  }),
});


