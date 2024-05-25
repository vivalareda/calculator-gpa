import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { courseSchema, Course } from '../../../types';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Course) => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: '',
      credits: undefined,
      grade: undefined
    }
  });

  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300); // Duration of the fade-out animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const onSubmit = (data: Course) => {
    onSave(data);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!visible) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`bg-white text-black p-0 overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add Course
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Enter the course details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-6">
          <div>
            <label className="block mb-2">Course Name</label>
            <Input
              {...register('courseName')}
              className="w-full mb-4"
              placeholder="Enter course name"
            />
            {errors.courseName && <p className="text-red-500">{errors.courseName.message}</p>}
          </div>
          <div>
            <label className="block mb-2">Credits</label>
            <Input
              {...register('credits')}
              className="w-full mb-4"
              placeholder="Enter credits (1, 3, or 4)"
            />
            {errors.credits && <p className="text-red-500">{errors.credits.message}</p>}
          </div>
          <div>
            <label className="block mb-2">Grade</label>
            <Input
              {...register('grade')}
              className="w-full mb-4"
              placeholder="Enter grade (A, B, C, D, or E)"
            />
            {errors.grade && <p className="text-red-500">{errors.grade.message}</p>}
          </div>
          <DialogFooter className="px-6 py-4">
            <Button variant="default" type="submit">Save Course</Button>
            <Button variant="secondary" type="button" onClick={handleClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;
