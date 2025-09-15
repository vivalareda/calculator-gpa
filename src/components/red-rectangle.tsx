import { ArrowLeft, Calculator, GraduationCap } from "lucide-react";
import Link from "next/link";

const RedRectangle = () => {
  return (
    <div className="hidden h-screen w-full flex-col justify-between bg-gradient-to-br from-red-600 to-red-800 p-6 md:flex md:w-2/5 md:p-10">
      <div className="flex items-center gap-5">
        <Link
          className="text-white transition-colors hover:text-white/80"
          href="/"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <Link
          className="font-bold text-white text-xl transition-colors hover:text-white/80"
          href="/"
        >
          Accueil
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="-space-x-2 flex gap-2">
            <GraduationCap className="h-10 w-10 text-white" />
            <Calculator className="h-10 w-10 text-white/80" />
          </div>
          <h1 className="font-bold text-3xl text-white leading-tight lg:text-4xl">
            Calculateurs et outils
          </h1>
        </div>
        <p className="mt-4 max-w-md text-base text-white/90 leading-relaxed">
          Calculez votre cote (GPA), déterminez la note minimale requise pour
          réussir vos cours ou filtrer les cours.
        </p>
      </div>

      <div className="text-sm text-white/70">
        <p>© {new Date().getFullYear()} Uni Calculator</p>
      </div>
    </div>
  );
};

export default RedRectangle;
