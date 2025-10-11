"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Exam } from "../../types";
import NumberTicker from "./magicui/number-ticker";
import ShimmerButton from "./magicui/shimmer-button";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

const MAX_GRADE_PERCENTAGE = 100;
const MIN_GRADE_PERCENTAGE = 0;
const STEP_TRANSITION_DELAY = 500;
const FIRST_STEP = 1;
const SECOND_STEP = 2;
const RANDOM_ID_BASE = 36;
const RANDOM_ID_LENGTH = 7;

const gradeFormSchema = z.object({
  passingGrade: z
    .number({ invalid_type_error: "Veuillez entrer un nombre entre 0 et 100" })
    .min(MIN_GRADE_PERCENTAGE, { message: "La note doit être au moins 0." })
    .max(MAX_GRADE_PERCENTAGE, {
      message: "La note doit être au maximum 100.",
    }),
  finalExamWeight: z
    .number({ invalid_type_error: "Veuillez entrer un nombre entre 0 et 100" })
    .min(MIN_GRADE_PERCENTAGE, {
      message: "Le pourcentage doit être au moins 0.",
    })
    .max(MAX_GRADE_PERCENTAGE, {
      message: "Le pourcentage doit être au maximum 100.",
    }),
});

const examSchema = z.object({
  name: z.string().optional(),
  grade: z
    .string()
    .transform((val) => Number.parseFloat(val))
    .refine((val) => !Number.isNaN(val), {
      message: "La note doit être un nombre valide",
    })
    .refine((val) => val >= MIN_GRADE_PERCENTAGE, {
      message: "La note doit être au moins 0.",
    })
    .refine((val) => val <= MAX_GRADE_PERCENTAGE, {
      message: "La note doit être au maximum 100.",
    }),
  weight: z
    .string()
    .transform((val) => Number.parseFloat(val))
    .refine((val) => !Number.isNaN(val), {
      message: "Le poids doit être un nombre valide",
    })
    .refine((val) => val >= MIN_GRADE_PERCENTAGE, {
      message: "Le poids doit être au moins 0.",
    })
    .refine((val) => val <= MAX_GRADE_PERCENTAGE, {
      message: "Le poids doit être au maximum 100.",
    }),
});

type GradeFormData = z.infer<typeof gradeFormSchema>;
type ExamFormData = z.infer<typeof examSchema>;

