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
const ContentRectangle = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [gpa, setGpa] = useState(null);

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
      await axios.post('http://localhost:5000/api/submit', data);
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
        alert('Please enter your current GPA and credits.');
        return;
      }

      const data = {
        gpa: currentGpa,
        credits: currentCredits,
        courses: courses
      };

      const response = await axios.post('http://localhost:5000/api/submit', data);
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
            <p className='pb-3'>Entrez votre cote actuelle</p>
            <Input
              className="w-2/4 mb-5"
              {...register('gpa', { valueAsNumber: true })}
            />
            {errors.gpa && <p className="text-red-500">{String("errors.gpa.message")}</p>}
            <ShimmerButton type="button" onClick={handleNextStep}>Next</ShimmerButton>
          </div>
        )}
        {currentStep === 2 && (
          <div className={`absolute inset-0 flex flex-col items-center pt-44 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className='pb-3'>Entrez le nombre de crédit complété</p>
            <Input
              className="w-2/4 mb-5"
              {...register('credits', { valueAsNumber: true })}
            />
            {errors.credits && <p className="text-red-500">{String(errors.credits.message)}</p>}
            <ShimmerButton type="button" onClick={handleNextStep}>Next</ShimmerButton>
          </div>
        )}
        {currentStep === 3 && (
          <div className={`absolute inset-0 flex flex-col items-center pt-2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mt-6 w-full">
              <h2 className="text-xl font-bold mb-4 pb-10">Courses:</h2>
              {courses.length === 0}
              {courses.map((course, index) => (
                <div key={index} className="bg-gray-100 p-4 mb-2 rounded shadow">
                  <p><strong>Course Name:</strong> {course.courseName}</p>
                  <p><strong>Credits:</strong> {course.credits}</p>
                  <p><strong>Grade:</strong> {course.grade}</p>
                </div>
              ))}
            </div>
            <div className='flex justify-center w-5/6 gap-16'>
              <ShimmerButton type="button" className="w-1/5 items-center" onClick={() => setIsModalOpen(true)}>Add a course</ShimmerButton>
              <ShimmerButton type='button' className="w-1/5 items-center" onClick={handleCalculateClick}>Calculate</ShimmerButton>
            </div>
            {gpa !== null && (
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">New GPA: <NumberTicker value={gpa} /></h3>
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