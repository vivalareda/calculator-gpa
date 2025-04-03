"use client";
import RedRectangle from "../components/red-rectangle";
import Link from "next/link";
import { Calculator, GraduationCap, FileCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="relative h-screen w-screen bg-red-500 flex overflow-hidden">
      <RedRectangle />
      <div className="w-full md:w-3/5 h-screen bg-gray-50 pt-10 px-6 md:px-10 absolute top-0 md:top-0 right-0 shadow-xl flex flex-col items-center justify-center">
        <div className="flex flex-col items-center transition-opacity duration-500">
          <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
            Que voulez-vous calculer?
          </h1>

          <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
            <Link href="/gpa" className="w-full">
              <div className="group h-full">
                <div className="h-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-4 hover:border-blue-300">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      Calculer ma cote
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Calculez votre nouvelle cote en fonction des cours que
                      vous avez complétés
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/grade-calculator" className="w-full">
              <div className="group h-full">
                <div className="h-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-4 hover:border-green-300">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Calculator className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      Note minimale requise
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Calculez la note minimale dont vous avez besoin pour
                      réussir un cours
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/flashcards" className="w-full">
              <div className="group h-full">
                <div className="h-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-4 hover:border-green-300">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <FileCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      Flashcards pour étude
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Creez des flashcards pour étudier et mémoriser la matière
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
