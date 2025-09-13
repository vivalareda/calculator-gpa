"use client";
import { Calculator, GraduationCap, Search } from "lucide-react";
import Link from "next/link";
import RedRectangle from "../components/red-rectangle";

export default function Home() {
	return (
		<div className="relative flex h-screen w-screen overflow-hidden bg-red-500">
			<RedRectangle />
			<div className="absolute right-0 top-0 flex h-screen w-full flex-col items-center justify-center bg-gray-50 px-6 pt-10 shadow-xl md:top-0 md:w-3/5 md:px-10">
				<div className="flex flex-col items-center transition-opacity duration-500">
					<h1 className="mb-10 text-center text-3xl font-bold text-gray-800">
						Que voulez-vous faire?
					</h1>

					<div className="grid w-full max-w-4xl gap-6 md:grid-cols-3">
						<Link href="/gpa" className="w-full">
							<div className="group h-full">
								<div className="flex h-full flex-col items-center justify-start gap-4 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all hover:border-blue-300 hover:shadow-md pt-12">
									<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200">
										<GraduationCap className="h-8 w-8 text-blue-600" />
									</div>
									<div>
										<h2 className="mb-2 text-xl font-bold text-gray-800">
											Calculer ma cote
										</h2>
										<p className="text-sm text-gray-600">
											Calculez votre nouvelle cote en fonction des cours que
											vous avez complétés
										</p>
									</div>
								</div>
							</div>
						</Link>

						<Link href="/grade-calculator" className="w-full">
							<div className="group h-full">
								<div className="flex h-full flex-col items-center justify-start gap-4 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all hover:border-green-300 hover:shadow-md pt-12">
									<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 transition-colors group-hover:bg-green-200">
										<Calculator className="h-8 w-8 text-green-600" />
									</div>
									<div>
										<h2 className="mb-2 text-xl font-bold text-gray-800">
											Calculer le note minimale requise
										</h2>
										<p className="text-sm text-gray-600">
											Calculez la note minimale dont vous avez besoin pour
											réussir un cours
										</p>
									</div>
								</div>
							</div>
						</Link>

						<Link href="/course-finder" className="w-full">
							<div className="group h-full">
								<div className="flex h-full flex-col items-center justify-start gap-4 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all hover:border-purple-300 hover:shadow-md pt-12">
									<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-purple-100 transition-colors group-hover:bg-purple-200">
										<Search className="h-8 w-8 text-purple-600" />
									</div>
									<div>
										<h2 className="mb-2 text-xl font-bold text-gray-800">
											Trouver des cours par catégorie
										</h2>
										<p className="text-sm text-gray-600">
											Filtrez les cours par spécialisation/catégorie pour se
											spécialiser
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
