import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { useCourseToModify } from "../../../hooks/course-to-modify";
import useCourseStore from "../../../hooks/use-course-store";
import { type Course, editCourseSchema } from "../../../types";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

type EditCourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Course) => void;
  courseToModify: Course | null | undefined;
};

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { updateCourse } = useCourseStore();
  const formSchema = editCourseSchema();
  const courseToModify = useCourseToModify();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Course>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: courseToModify.courseToModify?.courseName,
      credits: courseToModify.courseToModify?.credits,
      grade: courseToModify.courseToModify?.grade,
    },
  });

  const onSubmit = (newCourse: Course) => {
    updateCourse(newCourse);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog onOpenChange={handleClose} open={isOpen}>
      <DialogContent
        className={`overflow-hidden bg-white p-0 text-black transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center font-bold text-2xl">
            Éditer un cours
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Détails du cours
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-8 px-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block" htmlFor="editCourseName">
              Nom du cours
            </label>
            <Input
              {...register("courseName")}
              className="mb-4 w-full"
              id="editCourseName"
              placeholder="Ex.: MAT145"
            />
            {errors.courseName && (
              <p className="text-red-500">{errors.courseName.message}</p>
            )}
          </div>
          <div>
            <label className="mb-2 block" htmlFor="editCredits">
              Credits
            </label>
            <Input
              {...register("credits")}
              className="mb-4 w-full"
              id="editCredits"
              placeholder="Ex.: 4"
            />
            {errors.credits && (
              <p className="text-red-500">{errors.credits.message}</p>
            )}
          </div>
          <div>
            <label className="mb-2 block" htmlFor="editGrade">
              Note
            </label>
            <Input
              {...register("grade")}
              className="mb-4 w-full"
              id="editGrade"
              placeholder="Ex.: B-"
            />
            {errors.grade && (
              <p className="text-red-500">{errors.grade.message}</p>
            )}
          </div>
          <DialogFooter className="px-6 py-4">
            <Button type="submit" variant="default">
              Modifier
            </Button>
            <Button onClick={handleClose} type="button" variant="secondary">
              Annuler
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseModal;
