"use client";
import { Calculator, GraduationCap, NotepadText, Search } from "lucide-react";
import Link from "next/link";
import RedRectangle from "../components/red-rectangle";

export default function Home() {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-red-500">
      <RedRectangle />
      <div className="absolute top-0 right-0 flex h-screen w-full flex-col items-center justify-center bg-gray-50 px-4 pt-6 shadow-xl sm:px-6 sm:pt-10 md:top-0 md:w-3/5 md:px-10">
        <div className="flex flex-col items-center transition-opacity duration-500">
          <h1 className="mb-6 text-center font-bold text-2xl text-gray-800 sm:mb-10 sm:text-3xl">
            Que voulez-vous faire?
          </h1>

          <div className="grid w-full max-w-4xl gap-4 sm:gap-6 md:grid-cols-2">
            <Link className="w-full" href="/gpa">
              <div className="group h-full">
                <div className="flex h-full flex-col items-center justify-start gap-3 rounded-xl border border-gray-200 bg-white p-4 pt-8 text-center shadow-sm transition-all hover:border-blue-300 hover:shadow-md sm:gap-4 sm:p-8 sm:pt-12">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200 sm:h-16 sm:w-16">
                    <GraduationCap className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <h2 className="mb-1 font-bold text-gray-800 text-lg sm:mb-2 sm:text-xl">
                      Calculer ma cote
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Calculez votre nouvelle cote en fonction des cours que
                      vous avez complétés
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link className="w-full" href="/grade-calculator">
              <div className="group h-full">
                <div className="flex h-full flex-col items-center justify-start gap-3 rounded-xl border border-gray-200 bg-white p-4 pt-8 text-center shadow-sm transition-all hover:border-green-300 hover:shadow-md sm:gap-4 sm:p-8 sm:pt-12">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 transition-colors group-hover:bg-green-200 sm:h-16 sm:w-16">
                    <Calculator className="h-6 w-6 text-green-600 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <h2 className="mb-1 font-bold text-gray-800 text-lg sm:mb-2 sm:text-xl">
                      Calculer le note minimale requise
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Calculez la note minimale dont vous avez besoin pour
                      réussir un cours
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link className="w-full" href="/course-finder">
              <div className="group h-full">
                <div className="flex h-full flex-col items-center justify-start gap-3 rounded-xl border border-gray-200 bg-white p-4 pt-8 text-center shadow-sm transition-all hover:border-purple-300 hover:shadow-md sm:gap-4 sm:p-8 sm:pt-12">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 transition-colors group-hover:bg-purple-200 sm:h-16 sm:w-16">
                    <Search className="h-6 w-6 text-purple-600 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <h2 className="mb-1 font-bold text-gray-800 text-lg sm:mb-2 sm:text-xl">
                      Trouver des cours par catégorie
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Filtrez les cours par spécialisation/catégorie pour se
                      spécialiser
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link className="w-full" href="https://remembr.reda.sh">
              <div className="group h-full">
                <div className="flex h-full flex-col items-center justify-start gap-3 rounded-xl border border-gray-200 bg-white p-4 pt-8 text-center shadow-sm transition-all hover:border-orange-300 hover:shadow-md sm:gap-4 sm:p-8 sm:pt-12">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 transition-colors group-hover:bg-orange-200 sm:h-16 sm:w-16">
                    <NotepadText className="h-6 w-6 text-orange-600 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <h2 className="mb-1 font-bold text-gray-800 text-lg sm:mb-2 sm:text-xl">
                      Application de Flashcard
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Créez des flashcards pour votre étude
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
