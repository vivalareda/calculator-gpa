import Link from "next/link";
import { ArrowLeft, Calculator, GraduationCap } from "lucide-react";

const RedRectangle = () => {
  return (
    <div className="bg-gradient-to-br from-red-600 to-red-800 w-full md:w-2/5 h-screen flex flex-col justify-between p-10">
      <div className="flex items-center gap-5">
        <Link
          href="/"
          className="text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <Link
          href="/"
          className="text-white text-xl font-bold hover:text-white/80 transition-colors"
        >
          Accueil
        </Link>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 gap-2">
            <GraduationCap className="h-10 w-10 text-white" />
            <Calculator className="h-10 w-10 text-white/80" />
          </div>
          <h1 className="text-white text-4xl font-bold leading-tight">
            Calculateurs de cours
          </h1>
        </div>
        <p className="text-white/90 text-base mt-4 max-w-md leading-relaxed">
          Calculez votre cote (GPA) ou déterminez la note minimale requise pour
          réussir vos cours.
        </p>
      </div>

      <div className="text-white/70 text-sm">
        <p>© {new Date().getFullYear()} Uni Calculator</p>
      </div>
    </div>
  );
};

export default RedRectangle;
