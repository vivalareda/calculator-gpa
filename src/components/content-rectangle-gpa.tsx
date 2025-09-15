"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCourseToModify } from "../../hooks/course-to-modify";
import useCourseStore from "../../hooks/use-course-store";
import useModalStore from "../../hooks/use-modal-store";
import { type Course, type FormData, formSchema } from "../../types";
import CourseComponent from "./course-component";
import NumberTicker from "./magicui/number-ticker";
import ShimmerButton from "./magicui/shimmer-button";
import AddCourseModal from "./modals/add-course-modal";
import EditCourseModal from "./modals/edit-course-modal";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const STEP_TRANSITION_DELAY = 500;
const FIRST_STEP = 1;
const THIRD_STEP = 3;

const ContentRectangleGpa = () => {
  const [currentStep, setCurrentStep] = useState(FIRST_STEP);
  const [isVisible, setIsVisible] = useState(true);
  const [gpa, setGpa] = useState<number | null>(null);
  const { courses, addCourse } = useCourseStore();
  const { isModalOpen, openModal, closeModal, modalType } = useModalStore();
  const { courseToModify } = useCourseToModify();

  const {
    register,
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

  const handleOnSaveEditCourse = () => {
    closeModal();
  };

  const handleNextStep = () => {
    if (errors.gpa) {
      return;
    }
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsVisible(true);
    }, STEP_TRANSITION_DELAY);
  };

  const handleAddCourse = useCallback(
    (course: Course) => {
      addCourse(course);
    },
    [addCourse]
  );

  const handleCalculateClick = () => {
    try {
      const currentGpa = watch("gpa");
      const currentCredits = watch("credits");

      if (currentGpa === undefined || currentCredits === undefined) {
        alert("Veuillez entrer votre côte et le nombre de crédits complétés.");
        return;
      }

      const gradePoints: Record<string, number> = {
        "A+": 4.3,
        A: 4.0,
        "A-": 3.7,
        "B+": 3.3,
        B: 3.0,
        "B-": 2.7,
        "C+": 2.3,
        C: 2.0,
        "C-": 1.7,
        "D+": 1.3,
        D: 1.0,
        E: 0.0,
      };

      let totalQualityPoints = currentGpa * currentCredits;
      let totalCredits = currentCredits;

      for (const course of courses) {
        const grade = +gradePoints[course.grade];
        const courseCredits = +course.credits;
        totalQualityPoints += +grade * courseCredits;
        totalCredits += courseCredits;
      }

      if (totalCredits === 0) {
        setGpa(0);
        return;
      }

      const newGpa = totalQualityPoints / totalCredits;
      setGpa(newGpa);
    } catch (_error) {
      // Silently handle calculation errors
    }
  };

  return (
    <div className="absolute right-0 flex h-screen w-full items-center justify-center bg-white shadow-2xl md:w-3/5">
      <form className="relative flex h-full w-full items-center justify-center">
        {currentStep === 1 && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-row items-center pb-3">
              <p>Entrez votre cote actuelle</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="ml-2 cursor-pointer">
                      <Button
                        className="pp-1 flex h-6 w-6 items-center justify-center rounded-full text-xs"
                        disabled
                        variant="secondary"
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
              className="mb-5 w-2/4"
              {...register("gpa", { valueAsNumber: true })}
            />
            {errors.gpa && (
              <p className="pb-2 text-red-500">{errors.gpa.message}</p>
            )}
            <ShimmerButton onClick={handleNextStep} type="button">
              Suivant
            </ShimmerButton>
          </div>
        )}
        {currentStep === 2 && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="pb-3">Entrez le nombre de crédits complété</p>
            <Input
              className="mb-5 w-2/4"
              {...register("credits", { valueAsNumber: true })}
            />
            {errors.credits && (
              <p className="pb-2 text-red-500">{errors.credits.message}</p>
            )}
            <ShimmerButton onClick={handleNextStep} type="button">
              Suivant
            </ShimmerButton>
          </div>
        )}
        {currentStep === THIRD_STEP && (
          <div
            className={`absolute inset-0 flex h-screen flex-col items-center justify-start px-6 py-8 pt-20 transition-opacity duration-500${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full">
              <h2 className="mb-4 pb-3 font-bold text-xl">Cours:</h2>
              <div className="h-auto max-h-[55vh] min-h-[10rem] w-full overflow-auto">
                {courses.length === 0 && <p>Aucun cours ajouté.</p>}
                {courses.map((course) => (
                  <div
                    className="mb-2 rounded bg-gray-100 p-4 shadow"
                    key={course.courseName}
                  >
                    <CourseComponent
                      credits={course.credits}
                      grade={course.grade}
                      name={course.courseName}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-5/6 justify-center gap-16 pt-8">
              <ShimmerButton
                className="w-1/5 items-center pt-3"
                onClick={() => openModal("addCourse")}
                type="button"
              >
                Ajouter un cours
              </ShimmerButton>
              {courses.length > 0 && (
                <ShimmerButton
                  className="w-1/5 items-center pt-3"
                  onClick={handleCalculateClick}
                  type="button"
                >
                  Calculer
                </ShimmerButton>
              )}
            </div>
            {gpa !== null && (
              <div className="mt-4 text-center">
                <h3 className="font-bold text-xl">
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
          courseToModify={courseToModify}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleOnSaveEditCourse}
        />
      )}
    </div>
  );
};

export default ContentRectangleGpa;
