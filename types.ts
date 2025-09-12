import * as z from "zod";

export type Course = {
  uuid: string;
  courseName: string;
  credits: string;
  grade: string;
};

export type Exam = {
  id: string;
  name?: string;
  grade: number;
  weight: number;
};

export const formSchema = z.object({
  gpa: z
    .number({ invalid_type_error: "Please enter a number between 0 and 4.3" })
    .min(0, { message: "GPA must be at least 0." })
    .max(4.3, { message: "GPA must be at most 4.3." })
    .refine((value) => !isNaN(value), {
      message: "Please enter a number between 0 and 4",
    }),
  credits: z
    .number({ invalid_type_error: "Please enter a number" })
    .int({ message: "Credits must be an integer." })
    .positive({ message: "Credits must be positive." })
    .refine((value) => !isNaN(value), { message: "Please enter a number" }),
});

export const CourseSchema = z.object({
  uuid: z.string(),
  courseName: z.string(),
  credits: z.string(),
  grade: z.string(),
});

export const createCourseSchema = (courses: Course[]) =>
  z.object({
    courseName: z
      .string()
      .min(1, { message: "Course name is required." })
      .refine(
        (courseName) =>
          !courses.some((course) => course.courseName === courseName),
        { message: "Ce cours existe déjà." },
      ),
    credits: z
      .union([z.literal("1"), z.literal("3"), z.literal("4")])
      .optional(),
    grade: z
      .union([
        z.literal("A+"),
        z.literal("A"),
        z.literal("A-"),
        z.literal("B+"),
        z.literal("B"),
        z.literal("B-"),
        z.literal("C+"),
        z.literal("C"),
        z.literal("C-"),
        z.literal("D+"),
        z.literal("D"),
        z.literal("E"),
      ])
      .optional(),
  });

export const editCourseSchema = () =>
  z.object({
    courseName: z.string().min(1, { message: "Course name is required." }),
    credits: z
      .union([z.literal("1"), z.literal("3"), z.literal("4")])
      .optional(),
    grade: z
      .union([
        z.literal("A+"),
        z.literal("A"),
        z.literal("A-"),
        z.literal("B+"),
        z.literal("B"),
        z.literal("B-"),
        z.literal("C+"),
        z.literal("C"),
        z.literal("C-"),
        z.literal("D+"),
        z.literal("D"),
        z.literal("E"),
      ])
      .optional(),
  });

export type FormData = z.infer<typeof formSchema>;

export interface CalendarEvent {
  id: string;
  summary: string;
  eventClass: string;
  dtstart: string; // Opening date
  dtend: string;   // Due date
  description?: string;
  completed?: boolean;
}

export interface KanbanColumn {
  id: string;
  title: string;
  events: CalendarEvent[];
}
