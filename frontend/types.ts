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

// Valid grades array for reusability
const VALID_GRADES = [
  "A+", "A", "A-",
  "B+", "B", "B-",
  "C+", "C", "C-",
  "D+", "D",
  "E"
] as const;

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
      .string()
      .trim()
      .refine(
        (grade) => VALID_GRADES.includes(grade as any),
        { message: "La note doit être l'une des suivantes: " + VALID_GRADES.join(", ") }
      )
      .optional(),
  });

export const editCourseSchema = () =>
  z.object({
    courseName: z.string().min(1, { message: "Course name is required." }),
    credits: z
      .union([z.literal("1"), z.literal("3"), z.literal("4")])
      .optional(),
    grade: z
      .string()
      .trim()
      .refine(
        (grade) => VALID_GRADES.includes(grade as any),
        { message: "La note doit être l'une des suivantes: " + VALID_GRADES.join(", ") }
      )
      .optional(),
  });

export type FormData = z.infer<typeof formSchema>;

// Export the valid grades for use in other components
export { VALID_GRADES };
