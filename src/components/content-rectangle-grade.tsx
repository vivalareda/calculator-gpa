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
      message: "La note doit être un nombre valide",
    })
    .refine((val) => val >= MIN_GRADE_PERCENTAGE, {
      message: "La note doit être au moins 0.",
    })
    .refine((val) => val <= MAX_GRADE_PERCENTAGE, {
      message: "La note doit être au maximum 100.",
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
        className="relative flex h-full w-full items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {currentStep === FIRST_STEP && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-row items-center pb-3">
              <p>Entrez la note de passage (%)</p>
            </div>
            <Input
              className="mb-5 w-2/4"
              {...register("passingGrade", { valueAsNumber: true })}
            />
            {errors.passingGrade && (
              <p className="pb-2 text-red-500">{errors.passingGrade.message}</p>
            )}
            <ShimmerButton onClick={handleNextStep} type="button">
              Suivant
            </ShimmerButton>
          </div>
        )}
        {currentStep === SECOND_STEP && (
          <div
            className={`absolute inset-0 flex flex-col items-center px-10 py-10 transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="max-h-screen w-full overflow-auto pt-20">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-xl">Examens:</h2>
                <div className="flex flex-row items-center">
                  <p className="mr-2">Poids de l'examen final (%)</p>
                  <Input
                    className="w-24"
                    placeholder="Ex: 40"
                    type="number"
                    {...register("finalExamWeight", { valueAsNumber: true })}
                  />
                </div>
              </div>
              {errors.finalExamWeight && (
                <p className="pb-2 text-red-500">
                  {errors.finalExamWeight.message}
                </p>
              )}
              <div className="h-auto max-h-[55vh] min-h-[10rem] w-full overflow-auto">
                {exams.length === 0 && <p>Aucun examen ajouté.</p>}
                {exams.map((exam) => (
                  <div
                    className="mb-2 rounded bg-gray-100 p-4 shadow"
                    key={exam.id}
                  >
                    <div className="flex items-center justify-between">
                      <div>
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
                      <div>
                        <Button
                          className="mt-2 rounded px-4 py-2 text-white transition duration-300"
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
            <div className="flex w-5/6 justify-center gap-16 pt-8">
              <ShimmerButton
                className="w-1/5 items-center pt-3"
                onClick={() => setIsAddExamModalOpen(true)}
                type="button"
              >
                Ajout examen
              </ShimmerButton>
              {exams.length > 0 && (
                <ShimmerButton
                  className="w-1/5 items-center pt-3"
                  type="submit"
                >
                  Calculer
                </ShimmerButton>
              )}
            </div>
            {requiredGrade !== null && (
              <div className="mt-8 w-3/4 rounded-lg bg-gray-50 p-6 text-center">
                <h2 className="mb-4 font-semibold text-gray-700 text-xl">
                  Note minimale requise:
                </h2>
                {isPossible ? (
                  <div className="font-bold text-2xl text-blue-600">
                    <NumberTicker
                      className="font-bold text-blue-600"
                      value={Math.max(0, requiredGrade)}
                    />
                    %
                  </div>
                ) : (
                  <div className="font-medium text-lg text-red-500">
                    <p className="mb-2">
                      Il n'est pas mathématiquement possible d'atteindre la note
                      de passage.
                    </p>
                    <p>
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
              {examErrors.grade && (
                <p className="text-red-500">{examErrors.grade.message}</p>
              )}
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
