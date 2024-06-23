import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { createCourseSchema, Course } from '../../../types';
import useCourseStore from "../../../hooks/useCourseStore";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Course) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onSave }) => {

  const { courses } = useCourseStore();
  const formSchema = createCourseSchema(courses);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Course>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: '',
      credits: undefined,
      grade: undefined
    }
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`bg-white text-black p-0 overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Ajouter un cours
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Détails du cours
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-6">
          <div>
            <label className="block mb-2">Nom du cours</label>
            <Input
              {...register('courseName')}
              className="w-full mb-4"
              placeholder="Ex.: MAT145"
            />
            {errors.courseName && <p className="text-red-500">{errors.courseName.message}</p>}
          </div>
          <div>
            <label className="block mb-2">Credits</label>
            <Input
              {...register('credits')}
              className="w-full mb-4"
              placeholder="Ex.: 4"
            />
            {errors.credits && <p className="text-red-500">{errors.credits.message}</p>}
          </div>
          <div>
            <label className="block mb-2">Note</label>
            <Input
              {...register('grade')}
              className="w-full mb-4"
              placeholder="Ex.: B-"
            />
            {errors.grade && <p className="text-red-500">{errors.grade.message}</p>}
          </div>
          <DialogFooter className="px-6 py-4">
            <Button variant="default" type="submit">Ajouter</Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleClose}
              >
                Annuler
              </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseModal;
