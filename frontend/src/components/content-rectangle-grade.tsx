"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import ShimmerButton from "./magicui/shimmer-button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import * as z from "zod";
import NumberTicker from "./magicui/number-ticker";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

// Define the Exam type
type Exam = {
  id: string;
  name?: string;
  grade: number;
  weight: number;
};

const gradeFormSchema = z.object({
  passingGrade: z
    .number({ invalid_type_error: "Veuillez entrer un nombre entre 0 et 100" })
    .min(0, { message: "La note doit être au moins 0." })
    .max(100, { message: "La note doit être au maximum 100." }),
  finalExamWeight: z
    .number({ invalid_type_error: "Veuillez entrer un nombre entre 0 et 100" })
    .min(0, { message: "Le pourcentage doit être au moins 0." })
    .max(100, { message: "Le pourcentage doit être au maximum 100." }),
});

const examSchema = z.object({
  grade: z
    .number({ invalid_type_error: "Veuillez entrer un nombre entre 0 et 100" })
    .min(0, { message: "La note doit être au moins 0." })
    .max(100, { message: "La note doit être au maximum 100." }),
  weight: z
    .number({ invalid_type_error: "Veuillez entrer un nombre entre 0 et 100" })
    .min(0, { message: "Le pourcentage doit être au moins 0." })
    .max(100, { message: "Le pourcentage doit être au maximum 100." }),
});

type GradeFormData = z.infer<typeof gradeFormSchema>;
type ExamFormData = z.infer<typeof examSchema>;

const ContentRectangleGrade = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [requiredGrade, setRequiredGrade] = useState<number | null>(null);
  const [isPossible, setIsPossible] = useState(true);
  const [exams, setExams] = useState<Exam[]>([]);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
    }, 500);
  };

  const handleAddExam = (data: ExamFormData) => {
    const newExam: Exam = {
      id: Math.random().toString(36).substring(7),
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
    exams.forEach((exam) => {
      totalWeightSoFar += exam.weight;
      weightedGradeSoFar += exam.grade * (exam.weight / 100);
    });

    if (totalWeightSoFar + data.finalExamWeight > 100) {
      alert(
        "Le total des pourcentages dépasse 100%. Veuillez vérifier vos entrées.",
      );
      return;
    }

    const requiredGrade =
      (data.passingGrade * (totalWeightSoFar + data.finalExamWeight) -
        weightedGradeSoFar * 100) /
      data.finalExamWeight;

    if (requiredGrade > 100) {
      setIsPossible(false);
    } else {
      setIsPossible(true);
    }
    console.log(requiredGrade);
    setRequiredGrade(requiredGrade);
  };

  const onSubmit = (data: GradeFormData) => {
    calculateRequiredGrade(data);
  };

  return (
    <div className="w-full md:w-3/5 h-screen bg-white absolute right-0 shadow-2xl flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative h-full w-full flex justify-center items-center"
      >
        {currentStep === 1 && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-row items-center pb-3">
              <p>Entrez la note de passage (%)</p>
            </div>
            <Input
              className="w-2/4 mb-5"
              {...register("passingGrade", { valueAsNumber: true })}
            />
            {errors.passingGrade && (
              <p className="text-red-500 pb-2">{errors.passingGrade.message}</p>
            )}
            <ShimmerButton type="button" onClick={handleNextStep}>
              Suivant
            </ShimmerButton>
          </div>
        )}
        {currentStep === 2 && (
          <div
            className={`absolute inset-0 flex flex-col items-center px-10 py-10 transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full max-h-screen overflow-auto pt-20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Examens:</h2>
                <div className="flex flex-row items-center">
                  <p className="mr-2">Poids de l'examen final (%)</p>
                  <Input
                    className="w-24"
                    type="number"
                    placeholder="Ex: 40"
                    {...register("finalExamWeight", { valueAsNumber: true })}
                  />
                </div>
              </div>
              {errors.finalExamWeight && (
                <p className="text-red-500 pb-2">
                  {errors.finalExamWeight.message}
                </p>
              )}
              <div className="h-auto min-h-[10rem] max-h-[55vh] w-full overflow-auto">
                {exams.length === 0 && <p>Aucun examen ajouté.</p>}
                {exams.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-gray-100 p-4 mb-2 rounded shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p>
                          <strong>Note:</strong> {exam.grade}%
                        </p>
                        <p>
                          <strong>Poids:</strong> {exam.weight}%
                        </p>
                      </div>
                      <div>
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => handleRemoveExam(exam.id)}
                          className="mt-2 px-4 py-2 text-white rounded transition duration-300"
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center w-5/6 gap-16 pt-8">
              <ShimmerButton
                type="button"
                className="w-1/5 items-center pt-3"
                onClick={() => setIsAddExamModalOpen(true)}
              >
                Ajout examen
              </ShimmerButton>
              {exams.length > 0 && (
                <ShimmerButton
                  type="submit"
                  className="w-1/5 items-center pt-3"
                >
                  Calculer
                </ShimmerButton>
              )}
            </div>
            {requiredGrade !== null && (
              <div className="mt-8 p-6 rounded-lg bg-gray-50 text-center w-3/4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Résultat:
                </h2>
                {isPossible ? (
                  <div className="text-2xl font-bold text-blue-600">
                    <NumberTicker
                      value={Math.max(0, requiredGrade)}
                      className="font-bold text-blue-600"
                    />
                  </div>
                ) : (
                  <div className="text-lg font-medium text-red-500">
                    <p className="mb-2">
                      Il n'est pas mathématiquement possible d'atteindre la note
                      de passage.
                    </p>
                    <p>
                      Vous auriez besoin d'une note de{" "}
                      <NumberTicker
                        value={requiredGrade}
                        className="font-bold text-red-500"
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
      <Dialog open={isAddExamModalOpen} onOpenChange={setIsAddExamModalOpen}>
        <DialogContent
          className={`bg-white text-black p-0 overflow-hidden transition-opacity duration-300 ${isAddExamModalOpen ? "opacity-100" : "opacity-0"}`}
        >
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Ajouter un examen
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Détails de l'examen
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmitExam(handleAddExam)}
            className="space-y-8 px-6"
          >
            <div>
              <label className="block mb-2">Note obtenue (%)</label>
              <Input
                {...registerExam("grade", { valueAsNumber: true })}
                className="w-full mb-4"
                type="number"
                placeholder="Ex.: 75"
              />
              {examErrors.grade && (
                <p className="text-red-500">{examErrors.grade.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2">Poids de l'examen (%)</label>
              <Input
                {...registerExam("weight", { valueAsNumber: true })}
                className="w-full mb-4"
                type="number"
                placeholder="Ex.: 20"
              />
              {examErrors.weight && (
                <p className="text-red-500">{examErrors.weight.message}</p>
              )}
            </div>
            <DialogFooter className="px-6 py-4">
              <Button variant="default" type="submit">
                Ajouter
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setIsAddExamModalOpen(false)}
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
