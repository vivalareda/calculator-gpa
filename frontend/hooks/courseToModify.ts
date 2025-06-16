import { create } from 'zustand'
import { Course } from '../types';

interface CourseToModify {
  courseToModify: Course | null;
  setCourseToModify: (course: Course) => void;
}

export const useCourseToModify = create<CourseToModify>(set => ({
  courseToModify: null,
  setCourseToModify: (course:Course) => set({ courseToModify: course }),
}));

export default useCourseToModify;
