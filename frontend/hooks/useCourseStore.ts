import { create } from "zustand";
import { Course } from "../types";
import { v4 as uuidv4 } from "uuid";

interface CourseState {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, { ...course, id: uuidv4() }],
    })),
  updateCourse: (course) =>
    set((state) => ({
      courses: state.courses.map((c) =>
        c.courseName === course.courseName ? { ...course, uuid: c.uuid } : c,
      ),
    })),
}));

export default useCourseStore;