const ContentRectangleGrade = () => {
  const [currentStep, setCurrentStep] = useState(FIRST_STEP);
  const [isVisible, setIsVisible] = useState(true);
  const [requiredGrade, setRequiredGrade] = useState<number | null>(null);
  const [isPossible, setIsPossible] = useState(true);
  const [exams, setExams] = useState<Exam[]>([]);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GradeFormData>({
    resolver: zodResolver(gradeFormSchema),
    mode: "onBlur",
    defaultValues: {
      passingGrade: undefined,
      finalExamWeight: undefined,
    },
  });

  const {
    register: registerExam,
    handleSubmit: handleSubmitExam,
    formState: { errors: examErrors },
    reset: resetExamForm,
  } = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    mode: "onBlur",
    defaultValues: {
      grade: undefined,
      weight: undefined,
    },
  });

  const handleNextStep = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsVisible(true);
    }, STEP_TRANSITION_DELAY);
  };

  const handleAddExam = (data: ExamFormData) => {
    const newExam: Exam = {
      id: Math.random().toString(RANDOM_ID_BASE).substring(RANDOM_ID_LENGTH),
      name: data.name,
      grade: data.grade,
      weight: data.weight,
    };
    setExams([...exams, newExam]);
    resetExamForm();
    setIsAddExamModalOpen(false);
  };

  const handleRemoveExam = (id: string) => {
    setExams(exams.filter((exam) => exam.id !== id));
  };

  const calculateRequiredGrade = (data: GradeFormData) => {
    let totalWeightSoFar = 0;
    let weightedGradeSoFar = 0;
    for (const exam of exams) {
      totalWeightSoFar += exam.weight;
      weightedGradeSoFar += exam.grade * (exam.weight / MAX_GRADE_PERCENTAGE);
    }

    if (totalWeightSoFar + data.finalExamWeight > MAX_GRADE_PERCENTAGE) {
      alert(
        "Le total des pourcentages dépasse 100%. Veuillez vérifier vos entrées."
      );
      return;
    }

    const calculatedRequiredGrade =
      (data.passingGrade * (totalWeightSoFar + data.finalExamWeight) -
        weightedGradeSoFar * MAX_GRADE_PERCENTAGE) /
      data.finalExamWeight;

    if (calculatedRequiredGrade > MAX_GRADE_PERCENTAGE) {
      setIsPossible(false);
    } else {
      setIsPossible(true);
    }
    setRequiredGrade(calculatedRequiredGrade);
  };

  const onSubmit = (data: GradeFormData) => {
    calculateRequiredGrade(data);
  };

  return (
    <div className="absolute right-0 flex h-screen w-full items-center justify-center bg-white shadow-2xl md:w-3/5">
      <form
        className="relative flex h-full w-full items-center justify-center px-4 sm:px-6 md:px-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {currentStep === FIRST_STEP && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-row items-center pb-3">
              <p className="text-sm sm:text-base">
                Entrez la note de passage (%)
              </p>
            </div>
            <Input
              className="mb-5 w-full max-w-xs sm:w-3/4 md:w-2/4"
              {...register("passingGrade", { valueAsNumber: true })}
            />
            {errors.passingGrade && (
              <p className="pb-2 text-red-500 text-sm">
                {errors.passingGrade.message}
              </p>
            )}
            <ShimmerButton onClick={handleNextStep} type="button">
              Suivant
            </ShimmerButton>
          </div>
        )}
        {currentStep === SECOND_STEP && (
          <div
            className={`absolute inset-0 flex flex-col items-center px-4 py-6 transition-opacity duration-500 sm:px-6 sm:py-8 md:px-10 md:py-10 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="max-h-screen w-full overflow-auto pt-12 sm:pt-16 md:pt-20">
              <div className="mb-3 flex flex-col items-start justify-between gap-3 sm:mb-4 sm:flex-row sm:items-center sm:gap-0">
                <h2 className="font-bold text-lg sm:text-xl">Examens:</h2>
                <div className="flex flex-col items-start sm:flex-row sm:items-center">
                  <p className="mb-1 text-sm sm:mb-0 sm:mr-2 sm:text-base">
                    Poids de l'examen final (%)
                  </p>
                  <Input
                    className="w-20 sm:w-24"
                    placeholder="Ex: 40"
                    type="number"
                    {...register("finalExamWeight", { valueAsNumber: true })}
                  />
                </div>
              </div>
              {errors.finalExamWeight && (
                <p className="pb-2 text-red-500 text-sm">
                  {errors.finalExamWeight.message}
                </p>
              )}
              <div className="h-auto max-h-[45vh] min-h-[8rem] w-full overflow-auto sm:max-h-[50vh] sm:min-h-[10rem] md:max-h-[55vh]">
                {exams.length === 0 && (
                  <p className="text-sm sm:text-base">Aucun examen ajouté.</p>
                )}
                {exams.map((exam) => (
                  <div
                    className="mb-2 rounded bg-gray-100 p-4 shadow"
                    key={exam.id}
                  >
                    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
                      <div className="text-sm sm:text-base">
                        {exam.name && (
                          <p>
                            <strong>Nom:</strong> {exam.name}
                          </p>
                        )}
                        <p>
                          <strong>Note:</strong> {exam.grade}%
                        </p>
                        <p>
                          <strong>Poids:</strong> {exam.weight}%
                        </p>
                      </div>
                      <div className="flex shrink-0">
                        <Button
                          className="mt-1 rounded px-3 py-1 text-sm text-white transition duration-300 sm:mt-2 sm:px-4 sm:py-2"
                          onClick={() => handleRemoveExam(exam.id)}
                          type="button"
                          variant="destructive"
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col justify-center gap-4 pt-4 sm:w-5/6 sm:flex-row sm:gap-8 sm:pt-6 md:gap-16 md:pt-8">
              <ShimmerButton
                className="w-full items-center pt-3 text-sm sm:w-2/5 sm:text-base md:w-1/5"
                onClick={() => setIsAddExamModalOpen(true)}
                type="button"
              >
                Ajout examen
              </ShimmerButton>
              {exams.length > 0 && (
                <ShimmerButton
                  className="w-full items-center pt-3 text-sm sm:w-2/5 sm:text-base md:w-1/5"
                  type="submit"
                >
                  Calculer
                </ShimmerButton>
              )}
            </div>
            {requiredGrade !== null && (
              <div className="mt-4 w-full rounded-lg bg-gray-50 p-4 text-center sm:mt-6 sm:w-3/4 sm:p-6 md:mt-8">
                <h2 className="mb-2 font-semibold text-gray-700 text-lg sm:mb-4 sm:text-xl">
                  Note minimale requise:
                </h2>
                {isPossible ? (
                  <div className="font-bold text-xl text-blue-600 sm:text-2xl">
                    <NumberTicker
                      className="font-bold text-blue-600"
                      value={Math.max(0, requiredGrade)}
                    />
                    %
                  </div>
                ) : (
                  <div className="font-medium text-base text-red-500 sm:text-lg">
                    <p className="mb-1 sm:mb-2">
                      Il n'est pas mathématiquement possible d'atteindre la note
                      de passage.
                    </p>
                    <p className="text-sm sm:text-base">
                      Vous auriez besoin d'une note de{" "}
                      <NumberTicker
                        className="font-bold text-red-500"
                        value={requiredGrade}
                      />
                      %.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </form>
      <Dialog onOpenChange={setIsAddExamModalOpen} open={isAddExamModalOpen}>
        <DialogContent
          className={`overflow-hidden bg-white p-0 text-black transition-opacity duration-300 ${isAddExamModalOpen ? "opacity-100" : "opacity-0"}`}
        >
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-center font-bold text-2xl">
              Ajouter un examen
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Détails de l'examen
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-8 px-6"
            onSubmit={handleSubmitExam(handleAddExam)}
          >
            <div>
              <label className="mb-2 block" htmlFor="examName">
                Nom (Optionel)
              </label>
              <Input
                {...registerExam("name", { valueAsNumber: false })}
                className="mb-4 w-full"
                id="examName"
                placeholder="Mini-test"
                type="text"
              />
            </div>

            <div>
              <label className="mb-2 block" htmlFor="examGrade">
                Note obtenue (%)
              </label>
              <Input
                {...registerExam("grade")}
                className="mb-4 w-full"
                id="examGrade"
                placeholder="Ex.: 75.5"
                type="text"
              />
              {examErrors.grade && (
                <p className="text-red-500">{examErrors.grade.message}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block" htmlFor="examWeight">
                Poids de l'examen (%)
              </label>
              <Input
                {...registerExam("weight")}
                className="mb-4 w-full"
                id="examWeight"
                placeholder="Ex.: 20"
                type="text"
              />
              {examErrors.weight && (
                <p className="text-red-500">{examErrors.weight.message}</p>
              )}
            </div>
            <DialogFooter className="px-6 py-4">
              <Button type="submit" variant="default">
                Ajouter
              </Button>
              <Button
                onClick={() => setIsAddExamModalOpen(false)}
                type="button"
                variant="secondary"
              >
                Annuler
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentRectangleGrade;
