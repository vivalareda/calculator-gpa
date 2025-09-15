import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import type { Course } from "../types";

type CourseState = {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (course: Course) => void;
};

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, { ...course, id: uuidv4() }],
    })),
  updateCourse: (course) =>
    set((state) => ({
      courses: state.courses.map((c) =>
        c.courseName === course.courseName ? { ...course, uuid: c.uuid } : c
      ),
    })),
  deleteCourse: (course: Course) =>
    set((state) => ({
      courses: state.courses.filter((c) => c.courseName !== course.courseName),
    })),
}));

export default useCourseStore;
