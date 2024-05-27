"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import ShimmerButton from './magicui/shimmer-button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { formSchema, FormData, Course } from '../../types';
import CourseModal from './modals/CourseModal';
import NumberTicker from './magicui/number-ticker';
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from './ui/button';

const ContentRectangle = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [gpa, setGpa] = useState<number | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log('Backend URL: ', backendUrl);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      gpa: undefined,
      credits: undefined
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(`${backendUrl}/api/submit`, data);
      handleNextStep();
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleNextStep = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsVisible(true);
    }, 500);
  };

  const handleAddCourse = (course: Course) => {
    setCourses((prevCourses) => [...prevCourses, course]);
  };

  const handleCalculateClick = async () => {
    try {
      const currentGpa = watch('gpa');
      const currentCredits = watch('credits');

      if (currentGpa === undefined || currentCredits === undefined) {
        alert('Veuillez entrer votre côte et le nombre de crédits complétés.');
        return;
      }

      const data = {
        gpa: currentGpa,
        credits: currentCredits,
        courses: courses
      };

      const response = await axios.post(`${backendUrl}/api/submit`, data);
      setGpa(response.data.new_gpa);

    } catch (error) {
      console.error('Error calculating GPA:', error);
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-3/5 h-screen bg-white pt-10 pl-10 pr-10 absolute top-40 right-10 shadow-2xl items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="relative h-full transition-all duration-500">
        {currentStep === 1 && (
          <div className={`absolute inset-0 flex flex-col items-center pt-44 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className='flex flex-row items-center pb-3'>
              <p>Entrez votre côte actuelle</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='ml-2 cursor-pointer'>
                      <Button variant="secondary" className="p-1 text-xs w-6 h-6 flex items-center justify-center rounded-full pointer-events-none">
                        i
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Vous pouvez trouver votre côte sur l&apos;application mobile ou signets</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              className="w-2/4 mb-5"
              {...register('gpa', { valueAsNumber: true })}
            />
            {errors.gpa && <p className="text-red-500 pb-2">{errors.gpa.message}</p>}
            <ShimmerButton type="button" onClick={handleNextStep}>Suivant</ShimmerButton>
          </div>
        )}
        {currentStep === 2 && (
          <div className={`absolute inset-0 flex flex-col items-center pt-44 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className='pb-3'>Entrez le nombre de crédit complété</p>
            <Input
              className="w-2/4 mb-5"
              {...register('credits', { valueAsNumber: true })}
            />
            {errors.credits && <p className="text-red-500 pb-2">{errors.credits.message}</p>}
            <ShimmerButton type="button" onClick={handleNextStep}>Suivant</ShimmerButton>
          </div>
        )}
        {currentStep === 3 && (
          <div className={`absolute inset-0 flex flex-col items-center pt-2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mt-6 w-full">
              <h2 className="text-xl font-bold mb-4 pb-3">Cours:</h2>
              {courses.length === 0 && <p>Aucun cours ajouté.</p>}
              {courses.map((course, index) => (
                <div key={index} className="bg-gray-100 p-4 mb-2 rounded shadow">
                  <p><strong>Nom du cours:</strong> {course.courseName}</p>
                  <p><strong>Credits:</strong> {course.credits}</p>
                  <p><strong>Note:</strong> {course.grade}</p>
                </div>
              ))}
            </div>
            <div className='flex justify-center w-5/6 gap-16 pt-3'>
              <ShimmerButton type="button" className="w-1/5 items-center pt-3" onClick={() => setIsModalOpen(true)}>Ajouter un cours</ShimmerButton>
              {courses.length > 0 && (
                <ShimmerButton
                  type='button'
                  className="w-1/5 items-center pt-3"
                  onClick={handleCalculateClick}
                >
                  Calculer
                </ShimmerButton>
              )}
            </div>
            {gpa !== null && (
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">Votre GPA: <NumberTicker value={gpa} /></h3>
              </div>
            )}
          </div>
        )}
      </form>
      <CourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddCourse} />
    </div>
  );
};

export default ContentRectangle;
