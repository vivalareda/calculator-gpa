import * as z from 'zod';

import * as z from 'zod';

export const formSchema = z.object({
  gpa: z
    .number({ invalid_type_error: "Please enter a number between 0 and 4" })
    .min(0, { message: "GPA must be at least 0." })
    .max(4, { message: "GPA must be at most 4." })
    .refine(value => !isNaN(value), { message: "Please enter a number between 0 and 4" }),
  credits: z
    .number({ invalid_type_error: "Please enter a number" })
    .int({ message: "Credits must be an integer." })
    .positive({ message: "Credits must be positive." })
    .refine(value => !isNaN(value), { message: "Please enter a number" })
});

export const courseSchema = z.object({
  courseName: z.string().min(1, { message: "Course name is required." }),
  credits: z.union([z.literal('1'), z.literal('3'), z.literal('4')]).optional(),
  grade: z.union([z.literal('A'), z.literal('B'), z.literal('C'), z.literal('D'), z.literal('E')]).optional()
});

export type FormData = z.infer<typeof formSchema>;
export type Course = z.infer<typeof courseSchema>;
