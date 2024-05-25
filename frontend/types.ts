import * as z from 'zod';

export const formSchema = z.object({
  gpa: z
    .number()
    .min(0, { message: "GPA must be at least 0." })
    .max(4, { message: "GPA must be at most 4." }),
  credits: z
    .number()
    .int({ message: "Credits must be an integer." })
    .positive({ message: "Credits must be positive." })
});

export const courseSchema = z.object({
  courseName: z.string().min(1, { message: "Course name is required." }),
  credits: z.union([z.literal('1'), z.literal('3'), z.literal('4')]).optional(),
  grade: z.union([z.literal('A'), z.literal('B'), z.literal('C'), z.literal('D'), z.literal('E')]).optional()
});

export type FormData = z.infer<typeof formSchema>;
export type Course = z.infer<typeof courseSchema>;
