import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import useCourseStore from "../../../hooks/use-course-store";
import { type Course, createCourseSchema } from "../../../types";
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

type AddCourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Course) => void;
};

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const { courses } = useCourseStore();
  const formSchema = createCourseSchema(courses);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Course>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      credits: undefined,
      grade: undefined,
    },
  });

  const onSubmit = (data: Course) => {
    onSave(data);
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
            Ajouter un cours
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Détails du cours
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-8 px-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block" htmlFor="courseName">
              Nom du cours
            </label>
            <Input
              {...register("courseName")}
              className="mb-4 w-full"
              id="courseName"
              placeholder="Ex.: MAT145"
            />
            {errors.courseName && (
              <p className="text-red-500">{errors.courseName.message}</p>
            )}
          </div>
          <div>
            <label className="mb-2 block" htmlFor="credits">
              Credits
            </label>
            <Input
              {...register("credits")}
              className="mb-4 w-full"
              id="credits"
              placeholder="Ex.: 4"
            />
            {errors.credits && (
              <p className="text-red-500">{errors.credits.message}</p>
            )}
          </div>
          <div>
            <label className="mb-2 block" htmlFor="grade">
              Note
            </label>
            <Input
              {...register("grade")}
              className="mb-4 w-full"
              id="grade"
              placeholder="Ex.: B-"
            />
            {errors.grade && (
              <p className="text-red-500">{errors.grade.message}</p>
            )}
          </div>
          <DialogFooter className="px-6 py-4">
            <Button type="submit" variant="default">
              Ajouter
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

export default AddCourseModal;
