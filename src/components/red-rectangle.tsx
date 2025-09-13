import { ArrowLeft, Calculator, GraduationCap } from "lucide-react";
import Link from "next/link";

const RedRectangle = () => {
	return (
		<div className="flex h-screen w-full flex-col justify-between bg-gradient-to-br from-red-600 to-red-800 p-10 md:w-2/5">
			<div className="flex items-center gap-5">
				<Link
					href="/"
					className="text-white transition-colors hover:text-white/80"
				>
					<ArrowLeft className="h-6 w-6" />
				</Link>
				<Link
					href="/"
					className="text-xl font-bold text-white transition-colors hover:text-white/80"
				>
					Accueil
				</Link>
			</div>

			<div className="space-y-6">
				<div className="flex items-center gap-3">
					<div className="flex gap-2 -space-x-2">
						<GraduationCap className="h-10 w-10 text-white" />
						<Calculator className="h-10 w-10 text-white/80" />
					</div>
					<h1 className="text-4xl font-bold leading-tight text-white">
						Calculateurs et outils
					</h1>
				</div>
				<p className="mt-4 max-w-md text-base leading-relaxed text-white/90">
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
