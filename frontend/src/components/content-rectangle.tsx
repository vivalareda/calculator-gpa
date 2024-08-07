"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import ShimmerButton from "./magicui/shimmer-button";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { formSchema, FormData, Course } from "../../types";
import AddCourseModal from "./modals/AddCourseModal";
import EditCourseModal from "./modals/EditCourseModal";
import NumberTicker from "./magicui/number-ticker";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import CourseComponent from "./course-component";
import useCourseStore from "../../hooks/useCourseStore";
import useModalStore from "../../hooks/useModalStore";
import { useCourseToModify } from "../../hooks/courseToModify";

const ContentRectangle = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [gpa, setGpa] = useState<number | null>(null);
  const { courses, addCourse } = useCourseStore();
  const { isModalOpen, openModal, closeModal, modalType } = useModalStore();
  const { courseToModify } = useCourseToModify();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      gpa: undefined,
      credits: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(`${backendUrl}/api/submit`, data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleOnSaveEditCourse = (course: Course) => {
    closeModal();
  };

  const handleNextStep = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsVisible(true);
    }, 500);
  };

  const handleAddCourse = (course: Course) => {
    addCourse(course);
  };

  const handleCalculateClick = async () => {
    try {
      const currentGpa = watch("gpa");
      const currentCredits = watch("credits");

      if (currentGpa === undefined || currentCredits === undefined) {
        alert("Veuillez entrer votre côte et le nombre de crédits complétés.");
        return;
      }

      const data = {
        gpa: currentGpa,
        credits: currentCredits,
        courses: courses,
      };

      const response = await axios.post(`${backendUrl}/api/submit`, data);
      setGpa(response.data.new_gpa);
    } catch (error) {
      console.error("Error calculating GPA:", error);
    }
  };

  return (
    <div className="w-3/5 h-screen bg-white pt-10 pl-10 pr-10 absolute top-40 right-10 shadow-2xl items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative h-full transition-all duration-500"
      >
        {currentStep === 1 && (
          <div
            className={`absolute inset-0 flex flex-col items-center pt-44 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="flex flex-row items-center pb-3">
              <p>Entrez votre côte actuelle</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="ml-2 cursor-pointer">
                      <Button
                        variant="secondary"
                        className=" pp-1 text-xs w-6 h-6 flex items-center justify-center rounded-full"
                        disabled
                      >
                        i
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Vous pouvez trouver votre côte sur l&apos;application
                      mobile ou signets
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              className="w-2/4 mb-5"
              {...register("gpa", { valueAsNumber: true })}
            />
            {errors.gpa && (
              <p className="text-red-500 pb-2">{errors.gpa.message}</p>
            )}
            <ShimmerButton type="button" onClick={handleNextStep}>
              Suivant
            </ShimmerButton>
          </div>
        )}
        {currentStep === 2 && (
          <div
            className={`absolute inset-0 flex flex-col items-center pt-44 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            <p className="pb-3">Entrez le nombre de crédits complété</p>
            <Input
              className="w-2/4 mb-5"
              {...register("credits", { valueAsNumber: true })}
            />
            {errors.credits && (
              <p className="text-red-500 pb-2">{errors.credits.message}</p>
            )}
            <ShimmerButton type="button" onClick={handleNextStep}>
              Suivant
            </ShimmerButton>
          </div>
        )}
        {currentStep === 3 && (
          <div
            className={`absolute inset-0 h-screen flex flex-col items-center pt-2 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="mt-6 w-full">
              <h2 className="text-xl font-bold mb-4 pb-3">Cours:</h2>
              <div className="h-auto min-h-[10rem] max-h-[55vh] w-full overflow-auto">
                {courses.length === 0 && <p>Aucun cours ajouté.</p>}
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 mb-2 rounded shadow"
                  >
                    <CourseComponent
                      name={course.courseName}
                      credits={course.credits}
                      grade={course.grade}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center w-5/6 gap-16 pt-8">
              <ShimmerButton
                type="button"
                className="w-1/5 items-center pt-3"
                onClick={() => openModal("addCourse")}
              >
                Ajouter un cours
              </ShimmerButton>
              {courses.length > 0 && (
                <ShimmerButton
                  type="button"
                  className="w-1/5 items-center pt-3"
                  onClick={handleCalculateClick}
                >
                  Calculer
                </ShimmerButton>
              )}
            </div>
            {gpa !== null && (
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">
                  Votre côte: <NumberTicker value={gpa} />
                </h3>
              </div>
            )}
          </div>
        )}
      </form>
      {isModalOpen && modalType === "addCourse" && (
        <AddCourseModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleAddCourse}
        />
      )}
      {isModalOpen && modalType === "editCourse" && (
        <EditCourseModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleOnSaveEditCourse}
          courseToModify={courseToModify}
        />
      )}
    </div>
  );
};

export default ContentRectangle;
